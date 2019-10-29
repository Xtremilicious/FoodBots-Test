const restContainer = document.getElementById("rest-container");
const userContainer = document.getElementById("username-container");
const itemContainer = document.getElementById("item-table");

let itemTotal = 0;
let itemGST = 0;
let Tota = 0;

const url = `https://indapi.kumba.io/webdev/assignment`;

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(data => {
    const restaurant = data.restaurant;
    const items = data.items;
    //Supplying Restaurant Info
    createRestaurantNode(restaurant);
    //Supplying User Info
    createUserNode(data.user, data.order_id);
    //Supplying Items List Info
    items.map(item => {
      createItemNode(item);
      itemTotal += item.price;
      itemGST += item.tax/100*item.price;
    });
    //Supplying Payment Info
    calculate(items[0].currency);
  })
  .catch(error => {
    console.log(JSON.stringify(error));
  });
//Function to supply Item Info
const createItemNode = item => {
  const itemElement = document.createElement("tr");
  const linebreak = document.createElement("br");
  const name = document.createElement("td");
  name.innerHTML = `${item.name}`;
  name.className = "food-item";
  const category = document.createElement("span");
  category.innerHTML = `${item.category}`;
  category.className = "food-cat";
  name.innerHTML += linebreak.outerHTML + category.outerHTML;
  const quantity = document.createElement("td");
  quantity.innerHTML = `Quantity: ${item.quantity}`;
  const price = document.createElement("td");
  price.innerHTML = `${item.currency} ${item.price}`;
  price.className = "item-price";
  quantity.className = "item-quantity";
  itemElement.innerHTML = name.outerHTML + quantity.outerHTML + price.outerHTML;

  itemContainer.innerHTML += itemElement.outerHTML;
};
//Function to supply Restaurant Info
const createRestaurantNode = restaurant => {
  const restName = document.createElement("div");
  restName.innerHTML = `${restaurant.name}`;
  restName.className = "rest-name";
  const restAddr1 = document.createElement("div");
  restAddr1.className = "rest-addr1";
  restAddr1.innerHTML = `${restaurant.street}, ${restaurant.city}`;
  const restAddr2 = document.createElement("div");
  restAddr2.innerHTML = `${restaurant.state} - ${restaurant.zipcode}`;
  restAddr2.className = "rest-addr2";

  restContainer.innerHTML +=
    restName.outerHTML + restAddr1.outerHTML + restAddr2.outerHTML;
};
//Function to supply User Info
const createUserNode = (user, order) => {
  const userName = document.createElement("div");
  userName.innerHTML = `${user.name}`;
  userName.className = "rest-name";
  const userid = document.createElement("div");
  userid.className = "rest-addr1";
  userid.innerHTML = `User ID: ${user.id}`;
  const orderid = document.createElement("div");
  orderid.className = "rest-addr1";
  orderid.innerHTML = `Order ID: ${order}`;
  userContainer.innerHTML +=
  userName.outerHTML + userid.outerHTML + orderid.outerHTML;
};
//Function to supply Payment Info
const calculate = currency => {
  const totalPrice = document.getElementById("item-total-price");
  totalPrice.innerHTML = `${currency} ` + itemTotal.toFixed(2);
  const totalTax = document.getElementById("item-total-tax");
  totalTax.innerHTML = `${currency} ` + itemGST.toFixed(2);
  const totalPayable = document.getElementById("item-total-payable");
  totalPayable.innerHTML = `${currency} ` + (itemGST + itemTotal).toFixed(2);
};
