// Place order
placeOrder = () => {
  let data = {
    meal_id: document.getElementById('meal_id').value,
    address: document.getElementById('address').value,
    quantity: document.getElementById('quantity').value
  };

  //Orders Url
  let url = 'https://pro-fast-food-fast-api.herokuapp.com/api/v2/users/orders';
  if(role === 'Admin'){
    if(document.getElementById('order_id').value){
      id = document.getElementById('order_id').value;
      url = `https://pro-fast-food-fast-api.herokuapp.com/api/v2/orders/${id}`;
    }
  }
  fetch(proxyUrl + url, {
    method: 'POST',
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
