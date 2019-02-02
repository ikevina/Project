from flask import Flask, render_template, request, jsonify
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import sqlite3 as sql

#################################################

# Database Setup

#################################################

engine = create_engine("sqlite:///FPA_FOD_20170508.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)
session = Session(engine)

#################################################

# Flask Setup

#################################################

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/fires<br/>"
    )

# all flask functions and returns should be here

# Reference to the table
fires = Base.classes.Fires

@app.route("/api/v1.0/fires")
def names():
    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(fires.FIRE_NAME).all()

    # Convert list of tuples into normal list
    #  all_names = list(results)
    return jsonify(results)
   #  return jsonify(all_names)


if __name__ == '__main__':
   app.run(debug = True)
