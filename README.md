# Pizza Parlor

##### Date: **1/29/2021**


#### By **_Salim Mayan_**


## Description


A web application for a Pizza company where a user can choose one or more individual toppings (upto **seven**: Mushrooms, Kosher, Meat, Onions, Sausage, Bacon, Green Peppers, and Black Peppers) and a size (upto **four**: Small, Medium, Large, and Extra Large) to order a pizza and see the final cost.


- Allows user to choose toppings and size for the pizza they'd like to order.

- Allows user to order more than one pizza with different toppings.

- Created a pizza object constructor with properties for toppings and size.

- Created a prototype method for the cost of a pizza depending on the selections chosen.

## Description

#### Further Exploration

##### Added additional features:

- Styled site with CSS/image/animation.

- In `Order summary` relist toppings that user chose for each Pizza

- Offers `Carryout` and `Delivery` options (Later requires user to enter `Address` information).

- Provides an `Order Number` which is based of `Epoch Time`

- Provides an `Estimated Delivery Time` (for customer who choose `Delivery` option) which is roughly `Epoch Time` + 30 mins

- Included a `Refresh` (or `Go Back To Landing Page`) option should the user wish to restart order


| **Spec** |
```
Describe: Order.prototype.assignId()
Test: "It should increment Order.pizzaCount property by 1 with each call (starting value is 0)"
Expect(Order.pizzaCount).toEqual(1);

Describe: Order.prototype.addOrder(Pizza object)
Test: "It should, when called for the first time, add a key (value of 1) and an Object of type Pizza (as value) to Order.contacts (Order.contacts property is originally empty but gets populated with a unique key and Pizza object (as value) with each new order of pizza (Example for Pizza object is {pizzaSize: "Small", pizzaToppings: ["Mushroom", "Kosher Meat"], individualPrice: $14})"
Expect(Order.pizzaCount(Pizza Object).toEqual({1: Pizza Object});

Describe: Order.prototype.findPizza(key)
Test: "It should return the Pizza object stored in Order.contacts corresponding to the key passed as argument (Pizza object example is {pizzaSize: "Small", pizzaToppings: ["Mushroom", "Kosher Meat"], individualPrice: $14})"
Expect(Order.pizzas.toEqual({Pizza Object});

Describe: Order.prototype.orderCost(Order object)
Test: "It should collect all the keys in Order.pizzas property and return the total cost of Pizza objects accumulated"
Expect(total.toEqual(14);

```


## Setup/Installation Requirements

1. Clone this repository.

2. To run program open **_index.html_** from browser

3. Page is also hosted on [Github](https://rekjal.github.io/pizza-Parlor-E2-WW4)


## Known Bugs


* No known bugs at this time.


## Technologies Used

* HTML

* CSS

* Bootstrap

* JS

* JQuery


## Support and contact details

_Email no one with any questions, comments, or concerns._


### License

*{This software is licensed under the MIT license}*

Copyright (c) 2021 **_{Salim Mayan}_**