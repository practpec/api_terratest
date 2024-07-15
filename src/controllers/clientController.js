const Analysis = require('../models/Analysis');
const Client = require('../models/Client');

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Client.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Client not found' });
    const updatedClient = await Client.findByPk(id);
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysesByClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    const analyses = await Analysis.findAll({
      where: { id_client: id },
      attributes: { exclude: ['created_at'] },
      include: [],
    });

    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};