// This is the business (or back-end) logic:
let totalOrderPrice = 0;
function Order(homeDelivery) {
  this.name = "";
  this.homeDelivery = homeDelivery;
  this.street = "";
  this.city = "";
  this.state = "";
  this.zip = "";
  this.approxDeliveryTime = "";
  this.orderNumber = "";
  this.totalPrice = 0;
  this.pizzas = {};  //list of Pizza's - each one has size, toppings, individual price
  this.pizzaCount = 0;
}

Order.prototype.assignId = function () {
  this.pizzaCount += 1;
  return this.pizzaCount;
}

Order.prototype.addOrder = function (pizza) { //copied same pattern as address book
  let pizzaID = this.assignId();
  this.pizzas[pizzaID] = pizza;
}

Order.prototype.findContact = function (pizzaID) {
  if (this.pizzas[pizzaID] != undefined) {
    return this.pizzas[pizzaID];
  }
  return false;
}

Order.prototype.orderCost = function (order) {
  let total = 0;
  Object.keys(order.pizzas).forEach(function (key) {
    const tempTotal = order.findContact(key).individualPrice;
    total += tempTotal;
  });
  return total;
}
// Order.prototype.orderCost = function () {
//   Object.keys(addressBookToDisplay.contacts).forEach(function(key) {

//   this.pizzas.forEach(function (pizza) {
//     console.log(this.pizza.key);
//     // totalOrderPrice += this.pizza.;
//     // htmlForToppingList += "<li><span class=\"blueColor\">" + pizzaTopping + "</span></li>";
//   });
// }

function Pizza(pizzaSize, pizzaToppings, individualPrice) { //constructor/blue print \
  // this.orderNumber;
  // this.deliveryAddress;
  this.pizzaSize = pizzaSize;
  this.pizzaToppings = pizzaToppings;
  // this.homeDeliveryStatus;
  // this.approxDeliveryTime;
  this.individualPrice = individualPrice;
}

Order.prototype.orderNoGenEstDeliveryTime = function () {
  let currentTime = new Date();
  let orderNumber = currentTime.getTime();
  approxDeliveryTime = new Date(currentTime);
  approxDeliveryTime.setMinutes(currentTime.getMinutes() + 30);
  let index = String(approxDeliveryTime).indexOf("GMT");
  if (index > 0) {
    approxDeliveryTime = String(approxDeliveryTime).substring(0, index);
  }
  let timeElements = approxDeliveryTime.split(" ");
  this.approxDeliveryTime = timeElements[4] + " PST " + timeElements[0] + " " + timeElements[1] + " " + timeElements[2] + " " + timeElements[3];
  this.orderNumber = orderNumber;
}

Pizza.prototype.calculatePrice = function () {
  let totalPrice = 0;
  var sizePrice = 0;
  switch (this.pizzaSize) {
    case 'ExtraLarge':
      sizePrice = 16;
      break;
    case 'Large':
      sizePrice = 14;
      break;
    case 'Medium':
      sizePrice = 12;
      break;
    case 'Small':
      sizePrice = 10;
      break;
  }
  this.individualPrice = sizePrice + (this.pizzaToppings.length * 2);
  return this.individualPrice;
}

Pizza.prototype.renderToppingList = function () {
  let toppingList = $("ol#toppings");
  let htmlForToppingList = "";
  this.pizzaToppings.forEach(function (pizzaTopping) {
    htmlForToppingList += "<li><span class=\"blueColor\">" + pizzaTopping + "</span></li>";
  });
  toppingList.html(htmlForToppingList);
};

Order.prototype.renderToppingListMain = function () {
  let toppingList = $("ol#toppings");
  let htmlForToppingList = "";
  this.pizzaToppings.forEach(function (pizzaTopping) {
    htmlForToppingList += "<li><span class=\"blueColor\">" + pizzaTopping + "</span></li>";
  });
  toppingList.html(htmlForToppingList);
};

