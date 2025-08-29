
CREATE DATABASE water_delivery;

CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE,
    is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    customer_id INT NOT NULL REFERENCES customers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    address VARCHAR(200) NOT NULL,
    location VARCHAR(200),
    district_id INT REFERENCES districts(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE delivery_staff (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    vehicle_number VARCHAR(50),
    district_id INT REFERENCES districts(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE water_products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    volume_liters INT NOT NULL CHECK (volume_liters > 0),
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    delivery_staff_id INT REFERENCES delivery_staff(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    order_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'pending'
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    product_id BIGINT NOT NULL REFERENCES water_products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    total_price NUMERIC(12,2) NOT NULL
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
    payment_date DATE DEFAULT CURRENT_DATE,
    method VARCHAR(50) NOT NULL CHECK (method IN ('cash','card','online'))
);
