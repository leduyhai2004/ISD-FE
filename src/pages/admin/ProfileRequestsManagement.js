"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import FormModal from "../../components/admin/FormModal";
import {
  getAllProfileUpdateRequests,
  approveProfileUpdateRequest,
  rejectProfileUpdateRequest,
} from "../../api/mockProfile";
import { dataEvents } from "../../api/mockDataStore";
import "../../styles/admin/ProfileRequestsManagement.css";

const ProfileRequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [filter, setFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [processingRequest, setProcessingRequest] = useState(false);

  useEffect(() => {
    loadRequests();

    // Set up event listener for profile requests updates
    const handleProfileRequestsUpdated = (updatedRequests) => {
      console.log(
        "Admin: Profile requests updated event received:",
        updatedRequests
      );
      setRequests([...updatedRequests]);
    };

    dataEvents.on("profile-requests-updated", handleProfileRequestsUpdated);

    // Set up interval to refresh data every 10 seconds
    const interval = setInterval(() => {
      loadRequests(false); // Don't show loading indicator for refreshes
    }, 10000);

    return () => {
      clearInterval(interval);
      dataEvents.off("profile-requests-updated", handleProfileRequestsUpdated);
    };
  }, []);

  const loadRequests = (showLoading = true) => {
    if (showLoading) setLoading(true);

    console.log("Admin: Loading profile update requests");
    getAllProfileUpdateRequests()
      .then((data) => {
        console.log("Admin: Loaded profile requests:", data);
        setRequests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Admin: Error fetching profile update requests:", error);
        setLoading(false);
      });
  };

  const handleApprove = (request) => {
    setProcessingRequest(true);
    setErrorMessage("");

    console.log("Admin: Approving request:", request);

    approveProfileUpdateRequest(request.id)
      .then((updatedRequest) => {
        console.log("Admin: Request approved successfully:", updatedRequest);
        setRequests(
          requests.map((req) =>
            req.id === updatedRequest.id ? updatedRequest : req
          )
        );
        setSuccessMessage("Yêu cầu cập nhật đã được phê duyệt thành công!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Admin: Error approving request:", error);
        setErrorMessage("Lỗi khi phê duyệt yêu cầu: " + error.message);
        setTimeout(() => setErrorMessage(""), 3000);
      })
      .finally(() => {
        setProcessingRequest(false);
      });
  };

  const openRejectModal = (request) => {
    setCurrentRequest(request);
    setRejectionReason("");
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      setErrorMessage("Vui lòng nhập lý do từ chối");
      return;
    }

    setProcessingRequest(true);
    setErrorMessage("");

    console.log(
      "Admin: Rejecting request:",
      currentRequest,
      "Reason:",
      rejectionReason
    );

    rejectProfileUpdateRequest(currentRequest.id, rejectionReason)
      .then((updatedRequest) => {
        console.log("Admin: Request rejected successfully:", updatedRequest);
        setRequests(
          requests.map((req) =>
            req.id === updatedRequest.id ? updatedRequest : req
          )
        );
        setShowRejectModal(false);
        setRejectionReason("");
        setSuccessMessage("Yêu cầu cập nhật đã bị từ chối!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Admin: Error rejecting request:", error);
        setErrorMessage("Lỗi khi từ chối yêu cầu: " + error.message);
        setTimeout(() => setErrorMessage(""), 3000);
      })
      .finally(() => {
        setProcessingRequest(false);
      });
  };

  const openDetailsModal = (request) => {
    setCurrentRequest(request);
    setShowDetailsModal(true);
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((req) => req.status === filter);

  // Function to highlight changes between current and requested data
  const highlightChanges = (current, requested, field) => {
    if (current[field] !== requested[field]) {
      return true;
    }
    return false;
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar title="Quản lý yêu cầu cập nhật hồ sơ" />
        <div className="admin-content-body">
          <div className="profile-requests-header">
            <h3>Danh sách yêu cầu cập nhật hồ sơ</h3>
            <div className="profile-requests-filters">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ duyệt</option>
                <option value="approved">Đã duyệt</option>
                <option value="rejected">Từ chối</option>
              </select>
              <button
                className="btn-refresh"
                onClick={() => loadRequests()}
                title="Làm mới dữ liệu"
              >
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>

          {successMessage && (
            <div className="alert success">{successMessage}</div>
          )}
          {errorMessage && <div className="alert error">{errorMessage}</div>}

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <div className="profile-requests-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Giáo viên</th>
                    <th>Ngày yêu cầu</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.id}</td>
                        <td>{request.userName}</td>
                        <td>{request.requestDate}</td>
                        <td>
                          <span className={`status-badge ${request.status}`}>
                            {request.status === "pending"
                              ? "Chờ duyệt"
                              : request.status === "approved"
                              ? "Đã duyệt"
                              : "Từ chối"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-view"
                              onClick={() => openDetailsModal(request)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>

                            {request.status === "pending" && (
                              <>
                                <button
                                  className="btn-approve"
                                  onClick={() => handleApprove(request)}
                                  disabled={processingRequest}
                                >
                                  <i className="fas fa-check"></i> Duyệt
                                </button>
                                <button
                                  className="btn-reject"
                                  onClick={() => openRejectModal(request)}
                                  disabled={processingRequest}
                                >
                                  <i className="fas fa-times"></i> Từ chối
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        Không có yêu cầu cập nhật hồ sơ nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Details Modal */}
          <FormModal
            isOpen={showDetailsModal}
            title="Chi tiết yêu cầu cập nhật hồ sơ"
            onClose={() => setShowDetailsModal(false)}
            width="700px"
          >
            {currentRequest && (
              <div className="profile-request-details">
                <div className="request-info">
                  <p>
                    <strong>ID yêu cầu:</strong> {currentRequest.id}
                  </p>
                  <p>
                    <strong>Giáo viên:</strong> {currentRequest.userName}
                  </p>
                  <p>
                    <strong>Ngày yêu cầu:</strong> {currentRequest.requestDate}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>
                    <span className={`status-badge ${currentRequest.status}`}>
                      {currentRequest.status === "pending"
                        ? "Chờ duyệt"
                        : currentRequest.status === "approved"
                        ? "Đã duyệt"
                        : "Từ chối"}
                    </span>
                  </p>
                  {currentRequest.responseDate && (
                    <p>
                      <strong>Ngày phản hồi:</strong>{" "}
                      {currentRequest.responseDate}
                    </p>
                  )}
                  {currentRequest.responseReason && (
                    <p>
                      <strong>Lý do từ chối:</strong>{" "}
                      {currentRequest.responseReason}
                    </p>
                  )}
                </div>

                <div className="comparison-table">
                  <h4>So sánh thông tin</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Trường thông tin</th>
                        <th>Giá trị hiện tại</th>
                        <th>Giá trị yêu cầu</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className={
                          highlightChanges(
                            currentRequest.currentData,
                            currentRequest.requestedData,
                            "name"
                          )
                            ? "changed-field"
                            : ""
                        }
                      >
                        <td>Họ và tên</td>
                        <td>{currentRequest.currentData.name || "--"}</td>
                        <td>{currentRequest.requestedData.name || "--"}</td>
                      </tr>
                      <tr
                        className={
                          highlightChanges(
                            currentRequest.currentData,
                            currentRequest.requestedData,
                            "email"
                          )
                            ? "changed-field"
                            : ""
                        }
                      >
                        <td>Email</td>
                        <td>{currentRequest.currentData.email || "--"}</td>
                        <td>{currentRequest.requestedData.email || "--"}</td>
                      </tr>
                      <tr
                        className={
                          highlightChanges(
                            currentRequest.currentData,
                            currentRequest.requestedData,
                            "phone"
                          )
                            ? "changed-field"
                            : ""
                        }
                      >
                        <td>Số điện thoại</td>
                        <td>{currentRequest.currentData.phone || "--"}</td>
                        <td>{currentRequest.requestedData.phone || "--"}</td>
                      </tr>
                      <tr
                        className={
                          highlightChanges(
                            currentRequest.currentData,
                            currentRequest.requestedData,
                            "birthDate"
                          )
                            ? "changed-field"
                            : ""
                        }
                      >
                        <td>Ngày sinh</td>
                        <td>{currentRequest.currentData.birthDate || "--"}</td>
                        <td>
                          {currentRequest.requestedData.birthDate || "--"}
                        </td>
                      </tr>
                      <tr
                        className={
                          highlightChanges(
                            currentRequest.currentData,
                            currentRequest.requestedData,
                            "address"
                          )
                            ? "changed-field"
                            : ""
                        }
                      >
                        <td>Địa chỉ</td>
                        <td>{currentRequest.currentData.address || "--"}</td>
                        <td>{currentRequest.requestedData.address || "--"}</td>
                      </tr>
                      <tr
                        className={
                          highlightChanges(
                            currentRequest.currentData,
                            currentRequest.requestedData,
                            "emergencyContact"
                          )
                            ? "changed-field"
                            : ""
                        }
                      >
                        <td>Người liên hệ khẩn cấp</td>
                        <td>
                          {currentRequest.currentData.emergencyContact || "--"}
                        </td>
                        <td>
                          {currentRequest.requestedData.emergencyContact ||
                            "--"}
                        </td>
                      </tr>
                      <tr
                        className={
                          highlightChanges(
                            currentRequest.currentData,
                            currentRequest.requestedData,
                            "degree"
                          )
                            ? "changed-field"
                            : ""
                        }
                      >
                        <td>Bằng cấp</td>
                        <td>{currentRequest.currentData.degree || "--"}</td>
                        <td>{currentRequest.requestedData.degree || "--"}</td>
                      </tr>
                      <tr
                        className={
                          highlightChanges(
                            currentRequest.currentData,
                            currentRequest.requestedData,
                            "subject"
                          )
                            ? "changed-field"
                            : ""
                        }
                      >
                        <td>Môn giảng dạy</td>
                        <td>{currentRequest.currentData.subject || "--"}</td>
                        <td>{currentRequest.requestedData.subject || "--"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {currentRequest.status === "pending" && (
                  <div className="request-actions">
                    <button
                      className="btn-approve"
                      onClick={() => {
                        handleApprove(currentRequest);
                        setShowDetailsModal(false);
                      }}
                      disabled={processingRequest}
                    >
                      <i className="fas fa-check"></i> Duyệt yêu cầu
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => {
                        openRejectModal(currentRequest);
                        setShowDetailsModal(false);
                      }}
                      disabled={processingRequest}
                    >
                      <i className="fas fa-times"></i> Từ chối yêu cầu
                    </button>
                  </div>
                )}
              </div>
            )}
          </FormModal>

          {/* Reject Modal */}
          <FormModal
            isOpen={showRejectModal}
            title="Từ chối yêu cầu cập nhật hồ sơ"
            onClose={() => setShowRejectModal(false)}
          >
            <div className="reject-form">
              <p>
                <strong>Giáo viên:</strong> {currentRequest?.userName}
              </p>
              <p>
                <strong>Ngày yêu cầu:</strong> {currentRequest?.requestDate}
              </p>
              <div className="form-group">
                <label>Lý do từ chối</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Nhập lý do từ chối yêu cầu cập nhật..."
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowRejectModal(false)}
                  disabled={processingRequest}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  onClick={handleReject}
                  disabled={processingRequest}
                >
                  {processingRequest ? "Đang xử lý..." : "Xác nhận từ chối"}
                </button>
              </div>
            </div>
          </FormModal>
        </div>
      </div>
    </div>
  );
};

export default ProfileRequestsManagement;
