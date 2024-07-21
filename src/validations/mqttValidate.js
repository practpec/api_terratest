const Data = require('../models/Data');
const DataAnalysis = require('../models/DataAnalysis');
const ResultadosAnalysis = require('../models/ResultadosAnalysis');
const ResultadosCultivos = require('../models/ResultadosCultivos');
const Analysis = require('../models/Analysis')
const Zone = require('../models/Zone');

async function exist(data) {
    if (!data.id_zone) {
        if( !await analysis(data.id_analysis)){
            return { status: 400, error: 'No se a registrado ese analisis' };
        }
        if (await analysisValidate(data.id_analysis)) {
            return { status: 400, error: 'Ya están los resultados de su análisis general' };
        }
        if (await resultValidate(data.id_analysis)) {
            return { status: 400, error: 'Ya están los resultados de su análisis general' };
        } else {
            console.log("Se continuará con el análisis");
        }
    } else {
        if(!await zones(data)){
            return { status: 400, error: 'No se a registrado esa zona' };
        }
        if (await dataValidate(data)) {
            return { status: 400, error: 'Ya están los resultados de su análisis' };
        }
        if (await cultivosValidate(data)) {
            return { status: 400, error: 'Ya están los resultados de su análisis' };
        } else {
            console.log("Se continuará con el análisis");
        }
    }

    return false;
}

async function dataValidate(data) {
    try {
        const existingRecords = await Data.findAll({
            where: {
                id_analysis: data.id_analysis,
                id_zone:data.id_zone
            }
        });
        return existingRecords.length > 0;
    } catch (error) {
        console.error('Error al verificar duplicados en Data:', error);
        throw error;
    }
}

async function analysisValidate(id_analysis) {
    try {
        const existingRecords = await DataAnalysis.findAll({
            where: {
                id_analysis: id_analysis
            }
        });
        return existingRecords.length > 0;
    } catch (error) {
        console.error('Error al verificar duplicados en DataAnalysis:', error);
        throw error;
    }
}

async function resultValidate(id_analysis) {
    try {
        const existingRecords = await ResultadosAnalysis.findAll({
            where: {
                id_analysis: id_analysis
            }
        });
        return existingRecords.length > 0;
    } catch (error) {
        console.error('Error al verificar duplicados en ResultadosAnalysis:', error);
        throw error;
    }
}

async function cultivosValidate(data) {
    try {
        const existingRecords = await ResultadosCultivos.findAll({
            where: {
                id_analysis: data.id_analysis,
                id_zone: data.id_zone
            }
        });
        return existingRecords.length > 0;
    } catch (error) {
        console.error('Error al verificar duplicados en ResultadosCultivos:', error);
        throw error;
    }
}

async function analysis(id_analysis) {
    try {
        const existingRecords = await Analysis.findAll({
            where: {
                id: id_analysis
            }
        });
        return existingRecords.length > 0;
    } catch (error) {
        console.error('Error al verificar duplicados en ResultadosAnalysis:', error);
        throw error;
    }
}

async function zones(data) {
    try {
        const existingRecords = await Zone.findAll({
            where: {
                id: data.id_zone,
                id_analysis: data.id_analysis
            }
        });
        return existingRecords.length > 0;
    } catch (error) {
        console.error('Error al verificar duplicados en ResultadosCultivos:', error);
        throw error;
    }
}


module.exports = exist;