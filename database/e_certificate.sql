
CREATE DATABASE IF NOT EXISTS e_certificate_db;
USE e_certificate_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user'
);

CREATE TABLE certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    recipient_name VARCHAR(100),
    course_name VARCHAR(100),
    issue_date DATE,
    certificate_code VARCHAR(50) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
