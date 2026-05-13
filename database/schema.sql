CREATE DATABASE IF NOT EXISTS pet_adoption_db;
USE pet_adoption_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'STAFF', 'ADOPTER') DEFAULT 'ADOPTER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(50),
  breed VARCHAR(100),
  age INT,
  gender ENUM('Male', 'Female'),
  size ENUM('Small', 'Medium', 'Large'),
  status ENUM('AVAILABLE', 'ADOPTED') DEFAULT 'AVAILABLE',
  description TEXT,
  added_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (added_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  adopter_id INT NOT NULL,
  status ENUM('PENDING', 'REVIEWING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  home_type VARCHAR(100),
  has_children BOOLEAN,
  experience VARCHAR(255),
  reason TEXT,
  notes TEXT,
  reviewed_by INT,
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (adopter_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS vaccinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vaccine_name VARCHAR(100),
  date_given DATE,
  next_due_date DATE,
  given_by VARCHAR(100),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);

CREATE TABLE IF NOT EXISTS care_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  type ENUM('VET', 'FEEDING', 'GROOMING'),
  description TEXT,
  recorded_by INT,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);

CREATE TABLE IF NOT EXISTS success_stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  adopter_id INT NOT NULL,
  story_text TEXT,
  photo_url VARCHAR(255),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (adopter_id) REFERENCES users(id)
);

-- Sample Data
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@pawfind.com', 'admin123', 'ADMIN'),
('Staff Member', 'staff@pawfind.com', 'staff123', 'STAFF'),
('Test Adopter', 'adopter@pawfind.com', 'adopter123', 'ADOPTER');

INSERT INTO pets (name, species, breed, age, gender, size, status, description, added_by) VALUES
('Bruno', 'Dog', 'Golden Retriever', 2, 'Male', 'Large', 'AVAILABLE', 'Friendly and energetic dog', 2),
('Luna', 'Cat', 'Siamese', 1, 'Female', 'Small', 'AVAILABLE', 'Calm and playful indoor cat', 2),
('Sunny', 'Bird', 'African Grey Parrot', 3, 'Male', 'Small', 'AVAILABLE', 'Vocal and intelligent parrot', 2),
('Coco', 'Rabbit', 'Holland Lop', 1, 'Female', 'Small', 'ADOPTED', 'Gentle and calm rabbit', 2),
('Max', 'Dog', 'Labrador', 4, 'Male', 'Large', 'AVAILABLE', 'Loyal and active dog', 2),
('Mimi', 'Cat', 'Persian', 2, 'Female', 'Medium', 'AVAILABLE', 'Fluffy and gentle cat', 2);