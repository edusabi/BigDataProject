import { useState } from "react";
import styles from "./ChatBot.module.css";
import { NavLink } from "react-router-dom";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá! Sou a IA do Resolve Fácil Caruaru. Em que posso ajudar?" }
  ]);

  const handleSend = async () => {
  if (!input.trim()) return;

  setMessages((prev) => [...prev, { from: "user", text: input }]);

  const pergunta = input;
  setInput("");

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: pergunta })
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);

  } catch (error) {
    setMessages((prev) => [...prev, { from: "bot", text: "Erro ao conectar com o servidor." }]);
  }
};


  return (
    <div className={styles.page}>
      <NavLink to="/">
        <button className={styles.btnVoltar}>VOLTAR</button>
      </NavLink>

      <div className={styles.chatContainer}>
        <h1>Resolve Fácil Caruaru</h1>

        <div className={styles.chatBox}>
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.from === "bot" ? styles.botMsg : styles.userMsg}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
