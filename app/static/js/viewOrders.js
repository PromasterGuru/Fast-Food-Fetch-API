const access_token = localStorage.getItem("token");
const proxyUrl = "https://morning-springs-84037.herokuapp.com/";
//Orders Url
let url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/users/orders";

if(role === "Admin"){
  document.getElementById("frmsearch").style.display = "block";
  url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/orders/";
}
fetch(proxyUrl + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    let result = data.Message
    // When no order is found
    if(result === "No order history found."){
      document.getElementById("orders_count").innerHTML = 0;
      document.getElementById("food_items").innerHTML += `
        <p><span id="error">You have no order history, place a new order!</span></p>`;
    }
    else{
      document.getElementById("orders_count").innerHTML = result.length;
      document.getElementById("orders_tb").style.display = "block";
      // Loop through each order and display it on the screen
      document.getElementById("orders_tb").innerHTML += `
      <tr id="tr">
      <th>ID</th>
      <th>Meal ID</th>
      <th>Qty</th>
      <th>Order Date</th>
      <th>Address</th>
      <th>Status</th>`
      if(role === "Admin"){
        document.getElementById("tr").innerHTML += `
        <th>Action</th>`
      }
      `</tr>`
      for(i = 0; i < result.length; i++){
        document.getElementById("orders_tb").innerHTML += `
        <tr>
          <td>${result[i].order_id}</td>
          <td>${result[i].meal_id}</td>
          <td>${result[i].quantity}</td>
          <td>${result[i].order_date}</td>
          <td>${result[i].address}</td>
          <td>${result[i].status}</td>
          <td id ="_adm">
          <button onclick=(updateOrder("${result[i].order_id}","Processing")) id="btn1">Process</button>
          <button onclick=(updateOrder("${result[i].order_id}","Complete")) id="btn2">Complete</button>
          <button onclick=(updateOrder("${result[i].order_id}","Cancelled")) id="btn3">Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onclick=(deleteOrder("${result[i].order_id}")) id="btn4">Delete</button>
        </td>
        </tr>`
      }
      if(role === "Admin"){
        let x = document.getElementById("orders_tb").querySelectorAll("#_adm");
        for(var i =0; i<x.length; i++){
          x[i].style.display = "block";
        }
      }
    }
  })
  .catch(error => console.log(error));
  

/******************************************************/
//UPdate the status of an order
updateOrder = (id, order_status) => {

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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    })
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      let msg = data.Message;
      if (msg === "Order successfully updated"){
        // document.getElementById(id).innerHTML = msg;
        window.location.href = "/orders";
      }
      else{
        let msg = Object.values(data);
        console.log(msg);
        // document.getElementById(id).innerHTML = msg;
        // setTimeout(() => {document.getElementById(id).innerHTML = "";}, 5000);
      }
    })
    .catch(error => console.log(error));
}

/******************************************************/
//Delete an order
deleteOrder = (id) => {

  //Order Url
  var c = confirm("Do you really want to delete this order?");
  if(c == true){
    const url = `https://pro-fast-food-fast-api.herokuapp.com/api/v2/orders/${id}`;
    fetch(proxyUrl + url,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    })
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      let result = data.Message
      if (result === "Order successfully deleted"){
        window.location.href = "/orders";
      }
      else{
        let result = Object.values(data);
        document.getElementById(id).innerHTML = result;
        setTimeout(() => {document.getElementById(id).innerHTML = "";}, 8000);
      }
    })
    .catch(error => console.log(error));
  }
  else{
    return false;
  }
  }

  /**************************************************** */
  /*            GET SPECIFIC ORDER FUNCTION            */
  /****************************************************/ 
  getOrder = () => {
    const order_id = document.getElementById("search").value;
    const url = `https://pro-fast-food-fast-api.herokuapp.com/api/v2/orders/${order_id}`;
    fetch(proxyUrl + url,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }
    })
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      let result = data.Message;
      document.getElementById("orders_tb").style.display = "block";
      document.getElementById("orders_tb").innerHTML = "";
      if(result === "No order found for order id "+order_id){
        document.getElementById("orders_count").innerHTML = 0;
        document.getElementById("orders_tb").innerHTML = `
          <p><span id="error">No order history found for order id ${order_id}</span></p>`;
      }
      else{
        document.getElementById("orders_count").innerHTML = result.length;
        // Loop through each order and display it on the screen
        document.getElementById("orders_tb").innerHTML += `
        <tr id="tr">
        <th>ID</th>
        <th>Meal ID</th>
        <th>Qty</th>
        <th>Order Date</th>
        <th>Address</th>
        <th>Status</th>
        <th>Action</th>
        </tr>`
        for(i = 0; i < result.length; i++){
          document.getElementById("orders_tb").innerHTML += `
          <tr>
            <td>${result[i].order_id}</td>
            <td>${result[i].meal_id}</td>
            <td>${result[i].quantity}</td>
            <td>${result[i].order_date}</td>
            <td>${result[i].address}</td>
            <td>${result[i].status}</td>
            <td>
            <button onclick=(updateOrder("${result[i].order_id}","Processing")) id="btn1">Process</button>
            <button onclick=(updateOrder("${result[i].order_id}","Complete")) id="btn2">Complete</button>
            <button onclick=(updateOrder("${result[i].order_id}","Cancelled")) id="btn3">Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onclick=(deleteOrder("${result[i].order_id}")) id="btn4">Delete</button>
          </td>
          </tr>
          `
        }
      }
    })
  .catch(error => console.log(error));
}