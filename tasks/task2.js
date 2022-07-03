const fs = require('fs');
const productList = JSON.parse(fs.readFileSync('../EngineeringChallenge/resources/productListWithTimeSensitivePromotions.json', 'utf8'));
const basket = [5057373267184, 5067373267184, 5127373267184, 5057373267187, 5057373267184];

console.log("\nThe total price of the basket is: £" + getTotalPriceOfBasket(basket) + "\n");

function getTotalPriceOfBasket(basket) {
    let totalPrice = 0;

    for (let i =0; i < basket.length; i++)
    {
        let price = getDiscountedPriceByGtin(basket[i]);
        totalPrice += price;
    }

    return totalPrice.toFixed(2);
}

function getDiscountedPriceByGtin(desiredGtin) {
    for (let i = 0; i < productList.products.length; i++) {

        const product = productList.products[i];

        if (product.gtin === desiredGtin)
        {
            const now = new Date();
            const promotionStartDate = new Date(product.startTime);
            const promotionEndDate = new Date(product.endTime);

            let price = product.price;

            if (promotionStartDate < now && now < promotionEndDate) {
                price -= product.discount;
            }

            return price;
        }
    }
}