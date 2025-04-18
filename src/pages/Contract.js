"use client"

// src/pages/Contract.js
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import "../styles/contract.css"
import { getContract } from "../api/mockContract"

const Contract = () => {
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContract()
      .then((data) => {
        setContract(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching contract:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <Topbar title="Xem Hợp Đồng Lao Động" />
        <div className="scroll-content">
          <div className="contract-container">
            <h3 className="section-title">Hợp Đồng Lao Động</h3>

            {loading ? (
              <p>Đang tải thông tin hợp đồng...</p>
            ) : contract ? (
              <div className="contract-details">
                <div className="contract-item">
                  <span className="label">Mã Hợp Đồng:</span>
                  <span className="value">{contract.id}</span>
                </div>

                <div className="contract-item">
                  <span className="label">Ngày Bắt Đầu:</span>
                  <span className="value">{contract.startDate}</span>
                </div>

                <div className="contract-item">
                  <span className="label">Ngày Kết Thúc:</span>
                  <span className="value">{contract.endDate}</span>
                </div>

                <div className="contract-item">
                  <span className="label">Mức Lương:</span>
                  <span className="value">{contract.salary}</span>
                </div>

                <div className="contract-item">
                  <span className="label">Quyền Lợi Khác:</span>
                  <span className="value">{contract.benefits}</span>
                </div>

                <div className="contract-actions">
                  <button className="view-pdf-button">
                    <i className="fas fa-file-pdf"></i> Xem PDF
                  </button>
                </div>
              </div>
            ) : (
              <p>Không tìm thấy thông tin hợp đồng.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contract
