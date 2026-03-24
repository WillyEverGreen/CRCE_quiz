const COLORS = ["#ef4444", "#3b82f6", "#eab308", "#22c55e"];
const SHAPES = ["triangle", "diamond", "circle", "square"];

export default function AnswerButtons({
  options,
  onAnswer,
  selectedIndex,
  correctIndex,
  disabled,
  showResult,
}) {
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "16px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "24px",
      borderRadius: "16px",
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s ease",
      textAlign: "left",
      width: "100%",
    },
    shape: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    text: {
      fontSize: "18px",
      fontWeight: 500,
      color: "#fff",
    },
  };

  const getButtonStyle = (index) => {
    let backgroundColor = COLORS[index];
    let opacity = 1;
    let transform = "scale(1)";
    let boxShadow = "none";

    if (showResult) {
      if (index === correctIndex) {
        boxShadow = "0 0 0 4px #22c55e";
        transform = "scale(1.02)";
      } else if (index === selectedIndex && index !== correctIndex) {
        opacity = 0.5;
        boxShadow = "0 0 0 4px #ef4444";
      } else {
        opacity = 0.3;
      }
    } else if (selectedIndex === index) {
      boxShadow = "0 0 0 4px #fff";
      transform = "scale(1.02)";
    }

    return {
      ...styles.button,
      backgroundColor,
      opacity,
      transform,
      boxShadow,
    };
  };

  const renderShape = (index) => {
    const color = "#fff";
    switch (SHAPES[index]) {
      case "triangle":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill={color}>
            <polygon points="16,4 28,28 4,28" />
          </svg>
        );
      case "diamond":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill={color}>
            <polygon points="16,2 30,16 16,30 2,16" />
          </svg>
        );
      case "circle":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill={color}>
            <circle cx="16" cy="16" r="14" />
          </svg>
        );
      case "square":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill={color}>
            <rect x="4" y="4" width="24" height="24" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.grid}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => !disabled && onAnswer(index)}
          style={getButtonStyle(index)}
          disabled={disabled}
        >
          <div style={styles.shape}>{renderShape(index)}</div>
          <span style={styles.text}>{option}</span>
        </button>
      ))}
    </div>
  );
}
