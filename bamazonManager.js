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
            else if (answer.managerOptions === "Add to Inventory") {
                addInventory();
            }
            else if (answer.managerOptions === "Add a New Product") {
                addNewProduct();
            }
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
};

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
            if (results[i].stock_quantity <= 20) {
                table.push(
                    [results[i].item_id, results[i].product_name, results[i].department_name, "$" + results[i].price, results[i].stock_quantity]
                );
            }
        }
        console.log(table.toString());
    })

    connection.end();
};

function addInventory() {
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
                    name: "id",
                    type: "input",
                    message: "What is the id of the product would you like to add inventory to?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to add?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id == answer.id) {
                        chosenItem = results[i];
                    }
                }
                var newQuantity = (chosenItem.stock_quantity + parseInt(answer.quantity));

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("There are now " + newQuantity + " " + chosenItem.product_name + "s in stock.");

                        connection.end();
                    }
                );
            })
    })
};

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "What is the name of the product you would like to add?",
            },
            {
                name: "productDepartment",
                type: "input",
                message: "What department is the product you would like to add in?",
            },
            {
                name: "productPrice",
                type: "input",
                message: "What is the price of the product you would like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "productQuantity",
                type: "input",
                message: "What is the quantity of product you would like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },

        ])
        .then(function (answer) {
            inquirer
                .prompt([
                    {
                        name: "confirm",
                        type: "list",
                        message: ("Are you sure you add " + answer.productName + " ?"),
                        choices: ["YES", "NO"],
                    }
                ])
                .then(function (user) {
                    if (user.confirm === "YES") {
                        connection.query(
                            "INSERT INTO products SET ?",
                            {
                                product_name: answer.productName,
                                department_name: answer.productDepartment,
                                price: answer.productPrice,
                                stock_quantity: answer.productQuantity,
                            },
                            function (error) {
                                if (error) throw err;
                                console.log("You have successfully added " + answer.productQuantity + " " + answer.productName + ".");

                                connection.end();
                            }

                        )
                    }
                })
        })
}