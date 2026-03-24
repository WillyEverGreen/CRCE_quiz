export default function Leaderboard({ players, title = "Leaderboard" }) {
  const styles = {
    container: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "24px",
    },
    title: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "24px",
      fontWeight: 500,
      color: "#fff",
      marginBottom: "16px",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderRadius: "12px",
      marginBottom: "8px",
    },
    rank: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "18px",
      fontWeight: 600,
      width: "32px",
    },
    name: {
      flex: 1,
      marginLeft: "12px",
      fontSize: "16px",
      color: "#fff",
    },
    score: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "18px",
      fontWeight: 500,
      color: "#fcff66",
    },
    empty: {
      textAlign: "center",
      color: "rgba(255, 255, 255, 0.5)",
      padding: "24px",
    },
  };

  const getRankStyle = (index) => {
    const colors = ["#fcff66", "#c0c0c0", "#cd7f32"];
    return {
      ...styles.item,
      backgroundColor: index < 3 ? `rgba(255, 255, 255, 0.08)` : "transparent",
    };
  };

  const getRankColor = (index) => {
    const colors = ["#fcff66", "#c0c0c0", "#cd7f32"];
    return colors[index] || "#fff";
  };

  if (!players || players.length === 0) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.empty}>No players yet</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{title}</h3>
      <ul style={styles.list}>
        {players.map((player, index) => (
          <li
            key={player.socketId || player.nickname}
            style={getRankStyle(index)}
          >
            <span style={{ ...styles.rank, color: getRankColor(index) }}>
              #{index + 1}
            </span>
            <span style={styles.name}>{player.nickname}</span>
            <span style={styles.score}>
              {player.score?.toLocaleString() || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
