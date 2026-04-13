import { useState } from 'react';
import './EnquiryForm.css';

import API from '../../apiConfig';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', exam: '', branch: '', qualification: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
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
        setFormData({ name: '', email: '', mobile: '', exam: '', branch: '', qualification: '' });
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="enquiry-form-container success">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h3>Thank You!</h3>
          <p>Your enquiry has been received. Our counselors will contact you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="enquiry-form-container">
      <div className="form-header">
        <h3>Register &amp; Get a Call Back</h3>
        <p>Guidance for your IAS journey starts here.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="enquiry-form">
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="tel" name="mobile" placeholder="Mobile Number *" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" title="Please enter a 10-digit mobile number" required />
          </div>
        </div>

        <div className="form-group">
          <select name="exam" value={formData.exam} onChange={handleChange} required>
            <option value="" disabled>I wish to appear for *</option>
            <option value="UPSC Civil Services">UPSC Civil Services</option>
            <option value="TNPSC Group I / II">TNPSC Group I / II</option>
            <option value="Banking / SSC">Banking / SSC</option>
            <option value="Foundation Course">Foundation Course (NCERT)</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <select name="branch" value={formData.branch} onChange={handleChange} required>
              <option value="" disabled>Branch *</option>
              <option value="Chennai - Anna Nagar">Chennai - Anna Nagar</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Salem">Salem</option>
              <option value="Pondicherry">Pondicherry</option>
            </select>
          </div>
          <div className="form-group">
            <select name="qualification" value={formData.qualification} onChange={handleChange} required>
              <option value="" disabled>Qualification *</option>
              <option value="+2 completed">+2 completed</option>
              <option value="UG Pursuing">UG Pursuing</option>
              <option value="UG completed">UG completed</option>
              <option value="PG Pursuing">PG Pursuing</option>
              <option value="PG completed">PG completed</option>
            </select>
          </div>
        </div>

        <button type="submit" className="enquiry-submit-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
