import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import Leaderboard from "../components/Shared/Leaderboard";

export default function Results() {
  const navigate = useNavigate();
  const { leaderboard, isHost, reset } = useGameStore();

  const handlePlayAgain = () => {
    reset();
    navigate(isHost ? "/host" : "/join");
  };

  const handleGoHome = () => {
    reset();
    navigate("/");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#00041b",
      padding: "16px",
    },
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      paddingTop: "48px",
      textAlign: "center",
    },
    title: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "48px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "16px",
    },
    subtitle: {
      fontSize: "18px",
      color: "rgba(255, 255, 255, 0.6)",
      marginBottom: "48px",
    },
    winner: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "32px",
      fontWeight: 500,
      color: "#fcff66",
      marginBottom: "8px",
    },
    winnerScore: {
      fontSize: "18px",
      color: "rgba(255, 255, 255, 0.6)",
      marginBottom: "48px",
    },
    buttonRow: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      marginTop: "48px",
    },
    btnPrimary: {
      padding: "16px 32px",
      backgroundColor: "#fcff66",
      color: "#000",
      border: "none",
      borderRadius: "48px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: "pointer",
    },
    btnSecondary: {
      padding: "16px 32px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "48px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: "pointer",
    },
  };

  const winner = leaderboard[0];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Game Over!</h1>
        <p style={styles.subtitle}>Final Results</p>

        {winner && (
          <>
            <div style={styles.winner}>🏆 {winner.nickname}</div>
            <div style={styles.winnerScore}>
              {winner.score?.toLocaleString()} points
            </div>
          </>
        )}

        <Leaderboard players={leaderboard} title="Final Standings" />

        <div style={styles.buttonRow}>
          <button style={styles.btnPrimary} onClick={handlePlayAgain}>
            Play Again
          </button>
          <button style={styles.btnSecondary} onClick={handleGoHome}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
