// import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
  
//   // Verifica si hay elementos en el carrito
//   if (!cartItems || cartItems.length === 0) {
//     document.querySelector(".product-list").innerHTML = '<p>Your cart is empty</p>';
//     // Actualizar el total a 0 cuando el carrito está vacío
//     document.getElementById("cart-total").textContent = "0.00";
//     return;
//   }
  
//   // Log para depuración
//   console.log("Cart contents:", cartItems);
  
//   try {
//     // Generamos HTML para cada item en el carrito
//     const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//     document.querySelector(".product-list").innerHTML = htmlItems.join("");

//     // IMPORTANTE: Añadimos event listeners a CADA botón de eliminación
//     document.querySelectorAll(".cart-card__remove").forEach(button => {
//       button.addEventListener("click", function(event) {
//         // Evitamos que el evento se propague
//         event.preventDefault();
//         event.stopPropagation();
        
//         // Obtenemos el ID del producto a eliminar
//         const id = this.getAttribute("data-id");
//         console.log("Removing product with ID:", id);
        
//         // Llamamos a la función con el ID correcto
//         removeFromCart(id);
//       });
//     });

//   } catch (error) {
//     console.error("Error al renderizar el carrito:", error);
//     document.querySelector(".product-list").innerHTML = '<p>Error al mostrar los productos del carrito</p>';
//   }
// }

// function calculateCartTotal() {
//   const cartItems = getLocalStorage("so-cart") || [];
//   const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

//   const totalElement = document.getElementById("cart-total");
//   if (totalElement) {
//     totalElement.textContent = total.toFixed(2);
//   }
// }

// function cartItemTemplate(item) {
//   console.log("Procesando item:", item);
  
//   try {
//     // Verificamos que el item tenga ID
//     if (!item || !item.Id) {
//       console.error("Item inválido o sin ID:", item);
//       return `<li class="cart-card divider">Error: Producto sin identificador</li>`;
//     }
    
//     // IMPORTANTE: Asegúrate que data-id tenga el ID correcto
//     const newItem = `<li class="cart-card divider">
//       <a href="#" class="cart-card__image">
//         <img
//           src="${item.Images.PrimaryMedium}"
//           alt="${item.Name}"
//         />
//       </a>
//       <a href="#">
//         <h2 class="card__name">${item.Name}</h2>
//       </a>
//       <span class="cart-card__remove" data-id="${item.Id}">X</span>
//       <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//       <p class="cart-card__quantity">qty: 1</p>
//       <p class="cart-card__price">$${item.FinalPrice}</p>
//     </li>`;

//     return newItem;
//   } catch (error) {
//     console.error("Error al generar la plantilla para el ítem:", item, error);
//     return `<li class="cart-card divider">Error al mostrar el producto</li>`;
//   }
// }

// // FUNCIÓN CLAVE: Esta es la que debemos arreglar
// function removeFromCart(id) {
//   console.log("Removiendo producto con ID:", id);
  
//   // Obtenemos los elementos actuales del carrito
//   let cartItems = getLocalStorage("so-cart");
  
//   // Verificación adicional para asegurar que cartItems sea un array
//   if (!Array.isArray(cartItems)) {
//     console.error("cartItems no es un array:", cartItems);
//     return;
//   }
  
//   console.log("Carrito antes de eliminar:", cartItems);
  
//   // Verificamos que el ID sea válido
//   if (!id) {
//     console.error("ID inválido para eliminar:", id);
//     return;
//   }
  
//   // IMPORTANTE: Creamos un nuevo array sin el item que queremos eliminar
//   const newCartItems = cartItems.filter(item => item.Id !== id);
//   console.log("Carrito después de filtrar:", newCartItems);
  
//   // Guardamos el nuevo carrito en localStorage
//   setLocalStorage("so-cart", newCartItems);
  
//   // Renderizamos de nuevo el carrito
//   renderCartContents();
  