// Everything below this line is the user interface (or front-end) logic:
$(document).ready(function () {
  $('#restart').click(function (e) {
    e.preventDefault();
    document.location.reload(true);       //Reload Page
  });

  $('#delivery').click(function (e) {
    e.preventDefault();
    $("#address").toggle();
    // newOrder.homeDelivery   

  });

  $('#carryout').click(function (e) {
    e.preventDefault();
  });

  $("#anotherPizzaID").click(function (event) {
    event.preventDefault();
    $(".hide").show();
  });

  $("button#finalizeOrder").click(function (e){
    e.preventDefault();
    $(".morePizzaOrNot").hide();
    // alert(newOrder.name);
    $(".head").show();
    $("#cName").text(newOrder.name);
    $("#finalPage").show();
  });

  $("#address").submit(function (event) {
    event.preventDefault();
    let customerName = $("#customerName").val();
    let street = $("#inputAddress").val();
    let city = $("#inputCity").val();
    let state = $("#inputState").val();
    let zip = $("#inputZip").val();
    $("#addressBlock").hide();
    $(".hide").show();
    newOrder = new Order(true);
    newOrder.orderNoGenEstDeliveryTime(); // takes care of approxDeliveryTime and orderNumber
    newOrder.name = customerName;
    newOrder.street = street;
    newOrder.city = city;
    newOrder.state = state;
    newOrder.zip = zip;
    totalPrice = 0;
    // this.pizzas = {};  //list of Pizza's - each one has size, toppings, individual price
  });

  $('#formOne').submit(function (event) {
    event.preventDefault();
    let pizzaSize = "";
    let pizzaToppings = [];
    let atLeastOneToping = false;
    let individualPrice = 0;

    let newPizza = new Pizza(pizzaSize, pizzaToppings, individualPrice);
    newOrder.orderNoGenEstDeliveryTime();  //Generates Order# based off Epoch time; Estimates delivery time be adding 30 mins to order placement time

    // newPizza.customerName = $("#cusName").val();
    $('input[type="string"], textarea').val('');  // to clear form of entered value after submit
    newPizza.pizzaSize = $(".pizzaSize").val();

    $("input:checkbox[name=pizzaTopping]:checked").each(function () {
      newPizza.pizzaToppings.push($(this).val());
      atLeastOneToping = true;
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes

    newPizza.individualPrice = newPizza.calculatePrice(this.pizzaSize, this.pizzaToppings)
    $("#totalAmount").text("$" + newPizza.individualPrice);
    if (atLeastOneToping === true) { //List toppings only if 1 or more topping were chosen
      // $("#showToppings").show();
      // newPizza.renderToppingList();
    }
    $("#customerName").text(newOrder.customerName);
    $("#orderNumber").text(newOrder.orderNumber);
    
    $(".hide").hide();
    $("#showPrice").show();
    newOrder.addOrder(newPizza);
    $(".morePizzaOrNot").show();

    const keys = Object.keys(newOrder);
    // newOrder.orderCost(keys);
    var total = 0;

    newOrder.totalPrice = newOrder.orderCost(newOrder);
    console.log(newOrder.totalPrice);
    console.log(newOrder);
    $("ul#question").empty();

    // finalIntegerArray.forEach(function (element) {
    //   let textQuestion = "<li>Numeral " + k + "</li>";
    //   let textAnswer = "<li>" + element + "</li>";
    //   $("ul#question").append(textQuestion);
    //   $("ul#answer").append(textAnswer);
    //   k = k + step;
    // });
    $("ul#cart").empty();
    $("ul#price").empty();
    $("#showToppings").show();
    
    

    Object.keys(newOrder.pizzas).forEach(function (key) {
      const tempPizzaSize = newOrder.findContact(key).pizzaSize;
      const tempIndividualPrice = newOrder.findContact(key).individualPrice;
      const tempPizzaToppings = newOrder.findContact(key).pizzaToppings;

      let mainLine = "<br><li>Item # " + key + ":" + tempPizzaSize + ":$" + tempIndividualPrice + "</li>";
      // let mainLine2 = "<li>$" +tempIndividualPrice + "</li>";
      
      $("ul#cart").append(mainLine);
      // $("ul#price").append(mainLine2);
     
      tempPizzaToppings.forEach(function (element) {
        let topping = "<li>     " + element + "</li>";
        $("ul#cart").append(topping);
      });

    });
    
    
    if (newOrder.homeDelivery === true) {
      let tempDeliveryAdd = `${newOrder.street}, ${newOrder.city}, ${newOrder.state}, ZIP-${newOrder.zip}`;
      $("#deliveryAddress").text(tempDeliveryAdd);
      $("#approximatedTime").text(newOrder.approxDeliveryTime);
      $("#showAddress").show();
    }
    $(".finalDisplay").show();
  });
});