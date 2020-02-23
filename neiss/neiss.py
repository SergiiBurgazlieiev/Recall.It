'''
import requests
import json

headers = {
    'Accept': 'application.json',
    'Accept': 'application.json',
}

response = requests.get("https://api.cpsc.gov/opendataApi/neissdata/list?startDate=2010-02-02", headers)
print(response)
'''

from pymongo import MongoClient
import json
from excel2json import convert_from_file
import pandas as pd

Client = MongoClient("mongodb+srv://" 
                    + "kidsindanger"
                    + ":" 
                    + "kfxOeafCKdKlpYos" 
                    + "@cluster0-3kdhe.mongodb.net/test?retryWrites=true&w=majority")

db = Client["recallit"]
neiss = db["neiss_extracts"]

df = pd.read_excel("neiss2016.xlsx")
dicted = df.to_dict('records')
neiss.insert_many(dicted)