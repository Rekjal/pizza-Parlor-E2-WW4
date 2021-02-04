// This is the business (or back-end) logic:
function Order(isDelivery) {
  this.name = "";
  this.isDelivery = isDelivery;
  this.street = "";
  this.city = "";
  this.state = "";
  this.zip = "";
  this.approxDeliveryTime = "";
  this.orderNumber = "";
  this.pizzas = {};  //Property storing an empty object - list of Pizza's - each one has size, toppings, individual price
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
function Pizza(pizzaSize, pizzaToppings, individualPrice) {
  this.pizzaSize = pizzaSize;
  this.pizzaToppings = pizzaToppings;
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



// Everything below this line is the user interface (or front-end) logic:
$(document).ready(function () {
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

  $("form#deliveryForm").submit(function (event) {  //1a. Form where "delivery adddress" should be entered (for patrons who prefer delivery). Form submit will take user to Pizza Order Block
    event.preventDefault();
    $("#iconBlock").hide();
    $(".pizzaOrderBlock").show();
    newOrder = new Order(true);
    newOrder.name = ($("#customerName").val()).toUpperCase();
    newOrder.street = $("#inputAddress").val();
    newOrder.city = $("#inputCity").val();
    newOrder.state = $("#inputState").val();
    newOrder.zip = $("#inputZip").val();
  });

  $("form#carryOutForm").submit(function (event) {  //1b. Form where "Name" should be entered (for patron who prefer carryout). Form submit will take user to Pizza Order Block
    event.preventDefault();
    $("#iconBlock").hide();
    $(".pizzaOrderBlock").show();
    newOrder = new Order(false);
    newOrder.name = ($("#customerName2").val()).toUpperCase();
  });

  $("#anotherPizzaID").click(function (event) {  //3. Staging: Button click to take user back to pizza block to add another pizza (navigates back to 2. Pizza Order form)
    event.preventDefault();
    $(".cartView").hide();
    $(".pizzaOrderBlock").show();
  });


  $("button#finalizeOrder").click(function (e) {  //3. Staging: Button click for final checkout. Will take user to final view
    e.preventDefault();
    $(".pizzaOrderBlock").hide();
    $(".cartView").hide();
    $(".finalView").show();
    $("#cName1").text(newOrder.name);
    $("ul#cart1").empty();
    Object.keys(newOrder.pizzas).forEach(function (key) {
      const tempPizzaSize = newOrder.findPizza(key).pizzaSize;
      const tempIndividualPrice = newOrder.findPizza(key).individualPrice;
      const tempPizzaToppings = newOrder.findPizza(key).pizzaToppings;
      let mainLine1 = "<br><li># " + key + ": Pizza Size : <strong>" + tempPizzaSize + "</strong></li>";
      let mainLine2 = "<br><li>$" + tempIndividualPrice + "</li>";
      $("ul#cart1").append(mainLine1);
      $("ul#cart2").append(mainLine2);
      tempPizzaToppings.forEach(function (topping) {
        let toppingLine = "<ol>     " + "&nbsp;&nbsp;&nbsp;" + topping + "</ol>";
        $("ul#cart1").append(toppingLine);
          $("ul#cart2").append("<br>");
      });
    });
    let totalCost = `$${newOrder.orderCost(newOrder)}`;
    newOrder.orderNoGenEstDeliveryTime();
    $("#totalCost1").text(totalCost);
    if (newOrder.isDelivery === true) {
      let tempDeliveryAdd = `${newOrder.street}, ${newOrder.city}, ${newOrder.state}, ZIP-${newOrder.zip}`;
      $("#deliveryAddress1").text(tempDeliveryAdd);
      $(".hideDelivery").show();
    }
    $("#orderNum").text(newOrder.orderNumber);
    $("#deliveryTime").text(newOrder.approxDeliveryTime);
  });


  $('#pizzaOrderForm').submit(function (event) {   //2. Pizza Order form - form submit hides Pizza order form takes user to staging
    event.preventDefault();
    let pizzaSize = "";
    let pizzaToppings = [];
    let individualPrice = 0;
    let newPizza = new Pizza(pizzaSize, pizzaToppings, individualPrice);
    $('input[type="string"], textarea').val('');  // to clear form of entered value after submit
    newPizza.pizzaSize = $(".pizzaSize").val();
    $("input:checkbox[name=pizzaTopping]:checked").each(function () {
      newPizza.pizzaToppings.push($(this).val());
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes
    newPizza.individualPrice = newPizza.calculatePrice(this.pizzaSize, this.pizzaToppings)
    newOrder.addOrder(newPizza);
    $(".pizzaOrderBlock").hide();
    $("ul#cart3").empty();
    $("ul#cart4").empty();
    $(".cartView").show(); //unHide Staging page
    $("#cName").text(newOrder.name);
    Object.keys(newOrder.pizzas).forEach(function (key) {
      const tempPizzaSize = newOrder.findPizza(key).pizzaSize;
      const tempIndividualPrice = newOrder.findPizza(key).individualPrice;
      const tempPizzaToppings = newOrder.findPizza(key).pizzaToppings;
      let mainLine3 = "<br><li># " + key + ": Pizza Size : <strong>" + tempPizzaSize + "</strong></li>";
      let mainLine4 = "<br><li>$" + tempIndividualPrice + "</li>";
      $("ul#cart3").append(mainLine3);
      $("ul#cart4").append(mainLine4);
      tempPizzaToppings.forEach(function (topping) {
        let toppingLine = "<ol>     " + "&nbsp;&nbsp;&nbsp;" + topping + "</ol>";
        $("ul#cart3").append(toppingLine);
        $("ul#cart4").append("<br>");
      });
    });
    let totalCost = `$${newOrder.orderCost(newOrder)}`;
    $("#totalCost").text(totalCost);
    if (newOrder.isDelivery === true) {
      let tempDeliveryAdd = `${newOrder.street}, ${newOrder.city}, ${newOrder.state}, ZIP-${newOrder.zip}`;
      $("#deliveryAddress").text(tempDeliveryAdd);
      $(".hideDelivery").show();
    }
  });
});
