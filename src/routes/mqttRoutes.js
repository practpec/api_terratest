const express = require('express');
const router = express.Router();
const mqttClient = require('../utils/mqttServer'); 

router.post('/activar-script/:id', (req, res) => {
    try {
        const id_zone = req.params;
        const command = 'ejecutar_comandos.sh';

        if (!command || !id_zone) {
            return res.status(400).json({ error: 'Falta el cuerpo del mensaje' });
        }

        mqttClient.publish('ejecutar-script', JSON.stringify({ command, id_zone }));

        res.status(200).json({ message: 'Solicitud de ejecución de script enviada correctamente' });
    } catch (error) {
        console.error('Error al enviar solicitud de script MQTT:', error);
        res.status(500).json({ error: 'Ocurrió un error al enviar la solicitud de script MQTT' });
    }
});

module.exports = router;
