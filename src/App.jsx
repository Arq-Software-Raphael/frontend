import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Feed from './pages/home';
import Login from './pages/Login';
import NewsDetail from './pages/detail';
import Notifications from './pages/notification';
import CreateNews from './pages/createNews';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news-detail/:id" element={<NewsDetail />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create-news" element={<CreateNews />} />
      </Routes>
    </Router>
  );
}

export default App;
