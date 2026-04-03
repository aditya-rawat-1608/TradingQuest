import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async () => {
    if (!input) return;

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        "You: " + input,
        "AI: " + data.reply,
      ]);

      setInput("");
    } catch (error) {
      console.error(error);
      alert("Error connecting to AI");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Chatbot</h2>

      <div style={{ minHeight: "200px" }}>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        style={{ marginRight: "10px" }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}