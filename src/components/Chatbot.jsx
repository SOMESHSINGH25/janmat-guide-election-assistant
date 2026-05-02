import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Chatbot.css';

const GREETING = "Namaste! I am Janmat Guide. Ask me anything about elections, voting, or voter awareness in India.";

const Chatbot = () => {
  const { language } = useLanguage();

  const [messages, setMessages] = useState([
    { text: GREETING, isBot: true }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setInputValue('');
    setIsTyping(true);

    console.log("Sending to backend:", userText);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, language })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received:", data.reply);

      setMessages(prev => [...prev, { text: data.reply, isBot: true }]);

    } catch (error) {
      console.warn("Backend failed", error);
      setMessages(prev => [...prev, {
        text: "⚠️ AI service is unavailable. Please try again later.",
        isBot: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="chat" className="chat-section container">
      <div className="chat-layout">
        <div className="chat-info">
          <h2 className="section-title" style={{textAlign: 'left'}}>Ask Janmat</h2>
          <p className="section-subtitle" style={{textAlign: 'left', marginLeft: 0}}>
            Have questions about voting, registration, polling booths, or your rights as a citizen? Ask Janmat Guide for instant, factual answers.
          </p>
          <div className="chat-disclaimer">
            Powered by Gemini AI with election-topic guardrails. Janmat Guide only answers voter education and election process questions.
          </div>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🔍</span>
              <span>Find registration steps</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <span>Know important dates</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <span>Understand your rights</span>
            </div>
          </div>
        </div>

        <div className="chat-interface glass-panel">
          <div className="chat-header">
            <div className="bot-avatar">🤖</div>
            <div className="bot-details">
              <h3>Janmat Guide</h3>
              <span className="status">Online with Gemini AI</span>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.isBot && <div className="message-avatar">🤖</div>}
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot">
                <div className="message-avatar">🤖</div>
                <div className="message-bubble typing">
                  <div className="dot-pulse"></div>
                  <div className="dot-pulse"></div>
                  <div className="dot-pulse"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about voting, EVM, registration..."
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn" disabled={!inputValue.trim() || isTyping}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
