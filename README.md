[![Build Status](https://travis-ci.org/PromasterGuru/Fast-Food-Fetch-API.svg?branch=develop)](https://travis-ci.org/PromasterGuru/Fast-Food-Fetch-API)
[![Coverage Status](https://coveralls.io/repos/github/PromasterGuru/Fast-Food-Fetch-API/badge.svg?branch=develop)](https://coveralls.io/github/PromasterGuru/Fast-Food-Fetch-API?branch=master)
[![GitHub license](https://img.shields.io/github/license/PromasterGuru/Fast-Food-Fetch-API.svg)](https://github.com/PromasterGuru/Fast-Food-Fetch-API/blob/master/LICENSE)
### Fast Food Fast API endpoints with JavaScript
Power html templates or front-end pages from Challenge 1 with data from the API built in Challenge 3. 

<h2>Endpoints</h2>
<table>
  <tr>
    <th>Functionality</th>
    <th>Method</th>
    <th>Endpoint</th>
  </tr>
  <tr>
    <td>Register a user</td>
    <td>POST</td>
    <td>/auth/signup</td>
  </tr>
  <tr>
    <td>Login a user</td>
    <td>POST</td>
    <td>/auth/login</td>
  </tr>
  <tr>
    <td>Place an order for food.</td>
    <td>POST</td>
    <td>/users/orders</td>
  </tr>
  <tr>
    <td>Get the order history for a particular user.</td>
    <td>GET</td>
    <td>/users/orders</td>
  </tr>
  <tr>
    <td>Get all orders</td>
    <td>GET</td>
    <td>/orders/</td>
  </tr>
  <tr>
    <td>Get a specific order</td>
    <td>GET</td>
    <td>/orders/orderId</td>
  </tr>
  <tr>
    <td>Update the status  of an order</td>
    <td>PUT</td>
    <td>orders/orderId</td>
  </tr>
  <tr>
    <td>Get available menu</td>
    <td>GET</td>
    <td>/menu</td>
  </tr>
  <tr>
    <td>Add a meal option to the menu.</td>
    <td>POST</td>
    <td>/menu</td>
  </tr>
  <tr>
    <td>Delete order.</td>
    <td>DELETE</td>
    <td>/menu</td>
  </tr>
  <tr>
    <td>Add a meal option to the menu.</td>
    <td>POST</td>
    <td>/orders/orderId</td>
  </tr>
  <tr>
    <td>Update user</td>
    <td>PUT</td>
    <td>/users/userId</td>
  </tr>
</table>

### How to compile and test it locally
1. Clone the project: `https://github.com/PromasterGuru/Fast-Food-Fetch-API.git">`
2. cd to project directory: `cd Fast-Food-Fetch-API`
3. Install virtual environment(if not installed): `pip install virtualenv`
4. Create and activate virtual environment: `virtualenv venv` then `source venv/bin/activate`
5. Install project dependencies :`pip install -r requirements.txt`
6. Run the project: `python run.py`

__[Live Demo](https://pro-fast-food-fast-fetch-api.herokuapp.com/)__