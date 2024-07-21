import minimalmodbus
import serial
import sqlite3
import time
import sys


instrument = minimalmodbus.Instrument('/dev/ttyUSB0', 1) 
instrument.serial.baudrate = 4800 
instrument.serial.bytesize = 8
instrument.serial.parity = serial.PARITY_NONE
instrument.serial.stopbits = 1
instrument.serial.timeout = 0.5

if len(sys.argv)<3:
    print("usage: python lectura.py <id_zone>")
    sys.exit(1)
id_analysis = sys.argv[1]
id_zone=sys.argv[2]
print(id_analysis, id_zone)

conn = sqlite3.connect('readings.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS readings (
             id_analysis INTEGER,
             id_zone INTEGER,
             timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
             humidity REAL,
             temperature REAL,
             conductivity REAL,
             ph REAL,
             nitrogen REAL,
             phosphorus REAL,
             potassium REAL)''')
conn.commit()

def read_sensor_data():
    try:
        start_address = 0
        num_registers = 7
        
        data = instrument.read_registers(start_address, num_registers, functioncode=3)

        humidity = data[0] * 0.1  # %RH
        temperature = data[1] * 0.1  # Â°C
        conductivity = data[2]  # ÂµS/cm
        ph = data[3] * 0.1  # pH
        nitrogen = data[4]  # mg/kg
        phosphorus = data[5]  # mg/kg
        potassium = data[6]  # mg/kg

        print(f"Humedad: {humidity} %RH")
        print(f"Temperatura: {temperature} Â°C")
        print(f"Conductividad: {conductivity} ÂµS/cm")
        print(f"pH: {ph}")
        print(f"NitrÃ³geno: {nitrogen} mg/kg")
        print(f"FÃ³sforo: {phosphorus} mg/kg")
        print(f"Potasio: {potassium} mg/kg")

        
        c.execute('''INSERT INTO readings (id_analysis, id_zone, timestamp, humidity, temperature, conductivity, ph, nitrogen, phosphorus, potassium) 
             VALUES (?, ?, datetime('now'), ?, ?, ?, ?, ?, ?, ?)''',
             (id_analysis, id_zone, humidity, temperature, conductivity, ph, nitrogen, phosphorus, potassium))

        conn.commit()

    except Exception as e:
        print(f"Error de lectura: {str(e)}")

start_time = time.time()
while time.time() - start_time < 180:  
    read_sensor_data()
    time.sleep(15)  

conn.close()

