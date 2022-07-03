const fs = require('fs');
const productList = JSON.parse(fs.readFileSync('../EngineeringChallenge/resources/productList.json', 'utf8'));
const basket = [5057373267184, 5067373267184, 5127373267184, 5057373267187, 5057373267184];

console.log("\nThe total price of the basket is: £" + getTotalPriceOfBasket(basket) + "\n");

function getTotalPriceOfBasket(basket) {
    let totalPrice = 0;

    for (let i =0; i < basket.length; i++)
    {
        let price = getPriceByGtin(basket[i]);
        totalPrice += price;
    }

    return totalPrice.toFixed(2);
}

function getPriceByGtin(desiredGtin) {
    for (let i = 0; i < productList.products.length; i++) {
        if (productList.products[i].gtin === desiredGtin)
        {
            return productList.products[i].price;
        }
    }
}