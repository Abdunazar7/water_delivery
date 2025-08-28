-- Active: 1756346283078@@localhost@5432@water_delivery

-- Tables were created using pg admin GUI but here are scripts

CREATE DATABASE water_delivery

CREATE TABLE IF NOT EXISTS customers
(
    id integer NOT NULL DEFAULT nextval('customers_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(15) COLLATE pg_catalog."default",
    email character varying(30) COLLATE pg_catalog."default",
    is_active boolean DEFAULT false,
    CONSTRAINT customers_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS regions
(
    id integer NOT NULL DEFAULT nextval('customers_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT regions_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS water_products
(
    id integer NOT NULL DEFAULT nextval('water_products_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default",
    volume_liters numeric,
    price numeric,
    CONSTRAINT water_products_pkey PRIMARY KEY (id)
)
