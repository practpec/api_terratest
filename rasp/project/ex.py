import sqlite3
import re
import sys

if len(sys.argv)<3:
    print("usage: python ex.py <id_zone>")
    sys.exit(1)
id_analysis = sys.argv[1]
id_zone = sys.argv[2]
print(id_analysis, id_zone)
cultivos = {
    "CafÃ©": {
        "Humedad": (0, 90),
        "Temperatura": (18, 30),
        "Conductividad (EC)": (0, 2000),
        "pH": (6.0, 8),
        "NitrÃ³geno": (0, 200),
        "FÃ³sforo": (30, 60),
        "Potasio": (0, 300)
    },
    "Cacao": {
        "Humedad": (70, 90),
        "Temperatura": (22, 30),
        "Conductividad (EC)": (200, 1500),
        "pH": (6.0, 7.0),
        "NitrÃ³geno": (50, 150),
        "FÃ³sforo": (20, 50),
        "Potasio": (100, 200)
    },
    "MaÃ­z": {
        "Humedad": (40, 60),
        "Temperatura": (18, 30),
        "Conductividad (EC)": (100, 5000),
        "pH": (5.5, 7.0),
        "NitrÃ³geno": (30, 150),
        "FÃ³sforo": (30, 60),
        "Potasio": (100, 300)
    },
    "Mango": {
        "Humedad": (50, 80),
        "Temperatura": (24, 30),
        "Conductividad (EC)": (300, 1500),
        "pH": (5.5, 7.5),
        "NitrÃ³geno": (20, 100),
        "FÃ³sforo": (10, 40),
        "Potasio": (100, 250)
    },
    "CaÃ±a": {
        "Humedad": (70, 90),
        "Temperatura": (20, 30),
        "Conductividad (EC)": (100, 2000),
        "pH": (6.0, 7.5),
        "NitrÃ³geno": (50, 200),
        "FÃ³sforo": (20, 60),
        "Potasio": (100, 300)
    },
    "PlÃ¡tano": {
        "Humedad": (60, 90),
        "Temperatura": (24, 30),
        "Conductividad (EC)": (500, 2000),
        "pH": (5.5, 7.0),
        "NitrÃ³geno": (50, 150),
        "FÃ³sforo": (20, 60),
        "Potasio": (200, 400)
    },
    "Frijol": {
        "Humedad": (60, 70),
        "Temperatura": (20, 30),
        "Conductividad (EC)": (100, 5000),
        "pH": (6.0, 7.5),
        "NitrÃ³geno": (20, 60),
        "FÃ³sforo": (50, 150),
        "Potasio": (100, 200)
    },
    "Cacahuate": {
        "Humedad": (50, 70),
        "Temperatura": (21, 30),
        "Conductividad (EC)": (100, 5000),
        "pH": (5.8, 6.5),
        "NitrÃ³geno": (20, 50),
        "FÃ³sforo": (50, 150),
        "Potasio": (150, 300)
    },
    "Calabaza": {
        "Humedad": (60, 80),
        "Temperatura": (20, 25),
        "Conductividad (EC)": (100, 2500),
        "pH": (6.0, 7.0),
        "NitrÃ³geno": (30, 80),
        "FÃ³sforo": (50, 150),
        "Potasio": (100, 200)
    },
    "Cebolla": {
        "Humedad": (50, 70),
        "Temperatura": (12, 24),
        "Conductividad (EC)": (100, 5000),
        "pH": (6.0, 7.0),
        "NitrÃ³geno": (30, 80),
        "FÃ³sforo": (50, 150),
        "Potasio": (100, 200)
    },
    "Aguacate": {
        "Humedad": (60, 80),
        "Temperatura": (16, 26),
        "Conductividad (EC)": (500, 1500),
        "pH": (5.5, 7.0),
        "NitrÃ³geno": (50, 150),
        "FÃ³sforo": (20, 60),
        "Potasio": (100, 300)
    }
}

