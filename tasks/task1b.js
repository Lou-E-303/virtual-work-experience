const fs = require('fs');
const productList = JSON.parse(fs.readFileSync('../EngineeringChallenge/resources/productList.json', 'utf8'));
const faultyBasket = [5067373267184, "",  "Ginsters Large Cornish Pasty 227G", "Tesco Imperator Carrot 450G", 5157373267184, 5067373267123, "Tesco Finest Honey Roast Ham 125G", 5057373267984, 505737326798,  ];

console.log("\nThe total price of the basket is: £" + getTotalPriceOfFaultyBasket(faultyBasket) + "\n");

function getTotalPriceOfFaultyBasket(faultyBasket) {
    let totalPrice = 0;

    for (let i = 0; i < faultyBasket.length; i++)
    {
        product = faultyBasket[i];
        if (product !== "") {
            let price = getPriceByNameOrGtin(product) || 0.00;
            totalPrice += price;
        }
    }

    return totalPrice.toFixed(2);
}

function getPriceByNameOrGtin(productNameOrGtin) {
    for (let i = 0; i < productList.products.length; i++) {
        let product = productList.products[i];
        let productElement = typeof productNameOrGtin === 'string' ? product.name : product.gtin;

        if (productElement == productNameOrGtin)
        {
            return productList.products[i].price;
        }
    }
}