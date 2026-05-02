import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import './Hero.css';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="hero container">
      <div className="hero-content animate-fade-in">
        <h1 className="hero-title">
          {t.hero.titleLine1} <br/>
          <span className="highlight">{t.hero.titleHighlight}</span>
        </h1>
        <p className="hero-description">
          {t.hero.description}
        </p>
        <div className="hero-actions">
          <a href="#timeline" className="btn-primary">{t.hero.btnPrimary}</a>
          <a href="#chat" className="btn-secondary">{t.hero.btnSecondary}</a>
        </div>
      </div>
      
      <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="glass-card mockup-card">
          <div className="mockup-header">
            <span className="dot bg-red"></span>
            <span className="dot bg-yellow"></span>
            <span className="dot bg-green"></span>
          </div>
          <div className="mockup-body">
            <div className="mockup-chat-bubble ai">
              {language === 'hi' ? 'नमस्ते! मैं आपका जनमत गाइड हूँ। आज चुनाव प्रक्रिया समझने में मैं आपकी कैसे मदद कर सकता हूँ?' : 
               language === 'hinglish' ? 'Namaste! Main aapka Janmat Guide hoon. Aaj election process samajhne mein main aapki kaise madad kar sakta hoon?' : 
               'Hello! I\'m your Janmat Guide. How can I help you understand the election process today?'}
            </div>
            <div className="mockup-chat-bubble user">
              {language === 'hi' ? 'मैं वोट डालने के लिए पंजीकरण कैसे करूँ?' : 
               language === 'hinglish' ? 'Main vote daalne ke liye register kaise karoon?' : 
               'How do I register to vote?'}
            </div>
            <div className="mockup-chat-bubble ai">
              {language === 'hi' ? 'आप NVSP पोर्टल के माध्यम से ऑनलाइन पंजीकरण कर सकते हैं या फॉर्म 6 भर सकते हैं। आइए मैं आपको चरणों के माध्यम से मार्गदर्शन करूँ!' : 
               language === 'hinglish' ? 'Aap NVSP portal ke through online register kar sakte hain ya Form 6 bhar sakte hain. Aaiye main aapko steps guide karta hoon!' : 
               'You can register online via the NVSP portal or fill Form 6. Let me guide you through the steps!'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
