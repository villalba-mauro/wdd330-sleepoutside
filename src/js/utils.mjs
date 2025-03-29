// // wrapper for querySelector...returns matching element
// export function qs(selector, parent = document) {
//   return parent.querySelector(selector);
// }
// // or a more concise version if you are into that sort of thing:
// // export const qs = (selector, parent = document) => parent.querySelector(selector);

// // retrieve data from localstorage
// export function getLocalStorage(key) {
//   return JSON.parse(localStorage.getItem(key));
// }

// // save data to local storage
// export function setLocalStorage(key, data) {
//   localStorage.setItem(key, JSON.stringify(data));
// }

// // set a listener for both touchend and click
// export function setClick(selector, callback) {
//   qs(selector).addEventListener("touchend", (event) => {
//     event.preventDefault();
//     callback();
//   });
//   qs(selector).addEventListener("click", callback);
// }

// export function getParam(param) {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const product = urlParams.get(param);

//   return product;
// }

// export function renderListWithTemplate(
//   templateFn,
//   parentElement,
//   list,
//   position = "afterbegin",
//   clear = false
// ) {
//   const htmlStrings = list.map(templateFn);
//   if (clear) {
//     parentElement.innerHTML = "";
//   }
//   parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
// }

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
// retrieve data from localstorage
export function getLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al recuperar datos del localStorage:", error);
    return [];
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  try {
    const jsonData = JSON.stringify(data);
    console.log(`Guardando en localStorage [${key}]:`, jsonData);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error(`Error al guardar [${key}] en localStorage:`, error);
  }
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)

  console.log(product);

  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  if(clear) {
    parentElement.innerHTML = '';
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join('')); 
}
// Añade esto a utils.mjs
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}
// Añade esto a utils.mjs
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
// Añade esto a utils.mjs
// export async function loadHeaderFooter() {
//   // Determinar la ruta base según la ubicación actual
//   const path = window.location.pathname;
//   let pathPrefix = './';
  
//   // Ajustar la ruta según donde nos encontremos
//   if (path.includes('/product_pages/') || path.includes('/cart/') || path.includes('/product_listing/')) {
//     pathPrefix = '../';
//   }
  
//   try {
//     console.log("Loading templates from:", `${pathPrefix}partials/header.html`);
//     const headerTemplate = await loadTemplate(`${pathPrefix}partials/header.html`);
//     const footerTemplate = await loadTemplate(`${pathPrefix}partials/footer.html`);
    
//     const headerElement = document.getElementById("main-header");
//     const footerElement = document.getElementById("main-footer");
    
//     if (headerElement) {
//       console.log("Rendering header");
//       renderWithTemplate(headerTemplate, headerElement);
//       // Actualizar el contador del carrito después de cargar el header
//       updateCartCount();
//     }
    
//     if (footerElement) {
//       console.log("Rendering footer");
//       renderWithTemplate(footerTemplate, footerElement);
//     }
//   } catch (error) {
//     console.error('Error loading header/footer:', error);
//   }
// }

export async function loadHeaderFooter() {
  const path = window.location.pathname;
  let pathPrefix = './';
  
  if (path.includes('/product_pages/') || path.includes('/cart/') || path.includes('/checkout/') || path.includes('/product_listing/')) {
    pathPrefix = '../';
  }
  
  try {
    const headerTemplate = await loadTemplate(`${pathPrefix}partials/header.html`);
    const footerTemplate = await loadTemplate(`${pathPrefix}partials/footer.html`);
    
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");
    
    if (headerElement) {
      renderWithTemplate(headerTemplate, headerElement);
      updateCartCount();
    }
    
    if (footerElement) {
      renderWithTemplate(footerTemplate, footerElement);
    }
  } catch (error) {
    console.error('Error loading header/footer:', error);
  }
}
// Añade esta función a utils.mjs
export function updateCartCount() {
  // Obtener los productos del carrito
  const cartItems = getLocalStorage("so-cart") || [];
  
  // Buscar el elemento del contador
  const cartCountElement = document.getElementById("cart-count");
  
  // Actualizar el contador sólo si existe el elemento
  if (cartCountElement) {
    // Si hay elementos en el carrito, mostrar el número y hacer visible el contador
    if (cartItems.length > 0) {
      cartCountElement.textContent = cartItems.length;
      cartCountElement.classList.add("show-badge"); // Esta clase la definiremos en CSS
    } else {
      // Si no hay elementos, ocultar el contador o mostrar 0
      cartCountElement.textContent = "0";
      cartCountElement.classList.remove("show-badge");
    }
  }
}