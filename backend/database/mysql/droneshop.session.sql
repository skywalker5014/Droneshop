create database droneshop;

--@block
create table users (
    username varchar(255),
    email varchar(255) Primary Key,
    address text,
    contact_number int,
    password varchar(255)
);

--@block
create table products (
    product_name varchar(255),
    product_id int Primary Key,
    price int,
    description text,
    availability boolean,
    image_address varchar(255)
);

--@block
create table cart (
    email varchar(255),
    product_id int,
    quantity int,
    Foreign Key (email) references users(email),
    Foreign Key (product_id) references products(product_id)
)