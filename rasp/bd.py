import sqlite3

# Conecta o crea la base de datos readings.db
conn = sqlite3.connect('readings.db')
cursor = conn.cursor()

# Crea la tabla readings
cursor.execute('''
    CREATE TABLE IF NOT EXISTS readings (
        id_analysis INTEGER,
        id_zone INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        humidity REAL,
        temperature REAL,
        conductivity REAL,
        ph REAL,
        nitrogen REAL,
        phosphorus REAL,
        potassium REAL
    )
''')

# Crea la tabla data
cursor.execute('''
    CREATE TABLE IF NOT EXISTS data (
        id_analysis INTEGER,
        id_zone INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        humidity REAL,
        temperature REAL,
        conductivity REAL,
        pH REAL,
        nitrogen REAL,
        phosphorus REAL,
        potassium REAL
    )
''')

# Crea la tabla data_analysis
cursor.execute('''
    CREATE TABLE IF NOT EXISTS data_analysis (
        id_analysis INTEGER PRIMARY KEY,
        humidity REAL,
        temperature REAL,
        conductivity REAL,
        pH REAL,
        nitrogen REAL,
        phosphorus REAL,
        potassium REAL
    )
''')

# Crea la tabla resultados_analysis
cursor.execute('''
    CREATE TABLE IF NOT EXISTS resultados_analysis (
        id_analysis INTEGER,
        cultivo TEXT,
        apto BOOLEAN,
        detalles TEXT,
        porcentaje REAL
    )
''')

# Confirma la creación de tablas
conn.commit()
print("Tablas creadas exitosamente en readings.db")

# Cierra la conexión
conn.close()
