const Reading = require('../models/Reading');

exports.createReading = async (req, res) => {
  try {
    const reading = await Reading.create(req.body);
    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReadings = async (req, res) => {
  try {
    const readings = await Reading.findAll();
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReadingById = async (req, res) => {
  try {
    const { id } = req.params;
    const reading = await Reading.findByPk(id);
    if (!reading) return res.status(404).json({ error: 'Reading not found' });
    res.json(reading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReading = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Reading.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Reading not found' });
    const updatedReading = await Reading.findByPk(id);
    res.json(updatedReading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReading = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reading.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Reading not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
