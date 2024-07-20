const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./src/config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const userRoutes = require('./src/routes/userRoutes');
const clientRoutes = require('./src/routes/clientRoutes');
const analysisRoutes = require('./src/routes/analysisRoutes');
const zoneRoutes = require('./src/routes/zoneRoutes');
const mqttRoutes = require('./src/routes/mqttRoutes');
const resultsRoutes = require('./src/routes/resultsRoutes');

app.use('/users', userRoutes);//ya
app.use('/clients', clientRoutes);//ya
app.use('/analysis', analysisRoutes);//ya
app.use('/zones', zoneRoutes);//ya
app.use('/mqtt', mqttRoutes);//ya
app.use('/results', resultsRoutes);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


