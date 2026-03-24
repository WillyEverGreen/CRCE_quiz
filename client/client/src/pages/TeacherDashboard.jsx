import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, [user]);

  const fetchQuizzes = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/quizzes?hostId=${user.uid}`,
      );
      if (res.ok) {
        const data = await res.json();
        setQuizzes(data);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
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
    navRight: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    roleBadge: {
      padding: "4px 12px",
      backgroundColor: "rgba(147, 51, 234, 0.2)",
      border: "1px solid rgba(147, 51, 234, 0.3)",
      borderRadius: "20px",
      fontSize: "12px",
      color: "#a855f7",
      fontWeight: 500,
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    userAvatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    userName: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.8)",
    },
    settingsBtn: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    signOutBtn: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "48px",
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
    },
    main: {
      paddingTop: "100px",
      paddingBottom: "48px",
      paddingLeft: "16px",
      paddingRight: "16px",
      maxWidth: "1152px",
      margin: "0 auto",
    },
    heroSection: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "32px",
      marginBottom: "32px",
      background:
        "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(168, 85, 247, 0.1), rgba(29, 78, 216, 0.2))",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    heroContent: {
      position: "relative",
      zIndex: 10,
      padding: "48px",
    },
    heroBadge: {
      display: "inline-block",
      padding: "4px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      color: "#a855f7",
      backgroundColor: "rgba(147, 51, 234, 0.2)",
      border: "1px solid rgba(147, 51, 234, 0.3)",
      marginBottom: "16px",
    },
    heroTitle: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "48px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "16px",
      letterSpacing: "-2px",
      lineHeight: 1.1,
    },
    heroSubtitle: {
      fontSize: "18px",
      color: "rgba(255, 255, 255, 0.6)",
      maxWidth: "600px",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "16px",
      marginBottom: "32px",
    },
    card: {
      padding: "24px",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    cardPurple: {
      background:
        "linear-gradient(135deg, rgba(64, 29, 120, 0.4), rgba(26, 50, 49, 0.2))",
    },
    cardCyan: {
      background:
        "linear-gradient(135deg, rgba(13, 64, 92, 0.5), rgba(26, 29, 50, 0.2))",
    },
    cardPink: {
      background:
        "linear-gradient(135deg, rgba(44, 12, 26, 0.8), rgba(26, 29, 50, 0.2))",
    },
    cardGreen: {
      background:
        "linear-gradient(135deg, rgba(20, 83, 45, 0.5), rgba(26, 29, 50, 0.2))",
    },
    cardIconBox: {
      width: "48px",
      height: "48px",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "16px",
    },
    cardIconYellow: {
      backgroundColor: "rgba(252, 255, 102, 0.1)",
    },
    cardIconCyan: {
      backgroundColor: "rgba(34, 211, 238, 0.1)",
    },
    cardIconPink: {
      backgroundColor: "rgba(244, 114, 182, 0.1)",
    },
    cardIconGreen: {
      backgroundColor: "rgba(34, 197, 94, 0.1)",
    },
    cardTitle: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "20px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "8px",
    },
    cardDesc: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
    },
    glassSection: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "24px",
      marginBottom: "32px",
      backdropFilter: "blur(20px)",
    },
    sectionTitle: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "24px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "24px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "16px",
    },
    statCard: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "16px",
      padding: "20px",
      border: "1px solid rgba(255, 255, 255, 0.05)",
    },
    statLabel: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
      marginBottom: "4px",
    },
    statValue: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "32px",
      fontWeight: 500,
      color: "#fff",
    },
    statValueYellow: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "32px",
      fontWeight: 500,
      color: "#fcff66",
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px",
      textAlign: "center",
    },
    emptyIcon: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "16px",
    },
    emptyText: {
      fontSize: "16px",
      color: "rgba(255, 255, 255, 0.6)",
      marginBottom: "16px",
    },
    ctaButton: {
      backgroundColor: "#fcff66",
      color: "#000",
      border: "none",
      borderRadius: "48px",
      padding: "12px 24px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarInner}>
          <div style={styles.logoRow} onClick={() => navigate("/")}>
            <svg
              style={styles.logoIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span style={styles.logoText}>CRCEQuiz</span>
          </div>

          <div style={styles.navRight}>
            <span style={styles.roleBadge}>Teacher</span>
            {user?.photoURL && (
              <div style={styles.userInfo}>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  style={styles.userAvatar}
                />
              </div>
            )}
            <button
              style={styles.settingsBtn}
              onClick={() => navigate("/settings")}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <button onClick={handleSignOut} style={styles.signOutBtn}>
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Welcome Hero */}
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <span style={styles.heroBadge}>Teacher Dashboard</span>
            <h1 style={styles.heroTitle}>
              Welcome back,
              <br />
              {user?.displayName?.split(" ")[0] || "Teacher"}!
            </h1>
            <p style={styles.heroSubtitle}>
              Ready to create engaging quizzes or challenge your students with a
              live session?
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.cardsGrid}>
          <div
            style={{ ...styles.card, ...styles.cardPurple }}
            onClick={() => navigate("/quiz/create")}
          >
            <div style={{ ...styles.cardIconBox, ...styles.cardIconYellow }}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#fcff66"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Create Quiz</h3>
            <p style={styles.cardDesc}>
              Build a new quiz with custom questions and scoring
            </p>
          </div>

          <div
            style={{ ...styles.card, ...styles.cardCyan }}
            onClick={() => navigate("/quizzes")}
          >
            <div style={{ ...styles.cardIconBox, ...styles.cardIconCyan }}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#22d3ee"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 style={styles.cardTitle}>My Quizzes</h3>
            <p style={styles.cardDesc}>
              View and manage all your created quizzes
            </p>
          </div>

          <div
            style={{ ...styles.card, ...styles.cardGreen }}
            onClick={() => navigate("/host")}
          >
            <div style={{ ...styles.cardIconBox, ...styles.cardIconGreen }}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#22c55e"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Host Game</h3>
            <p style={styles.cardDesc}>
              Start a live quiz session for your students
            </p>
          </div>

          <div
            style={{ ...styles.card, ...styles.cardPink }}
            onClick={() => navigate("/join")}
          >
            <div style={{ ...styles.cardIconBox, ...styles.cardIconPink }}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#f472b6"
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
            <h3 style={styles.cardTitle}>Join Game</h3>
            <p style={styles.cardDesc}>
              Enter a room code to join an active session
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.glassSection}>
          <h2 style={styles.sectionTitle}>Your Stats</h2>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Loading stats...
            </div>
          ) : (
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Total Quizzes</p>
                <p style={styles.statValue}>{quizzes.length}</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Total Questions</p>
                <p style={styles.statValue}>
                  {quizzes.reduce(
                    (sum, q) =>
                      sum + (q.questionCount || q.questions?.length || 0),
                    0,
                  )}
                </p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Sessions Hosted</p>
                <p style={styles.statValue}>
                  {quizzes.reduce((sum, q) => sum + (q.sessionCount || 0), 0)}
                </p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Avg Questions/Quiz</p>
                <p style={styles.statValueYellow}>
                  {quizzes.length > 0
                    ? Math.round(
                        quizzes.reduce(
                          (sum, q) =>
                            sum + (q.questionCount || q.questions?.length || 0),
                          0,
                        ) / quizzes.length,
                      )
                    : 0}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div style={styles.glassSection}>
          <h2 style={styles.sectionTitle}>Recent Quizzes</h2>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Loading quizzes...
            </div>
          ) : quizzes.length > 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {quizzes.slice(0, 5).map((quiz) => (
                <div
                  key={quiz.id}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    padding: "16px",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => navigate("/quizzes")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.borderColor =
                      "rgba(252, 255, 102, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#fff",
                        fontWeight: 500,
                        marginBottom: "4px",
                      }}
                    >
                      {quiz.title}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {quiz.questionCount || quiz.questions?.length || 0}{" "}
                      questions
                      {quiz.description &&
                        ` • ${quiz.description.substring(0, 50)}${quiz.description.length > 50 ? "..." : ""}`}
                    </p>
                  </div>
                  <button
                    style={{
                      backgroundColor: "#fcff66",
                      color: "#000",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/host", { state: { quiz } });
                    }}
                  >
                    Host
                  </button>
                </div>
              ))}
              {quizzes.length > 5 && (
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#fcff66",
                    border: "1px solid rgba(252, 255, 102, 0.3)",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() => navigate("/quizzes")}
                >
                  View All Quizzes →
                </button>
              )}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p style={styles.emptyText}>No quizzes yet</p>
              <button
                style={styles.ctaButton}
                onClick={() => navigate("/quiz/create")}
              >
                Create Your First Quiz
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
