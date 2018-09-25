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

    });
};



//display function called to initialize app
display();