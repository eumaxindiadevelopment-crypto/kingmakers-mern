import React, { useState } from 'react';
import '../../css/contact.css';
import API from '../../apiConfig';

const branches = [

  { 
    name: 'Chennai - Sri Sai Tower', 
    address: '62, 6th Ave, P Block, Anna Nagar, Chennai, Tamil Nadu 600040, India', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d500659.8882578366!2d80.214381!3d13.092518000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52642383c81151%3A0x595634384c28fd05!2sKINGMAKERS%20IAS%20ACADEMY!5e1!3m2!1sen!2sus!4v1776682004662!5m2!1sen!2sus"
  },
    { 
    name: 'Chennai - Kalam Tower', 
    address: 'W-4, 5th Main Rd, Anna Nagar, Chennai, Tamil Nadu 600040', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d500668.3125788847!2d80.216929!3d13.088372!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52655a923f85f9%3A0x7074e85bb42f206c!2sKingMakers%20School%20of%20Banking!5e1!3m2!1sen!2sus!4v1776682178766!5m2!1sen!2sus"
  },
  { 
    name: 'Trichy', 
    address: 'No.8, Star Avenue, Old Karur Road, Mela Chinthamani, Trichy-620 003.', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d504855.43539601774!2d78.689521!3d10.836477!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf562f3766a4f%3A0xc9342095f49f4517!2sKingMakers%20IAS%20Academy%20-%20Trichy%20Branch!5e1!3m2!1sen!2sus!4v1776682324851!5m2!1sen!2sus"
  },
  { 
    name: 'Madurai', 
    address: 'Vikashni Building, Plot No 760, W Main Rd, Anna Nagar, Madurai-625020', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d506332.78824778955!2d78.141051!3d9.922457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c53994bcf501%3A0xc15e4a54b67d7f2c!2sKingMakers%20IAS%20Academy%20-%20Madurai%20Branch!5e1!3m2!1sen!2sus!4v1776683117605!5m2!1sen!2sus"
  },
  { 
    name: 'Coimbatore', 
    address: '308, Peranaidu layout (Nehru Street), Ram Nagar, Coimbatore - 641 009.', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d504550.4689675175!2d76.963941!3d11.01582!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859f11df25f01%3A0x6e876908ef4a3f9e!2sKingMakers%20IAS%20Academy%20-%20Coimbatore%20Branch!5e1!3m2!1sen!2sus!4v1776683186381!5m2!1sen!2sus"
  },
  { 
    name: 'Salem', 
    address: '2nd Floor, Shanthi Plaza,, 1/5, Brindhavan Road, Fairlands, Salem, Tamil Nadu 636004', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d503396.0356408236!2d78.143196!3d11.670079!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1d9a814bb4b%3A0x9bad72579e7c00f!2sKingMakers%20IAS%20Academy!5e1!3m2!1sen!2sus!4v1776683304173!5m2!1sen!2sus"
  },
  { 
    name: 'Pondicherry', 
    address: '1st Floor, Vasavi Mall, above KFC, Mothilal Nagar, Uzhavar Karai, Puducherry, 605009', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d502917.1501150725!2d79.78814!3d11.931095!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536100446eab0f%3A0x242a81ade1dd1b41!2sKingMakers%20IAS%20Academy!5e1!3m2!1sen!2sus!4v1776683244007!5m2!1sen!2sus"
  },
    { 
    name: 'Namakkal', 
    address: 'Paavai College of Education, Paavai Nagar, NH 44, Pachal, Tamil Nadu 637018, India', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d503858.4002673701!2d78.15883600000001!3d11.412485!3m2!1i1024!2i768!4f13.1!2m1!1sPaavai%20College%20of%20Education%2C%20Paavai%20Nagar%2C%20NH%2044%2C%20Pachal%2C%20Tamil%20Nadu%20637018!5e1!3m2!1sen!2sus!4v1776683525797!5m2!1sen!2sus"
  },
      { 
    name: 'Thanjavur', 
    address: 'GTM Complex, No. 11, 12, &13, Karupps Nagar Extension, Trichy Main Road, Thanjavur - 613005', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d505011.57270169497!2d79.109358!3d10.743512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baabf59142c433d%3A0x2e1472364bcdc22c!2sKINGMAKERS%20IAS%20ACADEMY!5e1!3m2!1sen!2sus!4v1776683620805!5m2!1sen!2sus"
  },
    { 
    name: 'New Delhi', 
    address: '11-B/8 First Floor, Tewari House, Pusa Road, New Delhi - 110005', 
    phone: '+91 94442 27273',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3524.343213343076!2d77.18189467521425!3d28.64334540076991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s11-B%2F8%20First%20Floor%2C%20Tewari%20House%2C%20Pusa%20Road%2C%20New%20Delhi%20-%20110005!5e1!3m2!1sen!2sin!4v1776684910388!5m2!1sen!2sin"
  },
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
        <div className="container-fluid px-lg-5">
          <div className="section-header">
            <h2>Our Coaching Centres</h2>
            <p>Find the nearest KingMakers IAS Academy branch and start your journey today</p>
          </div>

          <div className="branches-grid-fluid">
            {branches.map((branch, index) => (
              <div key={index} className="branch-card-fluid">
                <div className="branch-map-wrapper">
                  <iframe
                    src={branch.mapUrl}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${branch.name} Location Map`}
                  ></iframe>
                </div>
                <div className="branch-card-content">
                  <h3>{branch.name}</h3>
                  <div className="branch-address-box">
                    <i className="fa fa-map-marker-alt"></i>
                    <p className="branch-address-text">{branch.address}</p>
                  </div>
                  <div className="branch-cta-footer">
                    <a href={`tel:${branch.phone}`} className="branch-call-btn">
                      <i className="fa fa-phone"></i> {branch.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};

export default ContactUs;