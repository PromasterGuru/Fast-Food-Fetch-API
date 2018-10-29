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
  for(index = 0; index < items.length; index++){
    document.getElementById("food_items").innerHTML += `
      <div id="item">
      <img src="static/img/${items[index].image}"><br>
      <span style="color:blue;">${items[index].meal_name}</span>
      <hr>
      <span style="font-size: 0.8em;">
      ${items[index].description}<span><br>
      <span style="font-weight:bold;">Ksh ${items[index].unit_price}<span><br>
      <span id="btnord">
      <button onclick=(setItem(${items[index].meal_id}))>Order Now</button>
      </span>
      </div>`;
  }
  document.getElementById("food_items").innerHTML += `
  <span id="pagination">
  <button onclick="getNext();">Next</button>
  <button onclick="getPrevious();">Previous</button>
  <button onclick="getLast();">Last</button>
  <button onclick="getFirst();">First</button>
  <span>
  `
})
.catch(error => console.log(error));

/**Add selected food item to the local storage */
setItem = (id) => {
  localStorage.setItem("item", orders[id-1].meal_name);
  window.location.href=`/specific-order/${id}`;
}

/**Pure JavaScript page pagination*/
let curPage = 1;
let lastPage = orders.length;
let nextPage = curPage + 1;
let firstPage = 0;
let prevPage = curPage -1;

/**Get page */
getPage = (page) => {
  let result;
  if(page === "previous"){
    result = previousPage;
  }
  else if(page = "next"){
    result = nextPage;
  }
  else if(page = "first"){
    result = firstPage;
  }
  else{
    result = lastPage;
  }
  return result;
}

/**Get previous page*/
getPrevious = () => {
  if(count > 0){
    getPage("previous");
  }
  alert(getPage("previous"));
}

/**Get next page*/
getNext = () => {
  if(count < lastPage){
    getPage("next");
  }
  alert(getPage("next"));
}

/**Get first page*/
getFirst = () => {
  if(count > 0){
    getPage("first");
  }
  alert(getPage("first"));
}

/**Get last page*/
getLast = () => {
  if(count < lastPage){
    getPage("last");
  }
  alert(getPage("last"));
}


