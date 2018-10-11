const access_token = localStorage.getItem("token");
var proxyUrl = 'https://morning-springs-84037.herokuapp.com/'
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
      <span>
      <a href="{{url_for('order')}}">Order Now</a>&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="{{url_for('order')}}" class="_adm">Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="#" class="_adm">Delete</a><span>
      </p>
    </div>`;
  }
})
.catch(error => console.log(error));
