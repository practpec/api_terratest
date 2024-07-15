const AnalysisResult = require('../models/AnalysisResult');

exports.createAnalysisResult = async (req, res) => {
  try {
    const analysisResult = await AnalysisResult.create(req.body);
    res.status(201).json(analysisResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysisResults = async (req, res) => {
  try {
    const analysisResults = await AnalysisResult.findAll();
    res.json(analysisResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysisResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const analysisResult = await AnalysisResult.findByPk(id);
    if (!analysisResult) return res.status(404).json({ error: 'Analysis Result not found' });
    res.json(analysisResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnalysisResult = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await AnalysisResult.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Analysis Result not found' });
    const updatedAnalysisResult = await AnalysisResult.findByPk(id);
    res.json(updatedAnalysisResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnalysisResult = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AnalysisResult.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Analysis Result not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
