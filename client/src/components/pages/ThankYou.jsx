import React from 'react';
import '../../css/thank-you.css';

const ThankYou = () => {
  return (
    <div className="thank-you-layout">

      {/* Hero Section */}
      <section className="thank-you-hero">
        <div className="thank-you-hero-content">
          <h1>Thank You!</h1>
          <p>We appreciate your interest in Kingmakers IAS Academy</p>
          <div className="hero-accent"></div>
        </div>
      </section>

      {/* Thank You Content */}
      <main className="thank-you-content">
        <div className="container">
          <section className="thank-you-message">
            <div className="success-icon">✓</div>
            <h2>Your Form Has Been Submitted Successfully</h2>
            <p className="main-message">
              Thank you for reaching out to us! We have received your inquiry and appreciate your interest in Kingmakers IAS Academy.
            </p>
            
            <div className="confirmation-details">
              <p>
                Our team will review your information and get back to you shortly with further details about our courses and opportunities. 
                We are excited to help you on your journey to crack the civil services examinations.
              </p>
            </div>

            <div className="next-steps">
              <h3>What Happens Next?</h3>
              <ul className="steps-list">
                <li>
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Confirmation Email</h4>
                    <p>Check your email for a confirmation message from our team within 24 hours.</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Course Details</h4>
                    <p>You'll receive detailed information about courses matching your requirements.</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Schedule a Call</h4>
                    <p>Our counselors will call you to discuss your goals and enroll you in the best program.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="contact-info">
              <h3>Need Immediate Assistance?</h3>
              <p>Feel free to reach out to us directly:</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-label">📞 Call Us:</span>
                  <a href="tel:+919444227273">+91 94442 27273</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">📧 Email:</span>
                  <a href="mailto:kingmakersiasacademy@gmail.com">kingmakersiasacademy@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <h3>Continue Exploring</h3>
              <div className="cta-buttons">
                <a href="/" className="cta-btn primary">🏠 Back to Home</a>
                <a href="/upsc" className="cta-btn secondary">📚 Explore UPSC Courses</a>
                <a href="/tnpsc" className="cta-btn secondary">🎓 Explore TNPSC Courses</a>
                <a href="/faq" className="cta-btn secondary">❓ Browse FAQs</a>
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};

export default ThankYou;
