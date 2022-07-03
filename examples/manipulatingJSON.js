// Import 'file system' library, which allows us to manipulate files

const fs = require('fs');

// Parse our JSON file to a JavaScript object we can manipulate

const productList = JSON.parse(fs.readFileSync('../EngineeringChallenge/productList.json', 'utf8'));

// Print our JS object to the console to prove that we've got it!

console.log(productList);

// Now we can manipulate our object
// For example if we just wanted just the price of the first product...

const firstProductName = productList.products[0].name;
const firstProductPrice = productList.products[0].price;
console.log("The price of " + firstProductName + " is £" + firstProductPrice);