import os
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import pymysql
pymysql.install_as_MySQLdb()
import json

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# Create engine
engine1 = create_engine("mysql://root:Al00sh_2010@localhost/fires")

# Query the db to Pandas
fires = pd.read_sql_query("SELECT * FROM fires", con = engine1)


#  Test Pandas_df
print(fires.head())

#print(results)
# print(fire.heads.to_json(orient = 'records'))

# Dataframe to JSON
# data_all1 = fires.head().to_json(orient='records')
# #print data 
# print(data_all1)
# reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# Save references to each table
# Fires_Metadata = Base.classes.FIRE_NAME_fires
# Samples = Base.classes.samples


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/names")
def names():
    """Return a list of FIRE_NAME names."""
    series = fires.STATE.unique()
    results = []
    
    # Use Pandas to perform the sql query
    # stmt = db.session.query().statement
    # df = pd.read_sql_query(stmt, db.session.bind)
    for i in series:
        results.append(i)
    # Return a list of the column names (FIRE_NAME names)
    # json_names = series.to_json()
    # print(json_names)
    print("*********************************************************")
    return jsonify(results)

@app.route("/fires/<STATE>")
def STATE_fires(STATE):

    print(STATE)
    print(fires.head())

    """Return the MetaData for a given FIRE_NAME."""


    #results = db.session.query(*sel).filter(FIRE_NAME == FIRE_NAME).all()
    

    results = fires.loc[fires["STATE"] == STATE]
    print(results)


    #results = fires.iloc[0]
    # Create a dictionary entry for each row of metadata information
    # FIRE_NAME_fires = {}
    # for result in results:
    #     STATE_fires["FIRE_NAME"] = result[0]
    #     STATE_fires["FIRE_YEAR"] = result[1]
    #     STATE_fires["STAT_CAUSE_DESCR"] = result[2]
    #     STATE_fires["FIRE_SIZE_CLASS"] = result[3]
    #     STATE_fires["LATITUDE"] = result[4]
    #     STATE_fires["LONGITUDE"] = result[5]
    #     STATE_fires["STATE"] = result[6]

    return results.to_json(orient = 'records')

# @app.route("/samples/<FIRE_NAME>")
# def samples(FIRE_NAME):
#     """Return `FIRE_YEAR_ids`, `FIRE_YEAR_labels`,and `FIRE_NAME_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     FIRE_NAME_data = df.loc[df[FIRE_NAME] > 1, ["FIRE_YEAR_id", "FIRE_YEAR_label", FIRE_NAME]]
#     # Format the data to send as json
#     data = {
#         "FIRE_YEAR_ids": FIRE_NAME_fires.FIRE_YEAR_id.values.tolist(),
#         "FIRE_NAME_values": FIRE_NAME_fires[FIRE_NAME].values.tolist(),
#         "FIRE_YEAR_labels": FIRE_NAME_fires_FIRE_YEARlabel.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()
