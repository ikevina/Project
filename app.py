import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

# Allow us to declare column types
from sqlalchemy import Column, Integer, String, Float

# Import Flask
from flask import Flask, jsonify

# PyMySQL 
import pymysql
pymysql.install_as_MySQLdb()

#################################################
# Database Setup
#################################################

# Create engine
engine1 = create_engine("mysql://root:password@localhost/fires")

# Query the db to Pandas
data1 = pd.read_sql_query("SELECT * FROM fires", con = engine1)

# Test Pandas_df
print(data1.head())

# Dataframe to JSON
data_all1 = data1.to_json(orient='records')
data_causes1 = data1["STAT_CAUSE_DESCR"].to_json(orient='columns')

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/all<br/>"
        f"/api/v1.0/causes<br/>"
    )
@app.route("/api/v1.0/all")
def names1():
    return (data_all1)

@app.route("/api/v1.0/causes")
def names():
    return (data_causes1)
    
if __name__ == '__main__':
    app.run(debug=True)