from flask import render_template
from app import app
from flask_cors import CORS
CORS(app)

@app.route('/')
def landing():
    return render_template('index.html',title ="Welcome")

@app.route('/login')
def login():
    return render_template('login.html',title ="Login")

@app.route('/signup')
def signup():
    return render_template('signup.html',title ="Signup")

@app.route('/menu')
def menu():
    return render_template('menu.html',title ="View Menu")

@app.route('/add_menu')
def add_menu():
    return render_template('addmenu.html',title ="Add Menu")

@app.route('/order')
def order():
    return render_template('order.html',title ="Place Order")

@app.route('/orders')
def orders():
    return render_template('orders.html',title ="Manage Orders")

@app.route('/logout')
def logout():
    return render_template('index.html',title ="Welcome")

@app.route('/specific-order/<int:orderId>')
def specific_order(orderId):
    return render_template('order.html',title ="Place Order",var1 = orderId)
