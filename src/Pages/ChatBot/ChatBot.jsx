import { useState } from "react";
import styles from "./ChatBot.module.css"; // se quiser usar CSS Module
import { NavLink } from "react-router-dom";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá! Sou a IA do Resolve Fácil Caruaru. Em que posso ajudar?" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Adiciona a pergunta do usuário
    const newMessages = [...messages, { from: "user", text: input }];

    // Mini IA (respostas simuladas)
    let resposta = "Desculpe, ainda não sei responder essa pergunta.";
    if (input.toLowerCase().includes("horário")) {
      resposta = "Os serviços da prefeitura funcionam de segunda a sexta, das 8h às 14h.";
    } else if (input.toLowerCase().includes("endereço")) {
      resposta = "A prefeitura fica localizada na Rua Professor Lourival Vilanova, nº 300, Caruaru.";
    } else if (input.toLowerCase().includes("consulta")) {
      resposta = "Para marcar consulta no posto de saúde, acesse o portal ou ligue 156.";
    }

    setMessages([...newMessages, { from: "bot", text: resposta }]);
    setInput("");
  };

  return (
  <div className={styles.page}>
    
    <NavLink to="/">
      <button className={styles.btnVoltar}>
        VOLTAR
      </button>
    </NavLink>

    <div className={styles.chatContainer}>
      <h1>Resolve Fácil Caruaru</h1>
      <div className={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.from === "bot" ? styles.botMsg : styles.userMsg}
          >
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
