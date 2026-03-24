// In-memory game state manager
const games = new Map(); // roomCode → gameState
const socketToRoom = new Map(); // socketId → roomCode

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No ambiguous chars
const MAX_ROOM_CODE_ATTEMPTS = 100; // Prevent infinite loop

export const generateRoomCode = () => {
  let code;
  let attempts = 0;
  do {
    if (attempts++ > MAX_ROOM_CODE_ATTEMPTS) {
      throw new Error("Could not generate unique room code");
    }
    code = Array.from(
      { length: 6 },
      () => CHARS[Math.floor(Math.random() * CHARS.length)],
    ).join("");
  } while (games.has(code));
  return code;
};

export const createGame = (roomCode, quizData, hostId) => {
  games.set(roomCode, {
    roomCode,
    quizData,
    hostId,
    hostSocketId: null,
    status: "lobby", // lobby | question | answer | finished
    currentQuestionIndex: -1,
    players: new Map(), // socketId → { nickname, score, streak }
    usedNicknames: new Set(), // Set of lowercased nicknames
    answers: new Map(), // socketId → { answerIndex, timeMs }
    questionStartTime: null,
    questionTimer: null,
    leaderboardCache: null, // Cached leaderboard for performance
    leaderboardDirty: true, // Flag to indicate if cache needs refresh
    createdAt: Date.now(), // Track creation time for cleanup
  });
  return games.get(roomCode);
};

export const getGame = (roomCode) => games.get(roomCode);

export const deleteGame = (roomCode) => {
  const game = games.get(roomCode);
  if (game?.questionTimer) {
    clearTimeout(game.questionTimer);
  }
  if (game) {
    if (game.hostSocketId) socketToRoom.delete(game.hostSocketId);
    for (const socketId of game.players.keys()) {
      socketToRoom.delete(socketId);
    }
  }
  games.delete(roomCode);
};

export const addPlayer = (roomCode, socketId, nickname) => {
  const game = games.get(roomCode);
  if (!game) return null;
  game.players.set(socketId, { nickname, score: 0, streak: 0 });
  game.usedNicknames.add(nickname.toLowerCase());
  socketToRoom.set(socketId, roomCode);
  return game;
};

export const removePlayer = (roomCode, socketId) => {
  const game = games.get(roomCode);
  if (game) {
    const player = game.players.get(socketId);
    if (player) {
      game.usedNicknames.delete(player.nickname.toLowerCase());
    }
    game.players.delete(socketId);
  }
  socketToRoom.delete(socketId);
};

export const recordAnswer = (roomCode, socketId, answerIndex) => {
  const game = games.get(roomCode);
  if (!game || game.status !== "question") return false;
  if (game.answers.has(socketId)) return false; // already answered

  const timeMs = Date.now() - game.questionStartTime;
  game.answers.set(socketId, { answerIndex, timeMs });
  return true;
};

export const calculateScores = (roomCode) => {
  const game = games.get(roomCode);
  if (!game) return [];

  const question = game.quizData.questions[game.currentQuestionIndex];
  if (!question) return [];

  const maxTime = question.timeLimit * 1000;

  game.answers.forEach((answer, socketId) => {
    const player = game.players.get(socketId);
    if (!player) return;

    if (answer.answerIndex === question.correctIndex) {
      // Time factor: faster answers get more points (0.5 to 1.0 multiplier)
      const timeFactor = Math.max(0.5, 1 - (answer.timeMs / maxTime) * 0.5);
      const streakBonus = Math.min(player.streak * 50, 200);
      player.score += Math.round(question.points * timeFactor) + streakBonus;
      player.streak += 1;
    } else {
      player.streak = 0;
    }
  });

  // Mark leaderboard as dirty so it will be recalculated
  game.leaderboardDirty = true;

  return getLeaderboard(roomCode);
};

export const getLeaderboard = (roomCode) => {
  const game = games.get(roomCode);
  if (!game) return [];

  // Use cached leaderboard if available and not dirty
  if (!game.leaderboardDirty && game.leaderboardCache) {
    return game.leaderboardCache;
  }

  // Convert to array and sort - O(n log n) but cached
  const leaderboard = [...game.players.entries()]
    .map(([socketId, p]) => ({
      socketId,
      nickname: p.nickname,
      score: p.score,
      streak: p.streak,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  // Cache the result
  game.leaderboardCache = leaderboard;
  game.leaderboardDirty = false;

  return leaderboard;
};

export const getPlayerCount = (roomCode) => {
  const game = games.get(roomCode);
  return game ? game.players.size : 0;
};

// For finding which game a socket is in
export const findGameBySocket = (socketId) => {
  return socketToRoom.get(socketId) || null;
};

// Also expose a way to map host socket
export const setHostSocket = (roomCode, socketId) => {
  const game = games.get(roomCode);
  if (game) {
    game.hostSocketId = socketId;
    socketToRoom.set(socketId, roomCode);
  }
};

// Get server statistics for monitoring
export const getServerStats = () => {
  let totalPlayers = 0;
  let activeGames = 0;
  let gamesInLobby = 0;
  let gamesInProgress = 0;

  games.forEach((game) => {
    activeGames++;
    totalPlayers += game.players.size;
    if (game.status === "lobby") gamesInLobby++;
    else if (game.status === "question" || game.status === "answer") gamesInProgress++;
  });

  return {
    activeGames,
    totalPlayers,
    gamesInLobby,
    gamesInProgress,
    totalConnections: socketToRoom.size,
  };
};

// Get all active game room codes (for debugging)
export const getActiveRooms = () => [...games.keys()];

// Clean up stale games (games older than maxAge ms with no activity)
export const cleanupStaleGames = (maxAgeMs = 3600000) => {
  const now = Date.now();
  let cleaned = 0;

  games.forEach((game, roomCode) => {
    // Check if game has been in lobby for too long with no players
    if (game.status === "lobby" && game.players.size === 0) {
      const gameAge = now - (game.createdAt || now);
      if (gameAge > maxAgeMs) {
        deleteGame(roomCode);
        cleaned++;
      }
    }
  });

  return cleaned;
};