def extract_number(value):
    value_str = str(value)
    match = re.search(r'[\d.]+', value_str)
    if match:
        return float(match.group())
    return 0.0

def calcular_promedios(datos):
    return {clave: sum(valores) / len(valores) if valores else 0 for clave, valores in datos.items()}

def cultivos_aptos(promedios):
    resultados = {}
    total_parametros = 0
    total_parametros_cumplidos = 0
    parametros_por_cultivo = {}
    parametros_ignorados = ["Temperatura", "Humedad"]

    for cultivo, requisitos in cultivos.items():
        detalles = {}
        parametros_en_rango = 0
        for parametro, rango in requisitos.items():
            if parametro in parametros_ignorados:
                continue
            total_parametros += 1
            valor_actual = promedios[parametro]
            if not (rango[0] <= valor_actual <= rango[1]):
                detalles[parametro] = {
                    "valor_actual": valor_actual,
                    "rango_requerido": rango
                }
            else:
                parametros_en_rango += 1
        total_parametros_cumplidos += parametros_en_rango
        resultados[cultivo] = detalles
        parametros_por_cultivo[cultivo] = parametros_en_rango

    porcentajes = {}
    for cultivo, detalles in resultados.items():
        if detalles:
            porcentajes[cultivo] = 0
        else:
            porcentajes[cultivo] = (parametros_por_cultivo[cultivo] / total_parametros) * 100 if total_parametros > 0 else 0

    cultivos_no_aptos = sum(1 for detalles in resultados.values() if detalles)
    porcentaje_no_aptos = (cultivos_no_aptos / len(cultivos)) * 100

    return resultados, porcentajes, porcentaje_no_aptos

# con el promedio del pH 
def determinar_tipo_suelo(promedio_ph):
    if promedio_ph < 7:
        return "Ãcido", "Dificultad de desarrollo de la mayorÃ­a de los cultivos, a su vez hay dificultad de retenciÃ³n de muchos nutrientes."
    elif promedio_ph == 7:
        return "Neutro", "Ã“ptimo para los cultivos."
    else:
        return "BÃ¡sico", "Dificultad de desarrollo de la mayorÃ­a de los cultivos, posible apariciÃ³n de clorosis fÃ©rrica."

# probabilidad de que el suelo sea neutro
def calcular_probabilidad_neutro(valores_ph):
    if not valores_ph:
        return 0.0
    total = len(valores_ph)
    neutro_count = sum(1 for ph in valores_ph if 6.9 <= ph <= 7.1)
    probabilidad_neutro = (neutro_count / total) * 100
    return probabilidad_neutro

conn = sqlite3.connect('readings.db')
cursor = conn.cursor()

datos = {
    "Humedad": [],
    "Temperatura": [],
    "Conductividad (EC)": [],
    "pH": [],
    "NitrÃ³geno": [],
    "FÃ³sforo": [],
    "Potasio": []
}


cursor.execute('SELECT humidity, temperature, conductivity, pH, nitrogen, phosphorus, potassium FROM readings where id_analysis = ? AND id_zone = ?', (id_analysis, id_zone,))
rows = cursor.fetchall()
for row in rows:
    humidity, temperature, conductivity, ph, nitrogen, phosphorus, potassium = row
    datos["Humedad"].append(extract_number(humidity))
    datos["Temperatura"].append(extract_number(temperature))
    datos["Conductividad (EC)"].append(extract_number(conductivity))
    datos["pH"].append(extract_number(ph))
    datos["NitrÃ³geno"].append(extract_number(nitrogen))
    datos["FÃ³sforo"].append(extract_number(phosphorus))
    datos["Potasio"].append(extract_number(potassium))
conn.commit()


promedios = calcular_promedios(datos)

print("\nPromedios de las lecturas de sensores:")
for parametro, valor in promedios.items():
    print(f"{parametro}: {valor:.2f}")

