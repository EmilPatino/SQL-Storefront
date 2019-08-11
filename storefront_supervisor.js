require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
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
        message: "All Hail the Supervisor!",
        choices: ["View Product Sales by Department", "Create New Department"]
      })
      .then(function(answer) {
        if (answer.options === "View Product Sales by Department") {
          profit();
        }
        else if(answer.options === "Create New Department") {
          department();
        } 
      });
  }

function department() {
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "What is the department you would like to add?"
        },
        {
          name: "overhead",
          type: "input",
          message: "What is the departments's overhead cost?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
        },
      }       
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO departments SET ?",
          {
            department_name: answer.department,
            over_head_costs: answer.overhead || 0,
          },
          function(err) {
            if (err) throw err;
            console.log("Department successfully created!");
            start();
          }
        );
      });
  }

function profit() {

    

    connection.query("SELECT departments.department_id, products.department_name, products.product_sales, departments.over_head_costs FROM products INNER JOIN departments ON products.department_name = departments.department_name Group BY department_name ORDER BY departments.department_id;", function(err, res) {
    if (err) throw err;
    var table = new Table({
        head: ['Department ID', 'Department Name', 'Total Product Sales', 'Overhead Costs', 'Net Revenue']
    });

    for (var i = 0; i < res.length; i++) {
        
        table.push(
            [res[i].department_id, res[i].department_name, res[i].product_sales, res[i].over_head_costs, parseInt(res[i].product_sales - res[i].over_head_costs)]
        );
        
        }
        console.log(table.toString());
        start();
});
}