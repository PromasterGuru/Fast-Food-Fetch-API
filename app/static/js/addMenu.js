
/******************************************************/
//Add a meal option to the menu
addMeal = (meal_id) => {
  let data = {
    name: document.getElementById('name').value,
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
      setTimeout(() => {document.getElementById('error').innerHTML = "";}, 4000);
    }
    else{
      document.getElementById('error').innerHTML = message;
      setTimeout(() => {document.getElementById('error').innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}
