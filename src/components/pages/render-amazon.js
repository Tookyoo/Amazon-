import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/format-currency.js";

renderAmazon();

export function renderAmazon() {
  const root = document.querySelector(".render-grid");
  root.innerHTML = products.map(productCard).join("");
}

function sizeChart(type, link) {
  return type === "clothing"
    ? `  <a href="${link}" target="_blank">
                  <span>Size Guide</span>
               </a> 
            `
    : "";
}

function productCard({ image, name, rating, priceCents, type, sizeChartLink }) {
  return `
           <div class="product-container">
               <div class="product-image-container">
                  <img
                  class="product-image"
                  src="${image}"
                  />
               </div>

               <div class="product-name limit-text-to-2-lines">
                  ${name}
               </div>

               <div class="product-rating-container">
                  <img
                  class="product-rating-stars"
                  src="src/data/images/ratings/rating-${rating.stars * 10}.png"
                  />
                  <div class="product-rating-count link-primary">${rating.count}</div>
               </div>

               <div class="product-price">$${formatCurrency(priceCents)}</div>

               <div class="product-quantity-container">
                  <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>  
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  </select>
               </div>

               <div class="product-spacer">
                  ${sizeChart(type, sizeChartLink)}
               </div>

               <div class="added-to-cart">
                  <img src="src/data/images/icons/checkmark.png" />
                  Added
               </div>

               <button class="add-to-cart-button button-primary">Add to Cart</button>
        </div>

      `;
}
