<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

## Chess Tournament Manager

A full-stack application to create and manage chess tournaments.
Backend in Django + Django REST Framework; frontend in Next.js. Uses PostgreSQL as a database and JWT for authentication.

---

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Configuration](#backend-configuration)
  - [Frontend Configuration](#frontend-configuration)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Project Structure](#project-structure)
7. [Usage](#usage)
8. [Prototype / Screenshots](#prototype--screenshots)
9. [License](#license)

---

## Features

- **Homepage**
  - Lists pending or ongoing tournaments
  - Filter by status: pending, ongoing, completed

- **Tournament Detail**
  - Shows name, description, date/time, mode, and prize

- **Tournament Management**
  - Create new tournaments
  - Edit and delete existing tournaments

- **Authentication**
  - Registration and login with JWT
  - Protected routes

---

## Technologies

- **Backend**
  - Python 3.x, Django 5.x, Django REST Framework
  - JWT (djangorestframework-simplejwt)
  - PostgreSQL

- **Frontend**
  - Next.js 13 (App Router)
  - CSS

- **Tools**
  - `psycopg2` for PostgreSQL
  - `django-filter` for API filters
  - `django-cors-headers` for CORS

---

## Getting Started

### Prerequisites

- [Node.js ≥ 16](https://nodejs.org/)
- [Python ≥ 3.10](https://www.python.org/)
- PostgreSQL

### Steps to start

- Create a folder to place the project
- Inside this folder, we will create a virtual environment for Django
   ```
   python -m venv .venv
   source .venv/bin/activate   # macOS/Linux
   .venv\Scripts\activate      # Windows

   ```

### Backend Configuration

1. Clone the repository and go to the `backend` folder:
  ```
  git clone <URL-of-the-repo>
  cd challenge-ajedrez
  cd backend
  ```

2. Install dependencies:
   ```
   cd ..
   pip install -r requirements.txt
   ```

3. Create a .env file next to manage.py:
   ```
   DB_DATABASE=chess_challenge
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_PORT=5432
   DB_HOST=localhost

   DEBUG=True
   SECRET_KEY='your_django_secret'
   ALLOWED_HOSTS = '*'
   ```

4. Run migrations and create a superuser:
   ```
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. Start the server:
   ```
   python manage.py runserver
   ```
   The API will be available at http://127.0.0.1:8000/ (the port may vary)

### Frontend Configuration

1. In another terminal, go to the `frontend` folder:
  ```
  cd frontend
  ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Create a .env file in the frontend root:
   ```
   NEXT_PUBLIC_DJANGO_URL=<backend url, e.g.: http://127.0.0.1:8000 >
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at http://localhost:3000/.

### API Endpoints

| Method | Route                  | Description                       |
| :----- | :--------------------- | :-------------------------------- |
| POST   | /api/register/         | User registration                 |
| POST   | /api/login/            | JWT token retrieval               |
| POST   | /api/token/refresh/    | Refresh access token              |
| POST   | /api/token/blacklist/  | Disable refresh token             |
| GET    | /api/tournaments/      | List and filter tournaments      |
| POST   | /api/tournaments/      | Create tournament                 |
| GET    | /api/tournaments/{id}/ | View tournament details           |
| PUT    | /api/tournaments/{id}/ | Update tournament                 |
| DELETE | /api/tournaments/{id}/ | Delete tournament                 |

### Project Structure

```
├── api/               # Django app
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── backend/           # Django project
│   ├── settings.py
│   └── urls.py
|
└── frontend/
|    ├── src
|    |  └── app/               # Next.js App Router
|    |      ├── layout.js
|    |      ├── page.js        # Landing Page
|    |      |── tournaments/
|    |      |    ├── page.js    # Listing and filter
|    |      |    └── [id]/page.js # Tournament detail
|    |      |
|    |      |── login/
|    |      |── register/
|    |      |── components/        # React Components
|    |      |
|    |      └── middleware.js
|    |
|    ├── utils/             # Helpers (e.g., fetchWithAuth)
|    ├── public/            # Static files and images
|    ├── .env               # create this file
|    └── package.json
|
|
├── manage.py
├── requirements.txt
└── .env        # create this file
```

### Usage

Register or log in.

Explore the homepage (/) to see active tournaments.

Filter by status (pending, ongoing).

Click on a tournament to view details and register.

Create new tournaments from the "Create" view.

Log out from the navbar.
