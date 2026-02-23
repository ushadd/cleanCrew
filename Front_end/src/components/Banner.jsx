import React from 'react';
import { Link } from 'react-router-dom';
// Fixed the import path syntax
import bannerImage from "../assets/img_2.png";

function Banner() {
  return (
    <section className="py-5" style={{ backgroundColor: '#f8fafc', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Content */}
          <div className="col-lg-6 text-start">
            <span
              className="badge mb-3 p-2 px-3 rounded-pill"
              style={{ backgroundColor: '#dcfce7', color: '#15803d', fontWeight: '600', fontSize: '0.9rem' }}
            >
              ✨ Rated #1 for Home Cleaning
            </span>

            <h1 className="display-4 fw-bold mb-3" style={{ color: '#1e293b', lineHeight: '1.2' }}>
              Your Home, <span style={{ color: '#00A699' }}>Sparkling Clean</span>
            </h1>

            <p className="lead text-muted mb-4" style={{ fontSize: '1.1rem' }}>
              Join 10,000+ homeowners who trust our vetted, background-checked
              professionals to keep their spaces pristine.
            </p>

            <div className="d-flex flex-wrap gap-3">
              {/* Primary Call to Action */}
              <Link
                to="/login"
                className="btn btn-lg px-4 py-3 rounded-3 shadow-sm"
                style={{
                  backgroundColor: '#00A699',
                  color: 'white',
                  fontWeight: '600',
                  border: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Book Your Cleaning
              </Link>

              {/* Secondary Call to Action */}
              <Link
                to="/services"
                className="btn btn-outline-secondary btn-lg px-4 py-3 rounded-3"
                style={{ fontWeight: '600' }}
              >
                See Pricing
              </Link>
            </div>

            {/* Trust Bar */}
            <div className="mt-5 d-flex gap-4 align-items-center opacity-50">
              <small className="fw-bold text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>Trusted By:</small>
              <span className="fw-extrabold fst-italic h5 mb-0">Forbes</span>
              <span className="fw-extrabold fst-italic h5 mb-0">TechCrunch</span>
            </div>
          </div>

          {/* Right Side: Professional Image */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="position-relative">
              <img
                src={bannerImage}
                alt="Housekeeping Professional"
                className="img-fluid rounded-4 shadow-lg"
                style={{ objectFit: 'cover', width: '100%', maxHeight: '500px' }}
              />

              {/* Floating Badge */}
              <div
                className="position-absolute bottom-0 start-0 m-3 m-md-4 bg-white p-3 rounded-3 shadow-lg border-start border-5"
                style={{ borderColor: '#00A699' }}
              >
                <p className="mb-0 small fw-bold text-dark">
                  <span style={{ color: '#00A699', marginRight: '5px' }}>✓</span>
                  100% Satisfaction Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;