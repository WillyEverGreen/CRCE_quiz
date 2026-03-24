
import { io } from "socket.io-client";

const hostSocket = io("http://localhost:4000");
const numPlayers = 200;
let roomCode = "";

hostSocket.on("connect", () => {
  console.log("Host connected!");
  hostSocket.emit("host:create", {
    hostFirebaseUid: "test-host-123",
    quizInfo: {
      title: "Load Test Quiz",
      questions: [{ text: "Q1", options: ["A", "B"], correctIndex: 0, timeLimit: 10, points: 100 }]
    }
  });
});

hostSocket.on("host:created", ({ roomCode: code }) => {
  roomCode = code;
  console.log(`Room created: ${roomCode}. Spawning ${numPlayers} players...`);
  
  let connectedCount = 0;
  for (let i = 0; i < numPlayers; i++) {
    setTimeout(() => {
      const pSocket = io("http://localhost:4000");
      pSocket.on("connect", () => {
        pSocket.emit("player:join", {
          roomCode: roomCode,
          nickname: `Bot_${i}`,
        });
      });
      pSocket.on("player:joinAck", ({ success, error }) => {
        if (success) {
          connectedCount++;
          if (connectedCount % 20 === 0 || connectedCount === numPlayers) {
            console.log(`${connectedCount} players joined successfully.`);
          }
          if (connectedCount === numPlayers) {
            console.log("All players joined successfully!");
            process.exit(0);
          }
        } else {
          console.error(`Failed to join: ${error}`);
        }
      });
    }, i * 5);
  }
});

