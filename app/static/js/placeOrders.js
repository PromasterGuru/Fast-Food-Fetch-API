// Place order
let url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/users/orders";

if(role === 'Admin'){
  url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/orders/";
}

/***************************************************/
/*     DISABLE ORDER ID FIELD FOR NORMAL USERS    */
/*********************************************** */
if(role === 'User'){
  document.getElementById('order_id').readOnly = true;
}
fetch(proxyUrl + url, {
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
    let result = data.Message;
    var num = 0;
    for(var i = 0; i<result.length; i++){
      if(result[i].order_id > num){
        num = result[i].order_id + 1;
      }
    }
    document.getElementById("order_id").value = num;
  })
  .catch(error => console.log(error));


/********************************************* */
/*            PLACE ORDER FUNCTION            */
/*********************************************/ 
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
