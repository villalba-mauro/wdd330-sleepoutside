// import ExternalServices from './ExternalServices.mjs';
// import ProductList from './ProductList.mjs';
// import { loadHeaderFooter, getParam } from './utils.mjs';

// loadHeaderFooter();

// // Get the category from URL parameter
// const category = getParam('category');

// // Set the title with the category name
// document.querySelector('#product-category-title').textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

// // Create an instance of ExternalServices class
// const dataSource = new ExternalServices();

// // Get the element where products will be rendered
// const listElement = document.querySelector('.product-list');

// // Create an instance of ProductList with correct category
// const myList = new ProductList(category, dataSource, listElement);

// // Initialize the list
// myList.init();

import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
