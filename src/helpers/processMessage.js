const Data = require('../models/Data');
const DataAnalysis = require('../models/DataAnalysis');
const ResultadosAnalysis = require('../models/ResultadosAnalysis');
const ResultadosCultivos = require('../models/ResultadosCultivos');
const {sequelize} = require('../config/database'); 


async function procesar(msg) {
    const t = await sequelize.transaction(); 

    try {
        const content = JSON.parse(msg.content.toString());

        if (content && content.data_analysis) {
            await procesarDataAnalysis(content.data_analysis[0], t);
            console.log(content.resultados_analysis)
            await procesarResultadosAnalysis(content.resultados_analysis, t);
            

            console.log('Datos generales procesados exitosamente');
        } else if (content && content.data) {
            await procesarData(content.data[0], t);
            await procesarResultadosCultivos(content.resultados_cultivos, t);

            console.log('Datos por zonas procesados exitosamente');
        } else {
            console.log('Algo falló');
        }

        await t.commit(); 
    } catch (error) {
        await t.rollback(); 
        console.error('Error al procesar los datos:', error);
    }
}

async function procesarDataAnalysis(data, transaction) {
    try {
        const data_analysis = {
            humidity: data[2],
            temperature: data[3],
            conductivity: data[4],
            ph: data[5],
            nitrogen: data[6],
            phosphorus: data[7],
            potassium: data[8],
            id_analysis: data[9]
        };

        await DataAnalysis.create({ ...data_analysis }, { transaction });
    } catch (error) {
        console.error('Error al procesar data_analysis:', error);
        throw error;
    }
}

async function procesarResultadosAnalysis(resultados, transaction) {
    try {
        for (const item of resultados) {
            const result_analysis = {
                id_analysis: item[1],
                cultivo: item[2],
                apto: item[3],
                detalles: item[4],
                porcentaje: item[5]
            };

            await ResultadosAnalysis.create({ ...result_analysis }, { transaction });
        }
    } catch (error) {
        console.error('Error al procesar resultados_analysis:', error);
        throw error;
    }
}

async function procesarData(data, transaction) {
    try {
        const data_analysis = {
            humidity: data[2],
            temperature: data[3],
            conductivity: data[4],
            ph: data[5],
            nitrogen: data[6],
            phosphorus: data[7],
            potassium: data[8],
            id_zone: data[9],
            id_analysis: data[10]
        };

        await Data.create({ ...data_analysis }, { transaction });
    } catch (error) {
        console.error('Error al procesar data:', error);
        throw error;
    }
}

async function procesarResultadosCultivos(resultados, transaction) {
    try {
        for (const item of resultados) {
            const result_analysis = {
                id_zone: item[1],
                cultivo: item[2],
                apto: item[3],
                detalles: item[4],
                porcentaje: item[5],
                id_analysis: item[7]
            };

            await ResultadosCultivos.create({ ...result_analysis }, { transaction });
        }
    } catch (error) {
        console.error('Error al procesar resultados_cultivos:', error);
        throw error;
    }
}

module.exports = procesar;
