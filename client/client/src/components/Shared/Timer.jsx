import { useEffect, useState } from "react";

export default function Timer({ duration, onExpire }) {
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    setRemaining(duration);
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [duration, onExpire]);

  const pct = (remaining / duration) * 100;
  const getColor = () => {
    if (pct > 50) return "#22c55e"; // green
    if (pct > 25) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  const styles = {
    container: {
      width: "100%",
    },
    barBg: {
      width: "100%",
      height: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "6px",
      overflow: "hidden",
    },
    barFill: {
      height: "100%",
      backgroundColor: getColor(),
      borderRadius: "6px",
      transition: "width 1s linear, background-color 0.3s ease",
      width: `${pct}%`,
    },
    time: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "48px",
      fontWeight: 500,
      color: "#fff",
      textAlign: "center",
      marginTop: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.barBg}>
        <div style={styles.barFill} />
      </div>
      <div style={styles.time}>{remaining}s</div>
    </div>
  );
}
