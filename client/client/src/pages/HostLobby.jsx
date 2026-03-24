import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket, connectSocket } from "../lib/socket";
import { useGameStore } from "../store/gameStore";
import { useAuthStore } from "../store/authStore";

export default function HostLobby() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    roomCode,
    setRoomCode,
    setQuiz,
    setStatus,
    setIsHost,
    players,
    setPlayers,
    addPlayer,
    removePlayer,
    playerCount,
  } = useGameStore();

  // Fetch user's quizzes
  useEffect(() => {
    if (!user?.uid) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/quizzes?hostId=${user.uid}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        setQuizzes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // For testing, add mock quizzes when API fails
        setQuizzes([
          {
            id: "mock-quiz-1",
            title: "Sample Math Quiz",
            description: "Basic arithmetic questions",
            questionCount: 5,
            timePerQuestion: 30,
            questions: [
              { text: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctIndex: 1, timeLimit: 30, points: 100 },
              { text: "What is 5 x 3?", options: ["10", "12", "15", "18"], correctIndex: 2, timeLimit: 30, points: 100 },
              { text: "What is 10 - 4?", options: ["4", "5", "6", "7"], correctIndex: 2, timeLimit: 30, points: 100 },
              { text: "What is 8 / 2?", options: ["2", "3", "4", "5"], correctIndex: 2, timeLimit: 30, points: 100 },
              { text: "What is 3 + 7?", options: ["8", "9", "10", "11"], correctIndex: 2, timeLimit: 30, points: 100 },
            ],
          },
          {
            id: "mock-quiz-2",
            title: "Science Basics",
            description: "General science questions",
            questionCount: 3,
            timePerQuestion: 45,
            questions: [
              { text: "What planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correctIndex: 1, timeLimit: 45, points: 100 },
              { text: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Carbon"], correctIndex: 2, timeLimit: 45, points: 100 },
              { text: "How many legs does a spider have?", options: ["6", "8", "10", "12"], correctIndex: 1, timeLimit: 45, points: 100 },
            ],
          },
        ]);
        setLoading(false);
      });
  }, [user, navigate]);

  // Socket event listeners
  useEffect(() => {
    if (!roomCode) return;

    socket.on(
      "game:playerJoined",
      ({ nickname, playerCount }) => {
        addPlayer(nickname);
      },
    );

    socket.on("game:playerLeft", ({ nickname, playerCount }) => {
      removePlayer(nickname);
    });

    return () => {
      socket.off("game:playerJoined");
      socket.off("game:playerLeft");
    };
  }, [roomCode, addPlayer, removePlayer]);

  const handleCreateGame = () => {
    if (!selectedQuiz) {
      setError("Please select a quiz first");
      return;
    }

    setCreating(true);
    setError("");
    connectSocket();

    // For mock quizzes, send the quiz data directly
    const isMockQuiz = selectedQuiz.id?.startsWith("mock-");

    socket.emit("host:create", {
      quizId: selectedQuiz.id,
      hostFirebaseUid: user.uid,
      // Include quiz data for mock quizzes
      quizData: isMockQuiz ? selectedQuiz : undefined,
    });

    socket.once("host:created", ({ roomCode: code, quiz }) => {
      setCreating(false);
      setRoomCode(code);
      setQuiz(quiz);
      setStatus("lobby");
      setIsHost(true);
    });

    socket.once("error", ({ message }) => {
      setCreating(false);
      setError(message || "Failed to create game");
    });
  };

  const handleStartGame = () => {
    if (playerCount === 0) {
      setError("Wait for players to join");
      return;
    }
    socket.emit("host:start", { roomCode });
    navigate("/game");
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
    sectionTitle: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "20px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "16px",
    },
    quizList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    quizItem: {
      padding: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      border: "2px solid transparent",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    quizItemSelected: {
      padding: "16px",
      backgroundColor: "rgba(252, 255, 102, 0.1)",
      border: "2px solid rgba(252, 255, 102, 0.5)",
      borderRadius: "12px",
      cursor: "pointer",
    },
    quizTitle: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#fff",
    },
    quizMeta: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.5)",
      marginTop: "4px",
    },
    roomCodeBox: {
      textAlign: "center",
      padding: "32px",
    },
    roomCodeLabel: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.6)",
      marginBottom: "8px",
    },
    roomCode: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "64px",
      fontWeight: 600,
      color: "#fcff66",
      letterSpacing: "8px",
    },
    playerList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "16px",
    },
    playerChip: {
      padding: "8px 16px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      fontSize: "14px",
      color: "#fff",
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
      cursor: "pointer",
    },
    buttonDisabled: {
      width: "100%",
      padding: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.5)",
      border: "none",
      borderRadius: "48px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: "not-allowed",
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
    empty: {
      textAlign: "center",
      color: "rgba(255, 255, 255, 0.5)",
      padding: "24px",
    },
    createLink: {
      color: "#fcff66",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  if (loading) {
    return (
      <div
        style={{
          ...styles.page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "#fff" }}>Loading...</div>
      </div>
    );
  }

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
          Back to Dashboard
        </button>

        <h1 style={styles.title}>{roomCode ? "Game Lobby" : "Host a Game"}</h1>

        {error && <div style={styles.error}>{error}</div>}

        {!roomCode ? (
          <>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Select a Quiz</h2>
              {quizzes.length === 0 ? (
                <div style={styles.empty}>
                  No quizzes yet.{" "}
                  <span
                    style={styles.createLink}
                    onClick={() => navigate("/quiz/create")}
                  >
                    Create one
                  </span>
                </div>
              ) : (
                <div style={styles.quizList}>
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      style={
                        selectedQuiz?.id === quiz.id
                          ? styles.quizItemSelected
                          : styles.quizItem
                      }
                      onClick={() => setSelectedQuiz(quiz)}
                    >
                      <div style={styles.quizTitle}>{quiz.title}</div>
                      {quiz.description && (
                        <div
                          style={{
                            ...styles.quizMeta,
                            marginTop: "4px",
                            fontSize: "13px",
                          }}
                        >
                          {quiz.description}
                        </div>
                      )}
                      <div style={styles.quizMeta}>
                        {quiz.questionCount || quiz.questions?.length || 0}{" "}
                        questions
                        {quiz.timePerQuestion &&
                          ` • ${quiz.timePerQuestion}s per question`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              style={
                selectedQuiz && !creating
                  ? styles.button
                  : styles.buttonDisabled
              }
              onClick={handleCreateGame}
              disabled={!selectedQuiz || creating}
            >
              {creating ? "Creating..." : "Create Game"}
            </button>
          </>
        ) : (
          <>
            <div style={styles.section}>
              <div style={styles.roomCodeBox}>
                <div style={styles.roomCodeLabel}>Room Code</div>
                <div style={styles.roomCode}>{roomCode}</div>
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Players ({playerCount})</h2>
              {playerCount === 0 ? (
                <div style={styles.empty}>Waiting for players to join...</div>
              ) : (
                <div style={styles.playerList}>
                  {players.map((player) => (
                    <div key={player.socketId} style={styles.playerChip}>
                      {player.nickname}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              style={playerCount > 0 ? styles.button : styles.buttonDisabled}
              onClick={handleStartGame}
              disabled={playerCount === 0}
            >
              Start Game ({playerCount} players)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
