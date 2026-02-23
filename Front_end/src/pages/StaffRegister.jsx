import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAsStaff } from "../services/api";
import { User, Mail, Lock, Phone, MapPin, Clock, Briefcase, ArrowRight, Shield } from "lucide-react";
import "./Login.css";

function StaffRegister() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        // User fields
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        // Staff details fields
        experience: "",
        availability: "",
        phoneNumber: "",
        address: "",
        idProof: "",
        serviceType: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        setStep(2);
    };

    const handleStaffSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const staffData = {
                user_name: `${formData.firstName} ${formData.lastName}`,
                user_mail: formData.email,
                user_password: formData.password,
                experience: formData.experience,
                availability: formData.availability,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                id_proof: formData.idProof,
                serviceType: formData.serviceType
            };

            await registerAsStaff(staffData);
            setMessage("Registration successful! Please wait for admin approval.");
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Join as a Staff Member</h2>
                    <p>
                        {step === 1
                            ? "Create your account to get started"
                            : "Tell us about your experience"}
                    </p>
                </div>

                {error && (
                    <div className="auth-alert error">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="auth-alert success">
                        {message}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleUserSubmit} className="auth-form">
                        <div className="grid-inputs">
                            <div className="input-group">
                                <User className="icon" size={18} />
                                <input
                                    required
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    required
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <Mail className="icon" size={18} />
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>

                        <div className="input-group">
                            <Lock className="icon" size={18} />
                            <input
                                required
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </div>

                        <div className="input-group">
                            <Lock className="icon" size={18} />
                            <input
                                required
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Continue
                            <ArrowRight size={18} style={{ marginLeft: "8px" }} />
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleStaffSubmit} className="auth-form">
                        <div className="input-group">
                            <Briefcase className="icon" size={18} />
                            <input
                                required
                                type="text"
                                name="experience"
                                placeholder="Years of Experience"
                                onChange={handleChange}
                                value={formData.experience}
                            />
                        </div>

                        <div className="input-group">
                            <Clock className="icon" size={18} />
                            <select
                                required
                                name="availability"
                                onChange={handleChange}
                                value={formData.availability}
                            >
                                <option value="">Select Availability</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Weekends">Weekends Only</option>
                                <option value="Flexible">Flexible</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <Phone className="icon" size={18} />
                            <input
                                required
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                value={formData.phoneNumber}
                            />
                        </div>

                        <div className="input-group">
                            <MapPin className="icon" size={18} />
                            <input
                                required
                                type="text"
                                name="address"
                                placeholder="Address"
                                onChange={handleChange}
                                value={formData.address}
                            />
                        </div>

                        <div className="input-group">
                            <Shield className="icon" size={18} />
                            <input
                                required
                                type="text"
                                name="idProof"
                                placeholder="ID Proof (e.g., Aadhar, Passport)"
                                onChange={handleChange}
                                value={formData.idProof}
                            />
                        </div>

                        <div className="input-group">
                            <select
                                required
                                name="serviceType"
                                onChange={handleChange}
                                value={formData.serviceType}
                            >
                                <option value="">Select Service Type</option>
                                <option value="Home Cleaning">Home Cleaning</option>
                                <option value="Commercial Cleaning">Commercial Cleaning</option>
                                <option value="Deep Cleaning">Deep Cleaning</option>
                                <option value="Office Cleaning">Office Cleaning</option>
                            </select>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Registering..." : "Complete Registration"}
                            <ArrowRight size={18} style={{ marginLeft: "8px" }} />
                        </button>

                        <button
                            type="button"
                            className="back-link"
                            onClick={() => setStep(1)}
                        >
                            ← Back
                        </button>
                    </form>
                )}

                <div className="auth-footer">
                    <p>Already have an account? <span onClick={() => navigate("/login")}>Click here for Login</span></p>
                </div>
            </div>
        </div>
    );
}

export default StaffRegister;
