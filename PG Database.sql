Create Database pg;
USE pg;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    password VARCHAR(200) NOT NULL,
    role VARCHAR(15) NOT NULL DEFAULT 'tenant',
	email_otp VARCHAR(6),
	otp_expiration_time DATETIME,
	userProfile VARCHAR(255),
	dateOfBirth DATE,
	gender ENUM('Male', 'Female', 'Other'),
	aadharNumber VARCHAR(12),
	aadharCardImg VARCHAR(255),
	panCardNumber VARCHAR(10),
	panCardImg VARCHAR(255)
);

CREATE TABLE vendors(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    vendorName VARCHAR(100),
    pgName VARCHAR(100),
    contactNumber VARCHAR(15),
    whatsappNumber VARCHAR(15),
    vendorsEmail VARCHAR(100) UNIQUE,
	addressLine1 VARCHAR(255),
    addressLine2 VARCHAR(255),
    landmark VARCHAR(100),
    city VARCHAR(50),
    pinCode VARCHAR(10),
    gender ENUM('Male', 'Female', 'Other'),
    
    totalRooms INT DEFAULT 0,
    
    acRooms INT DEFAULT 0,
    acRoomBeds INT DEFAULT 0,
    acRoomBedPrice DECIMAL(10,2) DEFAULT 0.00,
    
	nonAcRooms INT DEFAULT 0,
    nonAcRoomBeds INT DEFAULT 0,
    nonAcRoomBedPrice DECIMAL(10,2) DEFAULT 0.00,
    
    pgImage VARCHAR(255),
    
    hotWater BOOLEAN DEFAULT FALSE,
    broadBandFacility BOOLEAN DEFAULT FALSE,
    gym BOOLEAN DEFAULT FALSE,
    library BOOLEAN DEFAULT FALSE,
    meal TEXT,
    
    pgLicenseNumber VARCHAR(50),
    pgLicenseImage VARCHAR(255),
    
	aadharNumber VARCHAR(12),
    aadharCardImg VARCHAR(255),
    panCardNumber VARCHAR(10),
	panCardImg VARCHAR(255),
    
    FOREIGN KEY (userId) REFERENCES users(Id) ON DELETE CASCADE
); 

CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE ,
    type ENUM('Breakfast', 'Dinner', 'Other') NOT NULL,
    menu TEXT
);

CREATE TABLE breakFast(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    status ENUM('Available', 'Cancel'),
	isApproved ENUM('Approved', 'Disapproved', 'Pending') DEFAULT 'Pending',
    FOREIGN KEY (userId) REFERENCES users(Id) ON DELETE CASCADE
);

CREATE TABLE dinner(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    status ENUM('Available', 'Cancel'),
	isApproved ENUM('Approved', 'Disapproved', 'Pending') DEFAULT 'Pending',
    FOREIGN KEY (userId) REFERENCES users(Id) ON DELETE CASCADE
);

CREATE TABLE request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    description TEXT,
    status VARCHAR(50),
    requestDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender INT NOT NULL,	
    receiver INT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
USE PG