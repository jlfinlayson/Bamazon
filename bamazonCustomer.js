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
connection.connect(function (err) {
    if (err) throw err;
    showTable();
});

// Function to show the table and ask questions
function showTable() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
        }
    inquirer
        .prompt([
            {
                name: "itemID",
                type: "input",
                message: "What is the id of the item you would like to purchase?",
            },
            // {
            //     name: "quantity",
            //     type: "input",
            //     message: "How many would you like to purchase?",
            // }
        ])
        .then(function (answer) {
            // console.log(answer.itemID)
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id == answer.itemID) {
                    chosenItem = results[i];
                    console.log(chosenItem.product_name);
                }
            }
        })
    connection.end();
});
}