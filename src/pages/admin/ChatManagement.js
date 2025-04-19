"use client"

import { useState, useEffect, useRef } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import UserAvatar from "../../components/UserAvatar"
import { getAllConversations, getConversationById, sendMessage } from "../../api/mockAdminChat"
import { getTeachers } from "../../api/mockTeachers"
import "../../styles/admin/ChatManagement.css"

const ChatManagement = () => {
  const [conversations, setConversations] = useState([])
  const [teachers, setTeachers] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    Promise.all([loadConversations(), loadTeachers()])
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading initial data:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const loadConversations = () => {
    return getAllConversations()
      .then((data) => {
        setConversations(data)
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error)
      })
  }

  const loadTeachers = () => {
    return getTeachers()
      .then((data) => {
        setTeachers(data)
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error)
      })
  }

  const handleSelectConversation = (conversation) => {
    setLoadingMessages(true)
    getConversationById(conversation.id)
      .then((data) => {
        setSelectedConversation(data)
        setSelectedTeacher(teachers.find((t) => t.id === data.teacherId))
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.teacherName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <div className="chat-container">
          <div className="chat-header">
            <h2>Tin Nhắn</h2>
            <div className="chat-header-actions">
              <div className="teacher-selector">
                <select
                  onChange={(e) => {
                    const teacherId = Number.parseInt(e.target.value)
                    const conversation = conversations.find((c) => c.teacherId === teacherId)
                    if (conversation) {
                      handleSelectConversation(conversation)
                    }
                  }}
                  value={selectedTeacher?.id || ""}
                >
                  <option value="">Chọn Giáo Viên</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="chat-body">
            <div className="chat-sidebar">
              <div className="conversations-list">
                {loading ? (
                  <div className="loading-spinner">Đang tải...</div>
                ) : filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`conversation-item ${selectedConversation?.id === conversation.id ? "active" : ""}`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="conversation-avatar">
                        <UserAvatar name={conversation.teacherName} size="sm" />
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
                ) : (
                  <div className="no-conversations">Không có cuộc trò chuyện nào</div>
                )}
              </div>
            </div>

            <div className="chat-main">
              {selectedConversation ? (
                <>
                  <div className="chat-main-header">
                    <div className="chat-user-info">
                      <UserAvatar name={selectedConversation.teacherName} size="sm" />
                      <h3>{selectedConversation.teacherName}</h3>
                    </div>
                  </div>
                  <div className="chat-messages">
                    {loadingMessages ? (
                      <div className="loading-spinner">Đang tải tin nhắn...</div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`message ${message.senderId === "admin" ? "sent" : "received"}`}
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
                  <div className="chat-input-container">
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
              ) : (
                <div className="no-conversation-selected">
                  <div className="no-conversation-message">
                    <i className="fas fa-comments"></i>
                    <p>Chào giáo viên, vui lòng kiểm tra thông báo mới.</p>
                    <span>Chọn một cuộc trò chuyện để bắt đầu</span>
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
