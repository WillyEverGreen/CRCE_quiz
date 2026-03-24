import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function QuizCreator() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: ["", "", "", ""],
      correctIndex: 0,
      timeLimit: 30,
      points: 1000,
    },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", "", "", ""],
        correctIndex: 0,
        timeLimit: timePerQuestion,
        points: 1000,
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Please enter a quiz title");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        setError(`Question ${i + 1} is empty`);
        return;
      }
      if (q.options.some((o) => !o.trim())) {
        setError(`Question ${i + 1} has empty options`);
        return;
      }
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          hostId: user.uid,
          timePerQuestion,
          questions,
        }),
      });

      if (!res.ok) throw new Error("Failed to save quiz");

      const data = await res.json();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to save quiz");
      setSaving(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#00041b",
      padding: "16px",
    },
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      paddingTop: "32px",
    },
    backBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "rgba(255, 255, 255, 0.6)",
      background: "none",
      border: "none",
      cursor: "pointer",
      marginBottom: "24px",
      fontSize: "14px",
    },
    title: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "36px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "32px",
    },
    section: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "24px",
      marginBottom: "24px",
    },
    label: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
      marginBottom: "8px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#fff",
      fontSize: "16px",
      outline: "none",
      boxSizing: "border-box",
    },
    questionCard: {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderRadius: "16px",
      padding: "20px",
      marginBottom: "16px",
    },
    questionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    questionNumber: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "18px",
      fontWeight: 500,
      color: "#fff",
    },
    removeBtn: {
      background: "none",
      border: "none",
      color: "#f87171",
      cursor: "pointer",
      fontSize: "14px",
    },
    optionsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginTop: "16px",
    },
    optionRow: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    radio: {
      width: "20px",
      height: "20px",
      accentColor: "#fcff66",
    },
    optionInput: {
      flex: 1,
      padding: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "14px",
      outline: "none",
    },
    settingsRow: {
      display: "flex",
      gap: "16px",
      marginTop: "16px",
    },
    settingGroup: {
      flex: 1,
    },
    smallInput: {
      width: "100%",
      padding: "10px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
    },
    addBtn: {
      width: "100%",
      padding: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
      border: "1px dashed rgba(255, 255, 255, 0.2)",
      borderRadius: "12px",
      fontSize: "14px",
      cursor: "pointer",
    },
    error: {
      padding: "12px",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "12px",
      color: "#f87171",
      fontSize: "14px",
      marginBottom: "16px",
    },
    saveBtn: {
      width: "100%",
      padding: "16px",
      backgroundColor: "#fcff66",
      color: "#000",
      border: "none",
      borderRadius: "48px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: saving ? "not-allowed" : "pointer",
      opacity: saving ? 0.5 : 1,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <h1 style={styles.title}>Create Quiz</h1>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.section}>
          <label style={styles.label}>Quiz Details</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Quiz Title (e.g., Physics Mid-Term Challenge)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            style={{
              ...styles.input,
              marginTop: "12px",
              minHeight: "80px",
              resize: "vertical",
            }}
            placeholder="Description (Optional) - Provide some context for your students..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  ...styles.label,
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                Default Time per Question (seconds)
              </label>
              <input
                style={styles.smallInput}
                type="number"
                min="5"
                max="300"
                value={timePerQuestion}
                onChange={(e) =>
                  setTimePerQuestion(parseInt(e.target.value) || 30)
                }
              />
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Questions</label>

          {questions.map((q, qIndex) => (
            <div key={qIndex} style={styles.questionCard}>
              <div style={styles.questionHeader}>
                <span style={styles.questionNumber}>Question {qIndex + 1}</span>
                {questions.length > 1 && (
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeQuestion(qIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                style={styles.input}
                type="text"
                placeholder="Enter question"
                value={q.text}
                onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
              />

              <div style={styles.optionsGrid}>
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} style={styles.optionRow}>
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctIndex === oIndex}
                      onChange={() =>
                        updateQuestion(qIndex, "correctIndex", oIndex)
                      }
                      style={styles.radio}
                    />
                    <input
                      style={styles.optionInput}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        updateOption(qIndex, oIndex, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              <div style={styles.settingsRow}>
                <div style={styles.settingGroup}>
                  <label style={{ ...styles.label, marginBottom: "4px" }}>
                    Time (sec)
                  </label>
                  <input
                    style={styles.smallInput}
                    type="number"
                    min="5"
                    max="120"
                    value={q.timeLimit}
                    onChange={(e) =>
                      updateQuestion(
                        qIndex,
                        "timeLimit",
                        parseInt(e.target.value) || 20,
                      )
                    }
                  />
                </div>
                <div style={styles.settingGroup}>
                  <label style={{ ...styles.label, marginBottom: "4px" }}>
                    Points
                  </label>
                  <input
                    style={styles.smallInput}
                    type="number"
                    min="100"
                    max="5000"
                    step="100"
                    value={q.points}
                    onChange={(e) =>
                      updateQuestion(
                        qIndex,
                        "points",
                        parseInt(e.target.value) || 1000,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <button style={styles.addBtn} onClick={addQuestion}>
            + Add Question
          </button>
        </div>

        <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Quiz"}
        </button>
      </div>
    </div>
  );
}
