
-- ### Challenge #1: Customer View (Minimum Requirement)
DROP DATABASE IF EXISTS bamazon;
-- 1. Create a MySQL Database called `bamazon`.
CREATE DATABASE bamazon;
USE bamazon;
-- 2. Then create a Table inside of that database called `products`.
CREATE TABLE products(
-- 3. The products table should have each of the following columns:

--    * item_id (unique id for each product)
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
--    * product_name (Name of product)
    product_name VARCHAR(30) NOT NULL,
--    * department_name
    department_name VARCHAR(30) NOT NULL,
--    * price (cost to customer)
    price DECIMAL NOT NULL,
--    * stock_quantity (how much of the product is available in stores)
    stock_quantity INTEGER(10),
-- Sets id as this table's primary key which means all data contained within it will be unique --
    PRIMARY KEY (id)
);

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Shampoo bar", "Health & Beauty", 12.25, 2),
    ("Conditioner bar", "Health & Beauty", 14.99, 17),
    ("Windex", "Home & Kitchen", 6.25, 12),
    ("Cheerios", "Pantry", 1.99, 202),
    ("Pancake mix", "Pantry", 3.30, 32),
    ("Deep cleaning", "Home & Business Services", 100.00, 20),
    ("Gardening", "Home & Business Services", 75.00, 10),
    ("Staples", "Office Products", 0.99, 1000),
    ("Kitty litter", "Pet Supplies", 1, 1),
    ("GI Jane", "Toys & Games", 24.99, 78);

SELECT * FROM products;
