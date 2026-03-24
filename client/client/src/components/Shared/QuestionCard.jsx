export default function QuestionCard({ question, questionIndex, total }) {
  const styles = {
    container: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      padding: "32px",
      textAlign: "center",
    },
    badge: {
      display: "inline-block",
      padding: "4px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      color: "#fff",
      backgroundColor: "rgba(252, 255, 102, 0.2)",
      border: "1px solid rgba(252, 255, 102, 0.3)",
      marginBottom: "24px",
    },
    text: {
      fontFamily: "Chillax, sans-serif",
      fontSize: "32px",
      fontWeight: 500,
      color: "#fff",
      lineHeight: 1.3,
    },
  };

  return (
    <div style={styles.container}>
      <span style={styles.badge}>
        Question {questionIndex + 1} of {total}
      </span>
      <h2 style={styles.text}>{question}</h2>
    </div>
  );
}
