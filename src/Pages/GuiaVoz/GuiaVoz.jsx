import { useEffect, useRef, useState } from "react";

const GuiaVoz = () => {
  // Estados para controlar a interface
  const [status, setStatus] = useState("idle"); // idle, listening, processing, speaking
  const [displayText, setDisplayText] = useState("Toque no botão para começar");
  
  const recognitionRef = useRef(null);

  // --- 1. Limpeza de Texto ---
  const cleanText = (text) => {
    return text
      .replace(/[^\w\sáéíóúàãõâêôç]/gi, "") // Remove emojis e símbolos
      .replace(/,/g, ""); // Remove vírgulas
  };

  // --- 2. Função para Parar Tudo (Interromper) ---
  const stopInteraction = () => {
    // Para o reconhecimento de voz
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    // Para a fala da IA
    window.speechSynthesis.cancel();
    
    setStatus("idle");
    setDisplayText("Interrompido. Toque para falar novamente.");
  };

  // --- 3. Função para a IA Falar ---
  const speak = (text) => {
    // Se o usuário interrompeu antes, não fala nada
    if (status === "idle") return; 

    const clean = cleanText(text);
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = "pt-BR";
    utter.rate = 1.1; // Um pouco mais natural

    setStatus("speaking");
    setDisplayText("🔊 IA Falando... (Toque para interromper)");

    utter.onend = () => {
      setStatus("idle");
      setDisplayText("Toque para falar novamente");
    };

    utter.onerror = () => {
      setStatus("idle");
    };

    window.speechSynthesis.speak(utter);
  };

  // --- 4. Enviar para o Backend ---
  const sendToAI = async (message) => {
    setStatus("processing");
    setDisplayText("⏳ Processando resposta...");

    try {
      // URL CORRIGIDA PARA SUA ROTA ESPECÍFICA
      const res = await fetch("https://bigdatapj.discloud.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      
      // Manda a IA falar a resposta
      speak(data.answer);

    } catch (err) {
      console.error(err);
      setStatus("idle");
      setDisplayText("Erro ao conectar. Tente novamente.");
      speak("Desculpe, tive um problema de conexão.");
    }
  };

  // --- 5. Configuração do Reconhecimento de Voz ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setDisplayText("Seu navegador não suporta voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false; // Para assim que terminar a frase
    recognition.interimResults = false;

    recognition.onstart = () => {
      setStatus("listening");
      setDisplayText("🎙 Ouvindo... (Fale agora)");
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const clean = cleanText(text);
      // Assim que reconhecer o texto, envia para a IA
      sendToAI(clean);
    };

    recognition.onerror = (event) => {
      console.error("Erro de voz", event.error);
      setStatus("idle");
      setDisplayText("Não entendi. Tente novamente.");
    };

    recognition.onend = () => {
      // Se parou de ouvir e não foi para processamento, volta para idle
      if (status === "listening") {
        setStatus("idle");
      }
    };

    recognitionRef.current = recognition;

    // Limpeza ao sair da página
    return () => {
      stopInteraction();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array vazio para rodar apenas uma vez

  // --- 6. Controle do Botão (O Cérebro) ---
  const handleInteraction = () => {
    // Se estiver fazendo qualquer coisa (ouvindo, processando ou falando), o botão serve para PARAR
    if (status === "listening" || status === "speaking" || status === "processing") {
      stopInteraction();
    } else {
      // Se estiver parado, começa a ouvir
      try {
        window.speechSynthesis.cancel(); // Garante silêncio antes de começar
        recognitionRef.current.start();
      } catch (e) {
        console.error("Erro ao iniciar:", e);
        setStatus("idle");
      }
    }
  };

  const getButtonColor = () => {
    switch (status) {
      case "listening": return "#ff4444"; // Vermelho para parar
      case "speaking": return "#ff4444";  // Vermelho para parar
      case "processing": return "#ffbb33"; // Amarelo esperando
      default: return "#00C851"; // Verde para começar
    }
  };

  return (
    <div style={{ 
      padding: "40px", 
      textAlign: "center", 
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px"
    }}>
      <h1>Assistente Resolve Fácil</h1>

      <div style={{
        minHeight: "50px",
        fontSize: "18px",
        color: "#333",
        fontWeight: "bold"
      }}>
        {displayText}
      </div>

      <button
        onClick={handleInteraction}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: getButtonColor(),
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          transition: "background-color 0.3s"
        }}
      >
        {status === "idle" ? "🎙 FALAR" : "⏹ PARAR"}
      </button>

      {/* Dica visual extra */}
      {status === "speaking" && <p style={{color: "#666"}}>A IA está falando...</p>}
    </div>
  );
};

export default GuiaVoz;