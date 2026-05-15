# 🎧 C Flow

![C Flow Dashboard](images/dashboard1.png)

**C Flow** is a premium, security-first modular audio hub designed for high-performance local music streaming. Built with a modern glassmorphism UI and a robust Node.js backend, it offers a seamless experience for music enthusiasts who value both aesthetics and privacy.

---

## 🚀 Key Features

- **Modular Architecture:** Clean separation between Backend (Express) and Frontend (Vite + React).
- **Audio Hub:** Scans your local `/music` folder and extracts metadata (Artist, Title, Duration) automatically.
- **Daily Music Streak:** Gamified listening system with WIB (UTC+7) reset logic.
- **Premium UI:** Sleek glassmorphism design with Neon Green branding and smooth Framer Motion animations.
- **Security-First:** Centralized Git strategy and strict environment variable management.

---

## 📸 Preview

![Dashboard Overview](images/dashboard1.png)
![Music Library](images/dashboard2.png)
![Visualizer](images/dashboard3.png)

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4 (Curzy Theme)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **API Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Metadata:** music-metadata
- **Security:** Dotenv, CORS

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Curzyori/C-Flow.git
cd C-Flow
```

### 2. Environment Setup
```bash
cp .env.example .env
```

### 3. Install Dependencies & Start

#### Backend
```bash
cd backend
npm install
npm start
```
*Runs on `http://localhost:3004`*

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

### 4. Add Your Music
Simply drop your `.mp3` files into the root `/music` folder, and the hub will automatically detect them.

---

## 🛡 Security Note
This project uses a root-level `.gitignore` to ensure that:
- `.env` files are never leaked.
- Local databases (`*.db`) remain private.
- Node modules are correctly ignored.

---

## 👤 Author
- **GitHub:** [@Curzyori](https://github.com/Curzyori)
- **Project:** C Flow Architecture

---

*Built with ❤️ by Curzyori for the music community.*
