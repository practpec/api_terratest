// mqttClient.js
const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_URL);
const topicUno = 'node_a_rasp'; // Tópico al que te suscribes

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  client.subscribe(topicUno, { qos: 1 }, (err) => {
    if (err) {
      console.error('Error subscribing to topic', err);
    } else {
      console.log(`Subscribed to topic: ${topicUno}`);
    }
  });
});

const sendMessage = (topic, message) => {
  client.publish(topic, message, { qos: 1 }, (err) => {
    if (err) {
      console.error('Error publishing message', err);
    } else {
      console.log(`Message published to topic: ${topic}`);
    }
  });
};

const receiveMessage = (callback) => {
  client.on('message', (receivedTopic, message) => {
    if (receivedTopic === topicUno) {
      callback(receivedTopic, message.toString());
    }
  });
};

module.exports = {
  sendMessage,
  receiveMessage,
};
