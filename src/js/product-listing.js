// import ProductData from './ProductData.mjs';
// import ProductList from './ProductList.mjs';
// import { loadHeaderFooter, getParam } from './utils.mjs';

// loadHeaderFooter();

// // Get the category from URL parameter
// const category = getParam('category');

// // Set the title with the category name
// document.querySelector('#product-category-title').textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

// // Create an instance of ProductData class
// const dataSource = new ProductData();

// // Get the element where products will be rendered
// const listElement = document.querySelector('.product-list');

// // Create an instance of ProductList with correct category
// const myList = new ProductList(category, dataSource, listElement);

// // Initialize the list
// myList.init();

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
