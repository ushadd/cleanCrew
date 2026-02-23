import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Clock, CheckCircle, Star, ArrowRight, Shield, Briefcase } from "lucide-react";
import { getStaffDetails, seedStaffData } from "../services/api";
import "./StaffSelection.css";

function StaffSelection() {
    const navigate = useNavigate();
    const location = useLocation();
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const selectedService = location.state?.selectedService || "";

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await getStaffDetails();
            let staffData = response.data;

            // If no staff in database, seed the data
            if (!staffData || staffData.length === 0) {
                try {
                    await seedStaffData();
                    // Fetch again after seeding
                    const newResponse = await getStaffDetails();
                    staffData = newResponse.data;
                } catch (seedError) {
                    console.log("Seeding not available, using mock data");
                }
            }

            // Filter staff that are verified/available
            const availableStaff = staffData.filter(
                (staff) => staff.verified === "Accepted" || staff.verified === "Pending"
            );
            setStaffList(availableStaff);
        } catch (error) {
            console.error("Error fetching staff:", error);
            // Use mock data for demo purposes if API fails
            setStaffList([
                {
                    id: 1,
                    staff: { user_name: "John Smith" },
                    experience: "5 years",
                    availability: "Mon-Sat",
                    verified: "Accepted"
                },
                {
                    id: 2,
                    staff: { user_name: "Sarah Johnson" },
                    experience: "3 years",
                    availability: "Mon-Fri",
                    verified: "Accepted"
                },
                {
                    id: 3,
                    staff: { user_name: "Mike Davis" },
                    experience: "7 years",
                    availability: "Tue-Sun",
                    verified: "Accepted"
                },
                { id: 4, staff: { user_name: "Emily White" }, experience: "4 years", availability: "Daily", verified: "Accepted" },
                { id: 5, staff: { user_name: "Robert Brown" }, experience: "6 years", availability: "Weekends", verified: "Accepted" },
                { id: 6, staff: { user_name: "Lisa Wilson" }, experience: "2 years", availability: "Mon-Wed", verified: "Pending" },
                { id: 7, staff: { user_name: "David Miller" }, experience: "8 years", availability: "Full-time", verified: "Accepted" },
                { id: 8, staff: { user_name: "Anna Garcia" }, experience: "5 years", availability: "Evenings", verified: "Accepted" },
                { id: 9, staff: { user_name: "Kevin Lee" }, experience: "3 years", availability: "Thu-Sat", verified: "Accepted" }

            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectStaff = (staff) => {
        setSelectedStaff(staff);
    };

    const handleContinue = () => {
        if (selectedStaff) {
            // Get the User id from the staff relationship - check both real API and mock data formats
            // Real API: selectedStaff.staff.id is the User id
            // Mock data: selectedStaff.id is the only id available
            const userId = selectedStaff.staff?.id || selectedStaff.id;
            navigate("/booking", {
                state: {
                    selectedService,
                    selectedStaff: {
                        id: userId,
                        staffDetailsId: selectedStaff.id,
                        name: selectedStaff.staff?.user_name || selectedStaff.name || "Staff Member",
                        experience: selectedStaff.experience,
                        availability: selectedStaff.availability
                    }
                }
            });
        }
    };

    if (loading) {
        return (
            <div className="staff-loading">
                <div className="spinner"></div>
                <p>Loading available staff...</p>
            </div>
        );
    }

    return (
        <div className="staff-selection-wrapper">
            <div className="staff-selection-container">
                <div className="staff-header">
                    <h2>Select Your Service Provider</h2>
                    <p>Choose from our verified and experienced cleaning professionals</p>
                </div>

                {selectedService && (
                    <div className="selected-service-badge">
                        <span>Service: </span>
                        <strong>{selectedService}</strong>
                    </div>
                )}

                <div className="staff-grid">
                    {staffList.map((staff) => (
                        <div
                            key={staff.id}
                            className={`staff-card ${selectedStaff?.id === staff.id ? "selected" : ""}`}
                            onClick={() => handleSelectStaff(staff)}
                        >
                            <div className="staff-avatar">
                                <User size={40} />
                            </div>

                            <div className="staff-info">
                                <h3>{staff.staff?.user_name || "Staff Member"}</h3>

                                <div className="staff-meta">
                                    <div className="meta-item">
                                        <Briefcase size={16} />
                                        <span>{staff.experience || "Experience info"}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Clock size={16} />
                                        <span>{staff.availability || "Availability info"}</span>
                                    </div>
                                </div>

                                {staff.verified === "Accepted" && (
                                    <div className="verified-badge">
                                        <Shield size={14} />
                                        <span>Verified</span>
                                    </div>
                                )}
                            </div>

                            {selectedStaff?.id === staff.id && (
                                <div className="selected-check">
                                    <CheckCircle size={24} color="#10b981" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {staffList.length === 0 && (
                    <div className="no-staff">
                        <p>No staff available at the moment. Please try again later.</p>
                    </div>
                )}

                <div className="staff-actions">
                    <button
                        className="continue-btn"
                        onClick={handleContinue}
                        disabled={!selectedStaff}
                    >
                        Continue with Booking
                        <ArrowRight size={20} />
                    </button>
                    <button className="back-btn" onClick={() => navigate("/services")}>
                        Back to Services
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StaffSelection;
