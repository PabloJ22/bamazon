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