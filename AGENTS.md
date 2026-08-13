# AGENTS.md

Hacktrail-3.0-TeraNode / UniTasker — one-day hackathon gig platform (PERN). Product spec and planned endpoints live in `frontend/README.md` (root `README.md` is a stub).

## Layout
- `backend/` and `frontend/` are separate npm projects with their own lockfiles. Root `package.json` is a placeholder — run all commands from the subdirectory.
- `backend/`: Express 5 + Sequelize 6, CommonJS (`require`). Auth (register EMPLOYER-only, login via email OR university_id, forced first-login password change, `/api/auth/me`) and Admin student-onboarding (`/api/admin/students/single|bulk`) are implemented in `controllers/`/`routes/`. Jobs & Messages REST APIs are NOT implemented yet.
- `frontend/`: Vite + React 19, ESM, Tailwind v4 (CSS-first: `@import "tailwindcss"` in `index.css`, no `tailwind.config`). Auth UI (Login/Register/Dashboard) is wired to the backend via `src/api/axiosInstance.js` + `AuthProvider` (split across `context/AuthContext.jsx` and `context/authContext.js` — keep the hook in the non-component file for fast-refresh lint).

## Commands
- Backend: `npm start` / `npm run dev` (nodemon). Migrations from `backend/`: `npx sequelize-cli db:migrate`; seeders from `backend/`: `npx sequelize-cli db:seed:all` (`.sequelizerc` wires paths).
- Frontend: `npm run dev`, `npm run lint` (flat ESLint), `npm run build`.
- No tests or CI anywhere.

## Backend gotchas
- `server.js` calls `sequelize.authenticate()` before `app.listen()`; if Supabase is unreachable no server starts.
- Supabase Postgres needs `ssl: { require: true, rejectUnauthorized: false }` and `logging: false` — keep both (see `config/connection.js`, `config/database.js`).
- `role` ENUM is `STUDENT | EMPLOYER | ADMIN` (model + `enum_Users_role` in Postgres — an `ALTER TYPE` migration added `ADMIN`; Postgres can't easily drop an enum value). A seeded admin exists: `admin@unitasker.lk` / `admin123` (`seeders/add-default-admin`, idempotent via `ON CONFLICT (email)`). Beware: `queryInterface.bulkInsert` with `updateOnDuplicate` also needs `upsertKeys`, and inserting an empty `skills: []` errors (`cannot determine type of empty array`) — omit it and use the column default.
- Associations are declared only in `models/index.js` (`as`: postedJobs/employer, tasks/freelancer, sentMessages/sender, receivedMessages/receiver). `Job` has no explicit `employerId`/`studentId` columns — they come from associations. Sequelize adds `createdAt`/`updatedAt`.
- Students are onboarded ONLY by admins (no self-registration): admin creates them with an auto-generated password, `mustChangePassword: true`, and a placeholder email `{university_id}@student.local`. Their first login returns `{ requirePasswordChange: true }` instead of a JWT; `POST /api/auth/change-first-password` finishes the flow.
- Env lives in `backend/.env` (gitignored): `PORT`, `DB_URL`, `JWT_SECRET`. Never commit or echo these. Frontend uses `VITE_API_URL=http://localhost:5000`.
- macOS ControlCenter (AirPlay) often occupies port 5000 — HTTP then returns 403 from `Server: AirTunes`, not your app. Test with `PORT=5001 node server.js` if that happens.
- Express 5: async route handlers auto-forward rejections; wildcard route syntax changed (`*`).
- Code comments mix English and Sinhala — preserve that style.
