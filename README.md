# ==================================================
# 📊 Leaderboard & Profile Portal
# AI & DS Association – College Web Portal
# ==================================================

A full-stack web portal built for the department association
to manage event leaderboards and student profiles,
with separate admin and user views.

# --------------------------------------------------
# 🚀 FEATURES
# --------------------------------------------------

ADMIN SIDE
- Manage event leaderboards
  - Enigma (First Year / Non-First Year)
  - Codenigma
- Select students from dataset
- Enter score and time
- Automatic sorting (score ↓, time ↑)
- Data stored in MongoDB

USER SIDE
- View event leaderboards
- View personal profile
- Edit profile
  - Name, year, bio
  - Skills (add / remove)
  - Achievements (add / edit / delete)
- Profile data synced with MongoDB
- Profile picture edit page (UI ready)

# --------------------------------------------------
# 🛠️ TECH STACK
# --------------------------------------------------

FRONTEND
- React (Vite)
- JavaScript
- CSS / Tailwind utilities

BACKEND
- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS

# --------------------------------------------------
# 📁 PROJECT STRUCTURE
# --------------------------------------------------

Leaderboard-Page/
├── backend/
│   ├── models/
│   │   ├── Profile.js
│   │   └── LeaderboardRow.js
│   ├── server.cjs
│   ├── .env.example
│
├── src/
│   ├── components/
│   │   ├── admin-Leaderboards.jsx
│   │   ├── admin-LeaderboardBox.jsx
│   │   ├── UserLeaderboards.jsx
│   │   ├── UserLeaderboard.jsx
│   │   ├── ProfilePage.jsx
│   │   └── EditProfile.jsx
│   ├── App.jsx
│   ├── App.css
│
├── .gitignore
├── package.json
└── README.md

# --------------------------------------------------
# ⚙️ SETUP INSTRUCTIONS
# --------------------------------------------------

# 1) Clone the repository
$ git clone <repository-url>
$ cd Leaderboard-Page

# --------------------------------------------------

# 2) Install frontend dependencies
$ npm install

# --------------------------------------------------

# 3) Backend setup
$ cd backend
$ npm install

# Create a .env file inside backend/
# (DO NOT COMMIT THIS FILE)

MONGO_URI=your_mongodb_connection_string
PORT=4000

# --------------------------------------------------

# 4) Run backend
$ node server.cjs

# Backend runs at:
# http://localhost:4000

# --------------------------------------------------

# 5) Run frontend
$ cd ..
$ npm run dev

# Frontend runs at:
# http://localhost:5173

# --------------------------------------------------
# 🧪 DEMO MODE
# --------------------------------------------------

- Application runs in demo mode
- Fixed user identifier: Demo User
- Authentication will be integrated later

# --------------------------------------------------
# 👨‍💻 CONTRIBUTORS
# --------------------------------------------------

AI & DS Association – Web Team

# --------------------------------------------------
# 📜 LICENSE
# --------------------------------------------------

Developed for educational and departmental use.
