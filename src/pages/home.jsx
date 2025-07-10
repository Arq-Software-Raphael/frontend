import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isSuperuser } from "../auth";
import io from "socket.io-client";

const API_BASE_URL = "http://127.0.0.1:5001";

const Feed = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [topics, setTopics] = useState([]);
  const [followedTopics, setFollowedTopics] = useState([]);

  const [hasNewNotification, setHasNewNotification] = useState(() => {
    return localStorage.getItem("hasNewNotification") === "true";
  });

  useEffect(() => {
    localStorage.setItem("hasNewNotification", hasNewNotification.toString());
  }, [hasNewNotification]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Faça login para acessar o portal");
      navigate("/login");
      return;
    }

    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/news/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar notícias");

        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
        alert("Falha ao carregar notícias. Faça login novamente.");
        navigate("/login");
      }
    };

    const fetchTopics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/topics/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Erro ao buscar tópicos");
        const data = await response.json();
        setTopics(data);
      } catch (err) {
        console.warn("Erro ao buscar tópicos:", err);
      }
    };

    const fetchFollowedTopics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/followed-topics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Erro ao buscar tópicos seguidos");
        const data = await response.json();
        setFollowedTopics(data.map((t) => t.id));
      } catch (err) {
        console.warn("Erro ao buscar tópicos seguidos:", err);
      }
    };

    fetchNews();
    fetchTopics();
    fetchFollowedTopics();

    const socket = io(API_BASE_URL, {
      query: { token },
    });

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket");
    });

    socket.on("new_news", (newItem) => {
      setNews((prev) => [newItem, ...prev]);
      setHasNewNotification(true);
      localStorage.setItem("hasNewNotification", "true");
    });

    socket.on("update_news", (updatedItem) => {
      setNews((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    });

    socket.on("delete_news", ({ id }) => {
      setNews((prev) => prev.filter((item) => item.id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const toggleFollow = async (topicId) => {
    const token = localStorage.getItem("token");
    const isFollowing = followedTopics.includes(topicId);
    const method = isFollowing ? "DELETE" : "POST";

    try {
      const response = await fetch(`${API_BASE_URL}/api/topics/${topicId}/follow`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setFollowedTopics((prev) =>
          isFollowing ? prev.filter((id) => id !== topicId) : [...prev, topicId]
        );
      } else {
        const error = await response.json();
        alert(error.msg || "Erro ao seguir/desseguir tópico");
      }
    } catch (error) {
      console.error("Erro ao seguir/desseguir tópico:", error);
      alert("Erro na comunicação com o servidor");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <style>{`
        @keyframes shake {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <header style={styles.header}>
        <h1 style={styles.title}>Portal de Notícias</h1>
        <div style={styles.headerButtons}>
          <button
            style={{
              ...styles.backBtn,
              animation: hasNewNotification
                ? "shake 0.4s ease-in-out infinite alternate"
                : "none",
              position: "relative",
            }}
            onClick={() => {
              setHasNewNotification(false);
              localStorage.setItem("hasNewNotification", "false");
              navigate("/notifications");
            }}
          >
            Notificações
            {hasNewNotification && <span style={styles.notificationDot}></span>}
          </button>

          {isSuperuser() && (
            <button
              style={{ ...styles.backBtn, marginLeft: "1rem" }}
              onClick={() => navigate("/create-news")}
            >
              Criar nova notícia
            </button>
          )}
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.newsFeed}>
          {news.length === 0 ? (
            <p>Nenhuma notícia encontrada.</p>
          ) : (
            news.map(({ id, image_url, title, content }) => (
              <div key={id} style={styles.newsCard}>
                <img
                  src={
                    image_url
                      ? `${API_BASE_URL}${image_url}`
                      : "https://via.placeholder.com/400x180?text=Sem+Imagem"
                  }
                  alt={title}
                  style={styles.newsImage}
                />
                <div style={styles.newsContent}>
                  <h3 style={styles.newsTitle}>{title}</h3>
                  <p style={styles.newsText}>{content}</p>
                  <button
                    style={{ ...styles.btn, ...styles.readMoreBtn }}
                    onClick={() => navigate(`/news-detail/${id}`)}
                  >
                    Ver Mais
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Tópicos</h3>
          {topics.map((topic) => {
            const followed = followedTopics.includes(topic.id);
            return (
              <div key={topic.id} style={styles.topicItem}>
                <span>{topic.name}</span>
                <button
                  onClick={() => toggleFollow(topic.id)}
                  style={{
                    ...styles.followBtn,
                    backgroundColor: followed ? "#27ae60" : "#3498db",
                  }}
                >
                  {followed ? "Seguindo" : "Seguir"}
                </button>
              </div>
            );
          })}
        </aside>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButtons: {
    display: "flex",
    alignItems: "center",
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
  btn: {
    backgroundColor: "#e67e22",
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem 1rem",
    width: "100%",
    boxSizing: "border-box",
  },
  newsFeed: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    maxWidth: "900px",
    width: "100%",
  },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
    width: "400px",
    maxWidth: "100%",
  },
  newsImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  newsContent: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  newsTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.1rem",
    color: "#2c3e50",
  },
  newsText: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#555",
  },
  readMoreBtn: {
    marginTop: "1rem",
    alignSelf: "flex-start",
  },
  sidebar: {
    marginLeft: "2rem",
    minWidth: "220px",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    height: "fit-content",
  },
  sidebarTitle: {
    margin: "0 0 1rem 0",
    fontSize: "1.1rem",
    color: "#2c3e50",
  },
  topicItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  followBtn: {
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "0.3rem 0.6rem",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  notificationDot: {
    position: "absolute",
    top: "4px",
    right: "4px",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "red",
    animation: "pulse 1s infinite",
  },
};

export default Feed;