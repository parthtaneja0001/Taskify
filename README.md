# Taskify

Full-stack To-Do app with categories. React/Vite frontend, Express + MongoDB backend, JWT auth.

## Stack
- Frontend: React 19, Vite, Axios, React Router
- Backend: Node/Express, Mongoose (MongoDB), JWT, CORS

## Prerequisites
- Node 18+ and npm
- MongoDB running locally (or a connection string)

## Quick Start
```bash
# 1) Backend
cd backend
npm i
# copy env and set values
cp .env.example .env
# (set PORT, MONGO_URI, JWT_SECRET)
PORT=5001 npm start

# 2) Frontend (new terminal)
cd ../frontend
npm i
npm run dev
```
- Backend: http://localhost:5001
- Frontend: Vite chooses a free port (e.g. http://localhost:5176)

## Environment
Create `backend/.env` (not committed):
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/taskify
JWT_SECRET=change_me
```

## API (brief)
Auth
- POST `/auth/register` { name, email, password } → 201
- POST `/auth/login` { email, password } → { token }

Tasks (requires header `x-auth-token: <JWT>`)
- GET `/tasks?category=<work|personal|shopping>` → Task[]
- POST `/tasks` { title, description?, category } → 201 Task
- PATCH `/tasks/:id` { isDone?, title?, description?, category? } → Task
- DELETE `/tasks/:id` → { msg }

## Notes
- CORS is configured to allow any localhost/127.0.0.1 port in dev.
- Mongoose v8 compatible (no deprecated `findByIdAndRemove`).

## Build / Preview (frontend)
```bash
cd frontend
npm run build
npm run preview
```

## License
MIT

