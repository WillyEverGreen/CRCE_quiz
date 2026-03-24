import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket, connectSocket } from "../lib/socket";
import { useGameStore } from "../store/gameStore";

export default function PlayerJoin() {
  const [roomCode, setRoomCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    setRoomCode: setStoreRoomCode,
    setNickname: setStoreNickname,
    setStatus,
    setIsHost,
    setPlayers,
  } = useGameStore();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!roomCode.trim() || !nickname.trim()) {
      setError("Please enter both room code and nickname");
      return;
    }

    setLoading(true);
    setError("");
    connectSocket();

    socket.emit("player:join", {
      roomCode: roomCode.toUpperCase(),
      nickname: nickname.trim(),
    });

    socket.once("player:joinAck", ({ success, error: err, roomCode: code, players }) => {
      setLoading(false);
      if (success) {
        setStoreRoomCode(code);
        setStoreNickname(nickname.trim());
        setStatus("lobby");
        setIsHost(false);
        if (players) {
          setPlayers(players.map((name, i) => ({ nickname: name, socketId: `p${i}` })));
        }
        navigate("/game");
      } else {
        setError(err || "Failed to join game");
      }
    });
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#00041b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      padding: "40px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
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
      marginBottom: "8px",
      letterSpacing: "-1px",
    },
    subtitle: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
      marginBottom: "32px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
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
    codeInput: {
      width: "100%",
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#fff",
      fontSize: "32px",
      fontFamily: "Chillax, sans-serif",
      fontWeight: 500,
      textAlign: "center",
      letterSpacing: "8px",
      textTransform: "uppercase",
      outline: "none",
      boxSizing: "border-box",
    },
    error: {
      padding: "12px",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "12px",
      color: "#f87171",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "16px",
      backgroundColor: "#fcff66",
      color: "#000",
      border: "none",
      borderRadius: "48px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.5 : 1,
      marginTop: "8px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button style={styles.backBtn} onClick={() => navigate("/")}>
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

        <h1 style={styles.title}>Join Game</h1>
        <p style={styles.subtitle}>
          Enter the room code shown on the host's screen
        </p>

        <form style={styles.form} onSubmit={handleJoin}>
          <input
            style={styles.codeInput}
            type="text"
            placeholder="ABCD12"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.slice(0, 6))}
            maxLength={6}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
          />
          {error && <div style={styles.error}>{error}</div>}
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Joining..." : "Join Game"}
          </button>
        </form>
      </div>
    </div>
  );
}
