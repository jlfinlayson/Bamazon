var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');
var colors = require('colors');

// Information to connect to mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

// Connecting to mysql server and database
connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "managerOptions",
            type: "list",
            message: "Would you like to : ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add a New Product"]
        })
        .then(function (answer) {
            if (answer.managerOptions === "View Products for Sale") {
                viewProducts();
            }
            else if (answer.managerOptions === "View Low Inventory") {
                lowInventory();
            }
            //else if (answer.managerOptions === "Add to Inventory") {
            //     addInventory();
            // } 
            //else if (answer.managerOptions === "Add a New Product") {
            //     addNewProduct();
            // }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var table = new Table({
            head: ["Id#", "Product Name", "Department", "Price", "Quantity"],
            style: {
                head: ["bold", "green"],
                border: ["green"],
            }
        });
        for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, "$" + results[i].price, results[i].stock_quantity]
            );
        }
        console.log(table.toString());
    })
    connection.end();
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var table = new Table({
            head: ["Id#", "Product Name", "Department", "Price", "Quantity"],
            style: {
                head: ["bold", "green"],
                border: ["green"],
            }
        });
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity <= 5){
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, "$" + results[i].price, results[i].stock_quantity]
            );
        }
    }
        console.log(table.toString());
    })

    connection.end();
}
