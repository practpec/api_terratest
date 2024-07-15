const AnalysisReading = require('../models/AnalysisReading');

exports.createAnalysisReading = async (req, res) => {
  try {
    const analysisReading = await AnalysisReading.create(req.body);
    res.status(201).json(analysisReading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysisReadings = async (req, res) => {
  try {
    const analysisReadings = await AnalysisReading.findAll();
    res.json(analysisReadings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysisReadingById = async (req, res) => {
  try {
    const { id } = req.params;
    const analysisReading = await AnalysisReading.findByPk(id);
    if (!analysisReading) return res.status(404).json({ error: 'Analysis Reading not found' });
    res.json(analysisReading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnalysisReading = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await AnalysisReading.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Analysis Reading not found' });
    const updatedAnalysisReading = await AnalysisReading.findByPk(id);
    res.json(updatedAnalysisReading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnalysisReading = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AnalysisReading.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Analysis Reading not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
