# PawFind - Pet Adoption & Care Information System

A full-stack web application for managing pet adoption listings, applications, success stories, contact messages, and pet care guidance.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.6-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

## Screenshots

![PawFind Home](docs/screenshots/home.png)

## Features

### Public and adopters

- Browse all pets, search by name, and filter by species.
- View pet details including photo, breed, age, gender, size, status, and description.
- Take a 7-question match quiz that suggests a dog, cat, bird, or rabbit.
- Register and log in; new registrations are always assigned the `ADOPTER` role.
- Submit a protected adoption application tied to a specific pet.
- Track application status from a personal `My Applications` page.
- Submit a success story after an approved adoption; stories remain private until an admin or staff member approves them.
- Read approved success stories and pet care guides.
- Send a contact message that is stored for admin/staff review.
- Use the responsive navigation, keyboard-accessible controls, lazy-loaded images, and per-page metadata.

### Admin and staff

- Access the protected admin pages at `/admin` through `/admin/messages`.
- View summary statistics for pets and applications.
- Create, edit, and delete pet listings, including image URL, status, and month/year age.
- Review applications and move them through `PENDING`, `REVIEWING`, `APPROVED`, or `REJECTED`.
- Approval marks the pet as `ADOPTED` and rejects other open applications for that pet.
- Rejecting an application releases the pet back to `AVAILABLE` when no approved application exists.
- Approve submitted success stories.
- View contact messages and mark them as read.
- Manage vaccination records through the API. There is currently no dedicated vaccination management screen.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router 7, CSS |
| Backend | Spring Boot 4.0.6, Java 21 |
| Persistence | Spring Data JPA, Hibernate, MySQL 8 |
| Authentication | JWT bearer tokens, BCrypt password hashing, Spring Security |
| Testing | JUnit 5, Mockito, MockMvc |
| Version Control | Git and GitHub |

## Project Structure

```text
pet-adoption-system/
├── frontend/
│   └── src/
│       ├── assets/images/     Images and fallbacks
│       ├── components/        Navbar, Footer, ProtectedRoute, PageMeta, etc.
│       ├── context/           Authentication state
│       ├── pages/             Public, adopter, auth, and admin pages
│       ├── services/          API client and backend service wrappers
│       ├── styles/            CSS files
│       └── utils/             Roles and shared image helpers
├── backend/
│   └── src/main/java/com/petadoption/
│       ├── config/            Security and password configuration
│       ├── controller/        REST controllers
│       ├── dto/               Request/response records
│       ├── exception/         API error handling
│       ├── model/             JPA entities
│       ├── repository/        Spring Data repositories
│       ├── security/          JWT filter and token service
│       └── service/           Business logic
├── database/
│   └── schema.sql             Database schema and optional sample pets
└── docs/screenshots/          README screenshot
```

## Configuration

The backend reads database credentials and the JWT signing key from environment variables. Real configuration files are ignored by Git; committed examples are safe to share.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `DB_URL` | No | `jdbc:mysql://localhost:3306/pet_adoption_db` | MySQL JDBC URL |
| `DB_USERNAME` | No | `root` | MySQL username |
| `DB_PASSWORD` | Yes | None | MySQL password |
| `JWT_SECRET` | Yes | None | JWT signing secret; use at least 32 random bytes |
| `JWT_EXPIRATION_MS` | No | `86400000` | Token lifetime in milliseconds |
| `SERVER_PORT` | No | `8080` | Backend HTTP port |
| `SHOW_SQL` | No | `false` | Hibernate SQL logging |
| `VITE_API_URL` | No | `http://localhost:8080/api` | Frontend API base URL |

## Getting Started

### Prerequisites

- Java 21
- Node.js and npm
- MySQL 8

### 1. Clone the repository

```bash
git clone https://github.com/Amandi1020/pet-adoption-system.git
cd pet-adoption-system
```

### 2. Create the database

Run `database/schema.sql` in MySQL Workbench or the MySQL command line. The script creates `pet_adoption_db`, the application tables, and optional sample pet listings. It does not create default user accounts.

### 3. Configure and start the backend

Copy the example configuration, set the required environment variables, then start Spring Boot.

PowerShell:

```powershell
Copy-Item backend\src\main\resources\application.properties.example backend\src\main\resources\application.properties
$env:DB_PASSWORD = "your-mysql-password"
$env:JWT_SECRET = "replace-with-at-least-32-random-characters"
cd backend
.\mvnw.cmd spring-boot:run
```

Bash:

```bash
cp backend/src/main/resources/application.properties.example backend/src/main/resources/application.properties
export DB_PASSWORD="your-mysql-password"
export JWT_SECRET="$(openssl rand -base64 48)"
cd backend
./mvnw spring-boot:run
```

The backend runs at `http://localhost:8080`. The copied `application.properties` is ignored by Git.

### 4. Configure and start the frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

On Windows, use `copy .env.example .env` instead. The frontend runs at `http://localhost:5173`. The backend CORS configuration currently allows that origin.

### 5. Create an admin or staff account

Register through `/register`; the account is created as an `ADOPTER`. To promote it, run:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

Use `STAFF` instead of `ADMIN` for a staff account. Admin and staff currently share the same protected admin pages and management permissions. No default credentials are seeded.

