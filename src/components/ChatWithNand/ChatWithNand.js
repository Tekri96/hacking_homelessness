// // components/ChatWithNand/ChatWithNand.js
// import React, { useState, useEffect, useRef } from 'react';
// import styles from './ChatWithNand.module.css';

// const ChatWithNand = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }

//   useEffect(scrollToBottom, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: 'user' };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput('');

//     // Simulated response for the prototype
//     setTimeout(() => {
//       const nandResponse = { text: "I'm Nand, your virtual assistant. How can I help you today?", sender: 'nand' };
//       setMessages((prevMessages) => [...prevMessages, nandResponse]);
//     }, 1000);

//     // In the future, this is where we'd integrate with the GPT-4 API
//   };

//   return (
//     <div className={styles.chatWithNand}>
//       <h2>Chat with Nand</h2>
//       <div className={styles.chatWindow}>
//         {messages.map((message, index) => (
//           <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
//             {message.text}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSubmit} className={styles.inputForm}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message here..."
//           className={styles.input}
//         />
//         <button type="submit" className={styles.sendButton}>Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatWithNand;


// components/ChatWithNand/ChatWithNand.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatWithNand.module.css';
import { FaPaperPlane, FaInfoCircle, FaRobot } from 'react-icons/fa';

const ChatWithNand = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Welcome message
    setMessages([
      { 
        text: "Hello! I'm Nand, your virtual assistant. How can I help you today?", 
        sender: 'nand' 
      }
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // Simulated response for the prototype
    setTimeout(() => {
      const nandResponse = { 
        text: "I'm here to assist you. While I'm a prototype, I'm designed to provide support and information. How else can I help?", 
        sender: 'nand' 
      };
      setMessages((prevMessages) => [...prevMessages, nandResponse]);
    }, 1000);
  };

  return (
    <div className={styles.chatWithNand}>
      <div className={styles.chatHeader}>
        <h2>Chat with Nand</h2>
        <button 
          className={styles.infoButton} 
          onClick={() => setShowInfo(!showInfo)}
          aria-label="Toggle information"
        >
          <FaInfoCircle />
        </button>
      </div>
      {showInfo && (
        <div className={styles.infoBox}>
          <h3>About This Prototype</h3>
          <p>
            Nand is an AI assistant designed to support individuals experiencing homelessness. 
            In its final form, Nand aims to provide:
          </p>
          <ul>
            <li>Daily health check-ins</li>
            <li>Emotional support</li>
            <li>Information on local resources</li>
            <li>Guided self-help exercises</li>
          </ul>
          <p>
            Note: This is a non-functional prototype and not a substitute for professional advice.
          </p>
        </div>
      )}
      <div className={styles.chatWindow}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
            {message.sender === 'nand' && <FaRobot className={styles.botIcon} />}
            <div className={styles.messageContent}>
              {message.text}
            </div>
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
        <button type="submit" className={styles.sendButton} aria-label="Send message">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatWithNand;