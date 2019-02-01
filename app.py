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

engine = create_engine("sqlite:///the name of the db")
Base.prepare(engine, reflect=True)
Passenger = Base.classes.passenger
session = Session(engine)

#################################################

# Flask Setup

#################################################

app = Flask(__name__)

@app.route('/')
def home():
   return render_template('here should be the name of the HTML')

# all flast functions and returns should be here


 if __name__ == '__main__':
   app.run(debug = True)
