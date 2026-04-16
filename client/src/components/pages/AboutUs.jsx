import EnquiryForm from '../forms/EnquiryForm';
import '../../css/about-us.css';

const AboutUs = () => {
  const directors = [
    {
      id: 1,
      name: 'Boominathan M.',
      designation: 'Director',
      credentials: 'Master\'s in Economics, Pursuing Doctorate',
      description: 'What makes KingMakers IAS Academy the best in IAS coaching is our successful track record of nurturing dreams of 1000+ aspirants like you into the reality of becoming IAS within a span of 13 years. We are proud to be one of our kind having shown a deep commitment to the best interests of every aspirant associated with us in their journey towards becoming a civil servant. The distinctive feature of our academy lies in the mode of training offered to the candidates.',
      image: '/images/directors/Boominathan.webp'
    },
    {
      id: 2,
      name: 'Prof., Dr., S. Sathyashree Boominathan',
      designation: 'Director',
      credentials: 'Psychologist & Life Coach',
      description: 'Our strong team of mentors including 13 retired civil ser- vants (6 IAS, 6 IRS and 1 IRAS) is committed to offer 360° training, mentoring and external motivation to every aspirant entering the portals of the KingMakers IAS Academy with the vision of cracking India most competitive & prestigious Civil Services Examination. The sole mission that joins us together is the love for our nation and the inherent responsibility in contributing to its growth by fostering the future civil servants of the nation.',
      image: '/images/directors/ProfileN.webp'
    },
    {
      id: 3,
      name: 'Anand Sahu',
      designation: 'Honorary Director',
      credentials: 'Ministry of Labour and Employment, Government of India',
      description: 'Ministry of Labour and Employment, Government of India Member: Minimum Wages Advisory Board · New Delhi, India',
      image: '/images/directors/anand_sahu.webp'
    }
  ];

  const stats = [
    { number: '2013', label: 'Established' },
    { number: '1000+', label: 'Civil Officers Produced' },
    { number: '3000+', label: 'Government Servants' },
    { number: '7', label: 'Centers Across India' }
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Us</h1>
          {/* <p>Mentoring Future Bureaucrats</p>
          <div className="hero-accent"></div> */}
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="stats-about">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-about">
            <h2>{stat.number}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>  */}


  
      {/* Who We Are Section */}
      <section className="who-we-are">
        <div className="container-about">
          <h2>Who We Are</h2>
          <div className="who-we-are-content">
            <div className="who-we-are-text">
              <p>
                <strong>Kingmakers IAS Academy</strong> is one of South India's leading coaching institutes since 2013 with presence in five major tier 1 & 2 cities in Tamil Nadu (Chennai, New Delhi, Coimbatore, Madurai, Salem, Pondicherry & Trichy).
              </p>
              <p>
                In a first of its kind, a team of service-minded IAS and other Civil Service Officers established KingMakers IAS Academy in June 2013. Candidates are nurtured and mentored by a host of serving IAS, IPS, IFS, IRAS, IRS officers.
              </p>
              <p>
                KingMakers IAS Academy remains a trend setter by offering <strong>"IAS training by IAS officers"</strong>. The objective is to offer training and guidance for the aspirants to face the challenges in Civil Services Examination with confidence and competence.
              </p>
              <p className="highlight-text">
                Our new premises was inaugurated by former President Bharat Ratna, Shri. Pranab Mukherjee on September 2018.
              </p>
            </div>
            <div className="who-we-are-features">
              <div className="feature-box">
                <span className="feature-number">13+</span>
                <span className="feature-text">Years of Excellence</span>
              </div>
              <div className="feature-box">
                <span className="feature-number">10</span>
                <span className="feature-text">Centers Nationwide</span>
              </div>
              <div className="feature-box">
                <span className="feature-number">Expert</span>
                <span className="feature-text">IAS Officer Mentors</span>
              </div>
              <div className="feature-box">
                <span className="feature-number">15k+</span>
                <span className="feature-text">Success Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Mission, Vision & Enquiry Section */}
      <section className="mission-vision-enquiry">
        <div className="container-about">
          <div className="mv-enquiry-grid">
            {/* Left Column: Mission & Vision */}
            <div className="mv-content-column">
              <div className="mv-item mission-item">
                <div className="mv-header">
                  <span className="mv-icon"><i className="fa-solid fa-bullseye"></i></span>
                  <h2>Our Mission</h2>
                </div>
                <div className="mv-text">
                  <p>
                    Our mission is to make them believe themselves by providing necessary edge and exposure to empower, enhance and enable truly aspiring candidates, to attempt and achieve the most exalted, Civil Services of India.
                  </p>
                </div>
              </div>

              <div className="mv-item vision-item">
                <div className="mv-header">
                  <span className="mv-icon"><i className="fa-solid fa-lightbulb"></i></span>
                  <h2>Our Vision</h2>
                </div>
                <div className="mv-text">
                  <p>
                    Our vision is to empower every aspirant for success, irrespective of their socio-economic background. Through our inclusive initiatives and unwavering dedication, we strive to create a level playing field where talent and determination are the only prerequisites for success.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="enquiry-column">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Image Banner Section */}
      <section className="about-image-banner">
        <div className="container-about">
          <div className="banner-image-wrapper">
            <img 
              src="/images/about-us/about-us-page.webp" 
              alt="KingMakers IAS Academy Inauguration" 
              className="featured-about-image"
            />
            <div className="image-caption">
              <span>Inaugural Function of New Premises by Former President Bharat Ratna, Shri. Pranab Mukherjee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="directors-section">
        <div className="container-about">
          <div className="section-header-centered">
            <h2>Leading the Way</h2>
            <p className="subtitle">Meet the visionary leaders behind KingMakers IAS Academy</p>
            <div className="header-line"></div>
          </div>
          <div className="directors-grid">
            {directors.map((director) => (
              <div key={director.id} className="director-card">
                <div className="director-image-wrapper">
                  <div className="director-image-container">
                    <img src={director.image} alt={director.name} className="director-image" />
                  </div>
                  {/* <div className="director-social">
                    <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                  </div> */}
                </div>
                <div className="director-info">
                  <h3>{director.name}</h3>
                  <div className="designation-badge">{director.designation}</div>
                  <p className="credentials">{director.credentials}</p>
                  <div className="info-divider"></div>
                  <p className="description">{director.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="about-cta">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of successful civil service officers who started with us</p>
        <div className="cta-buttons">
          <button className="cta-btn primary">
            <a href="tel:+919444227273">📞 Call Us Now</a>
          </button>
          <button className="cta-btn secondary">
            <a href="mailto:kingmakersiasacademy@gmail.com">📧 Send Enquiry</a>
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUs;
