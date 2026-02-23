import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser, getStaffDetailsByUserId } from "../services/api";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    role: "Customer"
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Prepare login payload
        const response = await loginUser({
          email: formData.email,
          password: formData.password
        });

        // Store user info from backend response
        if (response.data && response.data.id) {
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("userName", response.data.user_name);
          localStorage.setItem("userEmail", response.data.user_mail);
          localStorage.setItem("userRole", response.data.user_role);
          setMessage("Login successful!");

          const userRole = response.data.user_role;
          const selectedService = location.state?.selectedService || "";

          // Redirect based on user role
          setTimeout(() => {
            if (userRole === "Admin") {
              // Admin goes to admin dashboard
              navigate("/admin");
            } else if (userRole === "Staff") {
              // Staff goes to booking page to see their booking history
              navigate("/booking", { state: { selectedService } });
            } else {
              // Customers go to staff selection to book services
              navigate("/staff-selection", { state: { selectedService } });
            }
          }, 1000);
        } else {
          setMessage("Invalid email or password");
        }
      } else {
        // Register flow
        await registerUser(formData);
        setMessage("Registration successful! Switching to login...");
        // After 2 seconds, toggle back to login view so they can sign in
        setTimeout(() => {
          setIsLogin(true);
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      setMessage(isLogin ? "Invalid email or password" : "Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Enter your details to access your bookings"
              : "Join us to start booking professional services"}
          </p>
        </div>

        {message && (
          <div className={`auth-alert ${message.includes("successful") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="grid-inputs">
              <div className="input-group">
                <User className="icon" size={18} />
                <input required name="firstName" placeholder="First Name" onChange={handleChange} />
              </div>
              <div className="input-group">
                <input required name="lastName" placeholder="Last Name" onChange={handleChange} />
              </div>
            </div>
          )}

          <div className="input-group">
            <Mail className="icon" size={18} />
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <>
              <div className="input-group">
                <Phone className="icon" size={18} />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <select required name="role" onChange={handleChange} value={formData.role || ""}>
                  <option value="" disabled>Select Role</option>
                  <option value="Customer">Customer</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </>
          )}

          <div className="input-group">
            <Lock className="icon" size={18} />
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
            <ArrowRight size={18} style={{ marginLeft: "8px" }} />
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <>
              <p>New here? <span onClick={() => setIsLogin(false)}>Create an account</span></p>
              <p className="staff-register-link">
                Want to join our team? <span onClick={() => navigate("/staff-register")}>Register as Staff</span>
              </p>
            </>
          ) : (
            <p>Already a user? <span onClick={() => setIsLogin(true)}>Click here for Login</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
