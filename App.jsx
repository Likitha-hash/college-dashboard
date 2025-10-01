import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import CollegesPage from './pages/CollegesPage/CollegesPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import HomePage from './pages/HomePage/HomePage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;