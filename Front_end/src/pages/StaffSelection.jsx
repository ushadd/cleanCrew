import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Clock, CheckCircle, ArrowRight, Shield, Briefcase } from "lucide-react";
import { getStaffDetails, seedStaffData } from "../services/api";
import "./StaffSelection.css";

function StaffSelection() {
    const navigate = useNavigate();
    const location = useLocation();
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState(null);

    // Retrieve service from state, or fallback to 'General Cleaning' if lost during login redirect
    const selectedService = location.state?.selectedService || "General Cleaning";

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await getStaffDetails();
            let staffData = response.data;

            if (!staffData || staffData.length === 0) {
                try {
                    await seedStaffData();
                    const newResponse = await getStaffDetails();
                    staffData = newResponse.data;
                } catch (seedError) {
                    console.log("Seeding failed, using mock data");
                }
            }

            const availableStaff = staffData.filter(
                (staff) => staff.verified === "Accepted" || staff.verified === "Pending"
            );
            setStaffList(availableStaff.length > 0 ? availableStaff : getMockData());
        } catch (error) {
            console.error("Error fetching staff:", error);
            setStaffList(getMockData());
        } finally {
            setLoading(false);
        }
    };

    const getMockData = () => [
        { id: 1, staff: { user_name: "John Smith" }, experience: "5 years", availability: "Mon-Sat", verified: "Accepted" },
        { id: 2, staff: { user_name: "Sarah Johnson" }, experience: "3 years", availability: "Mon-Fri", verified: "Accepted" },
        { id: 3, staff: { user_name: "Mike Davis" }, experience: "7 years", availability: "Tue-Sun", verified: "Accepted" },
        { id: 4, staff: { user_name: "Emily White" }, experience: "4 years", availability: "Daily", verified: "Accepted" },
        { id: 5, staff: { user_name: "Robert Brown" }, experience: "6 years", availability: "Weekends", verified: "Accepted" },
        { id: 6, staff: { user_name: "Lisa Wilson" }, experience: "2 years", availability: "Mon-Wed", verified: "Accepted" },
        { id: 7, staff: { user_name: "David Miller" }, experience: "8 years", availability: "Full-time", verified: "Accepted" },
        { id: 8, staff: { user_name: "Anna Garcia" }, experience: "5 years", availability: "Evenings", verified: "Accepted" },
        { id: 9, staff: { user_name: "Kevin Lee" }, experience: "3 years", availability: "Thu-Sat", verified: "Accepted" }


    ];

    const handleContinue = () => {
        if (selectedStaff) {
            const userId = selectedStaff.staff?.id || selectedStaff.id;
            navigate("/booking", {
                state: {
                    selectedService,
                    selectedStaff: {
                        id: userId,
                        staffDetailsId: selectedStaff.id,
                        name: selectedStaff.staff?.user_name || "Staff Member",
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
                <p>Finding the best professionals for you...</p>
            </div>
        );
    }

    return (
        <div className="staff-selection-wrapper">
            <div className="container py-5">
                <div className="staff-header text-center mb-5">
                    <h2 className="fw-bold">Select Your Professional</h2>
                    <p className="text-muted">Verified experts for your <strong>{selectedService}</strong></p>
                </div>

                <div className="row g-4">
                    {staffList.map((staff) => (
                        <div className="col-lg-4 col-md-6" key={staff.id}>
                            <div
                                className={`staff-card-custom ${selectedStaff?.id === staff.id ? "active-card" : ""}`}
                                onClick={() => setSelectedStaff(staff)}
                            >
                                <div className="d-flex align-items-center mb-3">
                                    <div className="avatar-circle">
                                        <User size={30} color="#1abc9c" />
                                    </div>
                                    <div className="ms-3">
                                        <h5 className="mb-0 fw-bold text-dark">{staff.staff?.user_name || "Staff Member"}</h5>
                                        {staff.verified === "Accepted" && (
                                            <span className="badge-verified">
                                                <Shield size={12} className="me-1" /> Verified
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="staff-details-box">
                                    <div className="detail-row">
                                        <Briefcase size={16} />
                                        <span>{staff.experience} Experience</span>
                                    </div>
                                    <div className="detail-row">
                                        <Clock size={16} />
                                        <span>Available: {staff.availability}</span>
                                    </div>
                                </div>

                                {selectedStaff?.id === staff.id && (
                                    <div className="selection-indicator">
                                        <CheckCircle size={20} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5 d-flex justify-content-center gap-3">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        Back
                    </button>
                    <button
                        className="btn-continue"
                        disabled={!selectedStaff}
                        onClick={handleContinue}
                    >
                        Continue to Booking <ArrowRight size={18} className="ms-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StaffSelection;