var mysql = require("mysql");
var inquirer = require("inquirer");

// Information to connect to mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
  });

// Connecting to mysql server and database
connection.connect(function(err){
    if (err) throw err;
    start();
});

// Function to show the table and ask questions
function start(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
        }
    });
    connection.end();
}