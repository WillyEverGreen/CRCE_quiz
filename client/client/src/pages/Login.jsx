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

  const handleLogin = () => {
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
      maxWidth: "480px",
      margin: "0 16px",
      padding: "40px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      backdropFilter: "blur(20px)",
    },
    logoContainer: {
      textAlign: "center",
      marginBottom: "32px",
    },
    logoRow: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "24px",
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
      fontSize: "36px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "12px",
      letterSpacing: "-2px",
    },
    subtitle: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
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
      padding: "14px 16px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#fff",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    roleSection: {
      marginTop: "8px",
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
      gap: "12px",
    },
    roleCard: {
      padding: "20px",
      borderRadius: "16px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textAlign: "center",
    },
    roleCardSelected: {
      padding: "20px",
      borderRadius: "16px",
      border: "2px solid #fcff66",
      backgroundColor: "rgba(252, 255, 102, 0.1)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textAlign: "center",
    },
    roleIcon: {
      width: "48px",
      height: "48px",
      margin: "0 auto 12px",
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
      fontSize: "18px",
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
      padding: "16px 24px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.5 : 1,
      transition: "all 0.2s ease",
      marginTop: "8px",
    },
    footer: {
      marginTop: "24px",
      paddingTop: "20px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center",
    },
    footerText: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.4)",
    },
    devBadge: {
      display: "inline-block",
      padding: "4px 12px",
      backgroundColor: "rgba(252, 255, 102, 0.1)",
      border: "1px solid rgba(252, 255, 102, 0.3)",
      borderRadius: "20px",
      fontSize: "11px",
      color: "#fcff66",
      marginBottom: "24px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>

      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.devBadge}>Development Mode</div>
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
          <h1 style={styles.title}>Get Started</h1>
          <p style={styles.subtitle}>
            Enter your details and select your role to continue
          </p>
        </div>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(252, 255, 102, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email (Optional)</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(252, 255, 102, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            />
          </div>

          <div style={styles.roleSection}>
            <span style={styles.roleLabel}>I am a... *</span>
            <div style={styles.roleGrid}>
              <div
                style={
                  selectedRole === "teacher"
                    ? styles.roleCardSelected
                    : styles.roleCard
                }
                onClick={() => setSelectedRole("teacher")}
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
              </div>

              <div
                style={
                  selectedRole === "student"
                    ? styles.roleCardSelected
                    : styles.roleCard
                }
                onClick={() => setSelectedRole("student")}
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
              </div>
            </div>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            This is a development build. Google authentication is disabled.
          </p>
        </div>
      </div>
    </div>
  );
}
