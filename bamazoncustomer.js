//Required npm packages
let mysql = require("mysql");
let inquirer = require("inquirer");
//Connection information
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    //Enter unique "user:" name below
    user: "root",
    //Enter unique password below
    password: "rooot1",
    database: "bamazon_db"
});



//the display function is used to pull information from my sql table.
function display() {
    connection.query('SELECT item_id, product_name, price, department_name, stock_quantity FROM products', function (err, results) {
        console.log("Here is a list of all merchandise available in our store!");
        console.log("\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/");

        //loop used to cycle through all items in my inventory
        for (let i = 0; i < results.length; i++) {
            //selected Items will be returned in the console.log
            console.log("Product ID: " + results[i].item_id + "  Product Name: " + results[i].product_name + "  Price: $" + results[i].price + " Department: " + results[i].department_name + " Stock Quantity: " + results[i].stock_quantity);
            console.log("----------------------------------------------------------------------------------");
        }
        //questions function called which prompts user questions and takes order/updates inventory
        questions();
    });
};




//questions function will prompt user questions and update MySQL DB given the user input. Detailed below.
function questions() {
    //Prompts user questions
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What is the ID of the product you would like to buy?"
    }, {
        name: "quantity",
        type: "input",
        message: "How many of this item do you want?"
    }]).then(function (answer) {

        let idChosen = answer.product;
        let quantityChosen = answer.quantity;
        let specChars = /\D/g;
        //user input validation. letters and all special characters will not be accepted. 
        if (idChosen == "" || idChosen > 10 || idChosen.match(specChars) || quantityChosen == "" || quantityChosen > 10 || quantityChosen.match(specChars)) {
            console.log("please enter a valid item id");
            questions();

        } else if (answer.product <= 10) {

            //select product name, price, and stock quantity from the products table for the specific item id that was chosen.
            connection.query('SELECT product_name, price, stock_quantity FROM products WHERE item_id =' + idChosen,
                function (error, results) {


                    // newQuantity is set to equal to the current inventory amount minus the quantity of item the user selects
                    let newQuantity = results[0].stock_quantity - quantityChosen;
                    //if stock_quantity is less what than what the user wants to buy, console.log that there isnt enough inventory, then ask user if they want to 'chooseAnotherItem();' . 
                    if (results[0].stock_quantity < quantityChosen) {
                        console.log("There is not enough of this item to fulfill your order.")
                        chooseAnotherItem();
                    } else {
                        //if the amount of items is available to buy, the products table will update the quantity to reflect your purchase
                        connection.query("UPDATE products SET? WHERE?", [{
                            stock_quantity: newQuantity
                        }, {
                            item_id: idChosen
                        }]);
                        //console logs which will display the total cost of your order given the user input for quantity of items purchased and name of product purchased
                        if (quantityChosen === "1") {
                            console.log("Your total is: $" + results[0].price * quantityChosen + ". You have purchased " + quantityChosen + " " + results[0].product_name);
                            //after the purchase, the user will be asked if they want to continue with another purchase or 'Quit' the app. 
                            chooseAnotherItem();
                        } else {
                            console.log("Your total is: $" + results[0].price * quantityChosen + ". You have purchased " + quantityChosen + " " + results[0].product_name + "s");
                            //after the purchase, the user will be asked if they want to continue with another purchase or 'Quit' the app. 
                            chooseAnotherItem();
                        }
                    }
                });
        }
    });

}

//function that runs at the end of each purchase. function asks user if they would like to continue with another purchase or to 'Quit' the app. 
function chooseAnotherItem() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "Would you like to purchase more items?? If Yes, press 'Enter' to continue.(if No, enter 'Q' to Quit.)"
    }]).then(function (answer) {
        //checks if the user chose to Quit the app or proceed to be asked the questions(); again to purchase more items. 
        if (answer.product.toUpperCase() == "Q") {
            process.exit();
        } else {
            display();
        };
    });
};



//display function called to initialize app
display();