const products = require("./products/products.service.js");
const inventory = require("./inventory/inventory.service.js");
const cart = require("./cart/cart.service.js");
const orders = require("./orders/orders.service.js");
const checkout = require("./checkout/checkout.service.js");
const customerManagement = require("./customerManagement/customerManagement.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(products);
  app.configure(inventory);
  app.configure(cart);
  app.configure(orders);
  app.configure(checkout);
  app.configure(customerManagement);
    // ~cb-add-configure-service-name~
};
