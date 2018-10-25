const access_token = localStorage.getItem("token");
const proxyUrl = 'https://morning-springs-84037.herokuapp.com/';
//Menu Url
const url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/menu";
fetch(proxyUrl + url)
.then(function(response){
  return response.json()
})
.then(function(data){
  let items = data.Message
  document.getElementById('menu_count').innerHTML = items.length;
  if(role === null){
    let role = localStorage.getItem('role');
  }
  if(role === 'Admin'){
    let b = document.getElementById("div_desc").querySelectorAll('button');
    for(var i =0; i<b.length; i++){
      b[i].style.display = "block";
  }
}
  for(index = 0; index < items.length; index++){
    document.getElementById('food_items').innerHTML += `
      <div id="item">
      <img src="static/img/${items[index].image}"><br>
      <span style="color:blue;">${items[index].meal_name}</span>
      <hr>
      ${items[index].description}<br>
      Ksh ${items[index].unit_price}<br>
      <span id="btnord">
      <button onclick=(window.location.href="/specific-order/${items[index].meal_id}")>Order Now</button>
      </span>
      </div>`;
  }
})
.catch(error => console.log(error));
