<p align="center">
  <img src="images/dashboard1.png" alt="Header Banner" width="100%"/>
</p>

<h1 align="center">C Flow</h1>
<p align="center">
  <strong>Premium local audio hub & music visualizer with glassmorphism UI</strong>
</p>

<p align="center">
  <a href="https://c-flow.curzy.dev"><strong>🌐 Live Demo Website</strong></a>
</p>

<div align="center">

[![Stars](https://img.shields.io/github/stars/Curzyori/c-flow?style=for-the-badge&color=green)](https://github.com/Curzyori/c-flow/stargazers)
[![Forks](https://img.shields.io/github/forks/Curzyori/c-flow?style=for-the-badge&color=green)](https://github.com/Curzyori/c-flow/network/members)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Linux-black?style=for-the-badge)](#)

</div>

<p align="center">
  <a href="#-why-c-flow">Why This</a> ·
  <a href="#-key-features">Features</a> ·
  <a href="#%EF%B8%8F-architecture">Architecture</a> ·
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-preview">Preview</a>
</p>

---

## 🕒 Why C Flow?

A premium, modular audio hub designed for local music streaming. By combining a metadata extraction backend with a stunning glassmorphism UI, it provides a highly polished visual dashboard for local MP3 libraries.

|                               |                                                              |
| ----------------------------- | ------------------------------------------------------------ |
| 🎵 **Local Audio Scanning**   | Scans folder resources using `music-metadata` to fetch details automatically. |
| 🔥 **Daily Streak Engine**     | Tracks active listening streaks with WIB (UTC+7) reset rules. |
| 🧪 **Fluid Visualizer**        | Built-in custom music visualizer aligned with Framer Motion animations. |

---

## 🎯 Key Features

### Audio Hub Mechanics

| Feature | Status | Description |
| :--- | :---: | :--- |
| **MP3 Parser** | ✅ | Auto extracts covers, artist names, titles, and track durations. |
| **Streaks System** | ✅ | WIB-based daily streak tracker writing progress to a local JSON file. |
| **Stream Engine** | ✅ | Native audio streaming pipeline serving files safely from backend storage. |

### Technical Capabilities

| Capability | Status | Description |
| :--- | :---: | :--- |
| **Express Router API** | ✅ | Lightweight Modular REST API logic for status, streak, and music streams. |
| **Glassmorphism UI** | ✅ | Clean cyberpunk design built using React 19, Tailwind CSS v4, and Lucide. |
| **Concurrently Dev** | ✅ | Starts development servers concurrently using simple npm triggers. |

---

## 🏗️ Architecture

```text
c-flow/
├── backend/
│   ├── data/
│   │   └── streak.json    # Local JSON streak record store
│   ├── controllers/       # Business logic (music parser, streak computation)
│   ├── routes/            # REST API route endpoints
│   ├── services/          # AudioScanner scanner & streak background service
│   └── server.js          # Express server entry point
└── frontend/
    ├── src/               # React Vite client SPA bundle
    └── vite.config.js     # Vite configuration
```

---

## 🚀 Quick Start

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Curzyori/c-flow.git
cd c-flow

# Setup backend service
cd backend
npm install
npm start

# Setup frontend service (in a new terminal)
cd ../frontend
npm install
npm run dev
```

### Add Your Music
Drop your `.mp3` files into the root `/music` folder in backend, and the server will automatically scan them.

---

## 🖼️ Preview

<p align="center">
  <img src="images/dashboard1.png" alt="Dashboard View" width="48%"/>
  <img src="images/dashboard2.png" alt="Library View" width="48%"/>
</p>

---

## 📄 License
This project is released under the **MIT License** — free for educational, personal, and research purposes.

<sub>Built with passion as the 4th Project of the 50 Projects Challenge by **@curzyori**</sub>
