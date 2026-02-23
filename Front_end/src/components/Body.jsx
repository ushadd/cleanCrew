import React, { useState } from "react";
import axios from "axios";

function Body() {
  const [booking, setBooking] = useState({
    name: "",
    service: "",
    date: "",
    price: 0
  });

  const services = [
    { id: "home", title: "Home Cleaning", icon: "🏠", price: 779 , desc: "Standard maintenance for busy homes." },
    { id: "office", title: "Office Cleaning", icon: "🏢", price: 999, desc: "Keep your workspace productive and fresh." },
    { id: "deep", title: "Deep Cleaning", icon: "✨", price: 1499, desc: "Top-to-bottom thorough sanitization." }
  ];

  const features = [
    { title: "Verified Pros", desc: "Background-checked cleaners.", icon: "🛡️" },
    { title: "Transparent Pricing", desc: "No hidden fees, ever.", icon: "💎" },
    { title: "Eco-Friendly", desc: "Safe for kids and pets.", icon: "🌿" }
  ];

  const steps = [
    { num: "1", title: "Pick Service", desc: "Select the plan that fits your needs." },
    { num: "2", title: "Choose Date", desc: "Pick a time that works for your schedule." },
    { num: "3", title: "Relax", desc: "We handle the rest while you enjoy your day." }
  ];

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const selectService = (serviceObj) => {
    setBooking({ ...booking, service: serviceObj.title, price: serviceObj.price });
  };

  const submitBooking = () => {
    if (!booking.name || !booking.service || !booking.date) {
      alert("Please fill in all details");
      return;
    }
    axios.post("http://localhost:8080/api/bookings", booking)
      .then(() => alert("Booking Successful!"))
      .catch(() => alert("Error while booking."));
  };

  return (
    <div style={{ backgroundColor: "#f8fafc" }}>

      {/* --- SECTION 1: WHY CHOOSE US --- */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-5">Why Choose CleanCrew?</h2>
          <div className="row g-4">
            {features.map((f, i) => (
              <div className="col-md-4" key={i}>
                <div className="p-4 rounded-4 bg-light border-0 shadow-sm transition-all h-100">
                  <div className="fs-1 mb-2">{f.icon}</div>
                  <h5 className="fw-bold">{f.title}</h5>
                  <p className="text-muted mb-0 small">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: HOW IT WORKS --- */}
      <section className="py-5" style={{ backgroundColor: "#f1f5f9" }}>
        <div className="container">
          <h2 className="fw-bold text-center mb-5">How It Works</h2>
          <div className="row text-center g-4">
            {steps.map((s, i) => (
              <div className="col-md-4" key={i}>
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white fw-bold mb-3" style={{ width: '50px', height: '50px' }}>
                  {s.num}
                </div>
                <h5 className="fw-bold">{s.title}</h5>
                <p className="text-muted small px-lg-5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SERVICES --- */}
      <section className="py-5 bg-white border-bottom shadow-sm">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Cleaning Services</h2>
            <p className="text-muted">Simple flat-rate pricing for everyone</p>
          </div>
          <div className="row g-4">
            {services.map((s) => (
              <div className="col-md-4" key={s.id}>
                <div
                  onClick={() => selectService(s)}
                  className={`card h-100 p-4 rounded-4 text-center cursor-pointer transition-all ${
                    booking.service === s.title ? 'border-success border-2 shadow-lg' : 'border-light shadow-sm'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="display-6 mb-3">{s.icon}</div>
                  <h5 className="fw-bold">{s.title}</h5>
                  <p className="text-muted smaller">{s.desc}</p>
                  <div className="h4 fw-bold text-success"> Rs {s.price}</div>
                  <button className={`btn mt-3 rounded-pill fw-bold btn-sm ${
                    booking.service === s.title ? 'btn-success' : 'btn-outline-success'
                  }`}>
                    {booking.service === s.title ? 'Selected ✓' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: BOOKING --- */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg rounded-5 p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1">Book Your Slot</h2>
                  <p className="text-muted small">Complete the form to confirm your cleaning.</p>
                </div>

                <div className="bg-success text-white p-3 rounded-4 mb-4 d-flex justify-content-between align-items-center shadow-sm">
                  <div>
                    <div className="small opacity-75">Service</div>
                    <div className="fw-bold">{booking.service || "Not Selected"}</div>
                  </div>
                  <div className="text-end">
                    <div className="small opacity-75">Total</div>
                    <div className="h4 fw-bold mb-0"> Rs {booking.price}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">FULL NAME</label>
                  <input className="form-control form-control-lg bg-light border-0 rounded-3" name="name" placeholder="John Doe" onChange={handleChange} />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">PICK A DATE</label>
                  <input className="form-control form-control-lg bg-light border-0 rounded-3" type="date" name="date" onChange={handleChange} />
                </div>

                <button
                  className="btn btn-success btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm"
                  onClick={submitBooking}
                  disabled={!booking.service}
                >
                  Confirm Booking
                </button>
                {!booking.service && <p className="text-danger text-center mt-2 small">Please select a package above.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .transition-all { transition: all 0.3s ease; }
        .transition-all:hover { transform: translateY(-5px); }
        .cursor-pointer { cursor: pointer; }
      `}</style>
    </div>
  );
}

export default Body;