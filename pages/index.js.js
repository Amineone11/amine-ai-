import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "مرحباً! اسألني أي شيء عن الذكاء الاصطناعي." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // محاكاة رد الذكاء الاصطناعي (تقدر تستبدلها باستدعاء API حقيقي)
  const generateResponse = (question) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          "هذه إجابة وهمية لسؤالك: " + question + ". شكراً لسؤالك!"
        );
      }, 1500);
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const botReply = await generateResponse(userMessage.text);
    setMessages((prev) => [...prev, { type: "bot", text: botReply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#121212",
        color: "#eee",
        display: "flex",
        flexDirection: "column",
        maxWidth: 600,
        margin: "0 auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        دردشة الذكاء الاصطناعي
      </h1>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #333",
          borderRadius: 8,
          padding: 15,
          backgroundColor: "#1e1e1e",
          marginBottom: 20,
          boxShadow: "0 0 10px #0f62fe44",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
              marginBottom: 12,
              animation: "fadeIn 0.5s",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                backgroundColor: msg.type === "user" ? "#0f62fe" : "#333",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: 20,
                boxShadow:
                  msg.type === "user"
                    ? "0 0 10px #0f62feaa"
                    : "0 0 10px #333",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                fontSize: 16,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ color: "#888", textAlign: "left", marginTop: 10 }}>
            ... جارٍ الكتابة
          </div>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="اكتب سؤالك هنا..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "12px 15px",
            borderRadius: 25,
            border: "none",
            fontSize: 16,
            outline: "none",
            backgroundColor: "#222",
            color: "#eee",
            boxShadow: "0 0 5px #0f62fe88 inset",
          }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            marginLeft: 10,
            padding: "12px 20px",
            borderRadius: 25,
            border: "none",
            backgroundColor: "#0f62fe",
            color: "white",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 0 10px #0f62fe",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0d4dcc")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0f62fe")}
        >
          إرسال
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
