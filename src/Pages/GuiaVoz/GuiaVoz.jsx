import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


const GuiaVoz = () => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // Limpa texto
  const cleanText = (text) => {
    return text
      .replace(/[^\w\sáéíóúàãõâêôç]/gi, "")
      .replace(/,/g, "");
  };

  // IA fala
  const speak = (text) => {
    const clean = cleanText(text);
    const utter = new SpeechSynthesisUtterance(clean);

    utter.lang = "pt-BR";
    utter.rate = 1;
    utter.pitch = 1;

    window.speechSynthesis.speak(utter);
  };

  // Botão parar fala
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  // Envia texto ao backend
  const sendToAI = async (message) => {
    try {
      const res = await fetch("https://bigdatapj.discloud.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      speak(data.answer);

    } catch (err) {
      speak("Erro ao conectar com o servidor");
    }
  };

  // Iniciar reconhecimento
  const startListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.start();
    setListening(true);
  };

  // Parar reconhecimento
  const stopListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
    setListening(false);
  };

  // Alternar
  const toggleListening = () => {
    if (listening) stopListening();
    else startListening();
  };

  // Configura reconhecimento
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const clean = cleanText(text);
      sendToAI(clean);
    };

    recognition.onerror = () => {
      stopListening();
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <NavLink to="/"><FaArrowLeftLong style={{fontSize:"1.5rem", color:"black", position:"absolute", left: "20px"}}/></NavLink>

      <h1 style={{margin:"2rem 0"}}>Assistente por Voz</h1>

      <button
        onClick={toggleListening}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: 8,
          background: listening ? "#ff4d4d" : "#4caf50",
          color: "white",
          border: "none",
          marginRight: 10,
        }}
      >
        {listening ? "Parar de Ouvir" : "Falar"}
      </button>

      {/* Botão parar fala */}
      <button
        onClick={stopSpeaking}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: 8,
          background: "#333",
          color: "white",
          border: "none",
        }}
      >
        Parar Fala
      </button>

      <p style={{ fontSize: 18, marginTop: 20 }}>
        {listening ? "🎧 Escutando..." : "Aguardando"}
      </p>
    </div>
  );
};

export default GuiaVoz;
