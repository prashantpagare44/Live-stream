# Live Stream — Frontend (React + Vite)

Live frontend for a livestream + real-time chat UI.  
This repository contains the **React + Vite** frontend only. The live demo is available at:

**Live demo:** https://live-stream-orcin.vercel.app

![Live Stream Screenshot](/mnt/data/c7da9b0a-5d7d-4c79-8a78-e715c7f35866.png)

---

## About
This project is the frontend client for a livestream application. It provides a responsive UI for:
- Viewing a livestream
- Real-time chat & viewer list (Socket events handled by backend)
- Host/Viewer UI (depending on integration)
- Uploading thumbnails or small media items (frontend form + Multer backend expected)
  
> **Note:** This repo is frontend-only. A backend server (API + Socket.io) is expected for authentication, persistence and real-time functionality. Update `VITE_API_URL` / `VITE_SOCKET_URL` in `.env` to point to your backend.

---

## Features
- Responsive React UI built with Vite
- Live chat panel (UI-ready for Socket.io events)
- Viewer list & live viewer count UI
- Stream thumbnail upload form (frontend)
- Authentication-ready flows (login/signup UI)
- Clean component structure for easy extension

---

## Tech stack
- Frontend: React (with Vite)
- Styling: Tailwind CSS (or plain CSS depending on repo)
- Build: Vite
- Optional integrations: Socket.io (for real-time), fetch/axios for API calls

---

## Getting started (local development)

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn

### Install & run
```bash

# install dependencies
npm install
# or
# yarn

# start dev server
npm run dev
# open URL printed by Vite (usually http://localhost:5173)
