// This is the business (or back-end) logic:
function Pizza(customerName, pizzaSize, pizzaToppings, homeDeliveryStatus) { //constructor/blue print \
  this.orderNumber;
  this.customerName = customerName;
  // this.deliveryAddress;
  this.pizzaSize = pizzaSize;
  this.pizzaToppings = pizzaToppings;
  this.homeDeliveryStatus;
  this.approxDeliveryTime;
  this.totalPrice
}

Pizza.prototype.orderNoGenEstDeliveryTime = function (){
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

Pizza.prototype.calculatePrice = function (){
  var totalPrice = 0;
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
  this.totalPrice = sizePrice + (this.pizzaToppings.length * 2);
  return this.totalPrice;
}

Pizza.prototype.renderToppingList = function () {
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
    $("#addressBlock").toggle();
    
  });

  $('#carryout').click(function (e) {
    e.preventDefault();
  

    
  });

  $('#formOne').submit(function (event) {
    event.preventDefault();
    $("#toppingsDiv").hide();
    let customerName = "";
    let pizzaSize = "";
    let pizzaToppings = [];
    let atLeastOneToping = false;

    let newOrder = new Pizza(customerName, pizzaSize, pizzaToppings, true);
    newOrder.orderNoGenEstDeliveryTime();  //Generates Order# based off Epoch time; Estimates delivery time be adding 30 mins to order placement time

    newOrder.customerName = $("#cusName").val();
    $('input[type="string"], textarea').val('');  // to clear form of entered value after submit
    newOrder.pizzaSize = $(".pizzaSize").val();

    $("input:checkbox[name=pizzaTopping]:checked").each(function () {
      newOrder.pizzaToppings.push($(this).val());
      atLeastOneToping = true;
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes

    newOrder.totalPrice = newOrder.calculatePrice(this.pizzaSize, this.pizzaToppings)
    $("#totalAmount").text("$" + newOrder.totalPrice);
    if (atLeastOneToping === true) { //List toppings only if 1 or more topping were chosen
      $("#showToppings").show();
      newOrder.renderToppingList();
    }
    $("#customerName").text(newOrder.customerName);
    $("#orderNumber").text(newOrder.orderNumber);
    if (newOrder.homeDeliveryStatus === true) {
      $("#address").text(newOrder.deliveryAddress);
      $("#approximatedTime").text(newOrder.approxDeliveryTime);
      $("#showAddress").show();
    }
    $("#showPrice").show();
    console.log(newOrder);
  });
});