import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();

  const [news] = useState([
    {
      id: 1,
      title: "Avanços em Inteligência Artificial",
      content:
        "Novas descobertas em IA prometem revolucionar diversos setores, desde a saúde até a automação industrial. Pesquisadores estão explorando modelos de linguagem ainda mais complexos e eficientes...",
      image: "",
    },
  ]);

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Portal de Notícias</h1>
        <div style={styles.headerButtons}>
          <button
            style={styles.backBtn}
            onClick={() => navigate('/notifications')}
            aria-label="Notificações"
          >
            Notificações
          </button>
          <button
            style={{ ...styles.backBtn, marginLeft: "1rem" }}
            onClick={() => navigate('/create-news')}
            aria-label="Criar nova notícia"
          >
            Criar nova notícia
          </button>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.newsFeed}>
          {news.map(({ id, image, title, content }) => (
            <div key={id} style={styles.newsCard}>
              <img src={image} alt={title} style={styles.newsImage} />
              <div style={styles.newsContent}>
                <h3 style={styles.newsTitle}>{title}</h3>
                <p style={styles.newsText}>{content}</p>
                <button
                  style={{ ...styles.btn, ...styles.readMoreBtn }}
                  onClick={() => navigate("/news-detail")}
                >
                  Ver Mais
                </button>
              </div>
            </div>
          ))}
        </div>
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
    transition: "background-color 0.2s",
  },
  btn: {
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
  newsFeed: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1.5rem",
    maxWidth: "1200px",
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
    display: "block",
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
};

export default Feed;
