"use client"

// src/pages/Messages.js
import { useState, useEffect, useRef } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import "../styles/messages.css"
import { getMessages, sendMessage } from "../api/mockMessages"

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    getMessages()
      .then((data) => {
        setMessages(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    sendMessage(newMessage)
      .then((message) => {
        setMessages([...messages, message])
        setNewMessage("")
      })
      .catch((error) => {
        console.error("Error sending message:", error)
      })
  }

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
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message-item ${message.sender === "user" ? "message-sent" : "message-received"}`}
                    >
                      <div className="message-content">
                        <p>{message.content}</p>
                        <span className="message-time">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
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
                      Gửi
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
