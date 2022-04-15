# Store this code in 'app.py' file

import html
from random import randint
import requests
import http.client
import sys
import json
import re
from flask import Flask, render_template, request, redirect, url_for, session
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
client = MongoClient('localhost', 27017)

db = client.the_movie_database

@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    url1 = "https://api.themoviedb.org/3/movie/now_playing?api_key=53079f05e09b1e6302fc15e48c9ab6f7"
    url2 = "https://api.themoviedb.org/3/movie/top_rated?api_key=53079f05e09b1e6302fc15e48c9ab6f7"
    payload= {}
    headers = {}
    
    
    response_now_playing = requests.request("GET", url1, headers=headers, data=payload)
    response_top_rated = requests.request("GET", url2, headers=headers, data=payload)

    data1 = response_now_playing.json()
    data2 = response_top_rated.json()
# 
    # now_playing
    for x in data1['results']:

        movie = {
            'title': x['title'],
            'description': x['overview'],
            'release_info': x['release_date'],
            'image': 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + x['poster_path'],
            'favourite':''
        }
        exists =  db.now_playing.find_one({'title': x['title']})
        if exists:
            
            print()
        else:
            result = db.now_playing.insert_one(movie)
            print('result == ', result)

    # top_rated
    for x in data2['results']:
        movie = {
            'title': x['title'],
            'description': x['overview'],
            'release_info': x['release_date'],
            'image': 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + x['poster_path'],
            'favourite':''
        }
        exists =  db.top_rated.find_one({'title': x['title']})
        if exists:
            print()
        else:
            result = db.top_rated.insert_one(movie)
            print('result == ', result)

    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
    # session['loggedin'] = True
    # session['id'] = account['id']
    # session['username'] = request.form['username']
        if db.users.find_one({'username': request.form['username']}) and db.users.find_one({'password': request.form['password']}):
            msg = 'Logged in successfully !'
                

            return redirect(url_for('index'))   
        else:
            msg = 'Incorrect username / password !'
            return render_template('login.html', msg=msg)
    else:
        msg = 'Type your account to login'
        return render_template('login.html', msg=msg)
    
@app.route('/index', methods=['GET', 'POST'])
def index():
    movies_now_playing = db.now_playing.find()
    if request.method == 'POST' and 'favupdate' in request.form:
        fav_check= db.now_playing.find_one({'_id': ObjectId(request.form['favupdate'])})
        if fav_check['favourite'] != 'true':
            update =  db.now_playing.find_one_and_update({'_id': ObjectId(request.form['favupdate'])},{ '$set': { "favourite" : 'true'} })
            result = db.my_favourites.insert_one(update)
            print('result == ',result)
            return render_template('index.html', movies=movies_now_playing)
        print('favupdate',request.form['favupdate'])
        print('fav',request.form['fav'])
        return render_template('index.html', movies=movies_now_playing)
    else:
        return render_template('index.html', movies=movies_now_playing)

@app.route('/top_rated', methods=['GET', 'POST'])
def top_rated():
    movies_top_rated = db.top_rated.find()
    if request.method == 'POST' and 'favupdate' in request.form:
        fav_check= db.top_rated.find_one({'_id': ObjectId(request.form['favupdate'])})
        if fav_check['favourite'] != 'true':
            update =  db.top_rated.find_one_and_update({'_id': ObjectId(request.form['favupdate'])},{ '$set': { "favourite" : 'true'} })
            result = db.my_favourites.insert_one(update)
            print('result == ',result)
            return render_template('top_rated.html', movies=movies_top_rated)
        print('favupdate',request.form['favupdate'])
        print('fav',request.form['fav'])
        return render_template('top_rated.html', movies=movies_top_rated)
    else:
        return render_template('top_rated.html', movies=movies_top_rated)

@app.route('/favourites', methods=['GET', 'POST'])
def favourites():
    movies_favourites = db.my_favourites.find()
    if request.method == 'POST' and 'favupdate' in request.form:
        fav_check= db.my_favourites.find_one({'_id': ObjectId(request.form['favupdate'])})
        if fav_check:
            delete =  db.my_favourites.find_one_and_delete({'_id': ObjectId(request.form['favupdate'])})
            fav_now_playing = db.now_playing.find_one({'_id': delete['_id']})
            if fav_now_playing:
                db.now_playing.find_one_and_update({'_id': delete['_id']},{ '$set': { "favourite" : ''} })
            else:
                db.top_rated.find_one_and_update({'_id': delete['_id']},{ '$set': { "favourite" : ''} })     
            print('delete == ',delete)
            return render_template('favourites.html', movies=movies_favourites)
        else:
            return render_template('favourites.html', movies=movies_favourites)
    else:
        return render_template('favourites.html', movies=movies_favourites)


@app.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        account = db.users.find_one({'username': username})

        
        if account:
            msg = 'Account already exists !'
            print('msg == ',msg)
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address !'
            print('msg == ',msg)
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers !'
            print('msg == ',msg)
        elif not username or not password or not email:
            msg = 'Please fill out the form !'
            print('msg == ',msg)
        else: 
            user = {
                'username': username,
                'password': password,
                'email': email
            }
            result = db.users.insert_one(user)
            msg = 'You have successfully registered !'
            print('msg == ',msg)
            print('result == ',result)
    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('register.html', msg=msg)

@app.route('/logout')
def logout():
    # session.pop('loggedin', None)
    # session.pop('id', None)
    # session.pop('username', None)
    return redirect(url_for('login'))

