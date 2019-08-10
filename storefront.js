var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "storefront_db"
});

connection.connect(function(err) {
  if (err) throw err;
  listing();
});

function listing() {
    connection.query("SELECT item_id, product_name, department_name, price FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("Displaying all items: \n Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price);
        }
    
        inquirer
        .prompt([
          {
            name: "item",
            type: "input",
            message: "Select Item ID to purchase: ",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
          }
        ])
        .then(function(answer) {
          var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
          connection.query(query, { item_id: answer.item }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
              console.log("Product Name: " + res[i].product_name + " || Stock: " + res[i].stock_quantity + " || Price: " + res[i].price);
              
            
            if (res[i].stock_quantity > parseInt(answer.quantity)) {
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: parseInt(res[i].stock_quantity - answer.quantity)
                    },
                    {
                      item_id: answer.item
                    }
                  ],
                );
                console.log("Order placed successfully! Total cost: " + parseInt(answer.quantity * res[i].price) + "\n");
              }
              else {
                // bid wasn't high enough, so apologize and start over
                console.log("Insufficient quantity! \n");
              }
            }
        });

        listing();
    });
});
}