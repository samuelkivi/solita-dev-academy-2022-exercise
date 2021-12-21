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

#mycursor.execute("SELECT * FROM farms WHERE location ='PartialTech Research Farm'")
#myresult = mycursor.fetchall()
#print(myresult)

#sql = "INSERT INTO farms VALUES (%s, %s,%s,%s)"
#val = ("test_location2", "test_time2","test_sensor2","4321")
#mycursor.execute(sql, val)
#solitadb.commit()
#print(mycursor.rowcount, "record inserted.")

#df_partialtech = pd.read_csv('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/PartialTech.csv')
#df_metsola = pd.read_csv('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/friman_metsola.csv')
#df_noora = pd.read_csv('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/Nooras_farm.csv')
#df_ossi = pd.read_csv('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/ossi_farm.csv')

#frames = [df_metsola, df_noora, df_partialtech,df_ossi]
#df = pd.concat(frames)
#df.shape


def drop_nulls(dataframe):
    #print(dataframe.isnull().any())
    dataframe = dataframe[pd.notnull(dataframe['value'])]
    #print(dataframe.isnull().any())
    return dataframe

def insert(url):
    df = pd.read_csv(url)
    df = drop_nulls(df)
    df_list = df.values.tolist()
    sql = "INSERT INTO farms VALUES (%s, %s, %s, %s)"
    mycursor.executemany(sql, df_list)
    solitadb.commit()
    print(mycursor.rowcount, "was inserted.")
    
#insert('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/friman_metsola.csv')
#insert('https://raw.githubusercontent.com/solita/dev-academy-2022-exercise/main/PartialTech.csv')
#drop_nulls(df_metsola)