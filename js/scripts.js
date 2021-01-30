// This is the business (or back-end) logic:
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

Order.prototype.findPizza = function (pizzaID) {
  if (this.pizzas[pizzaID] != undefined) {
    return this.pizzas[pizzaID];
  }
  return false;
}

Order.prototype.orderCost = function (order) {
  let total = 0;
  Object.keys(order.pizzas).forEach(function (key) {
    const tempTotal = order.findPizza(key).individualPrice;
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
    // $("#restart").hide();
  });

  $('#delivery').click(function (e) {  //click on delivery icon
    e.preventDefault();
    $("#carryOutForm").hide();
    $("#deliveryForm").toggle();
  });

  $('#carryout').click(function (e) {  //click on carryOut icon
    e.preventDefault();
    $("#deliveryForm").hide();
    $("#carryOutForm").toggle();
  });

  $("form#deliveryForm").submit(function (event) {
    event.preventDefault();
    $("#iconBlock").hide();
    $(".pizzaOrderBlock").show();
    $("button#restart").show();
    newOrder = new Order(true);
    newOrder.name = ($("#customerName").val()).toUpperCase();
    newOrder.street = $("#inputAddress").val();
    newOrder.city = $("#inputCity").val();
    newOrder.state = $("#inputState").val();
    newOrder.zip = $("#inputZip").val();
    totalPrice = 0;
  });

  $("form#carryOutForm").submit(function (event) {
    event.preventDefault();
    $("#iconBlock").hide();
    $(".pizzaOrderBlock").show();
    $("button#restart").show();
    newOrder = new Order(false);
    newOrder.name = ($("#customerName2").val()).toUpperCase();
    totalPrice = 0;
  });

  $("#anotherPizzaID").click(function (event) {
    event.preventDefault();
    $(".cartView").hide();
    $(".pizzaOrderBlock").show();
  });

  $("button#finalizeOrder").click(function (e) {
    e.preventDefault();
    $(".pizzaOrderBlock").hide();
    $(".cartView").hide();
    $(".finalView").show();
    $("#cName1").text(newOrder.name);

    // newOrder.totalPrice = newOrder.orderCost(newOrder);
    $("ul#cart1").empty();
    let lotOfNbsp = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    Object.keys(newOrder.pizzas).forEach(function (key) {
      const tempPizzaSize = newOrder.findPizza(key).pizzaSize;
      const tempIndividualPrice = newOrder.findPizza(key).individualPrice;
      const tempPizzaToppings = newOrder.findPizza(key).pizzaToppings;
      let mainLine1 = "<br><li># " + key + ": Pizza Size : <strong>" + tempPizzaSize + "</strong>" + lotOfNbsp + lotOfNbsp + lotOfNbsp + "$" + tempIndividualPrice + "</li>";
      $("ul#cart1").append(mainLine1);
      tempPizzaToppings.forEach(function (topping) {
        let toppingLine = "<ol>     " + "&nbsp;&nbsp;&nbsp;" + topping + "</ol>";
        $("ul#cart1").append(toppingLine);
      });
    });

    // newOrder.orderNoGenEstDeliveryTime(); // takes care of approxDeliveryTime and orderNumber

    // $("#customerName").text(newOrder.customerName);
    // $("#orderNumber").text(newOrder.orderNumber);
    let totalCost = `$${newOrder.orderCost(newOrder)}`;
    newOrder.orderNoGenEstDeliveryTime();
    $("#totalCost1").text(totalCost);
    if (newOrder.homeDelivery === true) {
      let tempDeliveryAdd = `${newOrder.street}, ${newOrder.city}, ${newOrder.state}, ZIP-${newOrder.zip}`;
      $("#deliveryAddress1").text(tempDeliveryAdd);
      $(".hideDelivery").show();
    }
    $("#orderNum").text(newOrder.orderNumber);
    $("#deliveryTime").text(newOrder.approxDeliveryTime);
    // $(".cartView").show();
    // $("#totalCost").text(newOrder.totalPrice);
    // $("#finalPage").show();
  });



  $('#pizzaOrderForm').submit(function (event) {
    event.preventDefault();
    let pizzaSize = "";
    let pizzaToppings = [];
    let atLeastOneToping = false;
    let individualPrice = 0;
    let newPizza = new Pizza(pizzaSize, pizzaToppings, individualPrice);

    $('input[type="string"], textarea').val('');  // to clear form of entered value after submit
    newPizza.pizzaSize = $(".pizzaSize").val();

    $("input:checkbox[name=pizzaTopping]:checked").each(function () {
      newPizza.pizzaToppings.push($(this).val());
      atLeastOneToping = true;
    });

    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes
    newPizza.individualPrice = newPizza.calculatePrice(this.pizzaSize, this.pizzaToppings)

    newOrder.addOrder(newPizza);
    $(".pizzaOrderBlock").hide();
    $(".cartView").show();
    $("#cName").text(newOrder.name);

    if (atLeastOneToping === true) { //List toppings only if 1 or more topping were chosen
      // $("#showToppings").show();
      // newPizza.renderToppingList();
    }

    // newOrder.totalPrice = newOrder.orderCost(newOrder);
    $("ul#cart").empty();
    let lotOfNbsp = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    Object.keys(newOrder.pizzas).forEach(function (key) {
      const tempPizzaSize = newOrder.findPizza(key).pizzaSize;
      const tempIndividualPrice = newOrder.findPizza(key).individualPrice;
      const tempPizzaToppings = newOrder.findPizza(key).pizzaToppings;
      let mainLine = "<br><li># " + key + ": Pizza Size : <strong>" + tempPizzaSize + "</strong>" + lotOfNbsp + lotOfNbsp + lotOfNbsp + "$" + tempIndividualPrice + "</li>";
      $("ul#cart").append(mainLine);
      tempPizzaToppings.forEach(function (topping) {
        let toppingLine = "<ol>     " + "&nbsp;&nbsp;&nbsp;" + topping + "</ol>";
        $("ul#cart").append(toppingLine);
      });
    });

    // newOrder.orderNoGenEstDeliveryTime(); // takes care of approxDeliveryTime and orderNumber

    // $("#customerName").text(newOrder.customerName);
    // $("#orderNumber").text(newOrder.orderNumber);
    let totalCost = `$${newOrder.orderCost(newOrder)}`;
    $("#totalCost").text(totalCost);
    if (newOrder.homeDelivery === true) {
      let tempDeliveryAdd = `${newOrder.street}, ${newOrder.city}, ${newOrder.state}, ZIP-${newOrder.zip}`;
      $("#deliveryAddress").text(tempDeliveryAdd);
      $(".hideDelivery").show();
    }
    // $(".cartView").show();
  });
});