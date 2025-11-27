import { useEffect, useRef, useState } from "react";

const GuiaVoz = () => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // Remove vírgulas e emojis
  const cleanText = (text) => {
    return text
      .replace(/[^\w\sáéíóúàãõâêôç]/gi, "") // Remove emojis e símbolos
      .replace(/,/g, ""); // Remove vírgulas
  };

  // Faz a IA falar
  const speak = (text) => {
    const clean = cleanText(text);

    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = "pt-BR";
    utter.rate = 1;
    utter.pitch = 1;

    window.speechSynthesis.speak(utter);

    // Quando terminar de falar → recomeça a ouvir
    utter.onend = () => {
      startListening();
    };
  };

  // Envia texto para o backend Flask
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

  // Inicia reconhecimento de voz
  const startListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.start();
    setListening(true);
  };

  // Configura reconhecimento de voz
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
      startListening(); // reinicia se der erro
    };

    recognition.onend = () => {
      // Só reinicia se não estiver falando
      if (!window.speechSynthesis.speaking) {
        startListening();
      }
    };

    recognitionRef.current = recognition;

    // começa a ouvir automaticamente
    startListening();

  }, []);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>Assistente por Voz</h1>

      <p style={{ fontSize: 18 }}>
        {listening ? "🎙 Ouvindo..." : "Parado"}
      </p>
    </div>
  );
};

export default GuiaVoz;
