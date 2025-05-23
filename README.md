## Chess Tournament Manager

A full-stack application designed for creating and managing chess tournaments. The backend is built with Django and Django REST Framework, while the frontend utilizes Next.js. PostgreSQL serves as the database, and JWT is employed for authentication.

---

## Table of Contents

1.  [Features](#features)
2.  [Technologies](#technologies)
3.  [Getting Started](#getting-started)
  *   [Prerequisites](#prerequisites)
  *   [Backend Setup](#backend-setup)
  *   [Frontend Setup](#frontend-setup)
4.  [Environment Variables](#environment-variables)
5.  [API Endpoints](#api-endpoints)
6.  [Project Structure](#project-structure)
7.  [Usage](#usage)
8.  [Prototype / Screenshots](#prototype--screenshots)
9.  [License](#license)

---

## Features

*   **Homepage**
  *   Displays a list of upcoming or ongoing tournaments.
  *   Allows filtering by status: pending, ongoing, completed.
*   **Tournament Details**
  *   Shows tournament name, description, date/time, mode, and prize.
*   **Tournament Management**
  *   Enables the creation of new tournaments.
  *   Allows editing and deletion of existing tournaments.
*   **Authentication**
  *   Provides user registration and login with JWT.
  *   Secures routes with authentication.

---

## Technologies

*   **Backend**
  *   Python 3.x, Django 5.x, Django REST Framework
  *   JWT (djangorestframework-simplejwt)
  *   PostgreSQL
*   **Frontend**
  *   Next.js 13 (App Router)
  *   CSS
*   **Tools**
  *   `psycopg2` for PostgreSQL
  *   `django-filter` for API filtering
  *   `django-cors-headers` for CORS

---

## Getting Started

### Prerequisites

*   [Node.js ≥ 16](https://nodejs.org/)
*   [Python ≥ 3.10](https://www.python.org/)
*   PostgreSQL

### Initial Steps

*   Create a directory to house the project.
*   Within this directory, set up a virtual environment for Django.

  ```bash
  python -m venv .venv
   ```
  
  ```bash
  source .venv/bin/activate   # macOS/Linux
  .venv\Scripts\activate      # Windows
  ```

### Backend Setup

1.  Clone the repository and navigate to the `backend` directory:

  ```bash
  git clone <URL-del-repo>
  cd challenge-ajedrez
  cd backend
  ```
2.  Install the required dependencies:

  ```bash
  pip install -r requirements.txt
  ```
3.  Create a `.env` file alongside `manage.py` with the following content:

  ```
  DB_DATABASE=chess_challenge
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_PORT=5432
  DB_HOST=localhost

  DEBUG=True
  SECRET_KEY='tu_secreto_django'
  ALLOWED_HOSTS = '*'
  ```
4.  Run migrations and create a superuser:

  ```bash
  python manage.py migrate
  python manage.py createsuperuser
  ```
5.  Start the development server:

  ```bash
  python manage.py runserver
  ```

  The API will be accessible at `http://127.0.0.1:8000/` (port may vary).

### Frontend Setup

1.  In a separate terminal, navigate to the `frontend` directory:

  ```bash
  cd frontend
  ```
2.  Install the dependencies:

  ```bash
  npm install
  # or
  yarn
  ```
3.  Create a `.env` file in the frontend root directory:

  ```
  DJANGO_PUBLIC_API_URL=<backend URL, e.g., http://127.0.0.1:8000>
  ```
4.  Run the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

  The app will be available at `http://localhost:3000/`.

### API Endpoints

| Method | Route                   | Description                     |
| :----- | :---------------------- | :------------------------------ |
| POST   | /api/register/          | User registration               |
| POST   | /api/login/             | JWT token retrieval             |
| POST   | /api/token/refresh/     | Access token refresh            |
| POST   | /api/token/blacklist/   | Refresh token invalidation      |
| GET    | /api/tournaments/       | List and filter tournaments    |
| POST   | /api/tournaments/       | Create a tournament             |
| GET    | /api/tournaments/{id}/  | Get tournament details          |
| PUT    | /api/tournaments/{id}/  | Update a tournament             |
| DELETE | /api/tournaments/{id}/ | Delete a tournament             |

### Project Structure

```
├── api/                   # Django app
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── backend/               # Django project
│   ├── settings.py
│   └── urls.py
|
└── frontend/
|   ├── src
|   |   └── app/           # Next.js App Router
|   |       ├── layout.js
|   |       ├── page.js    # Landing Page
|   |       |── tournaments/
|   |       |   ├── page.js# Tournament listing and filtering
|   |       |   └── [id]/page.js# Tournament details
|   |       |
|   |       |── login/
|   |       |── register/
|   |       |── components/    # React components
|   |       |
|   |       └── middleware.js
|   |
|   ├── utils/             # Helpers (e.g., fetchWithAuth)
|   ├── public/            # Static files and images
|   ├── .env               # Create this file
|   └── package.json
|
|
├── manage.py
├── requirements.txt
└── .env                   # Create this file
```

### Usage

1.  Register or log in to your account.
2.  Explore the homepage (`/`) to view active tournaments.
3.  Filter tournaments by status (pending, ongoing).
4.  Click on a tournament to view details and register.
5.  Create new tournaments from the "Create" view.
6.  Log out via the navbar.
