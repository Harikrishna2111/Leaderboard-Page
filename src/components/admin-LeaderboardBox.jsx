import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { studentsDB } from "../data/students";

// Helper: create slug from title
const toSlug = (str) =>
  String(str).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

export default function LeaderboardBox({ title, count }) {
  const slug = toSlug(title);
  const [selected, setSelected] = useState(
    Array.from({ length: count }, () => ({
      name: "",
      roll: "",
      year: "",
      score: "",
      time: "",
    }))
  );

  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  // Determine board type
  const isEnigma =
    title.toLowerCase().includes("enigma") &&
    !title.toLowerCase().includes("codenigma"); // safe-check

  // Load saved data on mount
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/load/${slug}`);
        const data = await res.json();
        if (!mounted) return;
        if (Array.isArray(data)) {
          let loaded = data;
          // Ensure correct length
          if (loaded.length !== count) {
            loaded = loaded.slice(0, count);
            while (loaded.length < count) {
              loaded.push({ name: "", roll: "", year: "", score: "", time: "" });
            }
          }
          setSelected(
            loaded.map((r) => ({
              name: r.name ?? "",
              roll: r.roll ?? "",
              year: r.year ?? "",
              score: r.score ?? "",
              time: r.time ?? "",
            }))
          );
          setLastSavedAt(data.updatedAt || null);
        }
      } catch (err) {
        console.error("load failed", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, [slug, count]);

  // Typing in name input -> filter suggestions (hide already selected)
  const handleTyping = (index, value) => {
    setActiveIndex(index);

    const filtered = studentsDB.filter((s) => {
      const matches = s.name.toLowerCase().includes(value.toLowerCase());
      const alreadySelected = selected.some(
        (sel, idx) => idx !== index && sel.roll === s.roll
      );
      return matches && !alreadySelected;
    });

    setSuggestions(filtered);

    const copy = [...selected];
    copy[index] = { ...copy[index], name: value };
    setSelected(copy);
  };

  // When user clicks suggestion
  const handleSelect = (student) => {
    if (activeIndex === null) return;
    const updated = [...selected];
    // Keep existing score/time if any — admin provides them
    updated[activeIndex] = {
      ...updated[activeIndex],
      name: student.name,
      roll: student.roll,
      year: student.year,
    };
    setSelected(updated);
    setSuggestions([]);
    setActiveIndex(null);
  };

  // On blur: if typed name isn't exact match, clear and toast
  const handleBlurClear = (index) => {
    setTimeout(() => {
      const typed = selected[index];
      const match = studentsDB.find((s) => s.name === typed.name);
      if (!match && typed.name.trim() !== "") {
        const copy = [...selected];
        copy[index] = { name: "", roll: "", year: "", score: "", time: "" };
        setSelected(copy);
        toast.error("Please select a valid student from the list", { duration: 2000 });
      }
      setSuggestions([]);
    }, 180); // allow click on suggestion
  };

  // Input change for score/time
  const handleFieldChange = (index, field, value) => {
    const copy = [...selected];
    copy[index] = { ...copy[index], [field]: value };
    setSelected(copy);
  };

  // Strict validation + sorting (for Enigma) on submit
  const handleSubmit = async () => {
    // Validation
    if (isEnigma) {
      const invalid = selected.some(
        (s) =>
          !s.name ||
          !s.roll ||
          s.score === "" ||
          s.time === "" ||
          Number.isNaN(Number(s.score)) ||
          Number.isNaN(Number(s.time))
      );
      if (invalid) {
        toast.error("All rows must have a valid student, score and time.", { duration: 2500 });
        return;
      }
    } else {
      // Codenigma: require name only
      const invalid = selected.some((s) => !s.name || !s.roll);
      if (invalid) {
        toast.error("Please select valid students for all slots.", { duration: 2000 });
        return;
      }
    }

    // For Enigma: sort by score desc, then time asc
    let toSave = [...selected];
    if (isEnigma) {
      toSave = toSave
        .map((s) => ({
          ...s,
          score: Number(s.score),
          time: Number(s.time),
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score; // higher score first
          return a.time - b.time; // lower time first
        });
    }

    // Save to backend
    try {
      const res = await fetch("http://localhost:4000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: slug,
          placements: toSave,
        }),
      });
      const data = await res.json();
      setLastSavedAt(data.updated?.updatedAt || new Date().toISOString());
      toast.success(`${title} saved successfully!`);
      // reflect saved order in UI (since we sorted on submit)
      setSelected(
        toSave.map((r) => ({
          name: r.name ?? "",
          roll: r.roll ?? "",
          year: r.year ?? "",
          score: r.score ?? "",
          time: r.time ?? "",
        }))
      );
    } catch (err) {
      console.error("save failed", err);
      toast.error("Save failed. See console.");
    }
  };

  const rowGrid = isEnigma ? "2fr 0.8fr 0.8fr" : "1fr";

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.headerRow}>
          <h3 style={styles.heading}>{title}</h3>
          {loading && <div style={styles.loading}>Loading…</div>}
        </div>

        {selected.map((student, index) => (
          <div key={index} style={{ ...styles.row, gridTemplateColumns: rowGrid }}>
            <div style={styles.nameCol}>
              <input
                type="text"
                placeholder="Select student"
                value={student.name}
                onChange={(e) => handleTyping(index, e.target.value)}
                onFocus={() => {
                  setActiveIndex(index);
                  setSuggestions([]);
                }}
                onBlur={() => handleBlurClear(index)}
                style={styles.input}
              />

              {activeIndex === index && suggestions.length > 0 && (
                <div style={styles.dropdown}>
                  {suggestions.map((s) => (
                    <div
                      key={s.roll}
                      onMouseDown={() => handleSelect(s)}
                      style={styles.suggestion}
                    >
                      {s.name} — {s.roll}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isEnigma && (
              <>
                <div style={styles.scoreCol}>
                  <input
                    type="number"
                    placeholder="Score"
                    value={student.score}
                    onChange={(e) => handleFieldChange(index, "score", e.target.value)}
                    style={styles.inputNumber}
                  />
                </div>

                <div style={styles.timeCol}>
                  <input
                    type="number"
                    placeholder="Time (s)"
                    value={student.time}
                    onChange={(e) => handleFieldChange(index, "time", e.target.value)}
                    style={styles.inputNumber}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <button style={styles.button} onClick={handleSubmit}>
          Submit
        </button>

        <div style={styles.meta}>
          {lastSavedAt ? `Last saved: ${new Date(lastSavedAt).toLocaleString()}` : ""}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "30%",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  box: {
    width: "100%",
    height: "350px",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fafafa",
    overflowY: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  heading: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
  },
  loading: { fontSize: 12, color: "#666" },
  row: {
    display: "grid",
    gridTemplateColumns: "2fr 0.8fr 0.8fr" ,
    gap: 8,
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  nameCol: { position: "relative", minWidth: 0 },
  scoreCol: {},
  timeCol: {},
  input: {
    width: "100%",
    padding: "8px 10px",
    fontSize: 14,
    boxSizing: "border-box",
  },
  inputNumber: {
    width: "100%",
    padding: "8px 10px",
    fontSize: 14,
    boxSizing: "border-box",
  },
  dropdown: {
    position: "absolute",
    background: "#fff",
    border: "1px solid #ddd",
    width: "100%",
    minWidth: "220px",             // ensure readable width 🔥
    maxHeight: "200px",
    overflowY: "auto",
    borderRadius: 6,
    zIndex: 40,
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    marginTop: 4,
  },
  suggestion: {
    padding: "8px 10px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
  },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 },
  button: {
    padding: "10px 14px",
    background: "#4f46e5",
    color: "white",
    fontWeight: 600,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  meta: { fontSize: 12, color: "#666" },
};
