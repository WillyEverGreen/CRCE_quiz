import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const mockLogin = useAuthStore((state) => state.mockLogin);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate login delay
    setTimeout(() => {
      mockLogin(name.trim(), email.trim() || null, selectedRole);
      setLoading(false);
      navigate("/dashboard");
    }, 500);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#00041b",
    },
    bgBlob1: {
      position: "absolute",
      top: "20%",
      left: "20%",
      width: "400px",
      height: "400px",
      backgroundColor: "rgba(147, 51, 234, 0.15)",
      borderRadius: "50%",
      filter: "blur(100px)",
    },
    bgBlob2: {
      position: "absolute",
      bottom: "20%",
      right: "20%",
      width: "400px",
      height: "400px",
      backgroundColor: "rgba(6, 182, 212, 0.15)",
      borderRadius: "50%",
      filter: "blur(100px)",
    },
    card: {
      position: "relative",
      zIndex: 10,
      width: "100%",
      maxWidth: "430px",
      margin: "0 16px",
      padding: "clamp(20px, 2.6vw, 30px)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      backdropFilter: "blur(20px)",
    },
    logoContainer: {
      textAlign: "center",
      marginBottom: "24px",
    },
    logoRow: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "18px",
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      color: "#fcff66",
    },
    logoText: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "24px",
      fontWeight: 500,
      color: "#fff",
    },
    title: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "clamp(34px, 4.3vw, 44px)",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "10px",
      letterSpacing: "-2px",
    },
    subtitle: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.8)",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#fff",
      fontSize: "15px",
      outline: "none",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    roleSection: {
      marginTop: "4px",
      border: "none",
      padding: 0,
    },
    roleLabel: {
      fontSize: "14px",
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: "12px",
      display: "block",
    },
    roleGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
    },
    roleCard: {
      padding: "16px",
      borderRadius: "16px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textAlign: "center",
      color: "inherit",
      width: "100%",
    },
    roleCardSelected: {
      padding: "16px",
      borderRadius: "16px",
      border: "2px solid #fcff66",
      backgroundColor: "rgba(252, 255, 102, 0.1)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textAlign: "center",
      color: "inherit",
      width: "100%",
    },
    roleIcon: {
      width: "42px",
      height: "42px",
      margin: "0 auto 10px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    roleIconTeacher: {
      backgroundColor: "rgba(147, 51, 234, 0.2)",
    },
    roleIconStudent: {
      backgroundColor: "rgba(6, 182, 212, 0.2)",
    },
    roleTitle: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "17px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "4px",
    },
    roleDesc: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.5)",
    },
    errorBox: {
      padding: "12px 16px",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "12px",
      color: "#f87171",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      backgroundColor: "#fcff66",
      color: "#000",
      border: "none",
      borderRadius: "48px",
      padding: "14px 22px",
      fontSize: "15px",
      fontWeight: 500,
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.5 : 1,
      transition: "all 0.2s ease",
      marginTop: "4px",
    },
    footer: {
      marginTop: "18px",
      paddingTop: "16px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center",
    },
    footerText: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.4)",
    },
  };

  return (
    <main style={styles.container} aria-labelledby="login-title">
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>

      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logoRow}>
            <svg
              style={styles.logoIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span style={styles.logoText}>CRCEQuiz</span>
          </div>
          <h1 id="login-title" style={styles.title}>Get Started</h1>
          <p style={styles.subtitle}>
            Enter your details and select your role to continue
          </p>
        </div>

        <form style={styles.form} onSubmit={handleLogin} noValidate>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Your Name *</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              autoComplete="name"
              required
              aria-invalid={Boolean(error && !name.trim())}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(252, 255, 102, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email (Optional)</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(252, 255, 102, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            />
          </div>

          <fieldset style={styles.roleSection}>
            <legend style={styles.roleLabel}>I am a... *</legend>
            <div style={styles.roleGrid}>
              <button
                type="button"
                style={
                  selectedRole === "teacher"
                    ? styles.roleCardSelected
                    : styles.roleCard
                }
                onClick={() => setSelectedRole("teacher")}
                aria-pressed={selectedRole === "teacher"}
              >
                <div
                  style={{ ...styles.roleIcon, ...styles.roleIconTeacher }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke={selectedRole === "teacher" ? "#fcff66" : "#a855f7"}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <div style={styles.roleTitle}>Teacher</div>
                <div style={styles.roleDesc}>Create & host quizzes</div>
              </button>

              <button
                type="button"
                style={
                  selectedRole === "student"
                    ? styles.roleCardSelected
                    : styles.roleCard
                }
                onClick={() => setSelectedRole("student")}
                aria-pressed={selectedRole === "student"}
              >
                <div
                  style={{ ...styles.roleIcon, ...styles.roleIconStudent }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke={selectedRole === "student" ? "#fcff66" : "#06b6d4"}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <div style={styles.roleTitle}>Student</div>
                <div style={styles.roleDesc}>Join & play quizzes</div>
              </button>
            </div>
          </fieldset>

          {error && (
            <div role="alert" aria-live="polite" style={styles.errorBox}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

      </div>
    </main>
  );
}
