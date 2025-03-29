import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

// Función auxiliar para convertir los datos del formulario a un objeto JSON
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const jsonObject = {};
  
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });
  
  return jsonObject;
}

// Función para preparar los ítems del carrito para el checkout
function packageItems(items) {
  return items.map(item => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    };
  });
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.externalServices = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // Calcula el subtotal del carrito
    const summaryElement = document.querySelector(this.outputSelector + ' #cartTotal');
    
    // Calcula el total sumando el precio de cada item en el carrito
    this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice, 0);
    
    // Muestra el total en el HTML
    if (summaryElement) {
      summaryElement.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrdertotal() {
    // Calcula impuestos: 6% del subtotal
    this.tax = this.itemTotal * 0.06;
    
    // Calcula envío: $10 por el primer ítem, $2 por cada ítem adicional
    this.shipping = 10 + (this.list.length - 1) * 2;
    
    // Calcula el total del pedido
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    // Actualiza el HTML con los valores calculados
    document.querySelector(this.outputSelector + ' #tax').textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector(this.outputSelector + ' #shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector(this.outputSelector + ' #orderTotal').textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    // Convierte los datos del formulario a un objeto JSON
    const formData = formDataToJSON(form);
    
    // Crea el objeto de orden según el formato requerido
    const order = {
      orderDate: new Date().toISOString(),
      fname: formData.fname,
      lname: formData.lname,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      cardNumber: formData.cardNumber,
      expiration: formData.expiration,
      code: formData.securityCode,
      items: packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };
    
    try {
      // Envía el pedido al servidor
      const response = await this.externalServices.checkout(order);
      
      console.log('Respuesta del servidor:', response);
      return response;
    } catch (error) {
      console.error('Error en el proceso de checkout:', error);
      throw error;
    }
  }
}