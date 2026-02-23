-- Admin User Credentials for CleanCrew
-- Run this SQL script in your MySQL database (cleancrew1)

INSERT INTO user (user_name, user_mail, user_password, user_role) 
VALUES ('Admin', 'admin@clewcrew.com', 'admin123', 'Admin');

-- If you want to verify the user was created, run:
-- SELECT * FROM user WHERE user_mail = 'admin@clewcrew.com';
