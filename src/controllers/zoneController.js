const Zone = require('../models/Zone');

exports.createZone = async (req, res) => {
  try {
    const zone = await Zone.create(req.body);
    res.status(201).json(zone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getZones = async (req, res) => {
  try {
    const zones = await Zone.findAll();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getZoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const zone = await Zone.findByPk(id);
    if (!zone) return res.status(404).json({ error: 'Zone not found' });
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateZone = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Zone.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Zone not found' });
    const updatedZone = await Zone.findByPk(id);
    res.json(updatedZone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteZone = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Zone.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Zone not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
