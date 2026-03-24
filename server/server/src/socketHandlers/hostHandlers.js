import * as gm from "../gameManager.js";
import { db } from "../firebase.js";

export const registerHostHandlers = (io, socket) => {
  // Create a new game session
  socket.on("host:create", async ({ quizId, hostFirebaseUid, quizData }) => {
    try {
      let quizInfo;

      // If quizData is provided (for mock/testing), use it directly
      if (quizData) {
        quizInfo = quizData;
      } else {
        // Otherwise fetch from Firebase
        const snap = await db.collection("quizzes").doc(quizId).get();
        if (!snap.exists) {
          return socket.emit("error", { message: "Quiz not found" });
        }
        quizInfo = snap.data();
      }

      const roomCode = gm.generateRoomCode();
      const game = gm.createGame(roomCode, quizInfo, hostFirebaseUid);
      gm.setHostSocket(roomCode, socket.id);

      socket.join(roomCode);
      socket.emit("host:created", { roomCode, quiz: quizInfo });
      console.log(`Game created: ${roomCode} by ${hostFirebaseUid}`);
    } catch (error) {
      console.error("Error creating game:", error);
      socket.emit("error", { message: "Failed to create game" });
    }
  });

  // Start the game
  socket.on("host:start", ({ roomCode }) => {
    const game = gm.getGame(roomCode);
    if (!game || socket.id !== game.hostSocketId) {
      return socket.emit("error", { message: "Unauthorized" });
    }
    if (game.players.size === 0) {
      return socket.emit("error", { message: "No players have joined" });
    }
    sendNextQuestion(io, game, roomCode);
  });

  // Move to next question
  socket.on("host:next", ({ roomCode }) => {
    const game = gm.getGame(roomCode);
    if (!game || socket.id !== game.hostSocketId) return;
    sendNextQuestion(io, game, roomCode);
  });

  // End game early
  socket.on("host:end", ({ roomCode }) => {
    const game = gm.getGame(roomCode);
    if (!game || socket.id !== game.hostSocketId) return;

    if (game.questionTimer) {
      clearTimeout(game.questionTimer);
    }

    const finalLeaderboard = gm.getLeaderboard(roomCode);
    io.to(roomCode).emit("game:finished", { finalLeaderboard });
    gm.deleteGame(roomCode);
  });
};

const sendNextQuestion = (io, game, roomCode) => {
  // Clear previous timer
  if (game.questionTimer) {
    clearTimeout(game.questionTimer);
  }

  game.currentQuestionIndex++;
  game.answers.clear();

  const q = game.quizData.questions[game.currentQuestionIndex];

  if (!q) {
    // No more questions - game finished
    game.status = "finished";
    const finalLeaderboard = gm.getLeaderboard(roomCode);
    io.to(roomCode).emit("game:finished", { finalLeaderboard });
    gm.deleteGame(roomCode);
    return;
  }

  game.status = "question";
  game.questionStartTime = Date.now();

  // NEVER send correctIndex here - security!
  io.to(roomCode).emit("game:questionStart", {
    questionIndex: game.currentQuestionIndex,
    total: game.quizData.questions.length,
    text: q.text,
    options: q.options,
    timeLimit: q.timeLimit,
  });

  // Set timer to reveal answer
  game.questionTimer = setTimeout(
    () => {
      game.status = "answer";
      const leaderboard = gm.calculateScores(roomCode);

      io.to(roomCode).emit("game:answerReveal", {
        correctIndex: q.correctIndex,
        leaderboard,
      });
    },
    q.timeLimit * 1000 + 500,
  ); // +500ms buffer
};
