// const cTable = require('console.table');
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   } 
// ]); 

let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rooot1",
  database: "bamazon_db"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  start();

});

function afterConnection() {
  connection.query("SELECT item_id, Product_Name, Price FROM products", function (err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res, null, 2));
    console.log(res);

  });
}



// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "product-ID",
      type: "checkbox",
      message: "What product would you like to buy? (Input product ID#)",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      // choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {
      name: "quantity",
      type: "input",
      message: "How many would you like to buy?"

    })
    .then(function (answer) {
      var query = "SELECT item_id FROM products WHERE item_id = ?";
      connection.query(query, {
        artist: answer.artist
      }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}







// function initialPrompt() {
//   inquirer
//     .prompt({

//       name: "product-ID",
//       type: "input",
//       message: "What product would you like to buy? (Input product ID#) "
//     })