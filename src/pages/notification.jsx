import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications] = useState([
    {
      id: 1,
      title: "Novos SUBmarinos disponiveis",
      content: "O novo modelo de subimarino o sub15 já ta na mão",
      date: "2025-07-08",
    },
  ]);

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Notificações</h1>
        <button
          style={styles.backBtn}
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
            Voltar
        </button>
      </header>

      <main style={styles.container}>
        {notifications.length === 0 ? (
          <p style={styles.noNotifications}>Nenhuma notificação no momento.</p>
        ) : (
          <div style={styles.notificationsList}>
            {notifications.map(({ id, title, content, date }) => (
              <div key={id} style={styles.notificationCard}>
                <h3 style={styles.notificationTitle}>{title}</h3>
                <p style={styles.notificationContent}>{content}</p>
                <span style={styles.notificationDate}>
                  {new Date(date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    color: "#333",
    minHeight: "100vh",
    width: "100vw",
    overflowX: "hidden",
  },
  header: {
    backgroundColor: "#2c3e50",
    color: "#fff",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
  },
  backBtn: {
    backgroundColor: "#e67e22",
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.2s",
  },
  container: {
    padding: "2rem 1rem",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
  },
  noNotifications: {
    fontSize: "1.1rem",
    color: "#555",
  },
  notificationsList: {
    maxWidth: "800px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "1rem 1.5rem",
    display: "flex",
    flexDirection: "column",
  },
  notificationTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.2rem",
    color: "#2c3e50",
  },
  notificationContent: {
    margin: 0,
    fontSize: "1rem",
    color: "#555",
  },
  notificationDate: {
    marginTop: "0.75rem",
    fontSize: "0.85rem",
    color: "#999",
    alignSelf: "flex-end",
  },
};

export default Notifications;
