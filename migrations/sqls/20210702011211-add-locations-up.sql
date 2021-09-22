CREATE TABLE IF NOT EXISTS locations
(
    ip_address INET PRIMARY KEY,
    latitude FLOAT,
    longitude FLOAT,
    city STRING,
    region STRING,
    country STRING
);