
DROP DATABASE bamazon_db;

CREATE DATABASE
IF NOT EXISTS bamazon_db;
USE bamazon_db;


CREATE TABLE products
(
    item_id int(11) NOT NULL
    AUTO_INCREMENT,
  Product_Name varchar
    (150) DEFAULT NULL,
  Department_Name varchar
    (100) DEFAULT NULL,
  Price decimal
    (10,2) DEFAULT NULL,
  Stock_Quantity int
    (100) DEFAULT NULL,
  PRIMARY KEY
    (id)
) ;


    INSERT INTO products
    VALUES
        (1, 'call of duty WWII', 'Games', 45.15, 77),
        (2, 'motor scooter', 'transportation', 89.99, 120),
        (3, 'Police uniform', 'Costume', 30.25, 75),
        (4, 'pack of 5 note books', 'school supplies', 10.15, 50),
        (5, '20 pack of pencils', 'school supplies', 5.15, 80),
        (6, 'remote control car', 'toys', 25.15, 30),
        (7, 'limited edition invisible cloak', 'rarities', 100000.25, 1),
        (8, 'paint ball gun', 'friendly firearms', 50.15, 60),
        (9, 'flying carpet', 'rarities', 100000.25, 1),
        (10, 'Neuralyzer', 'rarities', 100000.30, 2);




