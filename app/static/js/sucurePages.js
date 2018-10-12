access_token = localStorage.getItem("access_token");
if(access_token === null){
  window.location.assign('/login');
  }