## API

All protected endpoints expect `Authorization: Bearer <token>`.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Log in and receive a JWT |
| POST | `/api/users/register` | Public | Register an adopter |
| GET | `/api/users/{id}` | Admin, Staff | Get a user without password data |
| GET | `/api/pets` | Public | Get all pets |
| GET | `/api/pets/available` | Public | Get available pets |
| GET | `/api/pets/{id}` | Public | Get one pet |
| POST | `/api/pets` | Admin, Staff | Add a pet |
| PUT | `/api/pets/{id}` | Admin, Staff | Update a pet |
| DELETE | `/api/pets/{id}` | Admin, Staff | Delete a pet |
| POST | `/api/applications` | Adopter | Submit an application for the authenticated user |
| GET | `/api/applications` | Admin, Staff | Get all applications |
| GET | `/api/applications/adopter/{adopterId}` | Admin, Staff, owning Adopter | Get one adopter's applications |
| PUT | `/api/applications/{id}/status?status=...` | Admin, Staff | Update application status |
| GET | `/api/stories` | Public | Get approved stories |
| GET | `/api/stories/all` | Admin, Staff | Get all stories |
| POST | `/api/stories` | Adopter | Submit a pending success story |
| PUT | `/api/stories/{id}/approve` | Admin, Staff | Approve a story |
| POST | `/api/contact` | Public | Submit a contact message |
| GET | `/api/contact` | Admin, Staff | Get all contact messages |
| PUT | `/api/contact/{id}/read` | Admin, Staff | Mark a message as read |
| GET | `/api/vaccinations/pet/{petId}` | Admin, Staff | Get vaccinations for a pet |
| POST | `/api/vaccinations` | Admin, Staff | Add a vaccination record |
| DELETE | `/api/vaccinations/{id}` | Admin, Staff | Delete a vaccination record |

## Business Rules

- Registration requires a name, unique email, and a password of at least 6 characters. The server ignores any client-supplied role and always creates an `ADOPTER`.
- Passwords are hashed with BCrypt and are never returned in API responses.
- A pet must be `AVAILABLE` before an application can be submitted.
- An adopter cannot have more than one `PENDING`, `REVIEWING`, or `APPROVED` application for the same pet.
- Application status transitions are restricted: `PENDING` can move to `REVIEWING`, `APPROVED`, or `REJECTED`; `REVIEWING` can move to `APPROVED` or `REJECTED`; finalized applications cannot change again.
- Only one application per pet can be approved. Approval also rejects other open applications for that pet.
- Success stories are created unapproved and only appear publicly after approval.

## Routes

| Route | Access | Page |
|---|---|---|
| `/` | Public | Home with stats, featured pets, and species browse |
| `/pets` | Public | Pet list with name search and species filter |
| `/pets/:id` | Public | Pet details and adoption entry point |
| `/quiz` | Public | 7-question pet match quiz |
| `/login`, `/register` | Public | Authentication |
| `/adopt` | Public | Redirects to `/pets` |
| `/adopt/:petId` | Authenticated | Adoption application form |
| `/my-applications` | Authenticated | Current user's applications |
| `/stories` | Public | Approved success stories |
| `/care-guide` | Public | Species care guides |
| `/about`, `/contact`, `/faq` | Public | Informational pages |
| `/admin` | Admin, Staff | Dashboard summary |
| `/admin/pets` | Admin, Staff | Pet management |
| `/admin/applications` | Admin, Staff | Application review |
| `/admin/stories` | Admin, Staff | Story moderation |
| `/admin/messages` | Admin, Staff | Contact messages |

## Database Tables

| Table | Description |
|---|---|
| `users` | Admins, staff, and adopters |
| `pets` | Pet listings with status and optional image URL |
| `applications` | Adoption applications and review state |
| `vaccinations` | Vaccination records exposed through the API |
| `care_records` | Care record schema/model; no API or UI yet |
| `success_stories` | Submitted stories with approval state |
| `contact_messages` | Messages submitted through the contact form |

## Tests

The backend tests include service tests and MockMvc access-control tests. `BackendApplicationTests` loads the full Spring context, so a reachable MySQL database is required.

PowerShell:

```powershell
$env:DB_PASSWORD = "your-mysql-password"
$env:JWT_SECRET = "replace-with-at-least-32-random-characters"
cd backend
.\mvnw.cmd test
```

Bash:

```bash
cd backend
DB_PASSWORD="your-mysql-password" JWT_SECRET="$(openssl rand -base64 48)" ./mvnw test
```

Frontend checks:

```bash
cd frontend
npm run lint
npm run build
```

## Not Implemented Yet

- Pet photo uploads; pet images are currently supplied as URLs.
- Real email or SMS delivery. Contact messages are stored in the database.
- Pagination for pet listings and admin tables.
- Dedicated vaccination and care-record management screens.
- Automated deployment configuration and multi-shelter support.

## Author

**Amandi Rajapaksha**<br>
BSc Management Information Systems, NSBM Green University, Sri Lanka

[LinkedIn](https://www.linkedin.com/in/amandi-rajapaksha-397a21284/) | [GitHub](https://github.com/Amandi1020) | [Portfolio](https://amandi1020.github.io/Amandi-Portfolio/)
