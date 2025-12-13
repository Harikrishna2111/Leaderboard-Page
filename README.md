# Leaderboard & Profile Portal

Web portal for managing event leaderboards and user profiles.

## Setup Instructions

### 1) Clone the repository
```bash
git clone <repository-url>
cd Leaderboard-Page
```

### 2) Install frontend dependencies
```bash
npm install
```

### 3) Setup backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:

```text
MONGO_URI=your_mongodb_connection_string
PORT=4000
```

> ⚠️ `.env` is ignored by git for security.

### 4) Run backend
```bash
node server.cjs
```

Backend runs at:
```
http://localhost:4000
```

### 5) Run frontend
```bash
cd ..
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

## Notes
- App runs in demo mode using a fixed user (`Demo User`)
- Authentication will be added later
