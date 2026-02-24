import React, { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="py-5 mt-5 border-top border-dark" style={{ backgroundColor: "#1a252f" }}>
      <div className="container">

        {/* --- SUBSCRIBE SECTION --- */}
        <div className="row justify-content-center mb-5 pb-5 border-bottom" style={{ borderColor: "rgba(255,255,255,0.05) !important" }}>
          <div className="col-md-6 text-center">
            <h4 className="fw-bold text-white mb-2">Join the CleanCrew Club</h4>
            <p className="text-light opacity-50 small mb-4">Subscribe for exclusive cleaning deals and home maintenance tips.</p>
            <form onSubmit={handleSubscribe} className="d-flex gap-2">
              <input
                type="email"
                className="form-control subscribe-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-subscribe px-4 fw-bold">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="row g-4 justify-content-between">
          {/* LEFT: Brand */}
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3" style={{ color: "#16a085" }}>CleanCrew.</h5>
            <p className="text-light opacity-50 small mb-4" style={{ lineHeight: "1.6" }}>
              Premium residential and commercial housekeeping services.
              Vetted professionals you can trust.
            </p>
            <div className="d-flex gap-3 h5">
              <a href="#" className="footer-icon-link"><i className="bi bi-facebook"></i></a>
              <a href="#" className="footer-icon-link"><i className="bi bi-instagram"></i></a>
              <a href="#" className="footer-icon-link"><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>

          {/* CENTER: Links */}
          <div className="col-md-2 col-6">
            <h6 className="fw-bold small mb-3 text-uppercase text-white opacity-25">Company</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#" className="footer-link">About Us</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Services</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Join Team</a></li>
            </ul>
          </div>

          {/* RIGHT: Contact */}
          <div className="col-md-3">
            <h6 className="fw-bold small mb-3 text-uppercase text-white opacity-25">Contact Us</h6>
            <p className="text-light small mb-1 opacity-50">📧 support@cleancrew.com</p>
            <p className="text-light small mb-0 opacity-50">📞 +91 8666888008</p>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-5 pt-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-light smaller mb-0 opacity-25">
            © 2026 CleanCrew. All rights reserved. Professional cleaning you can count on.
          </p>
        </div>
      </div>

      <style>{`
        .subscribe-input {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 8px !important;
          padding: 12px 15px;
        }
        .subscribe-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .btn-subscribe {
          background-color: #16a085 !important;
          color: white !important;
          border-radius: 8px !important;
          transition: all 0.3s ease;
        }
        .btn-subscribe:hover {
          background-color: #1abc9c !important;
          transform: scale(1.05);
        }
        .footer-link {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }
        .footer-link:hover {
          color: #16a085 !important;
          padding-left: 5px;
        }
        .footer-icon-link {
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .footer-icon-link:hover {
          color: #16a085 !important;
          transform: translateY(-3px);
          display: inline-block;
        }
        .smaller { font-size: 0.8rem; }
      `}</style>
    </footer>
  );
}

export default Footer;