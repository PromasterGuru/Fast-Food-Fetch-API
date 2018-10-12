// View order History
const access_token = localStorage.getItem("token");
var proxyUrl = 'https://morning-springs-84037.herokuapp.com/'
//Orders Url
const url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/orders/";
fetch(proxyUrl + url, {
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
    let result = data.Message
    document.getElementById('orders_count').innerHTML = result.length;
    // Loop through each order and display it on the screen
    for(i = 0; i < result.length; i++){
      document.getElementById('orders').innerHTML += `
      <div id="food_items">
        <p>
          User ID: <span>${result[i].user_id}</span><br>
          Order ID: <span>${result[i].order_id}</span><br>
          Meal ID: <span>${result[i].meal_id}</span><br>
          Quantity: <span>${result[i].quantity}</span><br>
          Order Date: <span>${result[i].order_date}</span><br>
          Address: <span>${result[i].address}</span><br>
          Status: <span>${result[i].status}</span>
          <br><br>
          <span class="_adm">
          <button onclick=(updateOrder("${result[i].order_id}","Processing"))>Process</button>&nbsp;&nbsp;&nbsp;
          <button onclick=(updateOrder("${result[i].order_id}","Cancelled"))>Cancel</button>&nbsp;&nbsp;&nbsp;
          <button onclick=(updateOrder("${result[i].order_id}","Complete"))>Mark as Completed</button>&nbsp;&nbsp;&nbsp;
          <button onclick=(deleteOrder("${result[i].order_id}"))>Delete Order</button>
          </span>
          </p>
          <span id="${result[i].order_id}" class="msg"></span>
      </div>`;
    }
  })
  .catch(error => console.log(error));

/******************************************************/
//UPdate the status of an order
updateOrder = (id, order_status) => {
    const access_token = localStorage.getItem("token");
    var proxyUrl = 'https://morning-springs-84037.herokuapp.com/'
    //Menu Url
    const url = `https://pro-fast-food-fast-api.herokuapp.com/api/v2/orders/${id}`;
    //data
    let data = {
      status: order_status
    };

    fetch(proxyUrl + url,{
      method: "PUT",
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
      let msg = data.Message
      if (msg === "Order successfully updated"){
        document.getElementById(id).innerHTML = msg;
        window.location.href = "/orders";
      }
      else{
        let msg = Object.values(data);
        document.getElementById(id).innerHTML = msg;
        setTimeout(() => {document.getElementById(id).innerHTML = "";}, 5000);
      }
    })
    .catch(error => console.log(error));
}

/******************************************************/
//Delete an order
deleteOrder = (id) => {
  const access_token = localStorage.getItem("token");
  var proxyUrl = 'https://morning-springs-84037.herokuapp.com/'
  //Order Url
  const url = `https://pro-fast-food-fast-api.herokuapp.com/api/v2/orders/${id}`;
  fetch(proxyUrl + url,{
    method: "DELETE",
    headers: {
      "Content-Type" : "application/json",
      Authorization : `Bearer ${access_token}`
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    let result = data.Message
    if (result === "Order successfully deleted"){
      document.getElementById(id).innerHTML = result;
      window.location.href = "/orders";
    }
    else{
      let result = Object.values(data);
      document.getElementById(id).innerHTML = result;
      setTimeout(() => {document.getElementById(id).innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}
