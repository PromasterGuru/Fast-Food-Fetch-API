// Access token and CORS proxy Url
const access_token = localStorage.getItem("token");
var proxyUrl = 'https://morning-springs-84037.herokuapp.com/'
var role = 'User';

if(access_token === null){
  window.location.assign('/login');
  }
const role_url = 'https://pro-fast-food-fast-api.herokuapp.com/api/v2/user/role'
fetch(proxyUrl + role_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    role = data.Message
  })
  .catch(error => console.log(error));
