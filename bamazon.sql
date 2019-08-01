-- Drops bamazon_DB if it already exists
DROP DATABASE IF EXISTS bamazon_DB;
-- Creats a database called bamazon_DB
CREATE DATABASE bamazon_DB;

-- Tells mySQL which database to use
USE bamazon_DB;

-- Creating product table
CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

-- Pulls data from the products table in bamazon_DB
SELECT * FROM bamazon_DB.products;

-- Creates new rows
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amethyst Cluster", "Home Decor", 15, 44);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tea Tree Oil", "Health & Beauty", 8, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Reusable Water Bottle", "Sports", 23, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Across the Universe", "Movies", 10, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Almond Cow", "Appliances", 250, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Selenite Want", "Home Decor", 7, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Alchemist", "Books", 18, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spiralizer", "Appliances", 65, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doublenest ENO", "Sports", 52, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Witch Hazel", "Health & Beauty", 9, 29);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Hitchhiker's Guide to the Galaxy", "Books", 37, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Royal Tenenbaums", "Movies", 22, 71);