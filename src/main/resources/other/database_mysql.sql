DROP SCHEMA orders;
CREATE SCHEMA orders;
USE orders;

CREATE TABLE user (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	code VARCHAR(70),
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	telephone_number VARCHAR(20),
	email VARCHAR(90),
	address VARCHAR(150)
);

CREATE TABLE product (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50),
	bar_code VARCHAR(70),
	description VARCHAR(500),
	price FLOAT,
    quantity FLOAT,
	version LONG
);

CREATE TABLE purchase (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	buyer INTEGER,
	purchase_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer) REFERENCES user (id)
);

CREATE TABLE product_in_purchase (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	related_purchase INTEGER,
	product INTEGER,
    quantity INTEGER,
    FOREIGN KEY (related_purchase) REFERENCES purchase (id),
    FOREIGN KEY (product) REFERENCES product (id)
);
