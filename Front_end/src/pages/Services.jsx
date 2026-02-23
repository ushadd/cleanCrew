import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Home, Building2, Sparkles, Clock, ArrowRight } from 'lucide-react';
import './Services.css';

const serviceData = [
  {
    id: 1,
    service_name: "Home Cleaning",
    description: "Comprehensive sanitation for living spaces, kitchens, and bedrooms.",
    price: 799,
    duration: "2-3 hrs",
    icon: <Home className="service-icon" />,
    tag: "Most Popular",
    value: "Cleaning" // Matches select option in Booking
  },
  {
    id: 2,
    service_name: "Commercial Cleaning",
    description: "Professional workspace maintenance for your team.",
    price: 999,
    duration: "4-6 hrs",
    icon: <Building2 className="service-icon" />,
    tag: "Business",
    value: "Commercial Clean"
  },
  {
    id: 3,
    service_name: "Deep Cleaning",
    description: "Intensive top-to-bottom scrub targeting hidden grime.",
    price: 1299,
    duration: "5-8 hrs",
    icon: <Sparkles className="service-icon" />,
    tag: "Premium",
    value: "Deep Clean"
  }
];

function Services() {
  const navigate = useNavigate();

  const handleBookClick = (service) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Navigate to login first, passing the service information
      navigate('/login', { state: { selectedService: service.value, redirectTo: '/staff-selection' } });
    } else {
      // Navigate to staff selection and pass service data
      navigate('/staff-selection', { state: { selectedService: service.value } });
    }
  };

  return (
    <div className="services-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge-outline">Our Expertise</span>
          <h2 className="display-5 fw-bold mt-2">Professional Cleaning Services</h2>
        </div>

        <div className="row g-4">
          {serviceData.map((service) => (
            <div className="col-lg-4 col-md-6" key={service.id}>
              <div className="modern-service-card">
                {service.tag && <div className="card-tag">{service.tag}</div>}
                <div className="icon-box">{service.icon}</div>
                <div className="card-body-content">
                  <h4>{service.service_name}</h4>
                  <p>{service.description}</p>
                  <div className="service-meta">
                    <div className="meta-item">
                      <Clock size={16} /> <span>{service.duration}</span>
                    </div>
                    <div className="price-box">
                      <span className="currency">Rs</span>
                      <span className="amount">{service.price}</span>
                    </div>
                  </div>
                  {/* Updated Button */}
                  <button
                    className="btn-modern"
                    onClick={() => handleBookClick(service)}
                  >
                    Book Service <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;