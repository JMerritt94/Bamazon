drop table if exists products;
use bamazon; 
create table products(
item_id INTEGER(10) AUTO_INCREMENT,
product_name varchar(50) ,
department_name varchar(50),
price integer(10),
stock_quantity integer(10),
  PRIMARY KEY (item_id));

insert into products (product_name,department_name,price,stock_quantity)
values("bananas","fruits",4,100),("apples","fruits",2,100),("iphone","electronics",600,100),("Nintendo Switch","electronics",500,100),
("Laptop","electronics",1000,20),("computer mouse","electronics",10,100),("toothbrush","toiletries",5,100),("toothpaste","toiletries",3,100),
("watch","jewelry",30,100),("rings","jewelry",50,100);

