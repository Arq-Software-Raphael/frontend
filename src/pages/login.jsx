import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }
      const data = await response.json();
      localStorage.setItem('token', data.access);

      navigate('/');
    } catch (error) {
      alert('Email ou senha inválidos. Tente novamente.');
      console.error('Erro no login:', error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Portal de Notícias</h1>
      </header>

      <main style={styles.container}>
        <h2 style={styles.subtitle}>Login</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
          <label style={styles.label}>Senha</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
          <button style={styles.btn} type="submit">
            Entrar
          </button>
        </form>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  container: {
    padding: '2rem 1rem',
    width: '100%',
    maxWidth: 400,
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#2c3e50',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    color: '#333',
    backgroundColor: 'white',
    outline: 'none',
  },
  btn: {
    backgroundColor: '#e67e22',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
  },
};

export default Login;