import React, { useState } from 'react';
import '../../css/contact.css';
import API from '../../apiConfig';

const branches = [
  { name: 'Anna Nagar (HO)', address: 'Sri Sai Tower, 2nd & 3rd Floor, AI-101, 4th Avenue, Shanthi Colony, Anna Nagar, Chennai - 600040', phone: '+91 94442 27273' },
  { name: 'Trichy', address: 'Vignesh Plaza, 3rd Floor, Thillai Nagar Main Road, Trichy - 620018', phone: '+91 94442 27273' },
  { name: 'Madurai', address: 'No. 7, 1st Floor, Gokhale Road, Chokkikulam, Madurai - 625002', phone: '+91 94442 27273' },
  { name: 'Coimbatore', address: 'No. 123, 1st Floor, Arts College Road, Opp. Govt Arts College, Coimbatore - 641018', phone: '+91 94442 27273' },
  { name: 'Salem', address: 'No. 45, Near New Bus Stand, Rajaji Street, Salem - 636004', phone: '+91 94442 27273' },
  { name: 'Pondicherry', address: 'No. 12, Vallalar Salai, Near Venkata Subba Reddiar Square, Pondicherry - 605011', phone: '+91 94442 27273' }
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    branch: '',
    exam: '',
    qualification: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          course: formData.exam,
          city: formData.branch,
          message: `Qualification: ${formData.qualification}`,
          source: 'contact'
        })
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          mobile: '',
          branch: '',
          exam: '',
          qualification: ''
        });
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch With Us</h1>
          {/* <p>We're here to help you achieve your goals. Reach out to any of our centers or fill the form below.</p>
          <div className="hero-accent"></div> */}
        </div>
      </section>

      {/* Combined Form & Info Section */}
      <div className="contact-main-section">
        <div className="container">
          <div className="contact-content-grid">
            {/* Left Side - Form */}
            <div className="form-column">
              <div className="contact-form-section">
                <div className="form-wrapper">
                  <div className="form-header">
                    <h2>Request a Callback</h2>
                    <p>Fill the form and our team will contact you soon</p>
                  </div>

                  {submitted && (
                    <div className="success-message">
                      <i className="fa fa-check"></i> Thank you! We'll contact you shortly.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Full Name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="mobile">Mobile Number *</label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="branch">Branch Preferred *</label>
                        <select
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a Branch</option>
                          <option value="Chennai - Sri Sai Tower">Chennai - Sri Sai Tower</option>
                          <option value="Chennai - Kalam Tower">Chennai - Kalam Tower</option>
                          <option value="Trichy">Trichy</option>
                          <option value="Coimbatore">Coimbatore</option>
                          <option value="Madurai">Madurai</option>
                          <option value="Pondicherry">Pondicherry</option>
                          <option value="Namakkal">Namakkal</option>
                          <option value="Thanjavur">Thanjavur</option>
                          <option value="Salem">Salem</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="exam">I Wish to Appear For *</label>
                        <select
                          id="exam"
                          name="exam"
                          value={formData.exam}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Exam</option>
                          <option value="UPSC">UPSC Civil Services</option>
                          <option value="TNPSC">TNPSC Group I</option>
                          <option value="Banking">Banking Exams</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="qualification">Educational Qualification *</label>
                        <select
                          id="qualification"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Qualification</option>
                          <option value="12th Pass">12th Pass</option>
                          <option value="Bachelor's">Bachelor's Degree</option>
                          <option value="Master's">Master's Degree</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? 'Sending...' : 'Register & Get Callback'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="info-column">
              <div className="contact-info-section">
                <div className="info-grid-vertical">
                  <div className="info-card">
                    <div className="info-icon"><i className="fa fa-phone"></i></div>
                    <h3>Call Us</h3>
                    <p><a href="tel:+919444227273">+91 94442 27273 (UPSC)</a></p>
                    <p><a href="tel:+918608227273">+91 86082 27273 (Banking)</a></p>
                    <p><a href="tel:+919940567273">+91 99405 67273</a></p>
                  </div>
                  <div className="info-card">
                    <div className="info-icon"><i className="fa fa-envelope"></i></div>
                    <h3>Email Us</h3>
                    <p><a href="mailto:kingmakersiasacademy@gmail.com">kingmakersiasacademy@gmail.com</a></p>
                    <p>We'll respond within 24 hours</p>
                  </div>
                  {/* <div className="info-card">
                    <div className="info-icon">📍</div>
                    <h3>Visit Us</h3>
                    <p>Multiple centers across Tamil Nadu</p>
                    <p>Scroll below to find the nearest branch</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Branches Section */}
      <div className="branches-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Branches</h2>
            <p>Visit any of our centers across Tamil Nadu and more</p>
          </div>

          <div className="branches-grid">
            {branches.map((branch, index) => (
              <div key={index} className="branch-card">
                {/* <div className="branch-icon"><i className={`fa ${branch.icon}`}></i></div> */}
                <h3>{branch.name}</h3>
                <p className="branch-address">{branch.address}</p>
                {/* <div className="branch-actions">
                  <a href={`tel:${branch.phone}`} className="branch-phone">
                    <i className="fa fa-phone"></i> Call
                  </a>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};

export default ContactUs;