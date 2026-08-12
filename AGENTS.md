# AGENTS.md

Hacktrail-3.0-TeraNode / UniTasker — one-day hackathon gig platform (PERN). Product spec and planned endpoints live in `frontend/README.md` (root `README.md` is a stub).

## Layout
- `backend/` and `frontend/` are separate npm projects with their own lockfiles. Root `package.json` is a placeholder — run all commands from the subdirectory.
- `backend/`: Express 5 + Sequelize 6, CommonJS (`require`). `controllers/`, `routes/`, `middlewares/`, `utils/` exist but are EMPTY; the REST API (Auth, Jobs, Messages) is unimplemented. `server.js` only mounts a health route.
- `frontend/`: Vite + React 19, ESM, Tailwind v4 (CSS-first: `@import "tailwindcss"` in `index.css`, no `tailwind.config`). `src/api/axiosInstance.js` and `src/pages/context/AuthContext.jsx` are empty stubs.

## Commands
- Backend: `npm start` / `npm run dev` (nodemon). Migrations from `backend/`: `npx sequelize-cli db:migrate` (`.sequelizerc` wires paths; referenced `seeders/` dir does not exist).
- Frontend: `npm run dev`, `npm run lint` (flat ESLint), `npm run build`.
- No tests or CI anywhere.

## Backend gotchas
- `server.js` calls `sequelize.authenticate()` before `app.listen()`; if Supabase is unreachable no server starts.
- Supabase Postgres needs `ssl: { require: true, rejectUnauthorized: false }` and `logging: false` — keep both (see `config/connection.js`, `config/database.js`).
- No auth libs installed yet (bcrypt/jsonwebtoken must be added for Auth).
- Associations are declared only in `models/index.js` (`as`: postedJobs/employer, tasks/freelancer, sentMessages/sender, receivedMessages/receiver). `Job` has no explicit `employerId`/`studentId` columns — they come from associations. Sequelize adds `createdAt`/`updatedAt`.
- Env lives in `backend/.env` (gitignored): `PORT`, `DB_URL`, `JWT_SECRET`. Never commit or echo these. Frontend uses `VITE_API_URL=http://localhost:5000`.
- macOS ControlCenter (AirPlay) often occupies port 5000 — HTTP then returns 403 from `Server: AirTunes`, not your app. Test with `PORT=5001 node server.js` if that happens.
- Express 5: async route handlers auto-forward rejections; wildcard route syntax changed (`*`).
- Code comments mix English and Sinhala — preserve that style.
