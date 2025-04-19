"use client"

import { useState } from "react"
import "../../styles/admin/DataTable.css"

const DataTable = ({ data, columns, actions, onEdit, onDelete, onView }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    return Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
  })

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  // Handle sort
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <div className="data-table-search">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="data-table-length">
          <label>
            Hiển thị
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            mục
          </label>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable !== false && requestSort(column.key)}
                  className={column.sortable !== false ? "sortable" : ""}
                >
                  {column.label}
                  {sortConfig.key === column.key && (
                    <span className={`sort-icon ${sortConfig.direction}`}>
                      {sortConfig.direction === "ascending" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
              {actions && <th className="actions-column">Thao tác</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={`${item.id}-${column.key}`}>{column.render ? column.render(item) : item[column.key]}</td>
                  ))}
                  {actions && (
                    <td className="actions-cell">
                      {onView && (
                        <button className="action-btn view" onClick={() => onView(item)}>
                          <i className="fas fa-eye"></i>
                        </button>
                      )}
                      {onEdit && (
                        <button className="action-btn edit" onClick={() => onEdit(item)}>
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                      {onDelete && (
                        <button className="action-btn delete" onClick={() => onDelete(item)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="data-table-pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">
            <i className="fas fa-chevron-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`pagination-btn ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default DataTable
