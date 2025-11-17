# DSA Instructor - Full Frontend (Tailwind v4.1)

This project is a full React + Vite frontend styled with Tailwind v4.1 and includes:

- Login / Logout
- Guest login (1-hour temporary session)
- Protected routes
- Axios client to call your backend

## Quick start

1. Extract ZIP
2. Install:

   ```bash
   npm install
   ```

3. Create .env (optional) with `VITE_API_BASE` (default http://127.0.0.1:8000)
4. Run dev server:

   ```bash
   npm run dev
   ```

## Backend expectations

- POST /login -> returns JSON `{ token, guest?: false, expiresAt?: null }`
- POST /guest-login -> returns `{ token, guest: true, expiresAt: "ISO timestamp" }`

The frontend stores `{ token, guest, expiresAt }` in `localStorage` under `auth`.
