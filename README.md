# SkillSphere – Online Learning Platform

A modern online learning platform built with Next.js, where users can explore courses, learn from industry experts, and upgrade their skills.

## 🔗 Live URL
[Your live URL here]

## ✨ Key Features
- Browse 8+ expert-led courses across multiple categories
- Search courses by title
- Protected course details page (login required)
- Email & Google authentication via BetterAuth
- User profile with update functionality
- Dark / Light mode toggle
- Fully responsive on mobile, tablet, and desktop
- Smooth animations with Motion library
- Toast notifications
- 404 not-found page

## 🛠 Tech Stack
- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **HeroUI** – UI component library
- **BetterAuth** – Authentication (Email + Google)
- **MongoDB** – Database
- **Motion** – Animations
- **React Toastify** – Toast notifications
- **Lucide React** – Icons

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📦 Environment Variables
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Your app URL (e.g. http://localhost:3000) |
| `BETTER_AUTH_URL` | Same as base URL |
| `BETTER_AUTH_SECRET` | Random secret key (min 32 chars) |
| `MONGODB_URL` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
