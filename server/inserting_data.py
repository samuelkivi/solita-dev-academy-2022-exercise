import pandas as pd
import mysql.connector

pd.options.display.max_rows = 9999

solitadb = mysql.connector.connect(
  host="localhost",
  user="SECRET",
  password="SECRET",
  database="solita"
)

mycursor = solitadb.cursor()


df_partialtech = pd.read_csv('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/PartialTech.csv')
df_metsola = pd.read_csv('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/friman_metsola.csv')
df_noora = pd.read_csv('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/Nooras_farm.csv')
df_ossi = pd.read_csv('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/ossi_farm.csv')


def drop_nulls(dataframe):
    #print(dataframe.isnull().any())
    dataframe = dataframe[pd.notnull(dataframe['value'])]
    #print(dataframe.isnull().any())
    return dataframe

    
def validate_values(df, sensor, lower_limit, upper_limit):
    df = df.loc[df['sensorType'] == sensor]
    df = df[(df['value'] >= lower_limit) & (df['value'] <= upper_limit)]
    return df
    

#Drops nulls and checks the validation rules
#Inserts dataframe into database
def validate_and_insert(df):
    #print(df.isnull().any())
    df = drop_nulls(df)
    #print(df.isnull().any())
    df_pH = validate_values(df, "pH", 0 ,14)
    insert_df(df_pH)
    df_temperature = validate_values(df, "temperature", -50 ,100)
    insert_df(df_temperature)
    df_rainFall = validate_values(df, "rainFall", 0 ,500)
    insert_df(df_rainFall)
    
    
#Inserts dataframe into database
def insert_df(df):
    df_list = df.values.tolist()
    sql = "INSERT INTO farms VALUES (%s, %s, %s, %s)"
    mycursor.executemany(sql, df_list)
    solitadb.commit()
    print(mycursor.rowcount, "was inserted.")
    
    
validate_and_insert(df_partialtech)
validate_and_insert(df_metsola)
validate_and_insert(df_noora)
validate_and_insert(df_ossi)