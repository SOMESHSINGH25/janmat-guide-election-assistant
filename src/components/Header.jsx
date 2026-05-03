import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { translations } from '../data/translations';
import './Header.css';
import './Auth.css';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { currentUser, logout } = useAuth();
  const t = translations[language];

  return (
    <header className="header glass-panel">
      <div className="container header-content">
        <div className="logo">
          <span className="logo-icon">🗳️</span>
          <span className="logo-text">Janmat Guide</span>
        </div>
        
        <nav className="main-nav">
          <a href="#timeline">{t.nav.timeline}</a>
          <a href="#quiz">{t.nav.quiz}</a>
          <a href="#chat">{t.nav.chat}</a>
        </nav>

        <div className="header-right">
          <div className="language-toggle">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-select"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>

          {currentUser && (
            <div className="header-user">
              <span className="user-greeting" title={currentUser.email}>
                👤 {currentUser.fullName.split(' ')[0]}
              </span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

