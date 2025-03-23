// import React, { useState } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages([...messages, userMessage]);

//     try {
//       const response = await axios.post(/chatbot", { message: input });
//       const botMessage = { sender: "bot", text: response.data.reply };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }

//     setInput("");
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div key={index} className={`chat-message ${msg.sender}`}>
//             <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask something..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
