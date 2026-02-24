import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== User API calls ==========

// Register - maps frontend fields to backend User entity fields
export const registerUser = async (userData) => {
  const payload = {
    user_name: userData.name || `${userData.firstName} ${userData.lastName}`,
    user_mail: userData.email,
    user_password: userData.password,
    user_role: userData.role || "Customer",
  };
  return await api.post("/users/register", payload);
};

// Login - maps frontend fields to backend expected fields
export const loginUser = async (loginData) => {
  const payload = {
    user_mail: loginData.email,
    user_password: loginData.password,
  };
  return await api.post("/users/login", payload);
};

// Switch user role (admin only)
export const switchUserRole = async (userId, role) => {
  return await api.put(`/users/switch-role/${userId}`, { user_role: role });
};

// Get all users (admin)
export const getAllUsers = async () => {
  return await api.get("/users/fetch");
};

// Get all staff
export const getAllStaff = async () => {
  return await api.get("/users/staff");
};

// Get all customers
export const getAllCustomers = async () => {
  return await api.get("/users/customers");
};

// ========== Booking API calls ==========

// Create booking from frontend form
export const createBooking = async (bookingData) => {
  const userId = localStorage.getItem("userId");
  const payload = {
    ...bookingData,
    userId: userId ? parseInt(userId) : null,
  };
  return await api.post("/bookings", payload);
};

// Fetch all bookings
export const getBookings = async () => {
  return await api.get("/bookings/fetch");
};

// Get bookings for staff (staff's booking history)
export const getStaffBookings = async (staffId) => {
  return await api.get(`/bookings/staff/${staffId}`);
};

// Get bookings for customer
export const getCustomerBookings = async (customerId) => {
  return await api.get(`/bookings/customer/${customerId}`);
};

// Update booking status (e.g., mark as completed)
export const updateBookingStatus = async (bookingId, status) => {
  return await api.put(`/bookings/status/${bookingId}`, { status });
};

// Confirm booking by customer (after service is completed)
export const confirmBooking = async (bookingId, confirmed) => {
  return await api.put(`/bookings/confirm/${bookingId}`, { confirmed });
};

// ========== Payment API calls ==========

// Create payment after booking
export const createPayment = async (paymentData) => {
  const userId = localStorage.getItem("userId");
  return await api.post("/payments", {
    ...paymentData,
    userId: userId ? parseInt(userId) : null,
  });
};

// ========== Services API calls ==========

// Fetch all services from backend
export const getServices = async () => {
  return await api.get("/services/fetch");
};

// ========== Staff API calls ==========

// Fetch all staff details
export const getStaffDetails = async () => {
  return await api.get("/staff/fetch");
};

// Fetch available staff (verified/accepted)
export const getAvailableStaff = async () => {
  return await api.get("/staff/available");
};

// Fetch staff by ID
export const getStaffById = async (id) => {
  return await api.get(`/staff/${id}`);
};

// Fetch staff details by user ID
export const getStaffDetailsByUserId = async (userId) => {
  return await api.get(`/staff/user/${userId}`);
};

// Register as staff (creates user + staff details)
export const registerAsStaff = async (staffData) => {
  return await api.post("/staff/register", staffData);
};

// Add staff details for existing user
export const addStaffDetails = async (userId, staffData) => {
  return await api.post(`/staff/add-details/${userId}`, staffData);
};

// Update staff verification status (admin)
export const updateStaffVerification = async (staffId, status) => {
  return await api.put(`/staff/verify/${staffId}`, { status });
};

// Seed staff data (create 10 staff members)
export const seedStaffData = async () => {
  return await api.post("/staff/seed");
};

// ========== Reviews API calls ==========

// Fetch all reviews
export const getReviews = async () => {
  return await api.get("/reviews/fetch");
};

// Fetch recent reviews (sorted by date - newest first)
export const getRecentReviews = async () => {
  return await api.get("/reviews/recent");
};

// Fetch review by ID
export const getReviewById = async (id) => {
  return await api.get(`/reviews/${id}`);
};

// Check if booking is completed (to allow review)
export const checkBookingStatus = async (bookingId) => {
  return await api.get(`/reviews/booking-status/${bookingId}`);
};

// Add a new review
export const addReview = async (reviewData) => {
  const userId = localStorage.getItem("userId");
  const currentDate = new Date().toISOString();

  // Transform the review data to match backend entity field names
  const payload = {
    rating: reviewData.rating,
    comment: reviewData.comment,
    reviewDate: currentDate,
    customer: userId ? { id: parseInt(userId) } : null,
  };

  // Add booking with correct field name (bookingId instead of id)
  if (reviewData.booking && reviewData.booking.id) {
    payload.booking = { bookingId: reviewData.booking.id };
  }

  // Add staff with correct field name (userId instead of id)
  if (reviewData.staff && reviewData.staff.id) {
    payload.staff = { userId: reviewData.staff.id };
  }

  return await api.post("/reviews/insert", payload);
};

export default api;
