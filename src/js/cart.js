import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   if (!cartItems) {
//     document.querySelector(".product-list").innerHTML = `<li class="cart-card divider">
//       <p class="empty-cart">Your cart is empty</p>
//     </li>`;
//     return;
//   }
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  
  // Verifica si hay elementos en el carrito
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = '<p>Your cart is empty</p>';
    return;
  }
  
  console.log("Contenido del carrito:", cartItems);
  
  try {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } catch (error) {
    console.error("Error al renderizar el carrito:", error);
    document.querySelector(".product-list").innerHTML = '<p>Error al mostrar los productos del carrito</p>';
  }
}

function cartItemTemplate(item) {
  console.log("Procesando item:", item);
  
  try {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

    return newItem;
  } catch (error) {
    console.error("Error al generar la plantilla para el ítem:", item, error);
    return `<li class="cart-card divider">Error al mostrar el producto</li>`;
  }
}
loadHeaderFooter();

renderCartContents();