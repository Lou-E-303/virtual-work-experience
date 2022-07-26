const fs = require('fs');
const productList = JSON.parse(fs.readFileSync('../EngineeringChallenge/resources/productListWithMultibuyPromotions.json', 'utf8'));
const basket = [5057373267984, 5157373267184, 5057373267184, 5057376267184, 5157373267184, 5157373267184, 5457373267184, 5112373267184, 5457373267184, 5457373267184, 5157373267184, 5057373267187, 5457373267184];

console.log("\nThe total price of the basket is: £" + getTotalPriceOfBasket(basket) + "\n");

function getTotalPriceOfBasket(basket) {
    let totalPrice = applyAllDiscounts(basket);
    return totalPrice.toFixed(2);
}

function applyAllDiscounts() {
    let price = 0;
    price += applyRegularDiscounts(basket)
    + applyBogofDiscounts(basket)
    + applyAnyXForYDiscounts(basket);

    return price;
}

function applyRegularDiscounts(basket) {
    let price = 0;

    for (let i = 0; i < basket.length; i++) {
        const product = productList.products[i];

        if (product?.discountType === 'LoyaltyPrice' && isPromotionActive(product)) {
            price += product.price - product.discount;
        }
    }
    return price;
}

// NOTE: this relies on there only being one product type with a Bogof discount
// A more general solution would be better

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
        }
    }
    return price;
}

function applyAnyXForYDiscounts(basket) {
    let price = 0;
    let promotionCount = 0;

    for (let i = 0; i < basket.length; i++) {
        const product = productList.products[i];

        if (product?.discountType.indexOf('Any') !== -1 && isPromotionActive(product)) {
            promotionCount++;
            const discountType = product.discountType.split('');

            const numberOfProducts = discountType.slice(3, 4).pop();
            const costForBundle = discountType.slice(-1).pop();

            if (promotionCount % numberOfProducts !== 0) {
                price += costForBundle - (product.price * (numberOfProducts - 1));
            } else {
                price += product.price;
            }
        }
    }
    return price;
}

function isPromotionActive(product) {
    if (product) {
        const now = new Date();
        const promotionStartDate = new Date(product.startTime);
        const promotionEndDate = new Date(product.endTime);

        return (promotionStartDate < now && now < promotionEndDate);
    } else {
        return false;
    }
}