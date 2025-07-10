import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const API_BASE_URL = "http://127.0.0.1:5001";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [latestId, setLatestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado para ver notificações.");
      navigate("/login");
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/news/notifications`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar notificações");

        const data = await response.json();

        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setNotifications(sorted);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
        alert("Erro ao carregar notificações.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    const socket = io(API_BASE_URL, {
      query: { token },
    });

    socket.on("new_news", (news) => {
      setNotifications((prev) => [news, ...prev]);
      setLatestId(news.id);
    });

    return () => socket.disconnect();
  }, [navigate]);

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
        {loading ? (
          <p>Carregando notificações...</p>
        ) : notifications.length === 0 ? (
          <p style={styles.noNotifications}>Nenhuma notificação no momento.</p>
        ) : (
          <div style={styles.notificationsList}>
            {notifications.map(({ id, title, content, created_at }) => (
              <div
                key={id}
                style={{
                  ...styles.notificationCard,
                  ...(id === latestId && styles.highlightCard),
                }}
              >
                <h3 style={styles.notificationTitle}>{title}</h3>
                <p style={styles.notificationContent}>{content}</p>
                <div style={styles.notificationFooter}>
                  <span style={styles.notificationDate}>
                    {new Date(created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <button
                    style={styles.viewButton}
                    onClick={() => navigate(`/news-detail/${id}`)}
                  >
                    Ver Notícia
                  </button>
                </div>
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
    transition: "all 0.3s ease",
  },
  highlightCard: {
    backgroundColor: "#eafaf1",
    border: "2px solid #2ecc71",
  },
  notificationTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.2rem",
    color: "#2c3e50",
  },
  notificationContent: {
    margin: "0 0 1rem 0",
    fontSize: "1rem",
    color: "#555",
  },
  notificationFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationDate: {
    fontSize: "0.85rem",
    color: "#999",
  },
  viewButton: {
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.4rem 0.8rem",
    fontSize: "0.85rem",
    cursor: "pointer",
  },
};

export default Notifications;