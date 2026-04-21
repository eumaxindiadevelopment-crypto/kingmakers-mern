import { useState, useEffect, Fragment } from 'react';
import '../../css/upsc-courses.css';
import UpscForm from '../forms/UpscForm';

import API from '../../apiConfig';

const UPSC = () => {
  const [dbCourses, setDbCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/api/courses?category=UPSC`);
        const data = await res.json();
        const published = Array.isArray(data) ? data.filter(c => c.status === 'Published') : [];
        setDbCourses(published);
      } catch (err) {
        console.error('Error fetching UPSC courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const phases = [
    {
      id: 1,
      name: 'Foundation Program',
      duration: '2 Months',
      description: 'Impart fundamental knowledge of Indian civil services and complete NCERT syllabus coverage'
    },
    {
      id: 2,
      name: 'General Studies - CSAT + Prelims + Mains',
      duration: '8 Months',
      description: 'Coverage of CSAT and complete GS syllabus with daily/weekly tests and individual assessment'
    },
    {
      id: 3,
      name: 'Prelims Strategic Learning Program (PSLP)',
      duration: '3 Months',
      description: 'Crash course with rigorous testing - 10,000+ MCQs practice before Prelims exam'
    },
    {
      id: 4,
      name: 'Mains Strategic Learning Program (MSLP)',
      duration: '3 Months',
      description: 'Intensive mains preparation with exhaustive writing practice and test series'
    },
    {
      id: 5,
      name: 'Personality Test Program (PTP)',
      duration: '2 Months',
      description: 'Mock interviews with 50+ bureaucrats - simulate real interview experience'
    }
  ];

  const eligibility = [
    {
      category: 'General Category',
      minAge: '21 Years',
      maxAge: '32 Years',
      attempts: '6 Attempts',
      icon: 'fa-user'
    },
    {
      category: 'OBC Category',
      minAge: '21 Years',
      maxAge: '35 Years',
      attempts: '9 Attempts',
      icon: 'fa-users'
    },
    {
      category: 'SC/ST Category',
      minAge: '21 Years',
      maxAge: '37 Years',
      attempts: 'No Limit',
      icon: 'fa-globe-asia'
    },
    {
      category: 'PwD Category',
      minAge: '21 Years',
      maxAge: '42 Years',
      attempts: 'Varies',
      icon: 'fa-wheelchair'
    }
  ];

  const examSchedule = [
    { event: 'Preliminary Examination', timing: 'May / June' },
    { event: 'Prelims Results', timing: 'July / August' },
    { event: 'Mains Examinations', timing: 'September / October' },
    { event: 'Mains Results', timing: 'February 1st-2nd Week' },
    { event: 'Interview', timing: 'March - April' },
    { event: 'Final Results', timing: 'May' }
  ];

  const features = [
    {
      icon: 'fa-check-circle',
      title: 'Comprehensive Testing',
      description: 'Full test series with individual follow-up and performance tracking'
    },
    {
      icon: 'fa-chalkboard-teacher',
      title: 'Expert Faculty',
      description: 'Learn from experienced IAS, IPS, and other civil service officers'
    },
    {
      icon: 'fa-bullseye',
      title: 'Proven Strategy',
      description: 'Scientific approach to syllabus coverage and exam preparation'
    },
    {
      icon: 'fa-chart-line',
      title: 'Individual Assessment',
      description: 'Periodic assessment and personalized feedback for improvement'
    },
    {
      icon: 'fa-globe',
      title: 'Flexible Learning',
      description: 'Online, Offline, Regular, and Weekend options available'
    },
    {
      icon: 'fa-trophy',
      title: 'Success Proven',
      description: '1000+ civil officers and 3000+ government servants produced'
    }
  ];

  return (
    <div className="upsc-page">
      {/* Hero Section */}
      <section className="upsc-hero">
        <div className="container-upsc">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="reg-text">
                <h2>The New Beginning to Success</h2>
                <p>KingMakers UPSC program is the most comprehensive and holistic course designed for students who wish to make a career in Civil Services Examination. Our scientific and proven approach towards framing of course schedule, testing modules and periodic individual assessment covers each aspect of IAS exam preparation that is needed for an aspirant to clear the exam in 1st attempt.</p>
                <div className="reg-features">
                   {/* <div className="reg-feature">
                      <span className="feat-icon"><i className="fa fa-bolt"></i></span>
                      <span>Intensive & Integrated Programs</span>
                   </div>
                   <div className="reg-feature">
                      <span className="feat-icon"><i className="fa fa-user-tie"></i></span>
                      <span>Learn from Serving Officers</span>
                   </div> */}
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="reg-form-container">
                <UpscForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="upsc-overview">
        <div className="container-upsc">
          <h2>Why Choose KingMakers for UPSC?</h2>
          <p className="overview-text">
            KingMakers UPSC program is the most comprehensive and holistic course designed for students who wish to make 
            a career in Civil Services Examination. Our scientific and proven approach towards framing of course schedule, 
            testing modules and periodic individual assessment covers each aspect of IAS exam preparation needed to clear the exam in 1st attempt.
          </p>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <span className="feature-icon"><i className={`fa ${feature.icon}`}></i></span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure Section */}
      <section className="program-structure">
        <div className="container-upsc">
          <h2>5-Phase Program Structure</h2>
          <div className="phases-container">
            {phases.map((phase) => (
              <div key={phase.id} className="phase-card">
                <div className="phase-number">{phase.id}</div>
                <h3>{phase.name}</h3>
                <p className="duration">Duration: {phase.duration}</p>
                <p className="description">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs & Courses Section */}
      {/* 
      <section className="upsc-programs">
        <div className="container-upsc">
          <h2>Our UPSC Programs</h2>
        
          <div className="programs-grid">
            {loading ? (
              <div className="text-center py-5">Loading courses...</div>
            ) : dbCourses.length === 0 ? (
              <div className="text-center py-5">No courses available at the moment.</div>
            ) : dbCourses.map((program) => (
              <div key={program._id} className="program-card">
                <div className="program-header">
                    <h3>{program.title}</h3>
                </div>
               
                <p className="program-description">{program.description}</p>

                <div className="program-details">
                  <div className="detail-item">
                    <span className="detail-label">Year / Duration:</span>
                    <span className="detail-value">{program.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Fee:</span>
                    <span className="price">₹{program.fees?.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="program-actions">
                  {program.schedulePdf && (
                    <a href={program.schedulePdf} target="_blank" rel="noreferrer" className="btn-schedule" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      View Schedule
                    </a>
                  )}
                  <button className="btn-enroll">Pay Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Main Heading for Batches */}
      <section className="batches-header-section" style={{ padding: '4rem 0 1rem' }}>
        <div className="container-upsc">
          <div className="section-head" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            {/* <span className="section-tag" style={{ margin: '0 auto 1rem' }}>Batches</span> */}
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Upcoming Batches in Our Best UPSC Academy in Chennai</h2>
            <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>Find the perfect batch for your UPSC preparation from our diverse course offerings.</p>
          </div>
        </div>
      </section>

      {/* Dynamic Course-wise Batch Sections */}
      {dbCourses.filter(c => c.upcomingBatches?.length > 0).map((course) => (
        <section className="batches-section" key={course._id} style={{ padding: '2rem 0 4rem' }}>
          <div className="container-upsc">
            <div className="course-batch-heading" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '10px' }}>{course.title}</h3>
              {/* <p style={{ color: '#0a5a8f', fontWeight: '600', fontSize: '1.1rem' }}>Comprehensive Program Batch Schedule</p> */}
            </div>
            
            <div className="batches-table-wrap">
              <table className="batches-table">
                <thead>
                  <tr>
                    <th>Batch</th>
                    <th>Regular/Weekend</th>
                    <th>Starts on</th>
                    <th>Fee (Incl. GST)</th>
                    <th className="text-center" style={{ width: '320px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(course.upcomingBatches || []).map((batch, idx) => (
                    <tr key={`${course._id}-${idx}`}>
                      <td className="batch-course">{batch.batchName}</td>
                      <td>{batch.mode}</td>
                      <td><span className="batch-date-badge">{batch.startDate}</span></td>
                      <td>Rs. {batch.fees?.toLocaleString('en-IN')}/-</td>
                      <td className="text-center">
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button 
                            className="btn-enroll" 
                            style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', flex: 'none', width: 'auto' }} 
                            onClick={() => batch.paymentLink && (window.location.href = batch.paymentLink)}
                          >
                            Pay Here
                          </button>
                          {batch.showSchedule && (
                            <button 
                              className="btn-enroll" 
                              style={{ 
                                padding: '0.4rem 1rem', 
                                fontSize: '0.8rem', 
                                background: '#e5e7eb', 
                                color: '#374151', 
                                whiteSpace: 'nowrap',
                                border: '1px solid #d1d5db',
                                flex: 'none',
                                width: 'auto'
                              }} 
                              onClick={() => window.open(batch.schedulePdf || course.schedulePdf, '_blank')}
                            >
                              Schedule View
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {dbCourses.filter(c => c.upcomingBatches?.length > 0).length === 0 && !loading && (
        <section className="batches-section">
          <div className="container-upsc text-center py-5">
            <p className="no-batches-msg">No upcoming batches announced at the moment. Please contact us for more information.</p>
          </div>
        </section>
      )}

      {/* Eligibility Section */}
      {/* <section className="upsc-eligibility">
        <div className="container-upsc">
          <h2>Eligibility Criteria</h2>
          <div className="eligibility-grid">
            {eligibility.map((item, idx) => (
              <div key={idx} className="eligibility-card">
                <span className="eligibility-icon-fa"><i className={`fa ${item.icon}`}></i></span>
                <h3>{item.category}</h3>
                <div className="eligibility-info">
                  <div className="info-item">
                    <strong>Min Age:</strong>
                    <p>{item.minAge}</p>
                  </div>
                  <div className="info-item">
                    <strong>Max Age:</strong>
                    <p>{item.maxAge}</p>
                  </div>
                  <div className="info-item">
                    <strong>Attempts:</strong>
                    <p>{item.attempts}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>  */}

      {/* Exam Schedule Section */}
      {/* <section className="exam-schedule">
        <div className="container-upsc">
          <h2>UPSC Civil Services Exam Schedule</h2>
          <div className="schedule-grid">
            {examSchedule.map((item, idx) => (
              <div key={idx} className="schedule-item">
                <div className="schedule-number">{idx + 1}</div>
                <div className="schedule-content">
                  <h4>{item.event}</h4>
                  <p>{item.timing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>  */}

    </div>
  );
};

export default UPSC;
