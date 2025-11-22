import { useState, useEffect } from "react";
import { initSocket, joinConversation, sendMessage, onReceiveMessage } from "../socket";

const ChatWindow = ({ token, conversationId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const socket = initSocket(token);
    joinConversation(conversationId);

    onReceiveMessage((msg) => setMessages((prev) => [...prev, msg]));

    return () => socket.disconnect();
  }, [token, conversationId]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage({ conversationId, receiverId, text });
    setMessages((prev) => [...prev, { sender: "me", text }]);
    setText("");
  };

  return (
    <div className="chat-window p-4 border rounded-lg shadow-md max-w-md mx-auto">
      <div className="messages mb-4 max-h-60 overflow-y-auto">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`mb-2 px-2 py-1 rounded ${
              msg.sender === "me" ? "bg-gold text-white ml-auto w-fit" : "bg-gray-200 w-fit"
            }`}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-gold text-white px-4 py-1 rounded hover:bg-yellow-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

