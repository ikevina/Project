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
engine1 = create_engine("mysql://root:password@localhost/fires")

# Query the db to Pandas
fires = pd.read_sql_query("SELECT * FROM fires", con = engine1)

#################################################
#  App Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/names")
def names():
    """Return a list of FIRE_NAME names."""
    series = fires.STATE.unique()
    results = []
    for i in series:
        results.append(i)
    print("*********************************************************")
    return jsonify(results)


@app.route("/fires/<STATE>")
def STATE_fires(STATE):

    """Return the MetaData for a given FIRE_NAME."""   
    results = fires.loc[fires["STATE"] == STATE]
    print(results)
    return results.to_json(orient = 'records')

if __name__ == "__main__":
    app.run()
