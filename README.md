# 🐾 PawFind — Pet Adoption & Care Info System

<div align="center">

**A full-stack web application that digitizes the pet adoption process for animal shelters in Sri Lanka.**

Built with React · Spring Boot · MySQL

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.x-6DB33F?style=flat&logo=spring)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat&logo=mysql)](https://www.mysql.com/)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat&logo=openjdk)](https://adoptium.net/)

</div>

---

## 📖 About

PawFind was built to solve a real problem — animal shelters in Sri Lanka manage hundreds of pets using paper registers and WhatsApp groups. This system digitizes the entire adoption process, making it easier, faster, and more transparent for shelters, staff, and adopters.

### The problem it solves

| Before PawFind | After PawFind |
|---|---|
| Pet records on paper | Digital pet profiles with photos |
| WhatsApp application chaos | Structured online adoption forms |
| No status visibility | Real-time application tracking |
| Manual vaccination records | Digital health & vaccination logs |
| No analytics | Admin dashboard with live stats |
| Word of mouth only | Public success stories feed |
| No record of enquiries | Contact messages saved and viewable by admin |

---

## ✨ Features

### For Adopters
- Browse and search pets by species, age, size and gender
- View full pet profiles with photos and health records
- Personality match quiz — 7 questions to find the right pet
- Submit adoption applications tied to the specific pet viewed
- Track application status in real time on a personal dashboard
- Share success stories after adoption
- Contact the shelter via a working contact form

### For Admin
- Real-time dashboard with stats and adoption rate
- Manage pet listings — add (with month/year age stepper), edit, delete
- Review and approve or reject applications
- Pet status automatically updates to Adopted when an application is approved (and reverts to Available if rejected)
- Moderate success stories before they go public
- View and mark contact messages as read

### For Shelter Staff
- Add and update pet profiles
- Log vaccination records per pet
- Record vet visits and care notes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18 + Pure CSS |
| Routing | React Router DOM |
| Backend | Spring Boot 4 + Java 21 |
| ORM | Spring Data JPA + Hibernate |
| Database | MySQL 8 |
| Email | EmailJS (form wiring in place) |
| Version Control | Git + GitHub |

---

## 📁 Project Structure

```
pet-adoption-system/
├── frontend/                     ← React app
│   └── src/
│       ├── assets/images/        ← pet photos, carousel, UI, login/contact banners
│       ├── components/           ← Navbar, PetCard, Footer, Toast, Spinner, BackToTop
│       ├── pages/                ← Home, PetList, PetDetail, Quiz, Login, Register, etc.
│       │   └── admin/            ← Dashboard, ManagePets, Applications, Stories, Messages
│       ├── services/             ← API calls (api.js, petService.js, authService.js)
│       └── styles/                ← CSS files
├── backend/                      ← Spring Boot
│   └── src/main/java/com/petadoption/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       └── model/
└── database/
    └── schema.sql
```

---

## 🗄️ Database Tables

| Table | Description |
|---|---|
| users | Admins, staff and adopters |
| pets | All pet listings with status (AVAILABLE / ADOPTED) |
| applications | Adoption applications, tied to a specific pet + adopter, with approval workflow |
| vaccinations | Pet vaccination records |
| care_records | Vet visits and care logs |
| success_stories | Post-adoption stories pending/approved |
| contact_messages | Messages submitted through the Contact page |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/pets | Get all pets |
| GET | /api/pets/:id | Get pet by ID |
| GET | /api/pets/available | Get available pets |
| POST | /api/pets | Add new pet |
| PUT | /api/pets/:id | Update pet |
| DELETE | /api/pets/:id | Delete pet |
| POST | /api/auth/login | Login |
| POST | /api/users/register | Register |
| POST | /api/applications | Submit application (pet ID + adopter ID required) |
| GET | /api/applications | Get all applications |
| GET | /api/applications/adopter/:id | Get applications for one adopter |
| PUT | /api/applications/:id/status | Update status — auto-updates pet status |
| GET | /api/vaccinations/pet/:id | Get pet vaccinations |
| POST | /api/stories | Submit story |
| PUT | /api/stories/:id/approve | Approve story |
| POST | /api/contact | Submit a contact message |
| GET | /api/contact | Get all contact messages (admin) |
| PUT | /api/contact/:id/read | Mark a message as read |

---

## 📱 Pages

| Route | Page |
|---|---|
| / | Home — carousel, real-time stats, featured pets, species browse |
| /pets | Pet listings with search and species filter |
| /pets/:id | Full pet profile with adopt button |
| /quiz | Adopter match quiz |
| /adopt/:petId | Adoption application form for a specific pet |
| /my-applications | Track status of your own applications |
| /stories | Success stories |
| /care-guide | Pet care by species, with direct browse links |
| /about | About PawFind |
| /contact | Contact form |
| /faq | FAQ |
| /login, /register | Auth pages with glassmorphism design |
| /admin | Admin dashboard |
| /admin/pets | Manage pets |
| /admin/applications | Review applications |
| /admin/stories | Approve stories |
| /admin/messages | View contact submissions |

---

## 👥 User Roles

| Role | Access |
|---|---|
| Admin | Full system, approve applications, manage all data |
| Staff | Add pets, log care records |
| Adopter | Browse, apply, track, share stories |

---

## 🚀 Getting Started

### 1 — Clone

```bash
git clone https://github.com/Amandi1020/pet-adoption-system.git
cd pet-adoption-system
```

### 2 — Database

Open MySQL Workbench and run `database/schema.sql`

### 3 — Backend

Update `backend/src/main/resources/application.properties` with your MySQL password, then run in IntelliJ IDEA.

```
Runs on: http://localhost:8080
```

### 4 — Frontend

```bash
cd frontend
npm install
npm run dev
```

```
Runs on: http://localhost:5173
```

### 5 — Default login

```
Admin:   admin@pawfind.com  /  admin123
Staff:   staff@pawfind.com  /  staff123
Adopter: adopter@pawfind.com / adopter123
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|---|---|---|
| Brown | #8D6E63 | Primary, buttons, navbar |
| Dark Brown | #6D4C41 | Hover, accents |
| Darker Brown | #4E342E | Text, footer |
| Cream | #FFF8E7 | Page backgrounds |
| Beige | #D7CCC8 | Borders, secondary |
| Light Beige | #EFEBE9 | Card backgrounds |

---

## 🔭 Future Development

These are planned next steps to take PawFind further:

### Near term
- **Adoption certificate generation** — auto-generate a downloadable PDF certificate (pet name & photo, adopter name, adoption date, shelter signature/stamp) the moment an application is approved
- **Real email delivery** — connect the Contact form and application status changes to EmailJS / a real SMTP service so adopters and admins get actual email notifications, not just in-app messages
- **JWT-based authentication** — replace the current localStorage-only session with proper JWT tokens and Spring Security, including password hashing (BCrypt)
- **Pagination & lazy loading** — for pet listings and admin tables as the dataset grows beyond a few dozen records

### Mid term
- **Image upload for pets** — let admin/staff upload pet photos directly through the UI instead of editing code, storing files (e.g. via S3 or local disk) and saving the URL in the database
- **SMS notifications** — integrate a service like Twilio so adopters get a text when their application status changes
- **Advanced search** — filters for age range, multiple species at once, and full-text search across descriptions
- **Vaccination & care record UI** — a dedicated admin screen to log and view a pet's full medical history (the backend API already exists)

### Long term
- **Deployment** — host the frontend on Vercel and the backend on Render/Railway with a managed MySQL instance, giving the project a public live URL
- **Multi-shelter support** — extend the data model so multiple shelters can each manage their own pets and staff within one platform
- **Donation module** — allow the public to make donations toward shelter operations, with receipts and a donor leaderboard
- **Mobile app** — a React Native version sharing the same Spring Boot backend
- **Analytics dashboard v2** — adoption trends over time, average time-to-adoption per species, and staff performance metrics

---

## 👩‍💻 Developer

**Amandi** — MIS Undergraduate, 2nd Year
University Project 2025
GitHub: [@Amandi1020](https://github.com/Amandi1020)

---

<div align="center">
Made with ❤️ and lots of 🐾 by Amandi
</div>