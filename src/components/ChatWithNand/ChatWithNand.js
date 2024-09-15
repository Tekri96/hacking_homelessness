// components/ChatWithNand/ChatWithNand.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatWithNand.module.css';

const ChatWithNand = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // Simulated response for the prototype
    setTimeout(() => {
      const nandResponse = { text: "I'm Nand, your virtual assistant. How can I help you today?", sender: 'nand' };
      setMessages((prevMessages) => [...prevMessages, nandResponse]);
    }, 1000);

    // In the future, this is where we'd integrate with the GPT-4 API
  };

  return (
    <div className={styles.chatWithNand}>
      <h2>Chat with Nand</h2>
      <div className={styles.chatWindow}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className={styles.input}
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>
    </div>
  );
};

export default ChatWithNand;