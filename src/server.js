const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const zoneRoutes = require('./routes/zoneRoutes');
const readingRoutes = require('./routes/readingRoutes');
const resultRoutes = require('./routes/resultRoutes');
const analysisReadingRoutes = require('./routes/analysisReadingRoutes');
const analysisResultRoutes = require('./routes/analysisResultRoutes');

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/analysis', analysisRoutes);
app.use('/zones', zoneRoutes);
app.use('/readings', readingRoutes);
app.use('/results', resultRoutes);
app.use('/analysis-readings', analysisReadingRoutes);
app.use('/analysis-results', analysisResultRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

