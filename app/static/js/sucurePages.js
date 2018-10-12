// Access token and CORS proxy Url
const access_token = localStorage.getItem("token");
var proxyUrl = 'https://morning-springs-84037.herokuapp.com/';
const role_url = 'https://pro-fast-food-fast-api.herokuapp.com/api/v2/user/role';
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
    let msg = Object.values(data);
    if(msg != 'Admin' && msg != 'User'){
      window.location.assign('/login');
    }
    else{
      localStorage.setItem('role', msg)
    }
  })
  .catch(error => console.log(error));
  const role = localStorage.getItem('role')
