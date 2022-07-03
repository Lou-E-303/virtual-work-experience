# Virtual Work Experience 2022

Engineering challenges for a Virtual Work Experience week first held in June of 2022 for Year 10 students. The theme of the challenge set was 'applying promotions to baskets of products'. The students were encouraged to complete the tasks in JavaScript (as all the supporting material we provided was in JavaScript), but were allowed to use other languages if they wanted to. Around half of them decided to write in Python. One student wrote theirs in Clojure, and the rest were written in JavaScript.

I probably shouldn't make the full document public, but in short the tasks we gave the young people were as follows:

## Task 1:

Task Description: _Given a basket products which have no prices, and a separate list of prices for each product, can you determine the total price of the basket?_

### Task 1a:

An array representing a basket of GTINs was provided, with no prices associated with them e.g. `[5057373267184, 5067373267184, 5127373267184, 5057373267187, 5057373267184])`. The task was therefore to calculate the total price of the basket by referencing an accompanying JSON object with product information including name, GTIN and price.

### Task 1b:

This time, the array contained both valid and invalid data. The valid data could be either a product name string or GTIN. The invalid data included valid GTINs not present in the accompanying JSON, an empty string, `undefined` and an invalid product name string.

e.g. `[5067373267184, "",  "Ginsters Large Cornish Pasty 227G", "Loose Carrot 500G", 5157373267184, 5067373267123, "Honey Roast Ham 130G", 5057373267984, 505737326798, ];`

## Task 2:

Task Description: _We have now decided to add Promotions to some of the items! The price list now contains a start and end date of promotion for some of the products. Can you determine which products are currently on Promotion and adjust the pricing accordingly?_

## Task 3:

Task Description: _Some of the items in the basket are now eligible for multibuy savings! Some are ‘buy one, get one free’, others are ‘3 for 2’. Can you write some code to calculate which ones are eligible and adjust the pricing accordingly? For the products below the discount should only be applied if the promotion conditions are met. For example, Any3For3 requires 3 products to be purchased. What would happen if you purchased 4 Tuna cans?_

## Task 4 (Bonus):

Task Description: _We have an API endpoint for getting the Prices and Product information for the data previously given to you. Try using the endpoint to get the product information instead of getting it from the JSON object we gave you._

### Task 4a:

In this part of the task, we provided a dummy endpoint to serve up the same data which we provided in raw JSON format in Tasks 1-3.

### Task 4b:

In this part of the task, we locked the endpoint behind an access token (which we provided). The additional complexity is therefore for the young people to figure out how to include an access token in a programmatic API call.

## Task 5 (Bonus):

Task Description: _If you have progressed this far, have a go at hosting the code online! You might want to look at using a free tier of an online service._
