import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";



const listing = new ProductList("Tents", dataSource, element);

loadHeaderFooter();

listing.init();


