import * as gm from "../gameManager.js";

// Rate limiting: track join attempts per socket
const joinAttempts = new Map(); // socketId -> { count, resetTime }
const MAX_JOIN_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 10000; // 10 seconds

const checkRateLimit = (socketId) => {
  const now = Date.now();
  const attempt = joinAttempts.get(socketId);

  if (!attempt || now > attempt.resetTime) {
    joinAttempts.set(socketId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (attempt.count >= MAX_JOIN_ATTEMPTS) {
    return false;
  }

  attempt.count++;
  return true;
};

// Input validation
const validateNickname = (nickname) => {
  if (!nickname || typeof nickname !== 'string') {
    return { valid: false, error: "Nickname is required" };
  }

  const trimmed = nickname.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: "Nickname must be at least 2 characters" };
  }

  if (trimmed.length > 20) {
    return { valid: false, error: "Nickname must be 20 characters or less" };
  }

  // Only allow alphanumeric, spaces, underscores, and hyphens
  if (!/^[a-zA-Z0-9_\- ]+$/.test(trimmed)) {
    return { valid: false, error: "Nickname contains invalid characters" };
  }

  return { valid: true, nickname: trimmed };
};

const validateRoomCode = (roomCode) => {
  if (!roomCode || typeof roomCode !== 'string') {
    return { valid: false, error: "Room code is required" };
  }

  const trimmed = roomCode.trim().toUpperCase();

  if (trimmed.length !== 6) {
    return { valid: false, error: "Invalid room code format" };
  }

  return { valid: true, roomCode: trimmed };
};

export const registerPlayerHandlers = (io, socket) => {
  // Player joins a game
  socket.on("player:join", ({ roomCode, nickname }) => {
    // Rate limiting check
    if (!checkRateLimit(socket.id)) {
      return socket.emit("player:joinAck", {
        success: false,
        error: "Too many join attempts. Please wait.",
      });
    }

    // Validate room code
    const roomValidation = validateRoomCode(roomCode);
    if (!roomValidation.valid) {
      return socket.emit("player:joinAck", {
        success: false,
        error: roomValidation.error,
      });
    }

    // Validate nickname
    const nicknameValidation = validateNickname(nickname);
    if (!nicknameValidation.valid) {
      return socket.emit("player:joinAck", {
        success: false,
        error: nicknameValidation.error,
      });
    }

    const validRoomCode = roomValidation.roomCode;
    const validNickname = nicknameValidation.nickname;

    const game = gm.getGame(validRoomCode);

    if (!game) {
      return socket.emit("player:joinAck", {
        success: false,
        error: "Room not found",
      });
    }

    if (game.status !== "lobby") {
      return socket.emit("player:joinAck", {
        success: false,
        error: "Game already started",
      });
    }

    // Check player limit (200 max for scalability)
    if (game.players.size >= 200) {
      return socket.emit("player:joinAck", {
        success: false,
        error: "Room is full (max 200 players)",
      });
    }

    // Check for duplicate nickname
    if (game.usedNicknames && game.usedNicknames.has(validNickname.toLowerCase())) {
      return socket.emit("player:joinAck", {
        success: false,
        error: "Nickname already taken",
      });
    }

    // Check if this socket is already in a game
    const existingRoom = gm.findGameBySocket(socket.id);
    if (existingRoom) {
      gm.removePlayer(existingRoom, socket.id);
      socket.leave(existingRoom);
    }

    gm.addPlayer(validRoomCode, socket.id, validNickname);
    socket.join(validRoomCode);

    socket.emit("player:joinAck", {
      success: true,
      roomCode: validRoomCode,
      players: [...game.players.values()].map((p) => p.nickname)
    });

    // Notify everyone in the room
    io.to(validRoomCode).emit("game:playerJoined", {
      nickname: validNickname,
      playerCount: game.players.size,
    });

    console.log(`Player ${validNickname} joined room ${validRoomCode} (${game.players.size} players)`);
  });

  // Player submits an answer
  socket.on("player:answer", ({ roomCode, answerIndex }) => {
    // Validate room code
    const roomValidation = validateRoomCode(roomCode);
    if (!roomValidation.valid) {
      return socket.emit("player:answerAck", { received: false, error: "Invalid room" });
    }

    const game = gm.getGame(roomValidation.roomCode);
    if (!game) {
      return socket.emit("player:answerAck", { received: false, error: "Game not found" });
    }

    // Validate answerIndex is a valid number
    if (typeof answerIndex !== 'number' || answerIndex < 0) {
      return socket.emit("player:answerAck", { received: false, error: "Invalid answer" });
    }

    // Check if the question index falls within the number of options
    const currentQuestion = game.quizData.questions[game.currentQuestionIndex];
    if (currentQuestion && answerIndex >= currentQuestion.options.length) {
      return socket.emit("player:answerAck", { received: false, error: "Invalid answer index" });
    }

    const recorded = gm.recordAnswer(roomValidation.roomCode, socket.id, answerIndex);
    socket.emit("player:answerAck", { received: recorded });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    // Clean up rate limiting entry
    joinAttempts.delete(socket.id);

    const roomCode = gm.findGameBySocket(socket.id);
    if (roomCode) {
      const game = gm.getGame(roomCode);
      if (game) {
        // Check if host disconnected
        if (game.hostSocketId === socket.id) {
          io.to(roomCode).emit("game:hostDisconnected");
          gm.deleteGame(roomCode);
          console.log(`Host disconnected, game ${roomCode} deleted`);
        } else {
          // Player disconnected
          const player = game.players.get(socket.id);
          if (player) {
            gm.removePlayer(roomCode, socket.id);
            io.to(roomCode).emit("game:playerLeft", {
              nickname: player.nickname,
              playerCount: game.players.size,
            });
            console.log(`Player ${player.nickname} left room ${roomCode} (${game.players.size} remaining)`);
          }
        }
      }
    }
  });
};
