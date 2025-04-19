"use client"

import { useState, useEffect, useRef } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminTopbar from "../../components/admin/AdminTopbar"
import { getAllConversations, getConversationById, sendMessage } from "../../api/mockAdminChat"
import "../../styles/admin/ChatManagement.css"

const ChatManagement = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadConversations()
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const loadConversations = () => {
    setLoading(true)
    getAllConversations()
      .then((data) => {
        setConversations(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error)
        setLoading(false)
      })
  }

  const handleSelectConversation = (conversation) => {
    setLoadingMessages(true)
    getConversationById(conversation.id)
      .then((data) => {
        setSelectedConversation(data)
        setMessages(data.messages)
        setLoadingMessages(false)

        // Update the unread count in the conversations list
        setConversations(
          conversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
        )
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error)
        setLoadingMessages(false)
      })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    sendMessage(selectedConversation.id, newMessage)
      .then((message) => {
        setMessages([...messages, message])
        setNewMessage("")
      })
      .catch((error) => {
        console.error("Error sending message:", error)
      })
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Tin nhắn" />
        <div className="admin-content-body">
          <div className="chat-container">
            <div className="chat-sidebar">
              <div className="chat-sidebar-header">
                <h3>Danh sách giáo viên</h3>
                <div className="chat-search">
                  <input type="text" placeholder="Tìm kiếm..." />
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <div className="chat-conversations">
                {loading ? (
                  <div className="loading">Đang tải...</div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`chat-conversation-item ${
                        selectedConversation?.id === conversation.id ? "active" : ""
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="conversation-avatar">
                        <img src="/placeholder.svg?height=40&width=40" alt={conversation.teacherName} />
                        {conversation.unreadCount > 0 && (
                          <span className="unread-badge">{conversation.unreadCount}</span>
                        )}
                      </div>
                      <div className="conversation-info">
                        <div className="conversation-name">{conversation.teacherName}</div>
                        <div className="conversation-last-message">{conversation.lastMessage}</div>
                      </div>
                      <div className="conversation-time">{formatTime(conversation.lastMessageTime)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="chat-main">
              {selectedConversation ? (
                <>
                  <div className="chat-header">
                    <div className="chat-header-info">
                      <img src="/placeholder.svg?height=40&width=40" alt={selectedConversation.teacherName} />
                      <h3>{selectedConversation.teacherName}</h3>
                    </div>
                  </div>
                  <div className="chat-messages">
                    {loadingMessages ? (
                      <div className="loading">Đang tải tin nhắn...</div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`chat-message ${message.senderId === "admin" ? "sent" : "received"}`}
                          >
                            <div className="message-content">
                              <p>{message.content}</p>
                              <span className="message-time">{formatTime(message.timestamp)}</span>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>
                  <div className="chat-input">
                    <form onSubmit={handleSendMessage}>
                      <input
                        type="text"
                        placeholder="Nhập tin nhắn..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button type="submit">
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="chat-no-conversation">
                  <div className="no-conversation-message">
                    <i className="fas fa-comments"></i>
                    <p>Chọn một cuộc hội thoại để bắt đầu</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatManagement
