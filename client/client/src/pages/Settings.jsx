import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Settings() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const setRole = useAuthStore((state) => state.setRole);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const [editName, setEditName] = useState(user?.displayName || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [selectedRole, setSelectedRole] = useState(role);
  const [saved, setSaved] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    // Update user info
    setUser({
      ...user,
      displayName: editName,
      email: editEmail,
    });

    // Update role if changed
    if (selectedRole !== role) {
      setRole(selectedRole);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSignOut = () => {
    clearUser();
    navigate("/");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#00041b",
    },
    navbar: {
      position: "fixed",
      top: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
      width: "94%",
      maxWidth: "1024px",
    },
    navbarInner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 24px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      backdropFilter: "blur(20px)",
    },
    logoRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
    logoIcon: {
      width: "32px",
      height: "32px",
      color: "#fcff66",
    },
    logoText: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "18px",
      fontWeight: 500,
      color: "#fff",
    },
    backBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "48px",
      padding: "8px 16px",
      fontSize: "14px",
      cursor: "pointer",
    },
    main: {
      paddingTop: "100px",
      paddingBottom: "48px",
      paddingLeft: "16px",
      paddingRight: "16px",
      maxWidth: "720px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "32px",
    },
    title: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "36px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "8px",
      letterSpacing: "-1px",
    },
    subtitle: {
      fontSize: "16px",
      color: "rgba(255, 255, 255, 0.6)",
    },
    section: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "24px",
      marginBottom: "24px",
      backdropFilter: "blur(20px)",
    },
    sectionTitle: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "20px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    sectionIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "12px",
      backgroundColor: "rgba(252, 255, 102, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.7)",
      marginBottom: "8px",
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
    roleGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    roleCard: {
      padding: "24px",
      borderRadius: "16px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    roleCardSelected: {
      padding: "24px",
      borderRadius: "16px",
      border: "2px solid #fcff66",
      backgroundColor: "rgba(252, 255, 102, 0.1)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    roleHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "8px",
    },
    roleIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "10px",
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
    },
    roleDesc: {
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.5)",
      lineHeight: 1.5,
    },
    roleFeatures: {
      marginTop: "12px",
      paddingTop: "12px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    },
    roleFeature: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.6)",
      marginBottom: "6px",
    },
    checkIcon: {
      color: "#22c55e",
    },
    actions: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      marginTop: "24px",
    },
    saveBtn: {
      backgroundColor: "#fcff66",
      color: "#000",
      border: "none",
      borderRadius: "48px",
      padding: "12px 32px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    saveBtnSuccess: {
      backgroundColor: "#22c55e",
      color: "#fff",
    },
    dangerSection: {
      backgroundColor: "rgba(239, 68, 68, 0.05)",
      border: "1px solid rgba(239, 68, 68, 0.2)",
    },
    dangerTitle: {
      color: "#f87171",
    },
    signOutBtn: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      color: "#f87171",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    currentBadge: {
      fontSize: "11px",
      padding: "2px 8px",
      backgroundColor: "rgba(34, 211, 238, 0.2)",
      color: "#22d3ee",
      borderRadius: "10px",
      marginLeft: "8px",
    },
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarInner}>
          <div style={styles.logoRow} onClick={() => navigate("/")}>
            <svg style={styles.logoIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span style={styles.logoText}>CRCEQuiz</span>
          </div>

          <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
            <svg
              width="16"
              height="16"
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
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Settings</h1>
          <p style={styles.subtitle}>Manage your profile and preferences</p>
        </div>

        {/* Profile Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <div style={styles.sectionIcon}>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#fcff66"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            Profile Information
          </h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Display Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={styles.input}
              placeholder="Enter your name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>User ID</label>
            <input
              type="text"
              value={user?.uid || ""}
              style={{ ...styles.input, opacity: 0.5, cursor: "not-allowed" }}
              disabled
            />
          </div>
        </div>

        {/* Role Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <div style={styles.sectionIcon}>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#fcff66"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            Role & Access
          </h2>

          <div style={styles.roleGrid}>
            <div
              style={
                selectedRole === "teacher"
                  ? styles.roleCardSelected
                  : styles.roleCard
              }
              onClick={() => setSelectedRole("teacher")}
            >
              <div style={styles.roleHeader}>
                <div style={{ ...styles.roleIcon, ...styles.roleIconTeacher }}>
                  <svg
                    width="20"
                    height="20"
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
                <div style={styles.roleTitle}>
                  Teacher
                  {role === "teacher" && (
                    <span style={styles.currentBadge}>Current</span>
                  )}
                </div>
              </div>
              <p style={styles.roleDesc}>
                Create quizzes, host live sessions, and view analytics.
              </p>
              <div style={styles.roleFeatures}>
                <div style={styles.roleFeature}>
                  <span style={styles.checkIcon}>✓</span> Create & edit quizzes
                </div>
                <div style={styles.roleFeature}>
                  <span style={styles.checkIcon}>✓</span> Host live quiz sessions
                </div>
                <div style={styles.roleFeature}>
                  <span style={styles.checkIcon}>✓</span> View quiz reports
                </div>
              </div>
            </div>

            <div
              style={
                selectedRole === "student"
                  ? styles.roleCardSelected
                  : styles.roleCard
              }
              onClick={() => setSelectedRole("student")}
            >
              <div style={styles.roleHeader}>
                <div style={{ ...styles.roleIcon, ...styles.roleIconStudent }}>
                  <svg
                    width="20"
                    height="20"
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
                <div style={styles.roleTitle}>
                  Student
                  {role === "student" && (
                    <span style={styles.currentBadge}>Current</span>
                  )}
                </div>
              </div>
              <p style={styles.roleDesc}>
                Join quizzes, compete with classmates, and track progress.
              </p>
              <div style={styles.roleFeatures}>
                <div style={styles.roleFeature}>
                  <span style={styles.checkIcon}>✓</span> Join live quizzes
                </div>
                <div style={styles.roleFeature}>
                  <span style={styles.checkIcon}>✓</span> View past performances
                </div>
                <div style={styles.roleFeature}>
                  <span style={styles.checkIcon}>✓</span> See leaderboards
                </div>
              </div>
            </div>
          </div>

          {selectedRole !== role && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 16px",
                backgroundColor: "rgba(252, 255, 102, 0.1)",
                border: "1px solid rgba(252, 255, 102, 0.3)",
                borderRadius: "12px",
                fontSize: "14px",
                color: "#fcff66",
              }}
            >
              Changing your role will update your dashboard and available
              features.
            </div>
          )}
        </div>

        {/* Save Button */}
        <div style={styles.actions}>
          <button
            style={{
              ...styles.saveBtn,
              ...(saved ? styles.saveBtnSuccess : {}),
            }}
            onClick={handleSave}
          >
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>

        {/* Danger Zone */}
        <div style={{ ...styles.section, ...styles.dangerSection }}>
          <h2 style={{ ...styles.sectionTitle, ...styles.dangerTitle }}>
            <div
              style={{
                ...styles.sectionIcon,
                backgroundColor: "rgba(239, 68, 68, 0.1)",
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#f87171"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            Account
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "16px",
            }}
          >
            Sign out of your account. You'll need to log in again to access the
            dashboard.
          </p>

          <button style={styles.signOutBtn} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}
