const PageInitial = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Resolve Fácil Caruaru</h1>
      <h2>Funcionalidades</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
        <button style={btnStyle}>Chatbot inteligente para dúvidas</button>
        <button style={btnStyle}>Portal centralizado de serviços</button>
        <button style={btnStyle}>Busca rápida de documentos e horários</button>
        <button style={btnStyle}>Linguagem acessível e suporte a voz</button>
        <button style={btnStyle}>Atualizações automáticas com dados oficiais</button>
      </div>
    </div>
  );
};

// estilo inline só para facilitar
const btnStyle = {
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "12px 18px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.3s",
};

export default PageInitial;
