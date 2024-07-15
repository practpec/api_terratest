const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_URL);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

const sendMessage = (topic, message) => {
  client.publish(topic, message, { qos: 1 }, (err) => {
    if (err) {
      console.error('Error publishing message', err);
    }
  });
};

const receiveMessage = (topic, callback) => {
  client.subscribe(topic, { qos: 1 }, (err) => {
    if (err) {
      console.error('Error subscribing to topic', err);
    }
  });

  client.on('message', (topic, message) => {
    callback(topic, message.toString());
  });
};

module.exports = {
  sendMessage,
  receiveMessage,
};
