CREATE DATABASE todoapp;

CREATE TABLE todo(
    user_id BIGSERIAL, 
    todo_id BIGSERIAL PRIMARY KEY,
    description VARCHAR(1000),    
);

CREATE TABLE user(
    user_id BIGSERIAL PRIMARY KEY,
    password VARCHAR(100),
);