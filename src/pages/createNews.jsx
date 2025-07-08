import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNews = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    } else {
      setImage(null);
    }
  };


  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Criar Notícia</h1>
        <button
          style={styles.backBtn}
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          Voltar
        </button>
      </header>

      <main style={styles.container}>
        <form style={styles.form}>
          <label htmlFor="title" style={styles.label}>
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            placeholder="Digite o título da notícia"
          />

          <label htmlFor="content" style={styles.label}>
            Conteúdo
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            placeholder="Digite o conteúdo da notícia"
            rows={6}
          />

          <label htmlFor="image" style={styles.label}>
            Imagem
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />

          {image && (
            <img
              src={image}
              alt="Prévia da imagem selecionada"
              style={styles.previewImage}
            />
          )}

          <button type="submit" style={styles.submitBtn}>
            Criar
          </button>
        </form>
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
    display: "flex",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "2rem",
    maxWidth: "600px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#2c3e50",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    color: "#333",
  },
  textarea: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
    backgroundColor: "#fff",
    color: "#333",
  },
  fileInput: {
    padding: "0.25rem 0",
  },
  previewImage: {
    marginTop: "1rem",
    maxWidth: "100%",
    maxHeight: "200px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  submitBtn: {
    marginTop: "1rem",
    backgroundColor: "#e67e22",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default CreateNews;
