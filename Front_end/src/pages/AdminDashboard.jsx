import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllUsers,
    getStaffDetails,
    updateStaffVerification,
    switchUserRole,
    getBookings,
    getPendingStaff
} from "../services/api";
import {
    Users,
    UserCheck,
    UserX,
    Shield,
    RefreshCw,
    CheckCircle,
    XCircle,
    AlertCircle,
    Settings,
    BookOpen
} from "lucide-react";
import "./Login.css";

function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("staff");
    const [loading, setLoading] = useState(true);
    const [staffList, setStaffList] = useState([]);
    const [pendingStaffList, setPendingStaffList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [processing, setProcessing] = useState(null);
    const [message, setMessage] = useState("");

    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        // Check if user is admin
        if (userRole !== "Admin") {
            navigate("/");
            return;
        }
        fetchData();
    }, [userRole]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [staffRes, usersRes, bookingsRes, pendingRes] = await Promise.all([
                getStaffDetails(),
                getAllUsers(),
                getBookings(),
                getPendingStaff()
            ]);
            setStaffList(staffRes.data || []);
            setUserList(usersRes.data || []);
            setBookings(bookingsRes.data || []);
            setPendingStaffList(pendingRes.data || []);
        } catch (err) {
            console.error("Error fetching data:", err);
            setMessage("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyStaff = async (staffId, status) => {
        try {
            setProcessing(staffId);
            await updateStaffVerification(staffId, status);
            setMessage(`Staff ${status.toLowerCase()} successfully!`);
            fetchData();
        } catch (err) {
            console.error("Error updating staff:", err);
            setMessage("Failed to update staff verification");
        } finally {
            setProcessing(null);
        }
    };

    const handleSwitchRole = async (userId, newRole) => {
        try {
            setProcessing(userId);
            await switchUserRole(userId, newRole);
            setMessage(`User role changed to ${newRole} successfully!`);
            fetchData();
        } catch (err) {
            console.error("Error switching role:", err);
            setMessage("Failed to update user role");
        } finally {
            setProcessing(null);
        }
    };

    const getVerificationBadge = (status) => {
        switch (status) {
            case "Accepted":
                return <span className="badge badge-success"><CheckCircle size={14} /> Accepted</span>;
            case "Rejected":
                return <span className="badge badge-danger"><XCircle size={14} /> Rejected</span>;
            default:
                return <span className="badge badge-warning"><AlertCircle size={14} /> Pending</span>;
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case "Admin":
                return <span className="badge badge-admin"><Shield size={14} /> Admin</span>;
            case "Staff":
                return <span className="badge badge-info"><Users size={14} /> Staff</span>;
            default:
                return <span className="badge badge-default">Customer</span>;
        }
    };

    if (loading) {
        return (
            <div className="booking-wrapper">
                <div className="booking-card">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading admin dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <button className="submit-btn" onClick={fetchData}>
                    <RefreshCw size={18} /> Refresh
                </button>
            </div>

            {message && (
                <div className={`auth-alert ${message.includes("Failed") ? "error" : "success"}`}>
                    {message}
                </div>
            )}

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === "staff" ? "active" : ""}`}
                    onClick={() => setActiveTab("staff")}
                >
                    <UserCheck size={18} /> Staff Verification
                    {pendingStaffList.length > 0 && (
                        <span className="pending-badge">{pendingStaffList.length}</span>
                    )}
                </button>
                <button
                    className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
                    onClick={() => setActiveTab("users")}
                >
                    <Users size={18} /> User Management
                </button>
                <button
                    className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
                    onClick={() => setActiveTab("bookings")}
                >
                    <BookOpen size={18} /> All Bookings
                </button>
            </div>

            <div className="admin-content">
                {activeTab === "staff" && (
                    <div className="staff-verification">
                        <h3>Staff Verification Requests</h3>

                        {/* Pending Staff Section */}
                        {pendingStaffList.length > 0 && (
                            <div className="pending-section">
                                <h4>Pending Verification ({pendingStaffList.length})</h4>
                                <div className="data-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Experience</th>
                                                <th>Availability</th>
                                                <th>Service Type</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingStaffList.map((staff) => (
                                                <tr key={staff.id}>
                                                    <td>{staff.staff?.user_name || "N/A"}</td>
                                                    <td>{staff.staff?.user_mail || "N/A"}</td>
                                                    <td>{staff.experience || "N/A"}</td>
                                                    <td>{staff.availability || "N/A"}</td>
                                                    <td>{staff.serviceType || "N/A"}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button
                                                                className="btn-accept"
                                                                onClick={() => handleVerifyStaff(staff.id, "Accepted")}
                                                                disabled={processing === staff.id}
                                                            >
                                                                <CheckCircle size={16} /> Accept
                                                            </button>
                                                            <button
                                                                className="btn-reject"
                                                                onClick={() => handleVerifyStaff(staff.id, "Rejected")}
                                                                disabled={processing === staff.id}
                                                            >
                                                                <XCircle size={16} /> Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* All Staff Section */}
                        <h4>All Staff</h4>
                        {staffList.length > 0 ? (
                            <div className="data-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Experience</th>
                                            <th>Availability</th>
                                            <th>Service Type</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffList.map((staff) => (
                                            <tr key={staff.id}>
                                                <td>{staff.staff?.user_name || "N/A"}</td>
                                                <td>{staff.experience || "N/A"}</td>
                                                <td>{staff.availability || "N/A"}</td>
                                                <td>{staff.serviceType || "N/A"}</td>
                                                <td>{getVerificationBadge(staff.verified)}</td>
                                                <td>
                                                    {staff.verified === "Pending" && (
                                                        <div className="action-buttons">
                                                            <button
                                                                className="btn-accept"
                                                                onClick={() => handleVerifyStaff(staff.id, "Accepted")}
                                                                disabled={processing === staff.id}
                                                            >
                                                                <CheckCircle size={16} /> Accept
                                                            </button>
                                                            <button
                                                                className="btn-reject"
                                                                onClick={() => handleVerifyStaff(staff.id, "Rejected")}
                                                                disabled={processing === staff.id}
                                                            >
                                                                <XCircle size={16} /> Reject
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="no-data">No staff requests found</p>
                        )}
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="user-management">
                        <h3>User Management</h3>
                        {userList.length > 0 ? (
                            <div className="data-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Current Role</th>
                                            <th>Switch Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.user_name}</td>
                                                <td>{user.user_mail}</td>
                                                <td>{getRoleBadge(user.user_role)}</td>
                                                <td>
                                                    <div className="role-switch-buttons">
                                                        {user.user_role !== "Customer" && (
                                                            <button
                                                                className="btn-role"
                                                                onClick={() => handleSwitchRole(user.id, "Customer")}
                                                                disabled={processing === user.id}
                                                            >
                                                                Customer
                                                            </button>
                                                        )}
                                                        {user.user_role !== "Staff" && (
                                                            <button
                                                                className="btn-role"
                                                                onClick={() => handleSwitchRole(user.id, "Staff")}
                                                                disabled={processing === user.id}
                                                            >
                                                                Staff
                                                            </button>
                                                        )}
                                                        {user.user_role !== "Admin" && (
                                                            <button
                                                                className="btn-role btn-admin"
                                                                onClick={() => handleSwitchRole(user.id, "Admin")}
                                                                disabled={processing === user.id}
                                                            >
                                                                Admin
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="no-data">No users found</p>
                        )}
                    </div>
                )}

                {activeTab === "bookings" && (
                    <div className="bookings-overview">
                        <h3>All Bookings</h3>
                        {bookings.length > 0 ? (
                            <div className="data-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer</th>
                                            <th>Staff</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking.bookingId || booking.id}>
                                                <td>#{booking.bookingId || booking.id}</td>
                                                <td>{booking.customer?.user_name || "N/A"}</td>
                                                <td>{booking.staff?.user_name || "Not Assigned"}</td>
                                                <td>{booking.services?.service_name || booking.property_type || "N/A"}</td>
                                                <td>{booking.booking_date_time ? new Date(booking.booking_date_time).toLocaleDateString() : "N/A"}</td>
                                                <td>
                                                    <span className={`status-badge status-${booking.status?.toLowerCase()}`}>
                                                        {booking.status || "Pending"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="no-data">No bookings found</p>
                        )}
                    </div>
                )}
            </div>

            <style>{`
        .admin-dashboard {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .admin-header h2 {
          margin: 0;
          color: #1f2937;
        }
        
        .admin-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 10px;
        }
        
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #6b7280;
          border-radius: 6px;
          transition: all 0.2s;
        }
        
        .tab-btn:hover {
          background: #f3f4f6;
        }
        
        .tab-btn.active {
          background: #3b82f6;
          color: white;
        }
        
        .pending-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ef4444;
          color: white;
          font-size: 11px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 10px;
          margin-left: 6px;
          min-width: 18px;
          height: 18px;
        }
        
        .pending-section {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .pending-section h4 {
          color: #92400e;
          margin-bottom: 15px;
        }
        
        .admin-content h4 {
          margin-top: 20px;
          margin-bottom: 15px;
          color: #374151;
        }
        
        .admin-content {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .admin-content h3 {
          margin-top: 0;
          color: #374151;
          margin-bottom: 15px;
        }
        
        .data-table {
          overflow-x: auto;
        }
        
        .data-table table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .data-table th,
        .data-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .data-table th {
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .badge-success {
          background: #d1fae5;
          color: #065f46;
        }
        
        .badge-danger {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .badge-warning {
          background: #fef3c7;
          color: #92400e;
        }
        
        .badge-info {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .badge-admin {
          background: #ede9fe;
          color: #5b21b6;
        }
        
        .badge-default {
          background: #f3f4f6;
          color: #374151;
        }
        
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        
        .btn-accept,
        .btn-reject,
        .btn-role {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s;
        }
        
        .btn-accept {
          background: #10b981;
          color: white;
        }
        
        .btn-accept:hover {
          background: #059669;
        }
        
        .btn-reject {
          background: #ef4444;
          color: white;
        }
        
        .btn-reject:hover {
          background: #dc2626;
        }
        
        .btn-role {
          background: #6b7280;
          color: white;
        }
        
        .btn-role:hover {
          background: #4b5563;
        }
        
        .btn-admin {
          background: #8b5cf6;
        }
        
        .btn-admin:hover {
          background: #7c3aed;
        }
        
        .role-switch-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        
        .no-data {
          text-align: center;
          color: #6b7280;
          padding: 40px;
        }
        
        .loading-container {
          text-align: center;
          padding: 40px;
        }
        
        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

export default AdminDashboard;
