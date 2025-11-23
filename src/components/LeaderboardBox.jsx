import { useState } from "react";
import { studentsDB } from "../data/students";

function LeaderboardBox({ title, count }) {
  const [selected, setSelected] = useState(
    Array.from({ length: count }, () => ({
      name: "",
      roll: "",
      year: "",
      score: ""
    }))
  );

  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTyping = (index, value) => {
    setActiveIndex(index);

    const filtered = studentsDB.filter((s) =>
      s.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);

    const copy = [...selected];
    copy[index].name = value;
    setSelected(copy);
  };

  const handleSelect = (student) => {
    const updated = [...selected];
    updated[activeIndex] = {
      name: student.name,
      roll: student.roll,
      year: student.year,
      score: student.score,
    };

    setSelected(updated);
    setSuggestions([]);
    setActiveIndex(null);
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.heading}>{title}</h3>

      {selected.map((student, index) => (
        <div key={index} style={styles.inputBox}>
          <input
            type="text"
            placeholder="Select student"
            value={student.name}
            onChange={(e) => handleTyping(index, e.target.value)}
            onFocus={() => {
              setActiveIndex(index);
              setSuggestions([]);
            }}
            onBlur={() => {
              setTimeout(() => setSuggestions([]), 200);
            }}
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
      ))}
    </div>
  );
}

const styles = {
  box: {
  width: "30%",
  height: "350px",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  background: "#fafafa",
  overflowY: "auto",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",   // nice card look
},
  heading: {
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "600",
  },
  inputBox: {
    marginBottom: "20px",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "15px",
  },
  dropdown: {
    position: "absolute",
    background: "#fff",
    border: "1px solid #ddd",
    width: "100%",
    maxHeight: "150px",
    overflowY: "auto",
    borderRadius: "5px",
    zIndex: 10,
  },
  suggestion: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    color: "#000",
  },
};

export default LeaderboardBox;
