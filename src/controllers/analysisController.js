const Analysis = require('../models/Analysis');
const Client = require('../models/Client');
const Zone = require('../models/Zone');
const { sequelize } = require('../config/database');

exports.createAnalysisWithClientAndZones = async (req, res) => {
  let id;
  const { client, zones, ...analysisData } = req.body;

  try {
      const exist = await clientValidate(client.number_contact)
      console.log(exist)
      if(exist == null){
        const createdClient = await Client.create(client);
        id = createdClient.id;
      }else{
        id = exist;
      }

    const analysis = await Analysis.create({
      ...analysisData,
      id_client: id
    });

    if (zones && zones.length > 0) {
      const zonePromises = zones.map(zone => Zone.create({ ...zone, id_analysis: analysis.id }));
      await Promise.all(zonePromises);
    }

    res.status(201).json({
      message: 'Client, analysis, and zones created successfully',
      client: id,
      analysis,
      zones
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.findAll();
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysisById = async (req, res) => {
  const { id } = req.params;

  try {
    const analysis = await Analysis.findByPk(id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    const client = await Client.findByPk(analysis.id_client);
    if (!client) {
      return res.status(404).json({ error: 'Client not found for this analysis' });
    }

    const zones = await Zone.findAll({ where: { id_analysis: analysis.id } });

    const analysisWithDetails = {
      id: analysis.id,
      id_client: client.id,
      client_name: client.name,
      name: analysis.name,
      content: analysis.content,
      locate: analysis.locate,
      deleted: analysis.deleted,
      created_at: analysis.created_at,
      zones: zones
    };

    res.status(200).json(analysisWithDetails);
  } catch (error) {
    console.error('Error fetching analysis details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAnalysis = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();
  
  try {
    await Zone.destroy({ where: { id_analysis: id }, transaction: t });
    const deletedAnalysis = await Analysis.destroy({
      where: { id },
      transaction: t
    });

    if (!deletedAnalysis) {
      await t.rollback();
      return res.status(404).json({ error: 'Analysis not found' });
    }
    await t.commit();
    res.status(204).send("Analysis and associated zones deleted successfully");
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: `Error deleting analysis: ${error.message}` });
  }
};

async function clientValidate(number_contact) {
  try {
    const existingRecords = await Client.findAll({
      where: {
        number_contact: number_contact
      }
    });

    if (existingRecords.length > 0) {
      return existingRecords[0].id; 
    } else {
      return null; 
    }
  } catch (error) {
    console.error('Error al verificar duplicados del usuario', error);
    throw error;
  }
}
