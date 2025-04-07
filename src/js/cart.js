import { getLocalStorage, loadHeaderFooter,setLocalStorage  } from "./utils.mjs";

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
    // Actualizar el total a 0 cuando el carrito está vacío
    document.getElementById("cart-total").textContent = "0.00";
    return;
  }
  
  console.log("Cart contents:", cartItems);
  
  try {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Añadir event listeners a los botones de eliminación
    document.querySelectorAll(".cart-card__remove").forEach(button => {
      button.addEventListener("click", function() {
        const id = this.getAttribute("data-id");
        removeFromCart(id);
      });
    });

  } catch (error) {
    console.error("Error al renderizar el carrito:", error);
    document.querySelector(".product-list").innerHTML = '<p>Error al mostrar los productos del carrito</p>';
  }
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
  totalElement.textContent = total.toFixed(2);
  }
}
// renderCartContents();
// calculateCartTotal();

function cartItemTemplate(item) {
  console.log("Procesando item:", item);
  
  try {

    // Asegurarse de que item.Id existe y es accesible
    if (!item || !item.Id) {
      console.error("Item inválido o sin ID:", item);
      return `<li class="cart-card divider">Error: Producto sin identificador</li>`;
    }
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
    <span class="cart-card__remove" data-id="${item.Id}">X</span>

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

//Delete item
function removeFromCart(id) {
  // Obtener los elementos actuales del carrito
  let cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems)) {
    console.error("cartItems no es un array:", cartItems);
    return;
  }
  
  // Verificar que el ID es válido
  if (!id) {
    console.error("ID inválido para eliminar:", id);
    return;
  }
  // Filtrar para eliminar el item con el ID correspondiente
  cartItems = cartItems.filter(item => item.Id !== id);
  
  // Guardar el carrito actualizado
  setLocalStorage("so-cart", cartItems);
  
  // Volver a renderizar el carrito
  renderCartContents();
  
  // Actualizar el total
  calculateCartTotal();
}
loadHeaderFooter();

renderCartContents();
  // Actualizar el total
calculateCartTotal();