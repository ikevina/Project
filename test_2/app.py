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


app = Flask(__name__)


#################################################
# Database Setup
#################################################

# Create engine
engine1 = create_engine("mysql://root:Adwoa@362017@localhost/fires")

# Query the db to Pandas
fires = pd.read_sql_query("SELECT * FROM fires", con = engine1)

# Test Pandas_df
# print(fires.head())

# Dataframe to JSON
# data_all1 = data1.to_json(orient='records')
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Samples_Metadata = Base.classes.FIRE_NAME_fires
Samples = Base.classes.samples


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/names")
def names():
    """Return a list of FIRE_NAME names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (FIRE_NAME names)
    return jsonify(list(df.columns)[2:])


@app.route("/fires/<FIRE_NAME>")
def FIRE_NAME_fires(FIRE_NAME):
    """Return the MetaData for a given FIRE_NAME."""
    sel = [
        Samples_Metadata.FIRE_NAME,
        Samples_Metadata.FIRE_YEAR,
        Samples_Metadata.STAT_CAUSE_DESCR,
        Samples_Metadata.FIRE_SIZE_CLASS,
        Samples_Metadata.LATITUDE,
        Samples_Metadata.LONGITUDE,
        Samples_Metadata.STATE,
    ]

    results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

    # Create a dictionary entry for each row of metadata information
    FIRE_NAME_fires = {}
    for result in results:
        FIRE_NAME_fires["FIRE_NAME"] = result[0]
        FIRE_NAME_fires["FIRE_YEAR"] = result[1]
        FIRE_NAME_fires["STAT_CAUSE_DESCR"] = result[2]
        FIRE_NAME_fires["FIRE_SIZE_CLASS"] = result[3]
        FIRE_NAME_fires["LATITUDE"] = result[4]
        FIRE_NAME_fires["LONGITUDE"] = result[5]
        FIRE_NAME_fires["STATE"] = result[6]

    print(FIRE_NAME_fires)
    return jsonify(FIRE_NAME_fires)


@app.route("/samples/<FIRE_NAME>")
def samples(FIRE_NAME):
    """Return `FIRE_YEAR_ids`, `FIRE_YEAR_labels`,and `FIRE_NAME_values`."""
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    FIRE_NAME_data = df.loc[df[FIRE_NAME] > 1, ["FIRE_YEAR_id", "FIRE_YEAR_label", FIRE_NAME]]
    # Format the data to send as json
    data = {
        "FIRE_YEAR_ids": FIRE_NAME_fires.FIRE_YEAR_id.values.tolist(),
        "FIRE_NAME_values": FIRE_NAME_fires[FIRE_NAME].values.tolist(),
        "FIRE_YEAR_labels": FIRE_NAME_fires_FIRE_YEARlabel.tolist(),
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run()
