// const mqtt = require('mqtt');
// const amqplib = require('amqplib');
// const procesar = require('../helpers/processMessage')
// const { exec } = require('child_process');

// const options = {
//     protocol : 'mqtt',
//     port: 1883,
//     username: 'guest',
//     password: 'guest',
// }
// const mqttClient = mqtt.connect('mqtt://44.223.219.42', options);


// mqttClient.on('connect', function () {
//     console.log('Conectado al servidor MQTT');
//     mqttClient.subscribe('node_a_rasp', (err) => {
//         if (err) console.error('Error al suscribirse:', err);
//     });

//     mqttClient.subscribe('rasp', (err) => {
//         if (err) console.error('Error al suscribirse:', err);
//     });
// });

// mqttClient.on('error', function (err) {
//     console.error('Error en el cliente MQTT:', err);
// });

// mqttClient.on('message', function (topic, message) {
//     console.log('Mensaje recibido:', topic, message.toString());

//     if (topic === 'ejecutar-script.mqtt') {
//         try {
//             const data = JSON.parse(message.toString());
//             const command = data.command;
//             const idZone = data.id_zone;

//             if (command === 'ejecutar_comandos.sh') {
//                 exec(`./${command} ${idZone}`, (error, stdout, stderr) => {
//                     if (error) {
//                         console.error('Error al ejecutar el script:', error);
//                         mqttClient.publish('respuesta-script', 'Error al ejecutar el script');
//                         return;
//                     }
//                     console.log('Script ejecutado correctamente:', stdout);
//                     mqttClient.publish('respuesta-script', 'Script ejecutado correctamente');
//                 });
//             } else {
//                 console.error('Comando no reconocido:', command);
//                 mqttClient.publish('respuesta-script', 'Comando no reconocido');
//             }
//         } catch (error) {
//             console.error('Error al parsear el mensaje JSON:', error);
//             mqttClient.publish('respuesta-script', 'Error al procesar el mensaje');
//         }
//     }
// });


// (async () => {
//     const queue = 'amqp';
//     const conn = await amqplib.connect('amqp://44.223.219.42');
//       console.log("Conexion exitosa");
//     const ch1 = await conn.createChannel();
//     await ch1.assertQueue(queue);
  
//     // Listener
//     ch1.consume(queue, (msg) => {
//       if (msg !== null) {
//         console.log('Tienes un mensaje turururtururu :)');
//         procesar(msg)
//         ch1.ack(msg);
//       } else {
//         console.log('Consumer cancelled by server');
//       }
//     });
//   })(); 

// module.exports = mqttClient;
