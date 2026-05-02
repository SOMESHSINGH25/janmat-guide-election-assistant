import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { timelineData } from '../data/timelineData';
import './Timeline.css';

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(null);
  const { language } = useLanguage();
  
  const currentData = timelineData[language] || timelineData['en'];

  const toggleStep = (id) => {
    if (activeStep === id) {
      setActiveStep(null);
    } else {
      setActiveStep(id);
    }
  };

  return (
    <section id="timeline" className="timeline-section container">
      <h2 className="section-title">{currentData.sectionTitle}</h2>
      <p className="section-subtitle">{currentData.sectionSubtitle}</p>
      
      <div className="timeline-container">
        {currentData.steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`timeline-item ${activeStep === step.id ? 'active' : ''}`}
            onClick={() => toggleStep(step.id)}
          >
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              {index < currentData.steps.length - 1 && <div className="marker-line"></div>}
            </div>
            
            <div className="timeline-content glass-panel">
              <h3 className="step-title">
                <span className="step-number">{step.id}</span>
                {step.title}
              </h3>
              <div className="step-description">
                <div className="step-detail">
                  <strong>{language === 'hi' ? 'क्या होता है:' : language === 'hinglish' ? 'Kya Hota Hai:' : 'What Happens:'}</strong> 
                  <p>{step.happens}</p>
                </div>
                <div className="step-detail">
                  <strong>{language === 'hi' ? 'यह क्यों महत्वपूर्ण है:' : language === 'hinglish' ? 'Kyun Zaroori Hai:' : 'Why It Matters:'}</strong> 
                  <p>{step.matters}</p>
                </div>
                <div className="step-detail">
                  <strong>{language === 'hi' ? 'आपको क्या जानना चाहिए:' : language === 'hinglish' ? 'Aapko Kya Pata Hona Chahiye:' : 'What You Should Know:'}</strong> 
                  <p>{step.know}</p>
                </div>
                <div className="step-detail example-box">
                  <strong>{language === 'hi' ? 'उदाहरण:' : language === 'hinglish' ? 'Example:' : 'Example:'}</strong> 
                  <p><i>{step.example}</i></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
