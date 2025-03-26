// import { setLocalStorage } from "./utils.mjs";

// function productDetailsTemplate(product) {
//   // Calculate discount based on SuggestedRetailPrice vs FinalPrice
//   let discountPercentage = 0;
//   let discountElement = '';
  
//   if (product.SuggestedRetailPrice && product.SuggestedRetailPrice > product.FinalPrice) {
//     discountPercentage = Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);
//     discountElement = `
//       <div class="discount-badge">
//         ${discountPercentage}% OFF
//       </div>
//     `;
//   }

//   return `<section class="product-detail">
//     <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <div class="product-image-container">
//       <img
//         class="divider"
//         src="${product.Image}"
//         alt="${product.NameWithoutBrand}"
//       />
//       ${discountElement}
//     </div>
//     <div class="product-price">
//       ${discountPercentage > 0 ? 
//         `<p class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</p>` : 
//         ''
//       }
//       <p class="product-card__price${discountPercentage > 0 ? ' discounted' : ''}">$${product.FinalPrice}</p>
//     </div>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }

// export default class ProductDetails {
//   constructor(productId, dataSource) {
//     this.productId = productId;
//     this.product = {};
//     this.dataSource = dataSource;
//   }
//   async init() {
//     // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
//     this.product = await this.dataSource.findProductById(this.productId);
//     // once we have the product details we can render out the HTML
//     this.renderProductDetails("main");
//     // once the HTML is rendered we can add a listener to Add to Cart button
//     // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
//     document
//       .getElementById("addToCart")
//       .addEventListener("click", this.addToCart.bind(this));
//   }
//   addToCart() {
//     setLocalStorage("so-cart", this.product);
//   }
//   renderProductDetails(selector) {
//     const element = document.querySelector(selector);
//     element.insertAdjacentHTML(
//       "afterBegin",
//       productDetailsTemplate(this.product)
//     );
//   }
// }

import { setLocalStorage, getLocalStorage, updateCartCount   } from "./utils.mjs";
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    // document
    //   .getElementById("addToCart")
    //   .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    try {
      // Añadir console.log para depuración
      console.log("Añadiendo al carrito:", this.product);
  
      // Verificar que el producto tenga los campos requeridos
      if (!this.product || !this.product.Id) {
        console.error("Producto inválido:", this.product);
        return;
      }
  
      // Obtener el carrito actual o crear uno nuevo si no existe
      let cartItems = getLocalStorage("so-cart");
      
      // Asegurarnos de que cartItems es un array
      if (!Array.isArray(cartItems)) {
        console.warn("cartItems no es un array, inicializando como array vacío");
        cartItems = [];
      }
      
      console.log("Carrito actual:", cartItems);
  
      // Añadir el producto al carrito
      cartItems.push(this.product);
  
      // Guardar el carrito actualizado
      setLocalStorage("so-cart", cartItems);
      console.log("Carrito actualizado:", cartItems);
  
      // Actualizar el contador del carrito
      // Importar esta función al inicio del archivo
      updateCartCount();
  
      // Opcional: Dar feedback al usuario
      alert("Producto añadido al carrito");
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      alert("Hubo un error al añadir el producto al carrito");
    }
  }

  // addProductToCart() {
  //   try {
  //     // Recuperar el carrito actual o crear uno nuevo si no existe
  //     let cartItems = getLocalStorage("so-cart");
  //     if (!Array.isArray(cartItems)) {
  //       cartItems = [];
  //     }
      
  //     console.log("Agregando al carrito:", this.product);
      
  //     // Añadir el producto al carrito
  //     cartItems.push(this.product);
      
  //     // Guardar el carrito actualizado
  //     setLocalStorage("so-cart", cartItems);
      
  //     // Notificar al usuario
  //     alert("Producto añadido al carrito");
  //   } catch (error) {
  //     console.error("Error al agregar producto al carrito:", error);
  //     alert("Hubo un problema al agregar el producto al carrito");
  //   }
  // }
// En ProductDetails.mjs, modifica la función renderProductDetails:
renderProductDetails() {
  // Selecciona el contenedor correcto
  const container = document.querySelector(".product-detail");
  if (!container) {
    console.error("No se encontró el contenedor .product-detail");
    return;
  }
  
  console.log("Renderizando detalles del producto:", this.product);
  
  container.innerHTML = `
    <h3 class="card__brand" id="productBrand">${this.product.Brand.Name}</h3>
    <h2 class="divider card__name" id="productName">${this.product.NameWithoutBrand}</h2>
    <img id="productImage" class="divider" src="${this.product.Images.PrimaryLarge}" alt="${this.product.NameWithoutBrand}" />    <p id="productColor" class="product__color">${this.product.Colors[0].ColorName}</p>
    <p id="productPrice" class="product-card__price">$${this.product.FinalPrice}</p>
    <p id="productDesc" class="product__description">${this.product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div>
  `;

  // Añadir event listener después de crear el botón
  const addToCartButton = document.getElementById('addToCart');
  if (addToCartButton) {
    console.log("Añadiendo listener al botón");
    addToCartButton.addEventListener('click', this.addToCart.bind(this));
  } else {
    console.error("No se encontró el botón #addToCart");
  }
}
}