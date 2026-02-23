import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import { Calendar, User, Settings, Mail, Phone, MapPin, Clock, Star, CheckCircle, Shield, History, CheckSquare } from "lucide-react";
import { createBooking, createPayment, getStaffBookings, getBookings, updateBookingStatus } from "../services/api";
import "./Booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  // Staff role and booking history
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [staffBookings, setStaffBookings] = useState([]);
  const [showBookingHistory, setShowBookingHistory] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Initialize with passed service if available
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    service: location.state?.selectedService || "",
    staffId: location.state?.selectedStaff?.id || null,
    staffName: location.state?.selectedStaff?.name || "",
    staffExperience: location.state?.selectedStaff?.experience || "",
    staffAvailability: location.state?.selectedStaff?.availability || "",
    date: "",
    hours: "",
    address: ""
  });

  const RATE_PER_HOUR = 299;

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole");
    const id = localStorage.getItem("userId");
    setUserRole(role || "");
    setUserId(id ? parseInt(id) : null);

    // If user is staff, load their booking history
    // Check for both "Staff" and "STAFF" for compatibility
    if ((role === "STAFF" || role === "Staff") && id) {
      fetchStaffBookings(id);
    }
  }, []);

  const fetchStaffBookings = async (staffId) => {
    try {
      const response = await getStaffBookings(staffId);
      setStaffBookings(response.data || []);
    } catch (error) {
      console.error("Error fetching staff bookings:", error);
    }
  };

  const handleMarkCompleted = async (bookingId) => {
    setUpdatingStatus(bookingId);
    try {
      await updateBookingStatus(bookingId, "Completed");
      // Refresh the staff bookings list
      if (userId) {
        fetchStaffBookings(userId);
      }
      alert("Service marked as completed! Customer can now give review.");
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking status.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalConfirm = async () => {
    setLoading(true);
    try {
      const bookingData = {
        ...booking,
        property_type: "Home",
        hours: parseInt(booking.hours),
        staffId: booking.staffId
      };

      const bookingRes = await createBooking(bookingData);
      const bookingId = bookingRes.data.bookingId || bookingRes.data.id;

      const paymentData = {
        booking: { id: bookingId },
        amount: parseFloat(booking.hours) * RATE_PER_HOUR,
        payment_method: "Cash",
        payment_status: "Pending",
      };

      await createPayment(paymentData);
      setStep(3);

      // Navigate to reviews after successful booking (for demo - in production this would be after service completion)
      setTimeout(() => {
        navigate("/reviews", {
          state: {
            bookingInfo: { id: bookingId, service: booking.service },
            staffInfo: { id: booking.staffId, name: booking.staffName }
          }
        });
      }, 2000);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Failed to save booking.");
    } finally {
      setLoading(false);
    }
  };

  // If user is staff, show booking history instead of booking form
  // Check for both "Staff" and "STAFF" for compatibility
  if (userRole === "STAFF" || userRole === "Staff") {
    return (
      <div id="book" className="booking-wrapper">
        <div className="booking-card">
          <div className="booking-header">
            <h2>My Booking History</h2>
            <button
              className="submit-btn"
              onClick={() => fetchStaffBookings(userId)}
              style={{ marginLeft: 'auto' }}
            >
              <History size={18} /> Refresh
            </button>
          </div>

          {staffBookings.length > 0 ? (
            <div className="bookings-list">
              {staffBookings.map((bookingItem) => (
                <div key={bookingItem.bookingId || bookingItem.id} className="booking-item">
                  <div className="booking-details">
                    <p><strong>Service:</strong> {bookingItem.services?.service_name || bookingItem.service || "N/A"}</p>
                    <p><strong>Customer:</strong> {bookingItem.customer?.user_name || "N/A"}</p>
                    <p><strong>Date:</strong> {bookingItem.booking_date_time ? new Date(bookingItem.booking_date_time).toLocaleDateString() : "N/A"}</p>
                    <p><strong>Status:</strong>
                      <span className={`status-badge status-${bookingItem.status?.toLowerCase()}`}>
                        {bookingItem.status || "Pending"}
                      </span>
                    </p>
                  </div>

                  {/* Service Completed button - only show for non-completed bookings */}
                  {bookingItem.status !== "Completed" && (
                    <button
                      className="complete-btn"
                      onClick={() => handleMarkCompleted(bookingItem.bookingId || bookingItem.id)}
                      disabled={updatingStatus === (bookingItem.bookingId || bookingItem.id)}
                    >
                      <CheckSquare size={18} />
                      {updatingStatus === (bookingItem.bookingId || bookingItem.id) ? "Updating..." : "Mark Service Completed"}
                    </button>
                  )}

                  {bookingItem.status === "Completed" && (
                    <div className="completed-message">
                      <CheckCircle size={18} /> Service Completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-bookings">No bookings assigned to you yet.</p>
          )}
        </div>
      </div>
    );
  }

  if (step === 1) return (
    <div id="book" className="booking-wrapper">
      <div className="booking-card">
        <div className="booking-header">
          <h2>Book Your Service</h2>
        </div>
        <form onSubmit={handleBookingSubmit} className="booking-form">
          <div className="input-group">
            <User className="icon" size={18} />
            <input required name="name" placeholder="Full Name" onChange={handleChange} value={booking.name} />
          </div>
          <div className="grid-inputs">
            <div className="input-group"><Mail className="icon" size={18} /><input required type="email" name="email" placeholder="Email" onChange={handleChange} value={booking.email} /></div>
            <div className="input-group"><Phone className="icon" size={18} /><input required type="tel" name="phone" placeholder="Phone" onChange={handleChange} value={booking.phone} /></div>
          </div>
          <div className="input-group">
            <MapPin className="icon" size={18} /><input required name="address" placeholder="House Address" onChange={handleChange} value={booking.address} />
          </div>
          <div className="grid-inputs">
            <div className="input-group">
              <Settings className="icon" size={18} />
              <select required name="service" onChange={handleChange} value={booking.service}>
                <option value="" disabled>Select Service</option>
                <option value="Cleaning">House Cleaning</option>
                <option value="Commercial Clean">Commercial Cleaning</option>
                <option value="Deep Clean">Deep Cleaning</option>
              </select>
            </div>
            <div className="input-group">
              <Clock className="icon" size={18} />
              <select required name="hours" onChange={handleChange} value={booking.hours}>
                <option value="" disabled>Hours</option>
                {[1, 2, 3, 4, 5, 6].map(h => <option key={h} value={h}>{h} {h === 1 ? 'Hr' : 'Hrs'}</option>)}
              </select>
            </div>
          </div>
          <div className="input-group">
            <Calendar className="icon" size={18} /><input required type="date" name="date" onChange={handleChange} value={booking.date} />
          </div>

          {/* Show selected staff info */}
          {booking.staffName && (
            <div className="selected-staff-info">
              <Shield size={18} />
              <div className="staff-details-box">
                <span>Service Provider: <strong>{booking.staffName}</strong></span>
                {booking.staffExperience && <span className="staff-meta">Experience: {booking.staffExperience}</span>}
                {booking.staffAvailability && <span className="staff-meta">Availability: {booking.staffAvailability}</span>}
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn">Continue to Confirmation</button>
        </form>
      </div>
    </div>
  );

  if (step === 2) return (
    <div className="booking-wrapper">
      <div className="booking-card payment-card">
        <div className="booking-header">
          <h2>Confirm Booking</h2>
          <div className="price-summary">
            <span>Total Amount (Cash):</span>
            <strong>₹{booking.hours * RATE_PER_HOUR}</strong>
          </div>
        </div>
        <div className="cash-view">
          <p><strong>Service:</strong> {booking.service}</p>
          {booking.staffName && (
            <p><strong>Service Provider:</strong> {booking.staffName}</p>
          )}
          <button onClick={handleFinalConfirm} className="submit-btn w-100" disabled={loading}>
            {loading ? "Processing..." : "Confirm & Book Now"}
          </button>
          <button className="back-link" onClick={() => setStep(1)}>← Edit Details</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="booking-wrapper">
      <div className="booking-card success-card">
        <CheckCircle size={60} color="#28a745" />
        <h2>Booking Confirmed!</h2>
        <p className="success-message">Your booking has been successfully placed!</p>
        <p className="review-prompt">You will be redirected to give your review shortly...</p>
        <button className="submit-btn mt-4" onClick={() => navigate("/", { state: { showReviewPrompt: true } })}>Back to Home</button>
      </div>
    </div>
  );
}

export default Booking;