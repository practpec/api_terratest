const Analysis = require('../models/Analysis');

exports.createAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.create(req.body);
    res.status(201).json(analysis);
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
  try {
    const { id } = req.params;
    const analysis = await Analysis.findByPk(id);
    if (!analysis) return res.status(404).json({ error: 'Analysis not found' });
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Analysis.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Analysis not found' });
    const updatedAnalysis = await Analysis.findByPk(id);
    res.json(updatedAnalysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Analysis.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Analysis not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
