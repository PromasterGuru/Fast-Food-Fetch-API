//Menu Url
const url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/menu";
fetch(proxyUrl + url)
.then(function(response){
  return response.json()
})
.then(function(data){
  let items = data.Message
  document.getElementById('menu_count').innerHTML = items.length;
  for(index = 0; index < items.length; index++){
    document.getElementById('menu').innerHTML += `
    <div id="food_items">
      <p>
      Meal ID: <span>${items[index].meal_id}</span><br><br>
      Meal Name: <span>${items[index].meal_name}</span><br><br>
      Description: <span>${items[index].description}</span><br><br>
      Unit Price: $<span>${items[index].unit_price}</span><br></br>
      <span id="btnord">
      <button onclick=(window.location.href="/specific-order/${items[index].meal_id}")>Order Now</button>
      </span>
      <span id="_adm">
      <button onclick=(window.location.href="/add_menu")>Add New</button>
      </span>
      </p>
    </div>`;
  }

})
.catch(error => console.log(error));
