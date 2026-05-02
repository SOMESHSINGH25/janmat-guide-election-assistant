import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';
import { useLanguage } from './contexts/LanguageContext';
import { translations } from './data/translations';
import './App.css';

function App() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="app-wrapper">
      <Header />
      
      <main>
        <Hero />
        
        <div className="section-divider"></div>
        
        <Timeline />
        
        <div className="section-divider"></div>
        
        <Quiz />
        
        <div className="section-divider"></div>
        
        <Chatbot />
      </main>
      
      <footer className="app-footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} {t.footer.copy}</p>
          <p className="footer-disclaimer">
            {t.footer.disclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
