const Analysis = require('../models/Analysis');
const Client = require('../models/Client');
const Zone = require('../models/Zone');
const Data = require('../models/Data');
const DataAnalysis = require('../models/DataAnalysis');
const ResultadosAnalysis = require('../models/ResultadosAnalysis');
const ResultadosCultivos = require('../models/ResultadosCultivos');
const { sequelize } = require('../config/database');

const getAnalysisById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el análisis
        const analysis = await Analysis.findByPk(id);
        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }

        // Buscar el cliente asociado
        const client = await Client.findByPk(analysis.id_client);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Buscar las zonas asociadas al análisis
        const zones = await Zone.findAll({ where: { id_analysis: id } });

        // Buscar los datos asociados a cada zona
        const zonesWithData = await Promise.all(zones.map(async (zone) => {
            const data = await Data.findAll({ where: { id_zone: zone.id } });
            const resultadosCultivos = await ResultadosCultivos.findAll({ where: { id_zone: zone.id } });

            return {
                id: zone.id,
                indications: zone.indications,
                depth: zone.depth,
                deleted: zone.deleted,
                created_at: zone.created_at,
                data: data,
                resultados_cultivos: resultadosCultivos.reduce((acc, cultivo) => {
                    acc[cultivo.cultivo] = cultivo;
                    return acc;
                }, {})
            };
        }));

        // Buscar los resultados generales del análisis
        const dataAnalysis = await DataAnalysis.findAll({ where: { id_analysis: id } });
        const resultadosAnalysis = await ResultadosAnalysis.findAll({ where: { id_analysis: id } });

        // Formatear la respuesta
        const response = {
            [analysis.id]: {
                datos: {
                    id: analysis.id,
                    name: analysis.name,
                    content: analysis.content,
                    locate: analysis.locate,
                    deleted: analysis.deleted,
                    created_at: analysis.created_at
                },
                cliente: {
                    id: client.id,
                    name: client.name,
                    number_contact: client.number_contact,
                    locate: client.locate,
                    deleted: client.deleted,
                    created_at: client.created_at
                },
                zonas: zonesWithData.reduce((acc, zone) => {
                    acc[`zona${zone.id}`] = zone;
                    return acc;
                }, {}),
                resultados_general: {
                    data_analysis: dataAnalysis,
                    resultados_analysis: resultadosAnalysis.reduce((acc, resultado) => {
                        acc[resultado.cultivo] = resultado;
                        return acc;
                    }, {})
                }
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching analysis details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getZonesByAnalysisId = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar las zonas asociadas al análisis
        const zones = await Zone.findAll({
            where: { id_analysis: id }
        });

        if (zones.length === 0) {
            return res.status(404).json({ message: 'Zones not found' });
        }

        // Buscar datos y resultados de cultivos asociados a cada zona
        const zonesWithDetails = await Promise.all(zones.map(async (zone) => {
            const data = await Data.findAll({ where: { id_zone: zone.id } });
            const resultadosCultivos = await ResultadosCultivos.findAll({ where: { id_zone: zone.id } });

            return {
                id: zone.id,
                indications: zone.indications,
                depth: zone.depth,
                deleted: zone.deleted,
                created_at: zone.created_at,
                data: data.map(d => ({
                    timestamp: d.timestamp,
                    humidity: d.humidity,
                    temperature: d.temperature,
                    conductivity: d.conductivity,
                    ph: d.ph,
                    nitrogen: d.nitrogen,
                    phosphorus: d.phosphorus,
                    potassium: d.potassium
                })),
                resultados_cultivos: resultadosCultivos.reduce((cultivoAcc, cultivo) => {
                    cultivoAcc[cultivo.cultivo] = {
                        cultivo: cultivo.cultivo,
                        apto: cultivo.apto,
                        detalles: cultivo.detalles,
                        porcentaje: cultivo.porcentaje
                    };
                    return cultivoAcc;
                }, {})
            };
        }));

        // Formatear la respuesta
        const response = zonesWithDetails.reduce((acc, zone) => {
            acc[`zona${zone.id}`] = zone;
            return acc;
        }, {});

        res.json(response);
    } catch (error) {
        console.error('Error fetching zones:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAnalysisById,
    getZonesByAnalysisId
};
