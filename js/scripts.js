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
  let time = 10;
  return time;
}

Pizza.prototype.calculatePrice = function (){
  let price = 1;
  return price;
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