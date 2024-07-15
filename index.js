const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const zoneRoutes = require('./routes/zoneRoutes');
const readingRoutes = require('./routes/readingRoutes');
const resultRoutes = require('./routes/resultRoutes');
const analysisReadingRoutes = require('./routes/analysisReadingRoutes');
const analysisResultRoutes = require('./routes/analysisResultRoutes');
const mqttService = require('./services/mqttService');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
});

app.use('/api/', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/analyses', analysisRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/analysis-readings', analysisReadingRoutes);
app.use('/api/analysis-results', analysisResultRoutes);

mqttService.receiveMessage('some/topic', (topic, message) => {
  console.log(`Received message: ${message} from topic: ${topic}`);
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
