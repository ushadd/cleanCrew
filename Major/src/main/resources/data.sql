-- Admin User Credentials for CleanCrew
-- This file runs automatically on Spring Boot startup

INSERT INTO user (user_name, user_mail, user_password, user_role) 
VALUES ('Admin', 'admin@clewcrew.com', 'admin123', 'Admin')
ON DUPLICATE KEY UPDATE user_name = 'Admin';
