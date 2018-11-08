const access_token = localStorage.getItem("token");
const proxyUrl = "https://morning-springs-84037.herokuapp.com/";
let orders;
let count;
/**Menu Url*/
const url = "https://pro-fast-food-fast-api.herokuapp.com/api/v2/menu";
fetch(proxyUrl + url)
.then(function(response){
  return response.json()
})
.then(function(data){
  let items = data.Message
  orders = items;
  document.getElementById("menu_count").innerHTML = items.length;
  if(role === null){
    let role = localStorage.getItem("role");
  }
  if(role === "Admin"){
    let b = document.getElementById("div_desc").querySelectorAll("button");
    for(var i =0; i<b.length; i++){
      b[i].style.display = "block";
  }
}
getPage(1);
})
.catch(error => console.log(error));

/**Add selected food item to the local storage */
setItem = (id) => {
  localStorage.setItem("item", orders[id-1].meal_name);
  window.location.href=`/specific-order/${id}`;
}

/**Pure JavaScript page pagination*/
getPage = (numPages) => {
  maxCount = numPages * 6;
  minCount = maxCount - 6;
  document.getElementById("foods").innerHTML = "";
  document.getElementById("pagination").innerHTML = "";
  getNavButtons();
  for(index = minCount; index < maxCount; index++){
    document.getElementById("foods").innerHTML += `
      <div id="item">
      <img src="static/img/${orders[index].image}"><br>
      <span style="color:blue;">${orders[index].meal_name}</span>
      <hr>
      <span style="font-size: 0.8em;">
      ${orders[index].description}<span><br>
      <span style="font-weight:bold;">Ksh ${orders[index].unit_price}<span><br>
      <span id="btnord">
      <button onclick=(setItem(${orders[index].meal_id}))>Order Now</button>
      </span>
      </div>`;
  }
}
getNavButtons = () =>{
  if(orders.length/6 > 1){
    for(let i = 0; i <= orders.length/6; i++){
      let n = parseInt(i) + 1;
      document.getElementById("pagination").innerHTML += `
        <button onclick="getPage(${n});">${n}</button>`
      }
    }
  }
