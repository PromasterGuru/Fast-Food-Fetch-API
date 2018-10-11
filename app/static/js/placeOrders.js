// Place order
placeOrder = () => {
  const access_token = localStorage.getItem("token");
  let data = {
    meal_id: document.getElementById('meal_id').value,
    address: document.getElementById('address').value,
    quantity: document.getElementById('quantity').value
  };

  //CORS proxy url
  var proxyUrl = 'https://morning-springs-84037.herokuapp.com/';
  //Orders Url
  const url = 'https://pro-fast-food-fast-api.herokuapp.com/api/v2/users/orders';
  fetch(proxyUrl + url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  }).then(function(resp){
    return resp.json()
  }).then(function(data){
    let result = data.Message;
    document.getElementById('error').innerHTML = result;
    setTimeout(() => {document.getElementById("error").innerHTML = "";}, 8000);
  })
  //catch any error that might occur when placing an order
  .catch(error => console.log(error));
}
