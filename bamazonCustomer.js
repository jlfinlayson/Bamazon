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
        else {
            console.log(results);
        }
    });
    connection.end();
}