cursor.execute('''
    INSERT INTO data (id_analysis, id_zone, humidity, temperature, conductivity, pH, nitrogen, phosphorus, potassium)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
''', (
    id_analysis,
    id_zone,
    promedios["Humedad"],
    promedios["Temperatura"],
    promedios["Conductividad (EC)"],
    promedios["pH"],
    promedios["NitrÃ³geno"],
    promedios["FÃ³sforo"],
    promedios["Potasio"]
))

# Commit the transaction
conn.commit()
probabilidad_neutro = calcular_probabilidad_neutro(datos["pH"])
print(f"\nLa probabilidad de que el suelo sea neutro es: {probabilidad_neutro:.2f}%")

# Determinar tipo de suelo con el promedio del pH 
promedio_ph = promedios["pH"]
tipo_suelo, mensaje_suelo = determinar_tipo_suelo(promedio_ph)
print(f"\nEl tipo de suelo es {tipo_suelo}: {mensaje_suelo}")

# para determinar cultivos aptos y no aptos
resultados, porcentajes, porcentaje_no_aptos = cultivos_aptos(promedios)

print("\nResultados de cultivos:")
ningun_apto = True

parametros_ignorados = ["Temperatura", "Humedad"]

for cultivo, detalles in resultados.items():
    detalles_str = "\n".join([f"{parametro}: valor actual {info['valor_actual']:.2f}, rango requerido {info['rango_requerido']}" for parametro, info in detalles.items()])

    # Agregar los valores de Temperatura y Humedad al string de detalles
    for parametro in parametros_ignorados:
        rango = cultivos[cultivo][parametro]
        valor_actual = promedios[parametro]
        detalles_str += f"\n{parametro}: valor actual {valor_actual:.2f}, rango requerido {rango}"

    if detalles:
        print(f"\n{cultivo} podra ser apto, pero necesita ajustes en los siguientes parametros:")
        print(detalles_str)
        cursor.execute('INSERT INTO resultados_cultivos (id_analysis, id_zone, cultivo, apto, detalles, porcentaje) VALUES (?, ?, ?, ?, ?, ?)', 
                       (id_analysis, id_zone, cultivo, False, detalles_str, porcentajes[cultivo]))
    else:
        print(f"\n{cultivo} es apto para plantar con un porcentaje de {porcentajes[cultivo]:.2f}%.")
        detalles_str = "Apto"
        cursor.execute('INSERT INTO resultados_cultivos (id_analysis, id_zone, cultivo, apto, detalles, porcentaje) VALUES (?, ?, ?, ?, ?, ?)', 
                       (id_analysis, id_zone, cultivo, True, detalles_str, porcentajes[cultivo]))
        ningun_apto = False

print(f"\nPorcentaje de cultivos no aptos para plantar: {porcentaje_no_aptos:.2f}%.")
cursor.execute('INSERT INTO resultados_cultivos (id_analysis, id_zone, cultivo, apto, detalles, porcentaje) VALUES (?, ?, ?, ?, ?, ?)', 
               (id_analysis, id_zone, 'General', False, 'Porcentaje de cultivos no aptos', porcentaje_no_aptos))

cursor.execute('INSERT INTO resultados_cultivos (id_analysis, id_zone, cultivo, apto, detalles, porcentaje) VALUES (?, ?, ?, ?, ?, ?)', 
               (id_analysis, id_zone, tipo_suelo, False, mensaje_suelo, promedio_ph))

cursor.execute('INSERT INTO resultados_cultivos (id_analysis, id_zone, cultivo, apto, detalles, porcentaje) VALUES (?, ?, ?, ?, ?, ?)', 
               (id_analysis, id_zone, 'Probabilidad de Suelo Neutro', False, 'Probabilidad de que el suelo sea neutro', probabilidad_neutro))

if ningun_apto:
    print("\nNo hay cultivos aptos para plantar con las condiciones actuales.")

conn.commit()

