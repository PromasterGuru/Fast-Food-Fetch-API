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
      window.location.assign("/login");
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
  // submit login data data to the server
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
      const role_user = 'https://pro-fast-food-fast-api.herokuapp.com/api/v2/user/role';
      fetch(proxyUrl + role_user, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(function(resp){
        return resp.json()
      })
      .then(function(data){
        const role = Object.values(data);
        localStorage.setItem('role', role)
        document.getElementById('error').innerHTML = msg;
        window.location.href = "/menu";
      })
      .catch(error => console.log(error));
    }
    else{
      document.getElementById('error').innerHTML = msg;
      setTimeout(() => {document.getElementById("error").innerHTML = "";}, 5000);
    }
  })
  //catch any error that might occur during login
  .catch(error => console.log(error));
  const role = localStorage.getItem('role')
}

module.exports = signUp;