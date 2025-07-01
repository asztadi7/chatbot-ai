import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // <-- ÚJ: gépelés állapot

  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages((prev) => [...prev, { text: inputValue, from: "user" }]);
      setInputValue("");
      setIsTyping(true); // <-- Gépelés elkezdődik

      setTimeout(() => {
        setIsTyping(false); // <-- Gépelés vége
        setMessages((prev) => [
          ...prev,
          { text: "Ez egy minta AI válasz.", from: "ai" },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "24px",
            width: "340px",
            height: "420px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Fejléc */}
          <div
            style={{
              background: "#007bff",
              color: "white",
              padding: "16px",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Chatbot</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
              aria-label="Bezárás"
            >
              ×
            </button>
          </div>
          {/* Üzenetlista - görgethető */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.length === 0 ? (
              <p style={{ color: "#888" }}>Itt fog megjelenni a beszélgetés…</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                    background: msg.from === "user" ? "#007bff" : "#f1f3f6",
                    color: msg.from === "user" ? "white" : "#222",
                    borderRadius: "16px",
                    padding: "8px 14px",
                    maxWidth: "75%",
                    fontSize: "1rem",
                  }}
                >
                  {msg.text}
                </div>
              ))
            )}
            {/* Gépelés felirat */}
            {isTyping && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "#f1f3f6",
                  color: "#222",
                  borderRadius: "16px",
                  padding: "8px 14px",
                  maxWidth: "60%",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                Az AI válaszol...
              </div>
            )}
          </div>
          {/* Üzenetküldő mező */}
          <form
            onSubmit={handleSend}
            style={{
              display: "flex",
              borderTop: "1px solid #eee",
              padding: "12px",
              background: "#fafbfc",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Írj üzenetet…"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "1rem",
                padding: "8px 12px",
                borderRadius: "8px",
                marginRight: "8px",
                background: "#f1f3f6",
              }}
              disabled={isTyping} // Gépelés közben ne lehessen új üzenetet írni
            />
            <button
              type="submit"
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontWeight: "bold",
                cursor: isTyping ? "not-allowed" : "pointer",
                opacity: isTyping ? 0.6 : 1,
              }}
              disabled={isTyping} // Gépelés közben ne lehessen új üzenetet küldeni
            >
              Küldés
            </button>
          </form>
        </div>
      )}
      {/* Chat indító gomb */}
      <button
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          fontSize: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 1001,
        }}
        onClick={() => setIsOpen(true)}
        aria-label="Chat megnyitása"
      >
        💬
      </button>
    </div>
  );
}

export default App;