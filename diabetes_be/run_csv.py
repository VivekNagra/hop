import pandas as pd
import psycopg2

# Load CSV into DataFrame
csv_file = 'data.csv'
df = pd.read_csv(csv_file)

# Database connection
conn = psycopg2.connect(
    host="127.0.0.1",
    database="diabetes",
    user="postgres",
    password="postgres"
)

# Create a cursor object
cur = conn.cursor()

for _, row in df.iterrows():
    cur.execute(
        """
        INSERT INTO patient_patient (name, age, gender, glucose, blood_pressure, skin_thickness, insulin, bmi, created, risk_factor)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            row['name'],
            row['age'],
            row['gender'],
            row['glucose'],
            row['blood_pressure'],
            row['skin_thickness'],
            row['insulin'],
            row['bmi'],
            row['created'],
            row['risk_factor']
        )
    )

# Commit the transaction and close the connection
conn.commit()
cur.close()
conn.close()