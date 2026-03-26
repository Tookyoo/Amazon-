import {
  renderCheckout,
  renderCheckoutHeader,
} from "../components/pages/checkout-ui.js";
import { setupDelegateListener } from "../components/shared/cart-controller.js";

renderCheckoutHeader();
renderCheckout();
setupDelegateListener();
