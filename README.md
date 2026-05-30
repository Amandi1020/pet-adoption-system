# 🐾 PawFind — Pet Adoption & Care Info System

<div align="center">

![PawFind Banner](https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80)

**A full-stack web application that digitizes the pet adoption process for animal shelters.**

Built with React · Spring Boot · MySQL

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.x-6DB33F?style=flat&logo=spring)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat&logo=mysql)](https://www.mysql.com/)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat&logo=openjdk)](https://adoptium.net/)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Pages & Routes](#pages--routes)
- [User Roles](#user-roles)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Developer](#developer)

---

## 📖 About the Project

PawFind was built to solve a real problem — animal shelters in Sri Lanka manage hundreds of pets using paper registers and WhatsApp groups. This system digitizes the entire adoption process, making it easier, faster, and more transparent for shelters, staff, and adopters.

### 🎯 The problem it solves

| Before PawFind | After PawFind |
|---|---|
| Pet records on paper | Digital pet profiles with photos |
| WhatsApp application process | Online adoption application form |
| No status tracking | Real-time application status tracking |
| Manual vaccination records | Digital vaccination & care logs |
| No analytics | Admin dashboard with live stats |
| Word of mouth only | Public success stories feed |

---

## ✨ Features

### 🐾 For Adopters
- Browse and search pets by species, age, size and gender
- View full pet profiles with photos and health records
- Take the personality match quiz to find the right pet
- Submit adoption applications online
- Track application status in real time
- Share success stories after adoption
- Contact the shelter via contact form

### ⚙️ For Admin
- Dashboard with real-time statistics
- Manage pet listings — add, edit, delete
- Review and approve or reject applications
- Auto-updates pet status to Adopted when approved
- Moderate and approve success stories
- View all registered users

### 🏥 For Shelter Staff
- Add and update pet profiles
- Log vaccination records per pet
- Record vet visits and care notes
- View assigned applications

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js 18 | UI components and pages |
| Styling | Pure CSS | Custom brown/cream theme |
| Routing | React Router DOM | Page navigation |
| Backend | Spring Boot 4 (Java 21) | REST API server |
| ORM | Spring Data JPA + Hibernate | Database access |
| Database | MySQL 8 | Data storage |
| Email | EmailJS | Contact form emails |
| Images | Unsplash API | Free animal photos |
| Version Control | Git + GitHub | Code management |

---

## 📁 Project Structure

```
pet-adoption-system/
│
├── frontend/                     ← React app (VS Code)
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── PetCard.jsx
│       │   ├── Footer.jsx
│       │   ├── Spinner.jsx
│       │   ├── Toast.jsx
│       │   └── BackToTop.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── PetList.jsx
│       │   ├── PetDetail.jsx
│       │   ├── AdoptForm.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Quiz.jsx
│       │   ├── Stories.jsx
│       │   ├── MyApplications.jsx
│       │   ├── Contact.jsx
│       │   ├── About.jsx
│       │   ├── CareGuide.jsx
│       │   ├── FAQ.jsx
│       │   ├── NotFound.jsx
│       │   └── admin/
│       │       ├── Dashboard.jsx
│       │       ├── ManagePets.jsx
│       │       ├── Applications.jsx
│       │       └── AdminStories.jsx
│       ├── services/
│       │   ├── api.js
│       │   ├── petService.js
│       │   └── authService.js
│       ├── styles/
│       │   └── *.css
│       └── context/
│           └── AuthContext.jsx
│
├── backend/                      ← Spring Boot (IntelliJ)
│   └── src/main/java/com/petadoption/
│       ├── controller/
│       │   ├── AuthController.java
│       │   ├── PetController.java
│       │   ├── ApplicationController.java
│       │   ├── VaccinationController.java
│       │   └── StoryController.java
│       ├── service/
│       │   ├── PetService.java
│       │   ├── UserService.java
│       │   └── ApplicationService.java
│       ├── repository/
│       │   ├── PetRepository.java
│       │   ├── UserRepository.java
│       │   ├── ApplicationRepository.java
│       │   ├── VaccinationRepository.java
│       │   └── StoryRepository.java
│       ├── model/
│       │   ├── Pet.java
│       │   ├── User.java
│       │   ├── AdoptionApplication.java
│       │   ├── Vaccination.java
│       │   ├── CareRecord.java
│       │   └── SuccessStory.java
│       └── PetAdoptionApplication.java
│
└── database/
    └── schema.sql                ← Run once in MySQL Workbench
```

---

## 🗄️ Database Schema

```
users
├── id (PK)
├── name
├── email (UNIQUE)
├── password
├── role (ADMIN / STAFF / ADOPTER)
└── created_at

pets
├── id (PK)
├── name
├── species
├── breed
├── age (stored in months)
├── gender (Male / Female)
├── size (Small / Medium / Large)
├── status (AVAILABLE / ADOPTED)
├── description
├── added_by (FK → users)
└── created_at

applications
├── id (PK)
├── pet_id (FK → pets)
├── adopter_id (FK → users)
├── status (PENDING / REVIEWING / APPROVED / REJECTED)
├── home_type
├── has_children
├── experience
├── reason
├── notes
├── reviewed_by
├── reviewed_at
└── created_at

vaccinations
├── id (PK)
├── pet_id (FK → pets)
├── vaccine_name
├── date_given
├── next_due_date
└── given_by

care_records
├── id (PK)
├── pet_id (FK → pets)
├── type (VET / FEEDING / GROOMING)
├── description
├── recorded_by (FK → users)
└── recorded_at

success_stories
├── id (PK)
├── pet_id (FK → pets)
├── adopter_id (FK → users)
├── story_text
├── photo_url
├── is_approved
└── created_at
```

---

## 🔌 API Endpoints

### Pets
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/pets | Get all pets |
| GET | /api/pets/:id | Get pet by ID |
| GET | /api/pets/available | Get available pets |
| POST | /api/pets | Add new pet |
| PUT | /api/pets/:id | Update pet |
| DELETE | /api/pets/:id | Delete pet |

### Auth & Users
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/login | Login user |
| POST | /api/users/register | Register user |
| GET | /api/users/:id | Get user by ID |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/applications | Submit application |
| GET | /api/applications | Get all applications |
| GET | /api/applications/adopter/:id | Get by adopter |
| PUT | /api/applications/:id/status | Update status |

### Vaccinations
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/vaccinations/pet/:id | Get pet vaccinations |
| POST | /api/vaccinations | Add vaccination |
| DELETE | /api/vaccinations/:id | Delete vaccination |

### Stories
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/stories | Get all stories |
| POST | /api/stories | Submit story |
| PUT | /api/stories/:id/approve | Approve story |

---

## 📱 Pages & Routes

| Route | Page | Access |
|---|---|---|
| / | Home — carousel, stats, features | Public |
| /pets | Pet listings with search and filter | Public |
| /pets/:id | Full pet profile page | Public |
| /quiz | Adopter personality match quiz | Public |
| /adopt | Adoption application form | Logged in |
| /my-applications | Track application status | Logged in |
| /stories | Success stories feed | Public |
| /care-guide | Pet care guide by species | Public |
| /about | About PawFind | Public |
| /contact | Contact form | Public |
| /faq | Frequently asked questions | Public |
| /login | Login page | Public |
| /register | Register page | Public |
| /admin | Admin dashboard with stats | Admin only |
| /admin/pets | Manage pet listings | Admin only |
| /admin/applications | Review applications | Admin only |
| /admin/stories | Approve stories | Admin only |

---

## 👥 User Roles

### Admin
- Full system access
- Approve or reject adoption applications
- When approved → pet status auto-changes to Adopted
- Add, edit and delete pet listings
- View analytics dashboard
- Moderate success stories

### Shelter Staff
- Add and update pet profiles
- Log vaccination and care records
- View assigned applications

### Adopter
- Browse and search all available pets
- Submit adoption applications
- Track own application status
- Share success stories
- Take the match quiz

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

```
Java 21+
Node.js 18+
MySQL 8+
Git
```

### 1 — Clone the repository

```bash
git clone https://github.com/Amandi1020/pet-adoption-system.git
cd pet-adoption-system
```

### 2 — Set up the database

Open MySQL Workbench and run:

```bash
database/schema.sql
```

This creates the `pet_adoption_db` database with all 6 tables and sample data.

### 3 — Configure the backend

Open `backend/src/main/resources/application.properties` and update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pet_adoption_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 4 — Run the backend

Open the `backend/` folder in IntelliJ IDEA and click the green ▶ Run button.

Or from terminal:
```bash
cd backend
./mvnw spring-boot:run
```

Spring Boot starts on:
```
http://localhost:8080
```

### 5 — Run the frontend

```bash
cd frontend
npm install
npm run dev
```

React starts on:
```
http://localhost:5173
```

### 6 — Test the app

Open Chrome and go to:
```
http://localhost:5173
```

**Default admin login:**
```
Email:    admin@pawfind.com
Password: admin123
```

---

## 📸 Screenshots

### Home Page
> Beautiful carousel hero with real animal photos, live stats, and how-it-works section

### Pet Listings
> Search and filter pets by species, age, size and gender

### Pet Detail
> Full pet profile with photos, health info, and adoption button

### Match Quiz
> 7-question personality quiz that suggests the perfect pet

### Admin Dashboard
> Real-time stats, manage pets, review applications

### Contact Page
> Contact form with EmailJS integration

---

## 🎨 Color Palette

| Color | Hex | Usage |
|---|---|---|
| Brown | #8D6E63 | Primary buttons, navbar, headers |
| Dark Brown | #6D4C41 | Hover states, accents |
| Darker Brown | #4E342E | Text, footer |
| Cream | #FFF8E7 | Page backgrounds |
| Beige | #D7CCC8 | Borders, secondary elements |
| Light Beige | #EFEBE9 | Card backgrounds, sections |

---

## 👩‍💻 Developer

**Amandi**
MIS Undergraduate — 2nd Year
University Project 2025

- GitHub: [@Amandi1020](https://github.com/Amandi1020)

---

## 📄 License

This project is built for academic and portfolio purposes.

---

<div align="center">
Made with ❤️ and lots of 🐾 by Amandi
</div>