//   // Actualizamos el total
//   calculateCartTotal();
// }

// // Cargamos el header y footer
// loadHeaderFooter();

// // Inicializamos el carrito
// renderCartContents();
// calculateCartTotal();

import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

// El problema principal parece estar en cómo se manejan los botones de eliminar
// y cómo se usa la función filter para eliminar elementos del carrito

// Función principal para renderizar el contenido del carrito
function renderCartContents() {
  // Obtener los elementos del carrito
  const cartItems = getLocalStorage("so-cart");
  
  // Verificar si hay elementos en el carrito
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = '<p>Your cart is empty</p>';
    // Actualizar el total a 0 cuando el carrito está vacío
    document.getElementById("cart-total").textContent = "0.00";
    return;
  }
  
  console.log("Contenido del carrito:", cartItems);
  
  try {
    // Generar HTML para cada ítem
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // IMPORTANTE: Añadir event listeners a cada botón de eliminar
    const removeButtons = document.querySelectorAll(".cart-card__remove");
    console.log(`Se encontraron ${removeButtons.length} botones de eliminar`);
    
    removeButtons.forEach(button => {
      button.addEventListener("click", function(e) {
        // Detener la propagación del evento
        e.preventDefault();
        e.stopPropagation();
        
        // Obtener el ID del botón
        const id = this.getAttribute("data-id");
        console.log(`Botón de eliminar clickeado. ID: ${id}`);
        
        // Llamar a la función removeFromCart con el ID correcto
        removeFromCart(id);
      });
    });
  } catch (error) {
    console.error("Error al renderizar el carrito:", error);
    document.querySelector(".product-list").innerHTML = '<p>Error al mostrar los productos del carrito</p>';
  }
}

// Función para calcular el total del carrito
function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }
}

// Plantilla para cada ítem del carrito
function cartItemTemplate(item) {
  try {
    // Verificar que el ítem tenga un ID válido
    if (!item || !item.Id) {
      console.error("Ítem inválido o sin ID:", item);
      return `<li class="cart-card divider">Error: Producto sin identificador</li>`;
    }
    
    // Crear el HTML para el ítem
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
      <button class="cart-card__remove" data-id="${item.Id}">X</button>
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

// FUNCIÓN CLAVE: Esta función elimina un producto específico del carrito
function removeFromCart(id) {
  console.log(`Eliminando producto con ID: ${id}`);
  
  // Obtener el carrito actual
  let cartItems = getLocalStorage("so-cart");
  
  // Verificar que cartItems sea un array
  if (!Array.isArray(cartItems)) {
    console.error("cartItems no es un array:", cartItems);
    cartItems = [];
    return;
  }
  
  // Verificar que el ID sea válido
  if (!id) {
    console.error("ID inválido para eliminar");
    return;
  }
  
  console.log("Carrito antes de eliminar:", cartItems);
  
  // IMPORTANTE: Crear un nuevo array SIN el ítem que queremos eliminar
  const newCartItems = [];
  
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].Id !== id) {
      newCartItems.push(cartItems[i]);
    } else {
      console.log(`Eliminando ítem: ${cartItems[i].Name} con ID: ${cartItems[i].Id}`);
    }
  }
  
  console.log("Carrito después de eliminar:", newCartItems);
  
  // Guardar el nuevo carrito en localStorage
  setLocalStorage("so-cart", newCartItems);
  
  // Renderizar el carrito nuevamente
  renderCartContents();
  
  // Actualizar el total
  calculateCartTotal();
}

// Cargar el header y footer
loadHeaderFooter();

// Inicializar el carrito
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM completamente cargado y analizado");
  
  // Un pequeño retraso para asegurar que todo esté cargado
  setTimeout(function() {
    renderCartContents();
    calculateCartTotal();
  }, 100);
});

// Renderizar el carrito inmediatamente
renderCartContents();
calculateCartTotal();