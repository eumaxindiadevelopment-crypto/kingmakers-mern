import React, { useState, useEffect } from 'react';
import EnquiryForm from '../forms/EnquiryForm';
import '../../css/locationPage.css';
import Achievers from '../home/Achievers';
import LocationsSection from '../home/LocationsSection';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TrichyIasPage = () => {

  const location = {
    name: "Trichy",
    city: "Trichy",
    address: "Trichy Branch, Tamil Nadu",
    phone: "+91 94442 27273"
  }
  // ✅ ALL hooks at the top - no exceptions
  const [dbCourses, setDbCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/api/courses?type=UPSC`);
        const data = await res.json();
        const published = Array.isArray(data) ? data.filter(c => c.isPublished) : [];
        setDbCourses(published);
      } catch (err) {
        console.error('Error fetching UPSC courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Best IAS Academy in Trichy | Kingmakers IAS Academy`;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const whyChooseUs = [
    {
      icon: '👨‍🏫',
      title: 'Learn from IAS & Civil Service Officers',
      desc: 'Get mentored by serving and retired IAS, IPS, and IRS officers who bring real-world administrative insights into your preparation. Their guidance helps you understand the exam beyond textbooks and develop the mindset needed to become a civil servant.'
    },
    {
      icon: '📖',
      title: 'Comprehensive & Structured UPSC Preparation',
      desc: 'Our program covers the entire UPSC syllabus including Prelims, Mains, and Interview in a well-structured format. Each subject is taught with conceptual clarity, making it easier for aspirants to retain and apply knowledge effectively.'
    },
    {
      icon: '📈',
      title: 'Proven 5-Phase Preparation Strategy',
      desc: 'KingMakers follows a scientifically designed 5-phase approach that ensures step-by-step mastery of the UPSC exam. From foundation building to final interview preparation, every stage is strategically planned for maximum results.'
    },
    {
      icon: '📊',
      title: 'Extensive Test Series & Performance Tracking',
      desc: 'Practice is key to success in UPSC. Our program includes thousands of MCQs, answer writing sessions, and full-length mock tests with detailed performance analysis to help you improve consistently.'
    },
    {
      icon: '🤝',
      title: 'Personalized Mentorship & Doubt Clearing',
      desc: 'Every aspirant receives individual attention through mentorship programs, regular feedback sessions, and dedicated doubt-clearing classes. This ensures no student is left behind in their preparation journey.'
    },
    {
      icon: '💻',
      title: 'Flexible Learning – Online & Offline',
      desc: `Whether you prefer classroom learning in ${location.city} or online preparation from anywhere, KingMakers offers flexible learning modes. Our online platform provides live classes, recorded sessions, and continuous mentor support.`
    }
  ];

  const upscPhases = [
    {
      step: 'Phase 1',
      title: 'Foundation & Core Preparation',
      desc: 'The foundation program builds strong basics through NCERT coverage and introduces aspirants to the structure of Indian civil services. This phase focuses on conceptual clarity and creates a solid base for advanced UPSC preparation.'
    },
    {
      step: 'Phase 2',
      title: 'General Studies & Optional Mastery',
      desc: 'This phase covers the complete General Studies syllabus for both Prelims and Mains along with CSAT. Aspirants are guided to choose the right optional subject, which is covered in detail. Daily and weekly tests with individual assessments help track and improve performance consistently.'
    },
    {
      step: 'Phase 3',
      title: 'Prelims Strategic Learning Program (PSLP)',
      desc: 'A focused crash course designed for Prelims success, this phase emphasizes rigorous test practice and revision. Aspirants solve around 10,000 MCQs, ensuring strong accuracy, speed, and exam readiness through continuous evaluation.'
    },
    {
      step: 'Phase 4',
      title: 'Mains Strategic Learning Program (MSLP)',
      desc: 'This phase concentrates on answer writing and analytical skills required for Mains. Through intensive test series and structured writing practice, aspirants develop the ability to present high-quality answers effectively.'
    },
    {
      step: 'Phase 5',
      title: 'Personality Test Program (PTP)',
      desc: 'The final stage prepares aspirants for the UPSC interview with mock sessions conducted by experienced bureaucrats. This phase enhances confidence, communication, and personality, ensuring aspirants are fully prepared for the final selection stage.'
    },
    {
      step: 'Next Step',
      title: 'Start Your Journey Today',
      desc: `Ready to join the best IAS coaching in ${location.city}? Book a free counseling session and take the first step toward a prestigious career in civil services.`,
      isCta: true
    }
  ];

  const featuresList = [
    'IAS training by serving & retired civil service officers',
    'Comprehensive syllabus coverage (Prelims + Mains + Interview)',
    '10,000+ practice questions and mock tests',
    'Personalized mentorship & performance tracking',
    'Daily current affairs and editorial discussions',
    'Intensive answer writing practice sessions',
    'Online & offline learning options',
    'Dedicated doubt-clearing sessions'
  ];

  const facilitiesList = [
    { text: 'Smart classrooms with modern infrastructure', image: '/images/facilities/smart_classroom.png' },
    { text: 'Library & dedicated study spaces', image: '/images/facilities/library.png' },
    { text: 'Digital learning support (app/email access)', image: '/images/facilities/digital_learning.png' },
    { text: 'Interactive live sessions for online students', image: '/images/facilities/live_sessions.png' },
    { text: 'Regular motivational sessions by bureaucrats', image: '/images/facilities/mentor_sessions.png' },
  ];

  const maxSlide = facilitiesList.length - itemsPerView;

  const [activeIndex, setActiveIndex] = useState(0);

  const faqItems = [
    {
      question: "Which is the best IAS coaching centre in Trichy?",
      answer: "KingMakers IAS Academy is considered one of the best IAS coaching centres in Trichy due to its mentorship by civil servants, structured preparation strategy, and consistent results."
    },
    {
      question: "What makes a good IAS coaching institute?",
      answer: "A good IAS coaching institute provides experienced faculty, comprehensive study material, regular mock tests, and personalized mentorship, qualities that define KingMakers IAS Academy."
    },
    {
      question: "Is UPSC online coaching effective?",
      answer: "Yes, UPSC online coaching is highly effective when it includes live interactive sessions, structured study plans, and mentorship support like the programs offered by KingMakers."
    },
    {
      question: "Which is the best coaching for UPSC preparation?",
      answer: "The best coaching for UPSC is one that combines expert guidance, test series, answer writing practice, and interview training, making KingMakers a top choice."
    },
    {
      question: "What is the best online coaching for UPSC?",
      answer: "The best online coaching for UPSC includes live classes, doubt clearing, and mentorship, all of which are available in KingMakers’ online programs."
    },
    {
      question: "How to choose a UPSC coaching centre?",
      answer: "Choose a UPSC coaching centre based on faculty experience, success rate, course structure, and mentorship support. KingMakers excels in all these aspects."
    },
    {
      question: "Why join a KingMakers IAS Academy UPSC coaching institute?",
      answer: "Joining a KingMakers IAS Academy UPSC coaching institute helps aspirants get structured guidance, expert mentorship, and consistent evaluation, increasing their chances of success significantly."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  return (
    <div className="location-page">

      {/* Hero Section */}
      <section className="location-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12">
              <div className="location-hero-content" style={{ textAlign: 'left', paddingRight: '40px' }}>
                <h1 style={{ fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.2, margin: '15px 0 25px 0', color: '#fff' }}>
                  Best IAS Coaching Centre in {location.name}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginBottom: '25px' }}>
                  Searching for the best IAS coaching centre in {location.city}? Join KingMakers IAS academy powered with
                  experienced faculty, comprehensive study material, regular mock tests, and personalized mentorship.
                  We trained and helped the 10,000+ aspirants to become prestigious civil service officers. Our top UPSC
                  coaching institute in {location.city} follows the five-phased preparation strategy to make the aspirant
                  attain the All India Rank. Apart from comprehensive teaching, our answer writing sessions and mock up
                  interviews can help the IAS candidates to crack the exam. Let's become part of the KingMakers IAS
                  academy and experience the best coaching for UPSC exam.
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 mt-5 mt-lg-0">
              <div className="hero-form-container">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="location-intro">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="location-section-head">
            <h2>Why Choose KingMakers IAS Academy in {location.city}?</h2>
            <p className="location-section-subtitle">
              A trusted IAS coaching institute in {location.city} offering the best online coaching for UPSC exam with proven success strategies.
            </p>
          </div>
          <div className="location-intro-grid">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="location-intro-card">
                <div className="location-intro-icon-wrap">
                  <span className="location-intro-icon">{item.icon}</span>
                  <span className="location-intro-number">0{idx + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Phase UPSC Strategy Section */}
      <section className="location-phases-section">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="location-section-head text-white">
            <h2 style={{ color: 'white' }}>Our 5-Phase UPSC Preparation Strategy</h2>
            <p className="location-section-subtitle text-white-50" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              A scientifically designed approach by a top UPSC coaching institute in {location.city} to crack the exam in the first attempt.
            </p>
          </div>
          <div className="phases-grid">
            {upscPhases.map((phase, idx) => (
              <div key={idx} className={`phase-card ${phase.isCta ? 'phase-cta-card' : ''}`}>
                <div className="phase-badge" style={phase.isCta ? { background: '#043053', color: 'white' } : {}}>
                  {phase.step}
                </div>
                <h3>{phase.title}</h3>
                <p>{phase.desc}</p>
                {phase.isCta && (
                  <button
                    className="phase-cta-btn"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Book Free Counseling
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Features Section */}
      <section className="location-features-section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="location-section-head">
            <h2>Features of KingMakers UPSC Program</h2>
            <p className="location-section-subtitle">
              Our Top-rated UPSC coaching centre with result-oriented training distinguished from other centres because of the following features:
            </p>
          </div>
          <div className="features-check-grid">
            {featuresList.map((feature, idx) => (
              <div key={idx} className="feature-check-item">
                <span className="check-icon">✓</span>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Facilities Section */}
      <section className="location-facilities-section dark-bg">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="location-section-head">
            <h2 style={{ color: 'white' }}>Our Facilities</h2>
            <p className="location-section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Here are the facilities for the students convenience in our best IAS coaching centre in {location.city}.
            </p>
          </div>

          <div className="facilities-carousel-container">
            <button className="carousel-nav-btn prev" onClick={prevSlide}>❮</button>
            <div className="facilities-slider-viewport">
              <div
                className="facilities-slider-track"
                style={{
                  transform: `translateX(-${currentSlide * (100 / facilitiesList.length)}%)`,
                  width: `${(facilitiesList.length / itemsPerView) * 100}%`
                }}
              >
                {facilitiesList.map((item, idx) => (
                  <div
                    key={idx}
                    className="facility-slide-item"
                    style={{ flex: `0 0 ${100 / facilitiesList.length}%` }}
                  >
                    <div className="facility-card-modern glass-card shadow-sm">
                      <div className="facility-image-wrapper">
                        <img src={item.image} alt={item.text} />
                      </div>
                      <div className="facility-card-body">
                        <h4 style={{ color: '#043053' }}>{item.text}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-nav-btn next" onClick={nextSlide}>❯</button>
          </div>

          <div className="carousel-dots">
            {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
              <span
                key={idx}
                className={`dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Programs & Courses Section */}
      <section className="upsc-programs">
        <div className="container-upsc">
          <h2>Our UPSC Programs</h2>
          <div className="programs-grid">
            {loading ? (
              <div className="text-center py-5">Loading courses...</div>
            ) : dbCourses.length === 0 ? (
              <div className="text-center py-5">No courses available at the moment.</div>
            ) : (
              dbCourses.map((program) => (
                <div key={program._id} className="program-card">
                  <div className="program-header">
                    <h3>{program.name}</h3>
                  </div>
                  <p className="program-description">{program.description}</p>
                  <div className="program-details">
                    <div className="detail-item">
                      <span className="detail-label">Year / Duration:</span>
                      <span className="detail-value">{program.year}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Fee:</span>
                      <span className="price">{program.fee}</span>
                    </div>
                  </div>
                  <div className="program-actions">
                    {program.schedulePdf && (
                      <a
                        href={program.schedulePdf}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-schedule"
                        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        View Schedule
                      </a>
                    )}
                    <button className="btn-enroll">Pay Now</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Batches Section */}
      <section className="batches-section">
        <div className="container-upsc">
          <div className="section-head">
            <span className="section-tag">Batches</span>
            <h2>Upcoming Batches in Our Best UPSC Academy in {location.city}</h2>
            <p className="section-subtitle">Register early to secure your seat in our upcoming batches.</p>
          </div>
          <div className="batches-table-wrap">
            <table className="batches-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Start Date</th>
                  <th>Mode / Regular or Weekend</th>
                  <th>Batch / Timing</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" className="text-center">Loading...</td></tr>
                ) : dbCourses.length === 0 ? (
                  <tr><td colSpan="4" className="text-center">No upcoming batches announced.</td></tr>
                ) : (
                  dbCourses.map((batch) => (
                    <tr key={batch._id}>
                      <td className="batch-course">{batch.name}</td>
                      <td><span className="batch-date-badge">{batch.startDate}</span></td>
                      <td>{batch.mode}</td>
                      <td>{batch.batch}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>



      {/* CTA Banner Section */}
      <section className="location-cta-banner">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h2>Start Your UPSC Preparation Today</h2>
              <p>
                Begin your journey with a trusted <strong>IAS coaching centre</strong> that has transformed thousands
                of aspirants into successful civil servants. As a leading <strong>UPSC coaching institute</strong>,
                KingMakers provides the right mentorship, strategy, and resources to help you achieve your dream.
                Whether you are a beginner or a repeat aspirant, our structured programs ensure clarity, confidence,
                and consistent progress toward success.
              </p>
              <div className="cta-banner-actions">
                <a href="https://kingmakersiasacademy.com/upsc-course/" className="cta-enroll-btn">
                  Enroll Now & Start Your IAS Journey
                  <i className="fa fa-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievers Section */}
      <Achievers />


      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="container">
          {/* Header */}
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our IAS coaching in {location.city}.</p>
          </div>

          <div className="faq-columns-grid">
            <div className="faq-column">
              {faqItems.slice(0, 3).map((faq, i) => {
                const globalIdx = i;
                return (
                  <div
                    className={`faq-item ${activeIndex === globalIdx ? 'faq-item--active' : ''}`}
                    key={globalIdx}
                  >
                    <button
                      className="faq-question"
                      onClick={() => setActiveIndex(activeIndex === globalIdx ? -1 : globalIdx)}
                      aria-expanded={activeIndex === globalIdx}
                    >
                      <div className="faq-q-left">
                        <span>{faq.question}</span>
                      </div>
                      <span className={`faq-chevron ${activeIndex === globalIdx ? 'faq-chevron--open' : ''}`}>
                        ›
                      </span>
                    </button>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="faq-column">
              {faqItems.slice(3).map((faq, i) => {
                const globalIdx = i + 3;
                return (
                  <div
                    className={`faq-item ${activeIndex === globalIdx ? 'faq-item--active' : ''}`}
                    key={globalIdx}
                  >
                    <button
                      className="faq-question"
                      onClick={() => setActiveIndex(activeIndex === globalIdx ? -1 : globalIdx)}
                      aria-expanded={activeIndex === globalIdx}
                    >
                      <div className="faq-q-left">
                        <span>{faq.question}</span>
                      </div>
                      <span className={`faq-chevron ${activeIndex === globalIdx ? 'faq-chevron--open' : ''}`}>
                        ›
                      </span>
                    </button>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

     {/* <section className='contact-map-section floating-card-layout'>
        <div className="full-width-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.73030365737!2d78.6826012!3d10.8319693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ff2dfbc5d%3A0x6339896a5382216e!2sKingMakers%20IAS%20Academy!5e0!3m2!1sen!2sin!4v1712585400000!5m2!1sen!2sin" 
            width="100%" 
            height="650" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="KingMakers IAS Academy Trichy Map"
          ></iframe>
        </div>
        
        <div className="container floating-card-container">
          <div className="floating-contact-card">
            <h2 className="contact-title">Contact Trichy Branch</h2>
            
            <div className="contact-item">
              <div className="contact-icon-circle">
                <i className="fa fa-phone"></i>
              </div>
              <div className="contact-text">
                <p className="label">Call Us</p>
                <p className="value">+91-9444224422</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon-circle">
                <i className="fa fa-envelope"></i>
              </div>
              <div className="contact-text">
                <p className="label">Email Address</p>
                <p className="value">info@kingmakersiasacademy.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon-circle">
                <i className="fa fa-map-marker"></i>
              </div>
              <div className="contact-text">
                <p className="label">Visit Branch</p>
                <p className="value">123, Main Street, Trichy</p>
              </div>
            </div>
          </div>
        </div>
     </section> */}

     <LocationsSection />      
    </div>
  );
};

export default TrichyIasPage;