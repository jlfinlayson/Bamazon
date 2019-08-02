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

// Function to show the table and ask questions
function start() {
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
        inquirer
            .prompt([
                {
                    name: "itemID",
                    type: "input",
                    message: "What is the id of the item you would like to purchase?",
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?",
                }
            ])
            .then(function (answer) {
                // gets the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id == answer.itemID) {
                        chosenItem = results[i];
                    }
                }

                // determines if there is enough inventory
                if (chosenItem.stock_quantity < answer.quantity) {
                    console.log("Insufficient quantity!");
                    connection.end();
                } else {
                    var totalPrice = (chosenItem.price * answer.quantity);
                    inquirer
                        .prompt([
                            {
                                name: "confirm",
                                type: "list",
                                message: ("Are you sure you want to buy " + answer.quantity + " " + chosenItem.product_name + "s for $" + totalPrice + "?"),
                                choices: ["YES", "NO"],
                            }
                        ])
                        .then(function (user) {
                            if (user.confirm === "YES") {
                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            stock_quantity: (chosenItem.stock_quantity - answer.quantity)
                                        },
                                        {
                                            item_id: chosenItem.item_id
                                        }
                                    ],
                                    function (error) {
                                        if (error) throw err;
                                        console.log("There are now " + chosenItem.stock_quantity + " " + chosenItem.product_name + "s in stock.");

                                        connection.end();
                                    }

                                );

                            }
                        })
                }
            })
    });
}