
const mqttClient = require('../utils/mqttServer');

exports.activarScript = (req, res) => {
    try {
        const id_analysis = req.body.id_analysis;
        const id_zone = req.body.id_zone || 0;

        if (!id_analysis) {
            return res.status(400).json({ error: 'Falta el cuerpo del mensaje' });
        }

        const command = id_zone ? 'ejecutar_comandos.sh' : 'ejecutar_general.sh';

        mqttClient.publish('node_a_rasp', JSON.stringify({ command, id_zone, id_analysis }));

        res.status(200).json({ message: 'Solicitud de ejecución de script enviada correctamente' });

    } catch (error) {
        console.error('Error al enviar solicitud de script MQTT:', error);
        res.status(500).json({ error: 'Ocurrió un error al enviar la solicitud de script MQTT' });
    }
};
