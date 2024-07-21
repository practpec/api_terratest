# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import subprocess
import json
import time
import sqlite3
import threading

MQTT_BROKER = 'url'
MQTT_PORT = 1883
MQTT_USERNAME = 'user'
MQTT_PASSWORD = 'rasp'
TOPICS = ['dos', 'uno']

def on_connect(client, userdata, flags, rc):
    print(f"Conectado al servidor MQTT con resultado: {rc}")
    client.subscribe('uno')

def on_message(client, userdata, msg):
    try:
        topic = msg.topic
        message = msg.payload.decode('utf-8')
        print(f"Mensaje recibido en el tema {topic}: {message}")

        # Procesar el mensaje recibido
        data = json.loads(message)
        command = data['command']
        id_analysis = data['id_analysis']
        id_zone = data['id_zone']
        print(id_analysis, id_zone)

        if command == 'ejecutar_comandos.sh':
              threading.Thread(target=execute_script, args=('./ejecutar_comandos.sh', str(id_analysis), str(id_zone))).start()
        elif command == 'ejecutar_general.sh':
              threading.Thread(target=execute_script, args=('./ejecutar_general.sh', str(id_analysis))).start()
        else:
            print("Comando no reconocido:", command)
            publish_message("dos", "Comando no reconocido.")
            
    except Exception as e:
        print("rasp_uno", f"Error al procesar el mensaje MQTT: {e}")

def execute_script(script_name, *args):
    result = subprocess.run([script_name] + list(args), capture_output=True, text=True)
    print("Resultado del script ejecutado:", result.stdout)
    if script_name == './ejecutar_comandos.sh':
        publish_message("dos", data_zone(*args))
    else:
        publish_message("dos", data_analysis(args[0]))
        

def data_zone(id_analysis, id_zone):
    db_path = './project/readings.db'
    print(f"Conectando a la base de datos en: {db_path}")
    print(f"ParÃ¡metros de consulta: id_zone = {id_zone}, id_analysis = {id_analysis}")
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("Ejecutando consulta en la tabla 'data'")
        cursor.execute("SELECT * FROM data WHERE id_zone = ? AND id_analysis = ?", (id_zone, id_analysis,))
        data_rows = cursor.fetchall()
        
        print("Ejecutando consulta en la tabla 'resultados_cultivos'")
        cursor.execute("SELECT * FROM resultados_cultivos WHERE id_zone = ? AND id_analysis = ?", (id_zone, id_analysis,))
        promedio_rows = cursor.fetchall()
        
        result = {
            'data': data_rows,
            'resultados_cultivos': promedio_rows
        }
        
        print("Se consulto la base de datos por  zona")
        conn.close()
        return json.dumps(result, ensure_ascii=False)

    except Exception as e:
        print(f"Error al consultar la base de datos: {e}")
        return 'error'
           
def data_analysis(id_analysis):
    db_path = './project/readings.db'
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM data_analysis WHERE id_analysis = ?", (id_analysis,))
        data_rows = cursor.fetchall()
        cursor.execute("SELECT * FROM resultados_analysis WHERE id_analysis = ?", (id_analysis,))
        promedio_rows = cursor.fetchall()
        result = {
            'data_analysis': data_rows,
            'resultados_analysis': promedio_rows
        }
        print("Se consulto la base de datos Generales")
        conn.close()
        return json.dumps(result, ensure_ascii=False)

    except Exception as e:
        print(f"Error al consultar la base de datos: {e}")
        return 'error'
  

def on_disconnect(client, userdata, rc):
    if rc != 0:
        print("Desconectado inesperadamente. Intentando reconectar...")
        reconnect()

def reconnect():
    while True:
        try:
            client.reconnect()
            break
        except Exception as e:
            print(f"Error al intentar reconectar: {e}")
            time.sleep(5)
            
def publish_message(topic, message):
    
    try:
        client.publish(topic, message)
        print("Mensaje publicado")
    except Exception as e:
        print(f"Error al publicar el mensaje: {e}")

client = mqtt.Client(protocol=mqtt.MQTTv311) 
client.username_pw_set(username=MQTT_USERNAME, password=MQTT_PASSWORD)
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

try:
    client.connect(MQTT_BROKER, MQTT_PORT, keepalive=60)
except Exception as e:
    print(f"Error al conectar al broker: {e}")
    reconnect()

try:
    client.loop_forever()
except KeyboardInterrupt:
    print("Interrupcion por teclado recibida. Cerrando el cliente MQTT.")
    client.disconnect()
