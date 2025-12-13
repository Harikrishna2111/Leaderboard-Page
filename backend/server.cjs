// backend/server.cjs
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const app = express();

dotenv.config();

const LeaderboardRow = require("./models/LeaderboardRow");
const Profile = require("./models/Profile");

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "leaderboard_db", // you can choose any name
  })
  .then(() => console.log("✔ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use(cors());
app.use(express.json());

// Path to your JSON file
const FILE = "./leaderboard.json";

// Ensure the file exists
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "{}");
}

// Save or update leaderboard
app.post("/save", async (req, res) => {
  try {
    const { category, placements } = req.body;

    if (!category || !Array.isArray(placements)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // Remove old rows for this leaderboard
    await LeaderboardRow.deleteMany({ category });

    // Insert new rows
    const newRows = placements.map((p) => ({
      category,
      name: p.name,
      roll: p.roll,
      year: p.year ?? null,
      score: p.score ?? null,
      time: p.time ?? null,
    }));

    await LeaderboardRow.insertMany(newRows);

    res.json({ message: "Saved successfully", count: newRows.length });
  } catch (err) {
    console.error("Error saving leaderboard:", err);
    res.status(500).json({ error: "Failed to save leaderboard" });
  }
});


app.get("/load/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const rows = await LeaderboardRow.find({ category });

    // Sort for Enigma: score DESC, time ASC
    const sorted = rows.sort((a, b) => {
      // Codenigma → no score/time → return in insertion order
      if (a.score == null || b.score == null) return 0;

      if (b.score !== a.score) return b.score - a.score;
      return a.time - b.time;
    });

    res.json(sorted);
  } catch (err) {
    console.error("Error loading leaderboard:", err);
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

// Load profile by name (temporary identifier)
app.get("/profile/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const profile = await Profile.findOne({ identifier: name });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Error loading profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

console.log("REGISTERING PUT /profile/:name");

// Save or update profile by name (temporary identifier)
app.put("/profile/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const data = req.body;

    const profile = await Profile.findOneAndUpdate(
      { identifier: name },                 // find by identifier
      { ...data, identifier: name },         // ensure identifier stays
      {
        new: true,                           // return updated doc
        upsert: true,                        // create if not exists
        setDefaultsOnInsert: true,
      }
    );

    res.json(profile);
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(4000, () => console.log("Backend running on port 4000"));
