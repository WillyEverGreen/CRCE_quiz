import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Quizzes() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, [user]);

  const fetchQuizzes = async () => {
    if (!user) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/quizzes?hostId=${user.uid}`);
      if (res.ok) {
        const data = await res.json();
        setQuizzes(data);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (quizId) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;

    setDeleting(quizId);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}?hostId=${user.uid}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setQuizzes(quizzes.filter((q) => q.id !== quizId));
      } else {
        alert('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Failed to delete quiz');
    } finally {
      setDeleting(null);
    }
  };

  const handleHostQuiz = (quiz) => {
    // Navigate to host lobby with the quiz
    navigate('/host', { state: { quiz } });
  };

  const copyQuizId = (quizId) => {
    navigator.clipboard.writeText(quizId);
    alert('Quiz ID copied to clipboard!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#00041b',
      padding: '16px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: '32px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    backBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: 'rgba(255, 255, 255, 0.6)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      marginBottom: '16px',
    },
    title: {
      fontFamily: 'Chillax, sans-serif',
      fontSize: '36px',
      fontWeight: 500,
      color: '#fff',
    },
    subtitle: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.6)',
      marginTop: '4px',
    },
    createBtn: {
      backgroundColor: '#fcff66',
      color: '#000',
      border: 'none',
      borderRadius: '48px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '24px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    cardTitle: {
      fontFamily: 'Chillax, sans-serif',
      fontSize: '20px',
      fontWeight: 500,
      color: '#fff',
      marginBottom: '8px',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    cardDesc: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '16px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      minHeight: '40px',
    },
    stats: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px',
    },
    stat: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '6px 12px',
      borderRadius: '8px',
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: 500,
    },
    idSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      padding: '8px 12px',
      borderRadius: '8px',
    },
    idLabel: {
      fontSize: '11px',
      color: 'rgba(255, 255, 255, 0.5)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    idValue: {
      fontSize: '12px',
      color: '#fff',
      fontFamily: 'monospace',
      fontWeight: 500,
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    copyBtn: {
      background: 'none',
      border: 'none',
      color: '#fcff66',
      cursor: 'pointer',
      padding: '4px',
      fontSize: '12px',
    },
    date: {
      fontSize: '11px',
      color: 'rgba(255, 255, 255, 0.4)',
      marginLeft: 'auto',
    },
    actions: {
      display: 'flex',
      gap: '8px',
    },
    btnHost: {
      flex: 1,
      backgroundColor: '#fcff66',
      color: '#000',
      border: 'none',
      borderRadius: '12px',
      padding: '10px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
    },
    btnEdit: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      padding: '10px 16px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    btnDelete: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      color: '#f87171',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      padding: '10px 16px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
    },
    emptyIcon: {
      width: '64px',
      height: '64px',
      margin: '0 auto 20px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontSize: '18px',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '20px',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '80px',
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loading}>
            <div style={{ color: '#fcff66', fontSize: '18px' }}>Loading quizzes...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>My Quizzes</h1>
            <p style={styles.subtitle}>Create and manage your interactive quizzes</p>
          </div>
          <button style={styles.createBtn} onClick={() => navigate('/quiz/create')}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Quiz
          </button>
        </div>

        {quizzes.length > 0 ? (
          <div style={styles.grid}>
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(252, 255, 102, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <h3 style={styles.cardTitle}>{quiz.title}</h3>
                <p style={styles.cardDesc}>{quiz.description || 'No description provided'}</p>

                <div style={styles.stats}>
                  <span style={styles.stat}>{quiz.questionCount || quiz.questions?.length || 0} questions</span>
                  <span style={styles.stat}>{quiz.sessionCount || 0} sessions</span>
                </div>

                <div style={styles.idSection}>
                  <span style={styles.idLabel}>Quiz ID:</span>
                  <span style={styles.idValue}>{quiz.id}</span>
                  <button style={styles.copyBtn} onClick={() => copyQuizId(quiz.id)} title="Copy ID">
                    📋
                  </button>
                  <span style={styles.date}>{formatDate(quiz.createdAt)}</span>
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.btnHost}
                    onClick={() => handleHostQuiz(quiz)}
                    disabled={!quiz.questions || quiz.questions.length === 0}
                  >
                    🎮 Host
                  </button>
                  <button
                    style={styles.btnEdit}
                    onClick={() => navigate(`/quiz/edit/${quiz.id}`)}
                    title="Edit Quiz"
                  >
                    ✏️
                  </button>
                  <button
                    style={styles.btnDelete}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(quiz.id);
                    }}
                    disabled={deleting === quiz.id}
                    title="Delete Quiz"
                  >
                    {deleting === quiz.id ? '...' : '🗑️'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <svg width="32" height="32" fill="none" stroke="rgba(255,255,255,0.3)" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 style={styles.emptyText}>No quizzes yet</h3>
            <p style={{ ...styles.subtitle, marginBottom: '24px' }}>
              Create your first quiz to get started!
            </p>
            <button style={styles.createBtn} onClick={() => navigate('/quiz/create')}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create First Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
