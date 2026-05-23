# 🐾 PawFind — Pet Adoption & Care Info System

A full-stack web application that digitizes the pet adoption process for animal shelters. Built with React, Spring Boot, and MySQL.

## 🌟 Features

- Browse and search pets by species, age, size and gender
- Adopter personality match quiz
- Online adoption application with status tracking
- Admin dashboard with real-time statistics
- Vaccination and care records management
- Success stories feed
- Role-based access (Admin, Staff, Adopter)

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + CSS |
| Backend | Spring Boot (Java) |
| Database | MySQL |
| Version Control | Git + GitHub |

## 🚀 How to run

### Prerequisites
- Java 21
- Node.js
- MySQL

### Backend
```bash
cd backend
# Update application.properties with your MySQL password
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database
Run `database/schema.sql` in MySQL Workbench.

## 📱 Pages

- `/` — Home with carousel and stats
- `/pets` — Pet listings with search and filter
- `/pets/:id` — Pet detail page
- `/quiz` — Adopter match quiz
- `/adopt` — Adoption application form
- `/my-applications` — Track application status
- `/stories` — Success stories
- `/admin` — Admin dashboard
- `/admin/pets` — Manage pets
- `/admin/applications` — Review applications
- `/admin/stories` — Approve stories

## 👩‍💻 Developer

Built by Amandi — MIS Undergraduate Project 2025