import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

// Inicializa el proceso de checkout
const myCheckout = new CheckoutProcess("so-cart", ".order-summary");
myCheckout.init();

// Calcula el total del pedido cuando se ingresa el código postal
document.querySelector("#zip").addEventListener("blur", function() {
  myCheckout.calculateOrdertotal();
});

// Maneja el envío del formulario
document.querySelector("#checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const form = document.forms.checkout;
  
  // Valida que todos los campos estén completos
  if (form.checkValidity()) {
    myCheckout.checkout(form)
      .then(response => {
        // Si la respuesta es exitosa, podríamos redirigir a una página de confirmación
        console.log("Pedido completado con éxito:", response);
        // Aquí podrías redirigir a una página de confirmación o mostrar un mensaje
        alert("Pedido completado con éxito!");
      })
      .catch(err => {
        console.error("Error al procesar el pedido:", err);
        alert("Hubo un error al procesar su pedido. Por favor, inténtelo de nuevo.");
      });
  } else {
    form.reportValidity();
  }
});
