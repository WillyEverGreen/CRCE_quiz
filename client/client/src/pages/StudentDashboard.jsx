import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function StudentDashboard() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();
  const [pastGames, setPastGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching past games
    setTimeout(() => {
      setPastGames([
        {
          id: 1,
          quizTitle: "Physics Mid-Term",
          date: "2024-03-20",
          score: 850,
          rank: 3,
          totalPlayers: 25,
          correctAnswers: 8,
          totalQuestions: 10,
        },
        {
          id: 2,
          quizTitle: "Math Challenge",
          date: "2024-03-18",
          score: 1200,
          rank: 1,
          totalPlayers: 30,
          correctAnswers: 10,
          totalQuestions: 10,
        },
        {
          id: 3,
          quizTitle: "Chemistry Basics",
          date: "2024-03-15",
          score: 600,
          rank: 8,
          totalPlayers: 20,
          correctAnswers: 6,
          totalQuestions: 10,
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSignOut = () => {
    clearUser();
    navigate("/");
  };

  const totalScore = pastGames.reduce((sum, g) => sum + g.score, 0);
  const avgRank = pastGames.length
    ? Math.round(pastGames.reduce((sum, g) => sum + g.rank, 0) / pastGames.length)
    : 0;
  const totalCorrect = pastGames.reduce((sum, g) => sum + g.correctAnswers, 0);
  const totalQuestions = pastGames.reduce((sum, g) => sum + g.totalQuestions, 0);

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
      backgroundColor: "rgba(6, 182, 212, 0.2)",
      border: "1px solid rgba(6, 182, 212, 0.3)",
      borderRadius: "20px",
      fontSize: "12px",
      color: "#22d3ee",
      fontWeight: 500,
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
        "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 211, 238, 0.1), rgba(29, 78, 216, 0.2))",
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
      color: "#22d3ee",
      backgroundColor: "rgba(6, 182, 212, 0.2)",
      border: "1px solid rgba(6, 182, 212, 0.3)",
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
    cardJoin: {
      background:
        "linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(26, 50, 80, 0.2))",
    },
    cardHistory: {
      background:
        "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(26, 29, 50, 0.2))",
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
    cardIconCyan: {
      backgroundColor: "rgba(34, 211, 238, 0.2)",
    },
    cardIconPurple: {
      backgroundColor: "rgba(147, 51, 234, 0.2)",
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
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
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
      fontSize: "28px",
      fontWeight: 500,
      color: "#fff",
    },
    statValueCyan: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "28px",
      fontWeight: 500,
      color: "#22d3ee",
    },
    gameRow: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      padding: "16px",
      borderRadius: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      marginBottom: "12px",
      transition: "all 0.2s ease",
    },
    gameInfo: {
      flex: 1,
    },
    gameTitle: {
      color: "#fff",
      fontWeight: 500,
      marginBottom: "4px",
    },
    gameMeta: {
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.5)",
    },
    gameStats: {
      display: "flex",
      gap: "24px",
      alignItems: "center",
    },
    gameStat: {
      textAlign: "center",
    },
    gameStatValue: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "20px",
      fontWeight: 500,
      color: "#fcff66",
    },
    gameStatLabel: {
      fontSize: "11px",
      color: "rgba(255, 255, 255, 0.5)",
      textTransform: "uppercase",
    },
    rankBadge: {
      padding: "6px 12px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 600,
    },
    rankGold: {
      backgroundColor: "rgba(252, 211, 77, 0.2)",
      color: "#fcd34d",
    },
    rankSilver: {
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      color: "#d1d5db",
    },
    rankBronze: {
      backgroundColor: "rgba(180, 83, 9, 0.2)",
      color: "#f59e0b",
    },
    rankDefault: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.7)",
    },
    emptyState: {
      textAlign: "center",
      padding: "48px",
      color: "rgba(255, 255, 255, 0.5)",
    },
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return styles.rankGold;
    if (rank === 2) return styles.rankSilver;
    if (rank === 3) return styles.rankBronze;
    return styles.rankDefault;
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

          <div style={styles.navRight}>
            <span style={styles.roleBadge}>Student</span>
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
            <span style={styles.heroBadge}>Student Dashboard</span>
            <h1 style={styles.heroTitle}>
              Welcome,
              <br />
              {user?.displayName?.split(" ")[0] || "Student"}!
            </h1>
            <p style={styles.heroSubtitle}>
              Ready to test your knowledge? Join a live quiz or check your past
              performances.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.cardsGrid}>
          <div
            style={{ ...styles.card, ...styles.cardJoin }}
            onClick={() => navigate("/join")}
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Join Quiz</h3>
            <p style={styles.cardDesc}>
              Enter a room code to join a live quiz session
            </p>
          </div>

          <div
            style={{ ...styles.card, ...styles.cardHistory }}
            onClick={() => {}}
          >
            <div style={{ ...styles.cardIconBox, ...styles.cardIconPurple }}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#a855f7"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Leaderboards</h3>
            <p style={styles.cardDesc}>
              View rankings and compete with classmates
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.glassSection}>
          <h2 style={styles.sectionTitle}>Your Performance</h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px", color: "rgba(255, 255, 255, 0.6)" }}>
              Loading stats...
            </div>
          ) : (
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Quizzes Played</p>
                <p style={styles.statValue}>{pastGames.length}</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Total Score</p>
                <p style={styles.statValueCyan}>{totalScore.toLocaleString()}</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Avg Rank</p>
                <p style={styles.statValue}>#{avgRank}</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Accuracy</p>
                <p style={styles.statValue}>
                  {totalQuestions > 0
                    ? Math.round((totalCorrect / totalQuestions) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Past Games */}
        <div style={styles.glassSection}>
          <h2 style={styles.sectionTitle}>Recent Games</h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px", color: "rgba(255, 255, 255, 0.6)" }}>
              Loading games...
            </div>
          ) : pastGames.length > 0 ? (
            <div>
              {pastGames.map((game) => (
                <div
                  key={game.id}
                  style={styles.gameRow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <div style={styles.gameInfo}>
                    <p style={styles.gameTitle}>{game.quizTitle}</p>
                    <p style={styles.gameMeta}>
                      {game.date} • {game.correctAnswers}/{game.totalQuestions}{" "}
                      correct • {game.totalPlayers} players
                    </p>
                  </div>
                  <div style={styles.gameStats}>
                    <div style={styles.gameStat}>
                      <div style={styles.gameStatValue}>{game.score}</div>
                      <div style={styles.gameStatLabel}>Score</div>
                    </div>
                    <div style={{ ...styles.rankBadge, ...getRankStyle(game.rank) }}>
                      #{game.rank}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <p>No games played yet. Join a quiz to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
