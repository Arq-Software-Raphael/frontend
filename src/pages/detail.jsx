import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:5001';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${API_BASE_URL}/api/news/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar notícia');
        }

        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Erro ao carregar notícia:', error);
        alert('Erro ao carregar a notícia');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, navigate]);

  if (loading) return <p style={{ textAlign: 'center' }}>Carregando...</p>;
  if (!news) return null;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Detalhes da Notícia</h1>
        <button style={styles.backBtn} onClick={handleBack}>
          Voltar
        </button>
      </header>

      <main style={styles.container}>
        <div style={styles.newsCard}>
          <img
            src={
              news.image_url
                ? `${API_BASE_URL}${news.image_url}`
                : 'https://via.placeholder.com/800x300?text=Sem+Imagem'
            }
            alt={news.title}
            style={styles.newsImage}
          />
          <h2 style={styles.newsTitle}>{news.title}</h2>
          {news.topic && (
            <p style={styles.topicText}><strong>Tópico:</strong> {news.topic}</p>
          )}
          <p style={styles.newsContent}>{news.content}</p>
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    color: '#333',
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
  },
  header: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  backBtn: {
    backgroundColor: '#e67e22',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
  },
  container: {
    padding: '2rem 1rem',
    maxWidth: 800,
    margin: 'auto',
    boxSizing: 'border-box',
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: '1rem',
  },
  newsImage: {
    width: '100%',
    height: 300,
    objectFit: 'cover',
    borderRadius: 6,
    marginBottom: '1rem',
  },
  newsTitle: {
    fontSize: '1.8rem',
    margin: '0 0 1rem 0',
    color: '#2c3e50',
  },
  topicText: {
    fontSize: '1rem',
    margin: '0 0 1rem 0',
    color: '#888',
  },
  newsContent: {
    fontSize: '1rem',
    lineHeight: 1.5,
    color: '#555',
  },
};

export default NewsDetail;