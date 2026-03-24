import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  // Shared
  roomCode: null,
  status: "idle", // idle | lobby | question | answer | finished

  // Host
  isHost: false,
  quizId: null,
  quiz: null,

  // Player
  nickname: null,
  score: 0,
  streak: 0,
  myAnswerIndex: null,

  // Game
  playerCount: 0,
  players: [],
  currentQuestion: null,
  correctIndex: null,
  leaderboard: [],

  // Actions
  setRoomCode: (roomCode) => set({ roomCode }),
  setStatus: (status) => set({ status }),
  setIsHost: (isHost) => set({ isHost }),
  setQuizId: (quizId) => set({ quizId }),
  setQuiz: (quiz) => set({ quiz }),
  setNickname: (nickname) => set({ nickname }),

  setCurrentQuestion: (q) =>
    set({
      currentQuestion: q,
      myAnswerIndex: null,
      correctIndex: null,
      status: "question",
    }),

  setAnswerReveal: (correctIndex, leaderboard) =>
    set({
      correctIndex,
      leaderboard,
      status: "answer",
    }),

  setMyAnswer: (index) => set({ myAnswerIndex: index }),

  setPlayerCount: (playerCount) => set({ playerCount }),

  setPlayers: (players) => set({ players, playerCount: players.length }),
  
  addPlayer: (nickname) => 
    set((state) => {
      if (state.players.some(p => p.nickname === nickname)) return state;
      return { 
        players: [...state.players, { nickname, socketId: `p${Date.now()}_${Math.random()}` }], 
        playerCount: state.playerCount + 1 
      };
    }),
    
  removePlayer: (nickname) =>
    set((state) => {
      const newPlayers = state.players.filter(p => p.nickname !== nickname);
      return {
        players: newPlayers,
        playerCount: newPlayers.length
      };
    }),

  setLeaderboard: (leaderboard) => set({ leaderboard }),

  setFinished: (leaderboard) =>
    set({
      leaderboard,
      status: "finished",
    }),

  reset: () =>
    set({
      roomCode: null,
      status: "idle",
      isHost: false,
      quizId: null,
      quiz: null,
      nickname: null,
      score: 0,
      streak: 0,
      myAnswerIndex: null,
      playerCount: 0,
      players: [],
      currentQuestion: null,
      correctIndex: null,
      leaderboard: [],
    }),
}));
