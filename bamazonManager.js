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