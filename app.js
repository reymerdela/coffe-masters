import Store from "./services/Store.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import {
  OrderPage,
  DetailsPage,
  MenuPage,
  ProductItem,
  CartItem,
} from "./components/index.js";
// const $ = () => document.querySelector.call(this, arguments);
// const $$ = () => document.querySelectorAll.call(this, arguments);
// HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);
// HTMLElement.prototype.off = (a, b) => this.removeEventListener(a, b);
// HTMLElement.prototype.$ = (s) => this.querySelector(s);
// HTMLElement.prototype.$ = (s) => this.querySelectorAll(s);

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  app.router.init();
  loadData();
});

window.addEventListener("cartchange", () => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
