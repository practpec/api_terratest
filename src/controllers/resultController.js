const Result = require('../models/Result');

exports.createResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Result.findAll();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Result.findByPk(id);
    if (!result) return res.status(404).json({ error: 'Result not found' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Result.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Result not found' });
    const updatedResult = await Result.findByPk(id);
    res.json(updatedResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Result.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Result not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
