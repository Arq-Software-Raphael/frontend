import React from 'react';

const NewsDetail = () => {
  const news = {
    title: 'Avanços em Inteligência Artificial',
    content:
      'Novas descobertas em IA prometem revolucionar diversos setores, desde a saúde até a automação industrial. Pesquisadores estão explorando modelos de linguagem ainda mais complexos e eficientes...',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/John_Leguizamo_2017_%28cropped%29.jpg/440px-John_Leguizamo_2017_%28cropped%29.jpg',
  };

  const handleBack = () => {
    window.history.back();
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
          <img src={news.image} alt={news.title} style={styles.newsImage} />
          <h2 style={styles.newsTitle}>{news.title}</h2>
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
  newsContent: {
    fontSize: '1rem',
    lineHeight: 1.5,
    color: '#555',
  },
};

export default NewsDetail;
