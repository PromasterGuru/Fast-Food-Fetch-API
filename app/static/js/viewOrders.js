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
          <span>
          <a href="/specific-order/${result[i].order_id}">Accept</a>&nbsp;&nbsp;&nbsp;
          <a href="#">Decline</a>&nbsp;&nbsp;&nbsp;
          <a href="#">Mark as Completed</a>
        </p></span>
        </p>
      </div>`;
    }
  })
  .catch(error => console.log(error));
