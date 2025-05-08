"use client";

// src/pages/Messages.js
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/messages.css";
import { getMessages, sendMessage } from "../api/mockMessages";
import { getCurrentUser } from "../api/mockAuth";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    loadMessages();

    // Set up interval to refresh messages
    const interval = setInterval(() => {
      loadMessages();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const loadMessages = () => {
    getMessages()
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    sendMessage(newMessage)
      .then((message) => {
        setMessages([...messages, message]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  // Helper function to determine if a message is from the current user
  const isCurrentUserMessage = (message) => {
    return currentUser && message.senderId === currentUser.id;
  };

  // Helper function to get sender name
  const getSenderName = (message) => {
    if (isCurrentUserMessage(message)) {
      return currentUser.name;
    }
    return message.senderName || "Admin";
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Tin nhắn" />
        <div className="scroll-content">
          <div className="messages-container">
            {loading ? (
              <p>Đang tải tin nhắn...</p>
            ) : (
              <>
                <div className="messages-list">
                  {messages.length === 0 ? (
                    <div className="no-messages">
                      <p>Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`message-item ${
                          isCurrentUserMessage(message)
                            ? "message-sent"
                            : "message-received"
                        }`}
                      >
                        <div className="message-content">
                          <div className="message-sender">
                            {getSenderName(message)}
                          </div>
                          <p>{message.content}</p>
                          <span className="message-time">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="message-input-container">
                  <form onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="Nhập tin nhắn..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="send-button">
                      <i className="fas fa-paper-plane"></i> Gửi
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
