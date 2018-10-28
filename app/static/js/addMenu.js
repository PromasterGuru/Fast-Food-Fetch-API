const access_token = localStorage.getItem("token");
const proxyUrl = 'https://morning-springs-84037.herokuapp.com/';
/******************************************************/
//Add a meal option to the menu
addMeal = (meal_id) => {
  let data = {
    name: document.getElementById('name').value,
    image_url: document.getElementById('image').value.replace(/^.*[\\\/]/, ''),
    description: document.getElementById('description').value,
    unit_price: document.getElementById('price').value
  }
  //Menu Url
  const url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/menu";
  fetch(proxyUrl + url,{
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type" : "application/json",
      Authorization : `Bearer ${access_token}`
    }
  })
  .then(function(resp){
    return resp.json()
  })
  .then(function(data){
    let message = Object.values(data);
    if (message === "Menu item added successfully"){
      document.getElementById("error").innerHTML = message;
      document.getElementById("error").style.color = "green";
      setTimeout(() => {document.getElementById('error').innerHTML = "";}, 4000);
    }
    else{
      document.getElementById('error').innerHTML = message;
      setTimeout(() => {document.getElementById('error').innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}
