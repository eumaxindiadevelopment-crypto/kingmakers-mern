import { useState } from 'react';
import './UpscForm.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const UpscForm = () => {
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
          source: 'upsc'
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
      <div className="upsc-registration-form success-state">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Registration Successful!</h3>
          <p>Thank you for choosing KingMakers IAS Academy. Our experts will contact you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="upsc-registration-form">
      <div className="form-header">
        <h3>UPSC Registration Form</h3>
        <p>Expert guidance for your IAS journey starts here.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="tel" name="mobile" placeholder="10-digit mobile number" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" title="Please enter a 10-digit mobile number" required />
          </div>
        </div>

        <div className="form-group">
          <select name="exam" value={formData.exam} onChange={handleChange} required>
            <option value="" disabled>Select UPSC Program</option>
            <option value="UPSC Intensive (1 Year)">UPSC Intensive (1 Year)</option>
            <option value="UPSC Integrated (2 Years)">UPSC Integrated (2 Years)</option>
            <option value="UPSC Integrated (3 Years)">UPSC Integrated (3 Years)</option>
            <option value="UPSC Integrated (4 Years)">UPSC Integrated (4 Years)</option>
            <option value="UPSC Integrated (5 Years)">UPSC Integrated (5 Years)</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <select name="branch" value={formData.branch} onChange={handleChange} required>
              <option value="" disabled>Select Branch</option>
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
              <option value="" disabled>Select Qualification</option>
              <option value="+2 Completed">+2 Completed</option>
              <option value="UG Completed">UG Completed</option>
              <option value="PG Pursuing">PG Pursuing</option>
              <option value="PG Completed">PG Completed</option>
            </select>
          </div>
        </div>

        <button type="submit" className="upsc-form-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
};

export default UpscForm;