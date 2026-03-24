import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../lib/socket";
import { useGameStore } from "../store/gameStore";
import Timer from "../components/Shared/Timer";
import QuestionCard from "../components/Shared/QuestionCard";
import AnswerButtons from "../components/Shared/AnswerButtons";
import Leaderboard from "../components/Shared/Leaderboard";

export default function Game() {
  const navigate = useNavigate();
  const {
    roomCode,
    status,
    isHost,
    currentQuestion,
    correctIndex,
    leaderboard,
    myAnswerIndex,
    playerCount,
    setCurrentQuestion,
    setAnswerReveal,
    setMyAnswer,
    setPlayers,
    addPlayer,
    removePlayer,
    setFinished,
    reset,
  } = useGameStore();

  const [waitingForHost, setWaitingForHost] = useState(
    !isHost && status === "lobby",
  );

  useEffect(() => {
    if (!roomCode) {
      navigate("/");
      return;
    }

    socket.on("game:questionStart", (data) => {
      setCurrentQuestion(data);
      setWaitingForHost(false);
    });

    socket.on("game:answerReveal", ({ correctIndex, leaderboard }) => {
      setAnswerReveal(correctIndex, leaderboard);
    });

    socket.on("game:playerJoined", ({ nickname, playerCount }) => {
      addPlayer(nickname);
    });
    
    socket.on("game:playerLeft", ({ nickname, playerCount }) => {
      removePlayer(nickname);
    });

    socket.on("game:finished", ({ finalLeaderboard }) => {
      setFinished(finalLeaderboard);
      navigate("/results");
    });

    socket.on("game:hostDisconnected", () => {
      alert("Host disconnected. Game ended.");
      reset();
      navigate("/");
    });

    return () => {
      socket.off("game:questionStart");
      socket.off("game:answerReveal");
      socket.off("game:playerJoined");
      socket.off("game:playerLeft");
      socket.off("game:finished");
      socket.off("game:hostDisconnected");
    };
  }, [
    roomCode,
    navigate,
    setCurrentQuestion,
    setAnswerReveal,
    setPlayers,
    setFinished,
    reset,
  ]);

  const handleAnswer = (index) => {
    if (myAnswerIndex !== null || status !== "question") return;
    setMyAnswer(index);
    socket.emit("player:answer", { roomCode, answerIndex: index });
  };

  const handleNextQuestion = () => {
    socket.emit("host:next", { roomCode });
  };

  const handleEndGame = () => {
    socket.emit("host:end", { roomCode });
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
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    roomBadge: {
      padding: "8px 16px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      fontSize: "14px",
      color: "#fff",
    },
    hostControls: {
      display: "flex",
      gap: "12px",
    },
    btnPrimary: {
      padding: "12px 24px",
      backgroundColor: "#fcff66",
      color: "#000",
      border: "none",
      borderRadius: "48px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
    },
    btnDanger: {
      padding: "12px 24px",
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      color: "#f87171",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "48px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
    },
    timerSection: {
      marginBottom: "24px",
    },
    questionSection: {
      marginBottom: "24px",
    },
    waitingBox: {
      textAlign: "center",
      padding: "64px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    waitingTitle: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "32px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "16px",
    },
    waitingText: {
      color: "rgba(255, 255, 255, 0.6)",
    },
    answerResult: {
      textAlign: "center",
      padding: "24px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "16px",
      marginBottom: "24px",
    },
    resultText: {
      fontSize: "24px",
      fontWeight: 500,
    },
    correct: {
      color: "#22c55e",
    },
    incorrect: {
      color: "#ef4444",
    },
  };

  // Waiting for game to start (player)
  if (waitingForHost) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.waitingBox}>
            <h2 style={styles.waitingTitle}>You're in!</h2>
            <p style={styles.waitingText}>
              Waiting for host to start the game...
            </p>
            <p style={{ ...styles.waitingText, marginTop: "16px" }}>
              Room: <strong style={{ color: "#fcff66" }}>{roomCode}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Question phase
  if (status === "question" && currentQuestion) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <span style={styles.roomBadge}>Room: {roomCode}</span>
            {isHost && (
              <button style={styles.btnDanger} onClick={handleEndGame}>
                End Game
              </button>
            )}
          </div>

          <div style={styles.timerSection}>
            <Timer duration={currentQuestion.timeLimit} onExpire={() => {}} />
          </div>

          <div style={styles.questionSection}>
            <QuestionCard
              question={currentQuestion.text}
              questionIndex={currentQuestion.questionIndex}
              total={currentQuestion.total}
            />
          </div>

          <AnswerButtons
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            selectedIndex={myAnswerIndex}
            disabled={myAnswerIndex !== null || isHost}
            showResult={false}
          />

          {myAnswerIndex !== null && !isHost && (
            <div style={{ ...styles.answerResult, marginTop: "24px" }}>
              <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                Answer submitted! Waiting for results...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Answer reveal phase
  if (status === "answer" && currentQuestion) {
    const isCorrect = myAnswerIndex === correctIndex;

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <span style={styles.roomBadge}>Room: {roomCode}</span>
            {isHost && (
              <div style={styles.hostControls}>
                <button style={styles.btnPrimary} onClick={handleNextQuestion}>
                  Next Question
                </button>
                <button style={styles.btnDanger} onClick={handleEndGame}>
                  End Game
                </button>
              </div>
            )}
          </div>

          <div style={styles.questionSection}>
            <QuestionCard
              question={currentQuestion.text}
              questionIndex={currentQuestion.questionIndex}
              total={currentQuestion.total}
            />
          </div>

          <AnswerButtons
            options={currentQuestion.options}
            onAnswer={() => {}}
            selectedIndex={myAnswerIndex}
            correctIndex={correctIndex}
            disabled={true}
            showResult={true}
          />

          {!isHost && myAnswerIndex !== null && (
            <div style={styles.answerResult}>
              <p
                style={{
                  ...styles.resultText,
                  ...(isCorrect ? styles.correct : styles.incorrect),
                }}
              >
                {isCorrect ? "✓ Correct!" : "✗ Wrong!"}
              </p>
            </div>
          )}

          <div style={{ marginTop: "24px" }}>
            <Leaderboard players={leaderboard} title="Leaderboard" />
          </div>
        </div>
      </div>
    );
  }

  // Default loading state
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.waitingBox}>
          <h2 style={styles.waitingTitle}>Loading...</h2>
        </div>
      </div>
    </div>
  );
}
