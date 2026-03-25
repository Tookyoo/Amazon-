import { renderAmazon } from "../components/pages/amazon-ui.js";
import {
  setupDelegateListener,
  showQuantity,
} from "../components/shared/cart-controller.js";

showQuantity();
renderAmazon();
setupDelegateListener();
