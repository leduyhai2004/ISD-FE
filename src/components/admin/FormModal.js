"use client"

import { useEffect } from "react"
import "../../styles/admin/FormModal.css"

const FormModal = ({ isOpen, title, children, onClose, width = "500px" }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="form-modal-overlay" onClick={onClose}>
      <div className="form-modal" style={{ width }} onClick={(e) => e.stopPropagation()}>
        <div className="form-modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="form-modal-content">{children}</div>
      </div>
    </div>
  )
}

export default FormModal
