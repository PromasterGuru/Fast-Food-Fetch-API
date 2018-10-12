var proxyUrl = 'https://morning-springs-84037.herokuapp.com/'

//Register a new user
signUp = () => {

  let data = {
    username: document.getElementById("uname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value,
    cpassword: document.getElementById("cpass").value
  };
  username = data.username
  const url = 'https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/signup';
  // submit registration data data to the server
  fetch(proxyUrl  + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response){
    return response.json();
  }).then(function(data){
    let msg = data.Message;
    if(msg === username + " registered successfully"){
      document.getElementById('error').innerHTML = msg;
      setTimeout(() => {document.getElementById("error").innerHTML = "";}, 4000);
      window.location.href = "/login";
    }
    else{
      document.getElementById('error').innerHTML = msg;
      setTimeout(() => {document.getElementById("error").innerHTML = "";}, 5000);
    }
  })
  //catch any error that might occur during registration
  .catch(error => console.log(error));
}

//User login
login = () => {

  let data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };
  username = data.username
  const url = 'https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/login';
  // submit registration data data to the server
  fetch(proxyUrl  + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response){
    return response.json();
  }).then(function(data){
    let msg = data.Message;
    if(msg === "Login successful, Welcome " + username){
      access_token = data.access_token
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', username);
      document.getElementById('error').innerHTML = msg;
      setTimeout(() => {document.getElementById("error").innerHTML = "";}, 4000);
      window.location.href = "/menu";
    }
    else{
      document.getElementById('error').innerHTML = msg;
      setTimeout(() => {document.getElementById("error").innerHTML = "";}, 5000);
    }
  })
  //catch any error that might occur during registration
  .catch(error => console.log(error));
}
