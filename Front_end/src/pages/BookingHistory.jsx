import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerBookings, updateBookingStatus } from "../services/api";
import { Calendar, Clock, User, CheckCircle, Star, History, AlertCircle } from "lucide-react";
import "./Booking.css";

function BookingHistory() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }
        fetchBookings();
    }, [userId]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await getCustomerBookings(userId);
            setBookings(response.data || []);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to load booking history");
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchBookings();
        setRefreshing(false);
    };

    const handleRateService = (booking) => {
        navigate("/reviews", {
            state: {
                bookingInfo: {
                    id: booking.bookingId || booking.id,
                    service: booking.services?.service_name || booking.property_type
                },
                staffInfo: {
                    id: booking.staff?.id,
                    name: booking.staff?.user_name
                }
            }
        });
    };

    const getStatusBadge = (status) => {
        const statusClass = status?.toLowerCase() || "pending";
        return <span className={`status-badge status-${statusClass}`}>{status || "Pending"}</span>;
    };

    if (loading) {
        return (
            <div className="booking-wrapper">
                <div className="booking-card">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading your bookings...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-wrapper">
            <div className="booking-card">
                <div className="booking-header">
                    <h2>My Booking History</h2>
                    <button
                        className="submit-btn"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        style={{ marginLeft: 'auto' }}
                    >
                        <History size={18} /> {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                {error && (
                    <div className="auth-alert error">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {bookings.length > 0 ? (
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <div key={booking.bookingId || booking.id} className="booking-item">
                                <div className="booking-details">
                                    <p>
                                        <strong>Service:</strong> {booking.services?.service_name || booking.property_type || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Provider:</strong> {booking.staff?.user_name || "Not Assigned"}
                                    </p>
                                    <p>
                                        <Calendar size={14} style={{ marginRight: 5 }} />
                                        <strong>Date:</strong>{" "}
                                        {booking.booking_date_time
                                            ? new Date(booking.booking_date_time).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                    <p>
                                        <Clock size={14} style={{ marginRight: 5 }} />
                                        <strong>Property Type:</strong> {booking.property_type || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {getStatusBadge(booking.status)}
                                    </p>
                                </div>

                                {/* Action buttons based on booking status */}
                                <div className="booking-actions">
                                    {booking.status === "Completed" ? (
                                        <button
                                            className="rate-btn"
                                            onClick={() => handleRateService(booking)}
                                        >
                                            <Star size={18} />
                                            Rate Service
                                        </button>
                                    ) : booking.status === "Pending" || booking.status === "Accepted" ? (
                                        <div className="status-message">
                                            <Clock size={16} />
                                            <span>Service {booking.status === "Pending" ? "is pending" : "is in progress"}</span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-bookings-container">
                        <History size={60} color="#9ca3af" />
                        <h3>No Bookings Yet</h3>
                        <p>You haven't made any bookings yet. Start by browsing our services!</p>
                        <button
                            className="submit-btn"
                            onClick={() => navigate("/services")}
                        >
                            Browse Services
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingHistory;
