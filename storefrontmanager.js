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
  start();
});

function start() {
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "View and Manage the Store's Inventory",
        choices: ["All Products", "Low Inventory", "Add to Inventory", "New Product"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.options === "All Products") {
          listing();
        }
        else if(answer.options === "Low Inventory") {
          low();
        } 
        
        else if(answer.options === "Add to Inventory") {
          add();
        }
        
        else if(answer.options === "New Product") {
          newProd();
        }
      });
  }

function listing() {
    connection.query("SELECT * FROM products", function(err, res) {
    console.log("Displaying all items: \n");
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity);
        }
    console.log("\n");
    start();
    });
}

function low() {
    var query = "SELECT * FROM products WHERE stock_quantity <100";
    console.log("Displaying items with less than 70 items: \n");
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("\n");
        start();
    });
  }

function newProd() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the product name you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the product's department?"
      },
      {
        name: "stock",
        type: "input",
        message: "What is the product's stock quantity?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the product's price?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
      },
    }       
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.department,
          price: answer.price || 0,
          stock_quantity: answer.stock || 0
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was entered successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function add() {
  
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Displaying all items: \n");
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Stock Quantity: " + res[i].stock_quantity);
        }
        console.log("\n");
    });
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Enter the item ID for the product that you would like to add stock to?"
      },
      {
        name: "stock",
        type: "input",
        message: "How much stock would you like to add?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
      },
    }       
    ])
    .then(function(answer) {

        var item = answer.item;
        var addStock = parseInt(answer.stock);
        var query = "Select stock_quantity FROM products WHERE ?";

            connection.query(query, {item_id: item}, function(err, res) {
            if (err) throw err;

                var itemStock = parseInt(res[0].stock_quantity);
                var totalStock = addStock += itemStock;

                var updateQuery = "UPDATE products SET stock_quantity = " + totalStock + " WHERE item_id = " + item;
        
                    connection.query(updateQuery, function(err, data) {
                    if (err) throw err;  
                    
                    console.log("\n Your product was entered successfully! \n");
                    start();
                    });
            });
    });
}