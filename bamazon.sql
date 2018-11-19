CREATE DATABASE bamazon;

-- use the db so that the code affects this db --
USE bamazon;

-- creates the products table in the db --
CREATE TABLE products (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

insert into products (product_name,department_name,price,stock_quantity)
values("bananas","fruits",4,100),("apples","fruits",2,100),("iphone","electronics",600,100),("Nintendo Switch","electronics",500,100),
("Laptop","electronics",1000,20),("computer mouse","electronics",10,100),("toothbrush","toiletries",5,100),("toothpaste","toiletries",3,100),
("watch","jewelry",30,100),("rings","jewelry",50,100);
