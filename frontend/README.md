# PawFind Frontend

React 19 and Vite frontend for the PawFind pet adoption system. See the root [README](../README.md) for full setup, API, roles, and database details.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

On Windows, use `copy .env.example .env`. The app runs at `http://localhost:5173`.

`VITE_API_URL` controls the API base URL and defaults to `http://localhost:8080/api`.

## Checks

```bash
npm run lint
npm run build
```

## Routes

| Route | Access |
|---|---|
| `/`, `/pets`, `/pets/:id`, `/quiz`, `/stories`, `/care-guide`, `/about`, `/contact`, `/faq`, `/login`, `/register` | Public |
| `/adopt` | Redirects to `/pets` |
| `/adopt/:petId`, `/my-applications` | Authenticated |
| `/admin`, `/admin/pets`, `/admin/applications`, `/admin/stories`, `/admin/messages` | Admin and Staff |

Registration creates an `ADOPTER` account. Admin and staff roles must be assigned in the database.
