const access_token = localStorage.getItem("token");
const proxyUrl = 'https://morning-springs-84037.herokuapp.com/';
/********************************************* */
/*            PLACE ORDER FUNCTION            */
/*********************************************/ 
item = localStorage.getItem('item');
document.getElementById("meal_name").value = item;
placeOrder = () => {
  let data = {
    meal_id: document.getElementById('meal_id').value,
    address: document.getElementById('address').value,
    quantity: document.getElementById('quantity').value,
  };
  //Orders Url
  let url = 'https://pro-fast-food-fast-api.herokuapp.com/api/v2/users/orders';
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
    let result = Object.values(data);
    if(result === "Order item placed successfully"){
      document.getElementById("error").style.color = "green";
    }
    document.getElementById('error').innerHTML = result; 
    setTimeout(() => {document.getElementById("error").innerHTML = "";}, 8000);
  })
  //catch any error that might occur when placing an order
  .catch(error => console.log(error));
}
