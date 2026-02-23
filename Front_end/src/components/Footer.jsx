import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">

          {/* Brand & Mission */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-primary">CleanCrew.</h5>
            <p className="text-secondary small mb-4" style={{ lineHeight: '1.8' }}>
              Premium residential and commercial housekeeping services.
              We don't just clean; we create healthy living spaces with
              vetted professionals you can trust.
            </p>
            <div className="d-flex gap-3 mb-4">
              {/* Simple Social Icons - Using basic Bootstrap Icons or generic spans */}
              <a href="#" className="text-secondary text-decoration-none"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-secondary text-decoration-none"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-secondary text-decoration-none"><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-6">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><a href="#" className="text-inherit text-decoration-none hover-white">About Us</a></li>
              <li className="mb-2"><a href="#" className="text-inherit text-decoration-none hover-white">Our Services</a></li>
              <li className="mb-2"><a href="#" className="text-inherit text-decoration-none hover-white">Service Areas</a></li>
              <li className="mb-2"><a href="#" className="text-inherit text-decoration-none hover-white">Join the Team</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-6">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><a href="#" className="text-inherit text-decoration-none">Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-inherit text-decoration-none">Safety Policy</a></li>
              <li className="mb-2"><a href="#" className="text-inherit text-decoration-none">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-inherit text-decoration-none">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact & Trust */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <div className="d-flex align-items-center mb-3 text-secondary small">
              <i className="bi bi-envelope me-2"></i> support@cleancrew.com
            </div>
            <div className="d-flex align-items-center mb-4 text-secondary small">
              <i className="bi bi-telephone me-2"></i> +91 8666888008
            </div>

            <div className="p-3 rounded-3 bg-secondary bg-opacity-10">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small fw-bold">Satisfaction Guarantee</span>
                <span className="text-success small">100%</span>
              </div>
              <div className="progress" style={{ height: '4px' }}>
                <div className="progress-bar bg-success w-100"></div>
              </div>
            </div>
          </div>

        </div>

        <hr className="my-4 border-secondary opacity-25" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-secondary small mb-0">
              © 2026 CleanCrew. All rights reserved. Built for professional households.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            {/* Payment Icons Placeholder */}
            <div className="text-secondary fs-4 d-flex justify-content-center justify-content-md-end gap-3 opacity-50">
              <i className="bi bi-credit-card"></i>
              <i className="bi bi-paypal"></i>
              <i className="bi bi-apple"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;