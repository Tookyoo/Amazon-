import { cart } from "./cart.js";

export function saveToStorage() {
  localStorage.setItem("mainCart", JSON.stringify(cart));
}
