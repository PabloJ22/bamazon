let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rooot1",
  database: "bamazon_db"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection Successful! connected as id " + connection.threadId);

  afterConnection();



});

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res, null, 2));
    // console.log(res);
    promptCustomer(res);

  });
}

function promptCustomer(res) {
  inquirer.prompt([{
    type: "input",
    name: "choice",
    message: "which item would you like to purchase?"

  }]).then(function (answer) {
    let correct = false;
    for (let i = 0; i < res.length; i++) {
      if (res[i].Product_Name == answer.choice) {
        correct = true;
        let product = answer.choice;
        let id = i;
        inquirer.prompt({
          type: "input",
          name: "quant",
          message: "How many would you like to buy?",
          validate: function (value) {
            if (isNaN(value) == false) {
              return true;
            } else {
              return false;
            }
          }
        }).then(function (answer) {
          if ((res[id].Stock_Quantity - answer.quant) > 0) {
            connection.query("UPDATE products SET Stock_Quantity ='" + (res[id].Stock_Quantity - answer.quant) + "' WHERE Product_Name='" + product + "'", function (err, res2) {
              console.log("Product Bought!");
              afterConnection();
            })

          } else {
            console.log("Not a valid selection!");
            promptCustomer();
          }
        })
      }
    }
  })
}