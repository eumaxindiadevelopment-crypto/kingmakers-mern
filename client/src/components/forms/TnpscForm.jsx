import { useState } from 'react';
import './TnpscForm.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TnpscForm = () => {
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
          source: 'tnpsc'
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
      <div className="tnpsc-registration-form-v2 success-state">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Registration Successful!</h3>
          <p>Thank you for choosing KingMakers IAS Academy. Our experts will contact you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tnpsc-registration-form-v2">
      <div className="form-header">
        <h3>TNPSC Registration Form</h3>
        <p>Your gateway to Tamil Nadu Government Services starts here.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
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
            <option value="" disabled>I Wish to Appear For *</option>
            <option value="TNPSC Gr-I Prelims cum Mains">TNPSC Gr-I Prelims cum Mains</option>
            <option value="TNPSC Gr-II/ IIA Prelims cum Mains">TNPSC Gr-II/ IIA Prelims cum Mains</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <select name="branch" value={formData.branch} onChange={handleChange} required>
              <option value="" disabled>Branch Opted *</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Salem">Salem</option>
              <option value="Namakkal">Namakkal</option>
              <option value="Pondicherry">Pondicherry</option>
              <option value="Thanjavur">Thanjavur</option>
            </select>
          </div>
          <div className="form-group">
            <select name="qualification" value={formData.qualification} onChange={handleChange} required>
              <option value="" disabled>Qualification *</option>
              <option value="+2 Completed">+2 Completed</option>
              <option value="UG Completed">UG Completed</option>
              <option value="PG Pursuing">PG Pursuing</option>
              <option value="PG Completed">PG Completed</option>
            </select>
          </div>
        </div>

        <button type="submit" className="tnpsc-form-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
};

export default TnpscForm;
