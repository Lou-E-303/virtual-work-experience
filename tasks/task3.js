const fs = require('fs');
const productList = JSON.parse(fs.readFileSync('../EngineeringChallenge/resources/productListWithMultibuyPromotions.json', 'utf8'));
const basket = [5057373267984, 5157373267184, 5057373267184, 5057376267184, 5157373267184, 5157373267184, 5457373267184, 5112373267184, 5457373267184, 5457373267184, 5157373267184, 5057373267187, 5457373267184];

console.log("\nThe total price of the basket is: £" + getTotalPriceOfBasket(basket) + "\n");

function getTotalPriceOfBasket(basket) {
    let totalPrice = applyAllDiscounts(basket);
    return totalPrice.toFixed(2);
}

function applyAllDiscounts() {
    let basketCopy = [...basket];
    let price = 0;

    price += applyRegularDiscounts(basketCopy)
    + applyBogofDiscounts(basketCopy)
    + applyAnyXForYDiscounts(basketCopy);

    return price;
}

function applyRegularDiscounts(basket) {
    let price = 0;

    for (let i = 0; i < basket.length; i++) {
        const product = productList.products[i];

        if (product?.discountType === 'LoyaltyPrice' && isPromotionActive(product)) {
            price += product.price - product.discount;
            basket.splice(i, 1);
        }
    }
    return price;
}

// This relies on there only being one product type with a Bogof discount
// TODO I'll come back and implement a more general solution in future
function applyBogofDiscounts(basket) {
    let price = 0;
    let promotionCount = 0;

    for (let i = 0; i < basket.length; i++) {
        const product = productList.products[i];

        if (product?.discountType === 'Bogof' && isPromotionActive(product)) {
            
            promotionCount++;

            if (promotionCount % 2 !== 0) { // I did think this was quite clever though! Literally, buy one get one free
                price += product.price;
            }

            basket.splice(i, 1);
        }
    }
    return price;
}

function applyAnyXForYDiscounts(basket) {
    let price = 0;
    let promotionCount = 0;

    for (let i = 0; i < basket.length; i++) {
        const product = productList.products[i];

        // TODO these two can be generalised into one function
        if (product?.discountType === 'Any3For3' && isPromotionActive(product)) {
            
            promotionCount++;

            if (promotionCount % 3 !== 0) {
                price += 3 - (product.price * 2);
            } else {
                price += product.price;
            }

            basket.splice(i, 1);
        }

        if (product?.discountType === 'Any4For3' && isPromotionActive(product)) {
            
            promotionCount++;

            if (promotionCount % 4 !== 0) {
                price += 3 - (product.price * 3);
            } else {
                price += product.price;
            }

            basket.splice(i, 1);
        }
    }
    return price;
}

function isPromotionActive(product) {
    const now = new Date();
    const promotionStartDate = new Date(product.startTime);
    const promotionEndDate = new Date(product.endTime);

    return (promotionStartDate < now && now < promotionEndDate);
}