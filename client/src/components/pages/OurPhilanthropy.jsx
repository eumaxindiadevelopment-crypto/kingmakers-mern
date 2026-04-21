import { useState } from 'react';
import '../../css/our-philanthropy.css';

const testimonials = [
  {
    id: 1,
    text: "The session was very effective. Everybody says that the UPSC exam is very hard to clear, but you break those rules, sir — you show that everyone can write and clear the UPSC exam within a year. I too want to become a student of Kingmakers Academy.",
    name: "Sowmya Mahendran",
    title: "UPSC Aspirant",
    initial: "S",
  },
  {
    id: 2,
    text: "It's one of the best coaching centers which facilitates aspirants to stay motivated throughout their preparation. Through weekly examinations and test discussions, I came to learn many things. It has a very nice studying environment.",
    name: "Vignesh",
    title: "UPSC Aspirant",
    initial: "V",
  },
  {
    id: 3,
    text: "It's a very fine place for aspirants to study, with good physical infrastructure as well as experienced and knowledgeable staff members. The study hall is available full-day with 24×7 facilities. The best guidance for young aspirants who want to achieve success in competitive exams.",
    name: "Cibikannan Chandrasekaran",
    title: "Competitive Exam Aspirant",
    initial: "C",
  },
  {
    id: 4,
    text: "Easy access to teaching staff. I like the quality of teaching and the good learning environment. It would be even better to provide required unit-wise notes in advance for Group 1 Mains Exam. An administration that is truly aspirant-centric.",
    name: "Thirumaniselvam",
    title: "TNPSC Aspirant",
    initial: "T",
  },
];

const initiatives = [
  {
    icon: "🎤",
    title: "Free Awareness Camps",
    description:
      "We conduct free awareness camps across urban, sub-urban, and rural districts of Tamil Nadu—ensuring that every aspiring candidate knows about the civil services pathway, regardless of their location.",
  },
  {
    icon: "🧭",
    title: "Dedicated Mentorship",
    description:
      "Aspirants from underprivileged backgrounds receive one-on-one guidance from serving IAS, IPS, and IFS officers who volunteer their time to help nurture the next generation of civil servants.",
  },
  {
    icon: "📚",
    title: "Resource Support",
    description:
      "We provide study materials, mock exams, and access to our digital learning platform free of cost for deserving students, ensuring financial constraints never become a barrier to success.",
  },
];

const stats = [
  { icon: "fa-solid fa-map-location-dot", number: "38+", label: "Districts Covered" },
  { icon: "fa-solid fa-calendar-check", number: "300+", label: "Events Conducted" },
  { icon: "fa-solid fa-graduation-cap", number: "5,00,000+", label: "IAS Aspirants Reached" },
];

const stipendImages = [
  { id: 1, src: "/images/philanthropy/stipend-programme/stipend-1.webp", alt: "Stipend Programme 1" },
  { id: 2, src: "/images/philanthropy/stipend-programme/stipend-2.webp", alt: "Stipend Programme 2" },
  { id: 3, src: "/images/philanthropy/stipend-programme/stipend-3.webp", alt: "Stipend Programme 3" },
  { id: 4, src: "/images/philanthropy/stipend-programme/stipend-4.webp", alt: "Stipend Programme 4" },
  { id: 5, src: "/images/philanthropy/stipend-programme/stipend-5.webp", alt: "Stipend Programme 5" },
  { id: 6, src: "/images/philanthropy/stipend-programme/stipend-6.webp", alt: "Stipend Programme 6" },
  { id: 7, src: "/images/philanthropy/stipend-programme/stipend-7.webp", alt: "Stipend Programme 7" },
  // { id: 8, src: "/images/philanthropy/stipend-programme/stipend-8.webp", alt: "Stipend Programme 8" },
  { id: 9, src: "/images/philanthropy/stipend-programme/stipend-9.webp", alt: "Stipend Programme 9" },
  { id: 10, src: "/images/philanthropy/stipend-programme/stipend-10.webp", alt: "Stipend Programme 10" },
  { id: 11, src: "/images/philanthropy/stipend-programme/stipend-11.webp", alt: "Stipend Programme 11" },
  { id: 12, src: "/images/philanthropy/stipend-programme/stipend-12.webp", alt: "Stipend Programme 12" },
  { id: 13, src: "/images/philanthropy/stipend-programme/stipend-13.webp", alt: "Stipend Programme 13" },
  { id: 14, src: "/images/philanthropy/stipend-programme/stipend-14.webp", alt: "Stipend Programme 14" },
  { id: 15, src: "/images/philanthropy/stipend-programme/stipend-15.webp", alt: "Stipend Programme 15" },
  { id: 16, src: "/images/philanthropy/stipend-programme/stipend-17.webp", alt: "Stipend Programme 16" },
  { id: 17, src: "/images/philanthropy/stipend-programme/stipend-18.webp", alt: "Stipend Programme 17" },
  { id: 18, src: "/images/philanthropy/stipend-programme/stipend-19.webp", alt: "Stipend Programme 18" },
  { id: 19, src: "/images/philanthropy/stipend-programme/stipend-20.webp", alt: "Stipend Programme 19" },
  // { id: 20, src: "/images/philanthropy/stipend-programme/stipend-21.webp", alt: "Stipend Programme 20" },
  // { id: 21, src: "/images/philanthropy/stipend-programme/stipend-22.webp", alt: "Stipend Programme 21" },
  { id: 22, src: "/images/philanthropy/stipend-programme/stipend-23.webp", alt: "Stipend Programme 22" },
  { id: 23, src: "/images/philanthropy/stipend-programme/stipend-24.webp", alt: "Stipend Programme 23" },
];

const OurPhilanthropy = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  return (
    <div className="philanthropy-page">

      {/* ── Hero ─────────────────────────────── */}
      <section className="philanthropy-hero">
        <div className="philanthropy-hero-content">
          {/* <span className="philanthropy-hero-badge">Giving Back to Society</span> */}
          <h1>Our Philanthropy</h1>
          {/* <p>
            The first step toward change is awareness.
            The second step is acceptance.
          </p> */}
          {/* <div className="phil-hero-accent"></div> */}
        </div>
      </section>

      {/* ── Awareness Program ─────────────────── */}
      <section className="awareness-section">
        <div className="awareness-inner">
          {/* <p className="section-eyebrow">What We Do</p> */}
          <h2>KingMakers Awareness Program</h2>
          <div className="awareness-card">
            <p>
              At KingMakers IAS Academy, we believe that talent is universal but
              opportunity is not. Our flagship awareness program is built on the
              conviction that information—shared freely and passionately—has the
              power to transform lives. By taking civil services awareness directly
              to communities across Tamil Nadu, we bridge the gap between aspiration
              and achievement for thousands of young minds every year.
            </p>
          </div>
        </div>
      </section>

      {/* ── Unnakul Oru IAS + Stats ───────────── */}
      <section className="unnakul-section">
        <div className="unnakul-inner">

          {/* Text */}
          <div className="unnakul-text">
            {/* <p className="section-eyebrow">Our Signature Initiative</p> */}
            <h2>Unnakul Oru IAS</h2>
            <h3>— The IAS in You</h3>
            <p>
              In a first of its kind, we at Kingmakers are truly dedicated to
              educating and creating awareness of civil services among the lay
              community in various urban, sub-urban, and rural districts of
              Tamil Nadu.
            </p>
            <p>
              We are proud to have greatly contributed in igniting the most
              talented minds of India residing in sub-urban and rural areas
              with the desire to serve the nation through civil service exams.
            </p>
            <div className="unnakul-highlight">
              "Every aspirant, regardless of background, has a civil servant
              waiting to emerge. We are here to awaken that potential."
            </div>
          </div>

          {/* Stats */}
          <div className="phil-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="phil-stat-card">
                <span className="phil-stat-icon">
                  <i className={stat.icon}></i>
                </span>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Stipend Programme Gallery ─────────── */}
      <section className="stipend-section">
        <div className="stipend-inner">
          <div className="section-title-block">
            {/* <p className="section-eyebrow">Financial Empowerment</p> */}
            <h2>Stipend Programme</h2>
            <p>
              Supporting dedicated aspirants with monthly stipends to ensure 
              they can focus entirely on their civil service preparation.
            </p>
          </div>

          <div className="stipend-grid">
            {stipendImages.map((image) => (
              <div 
                key={image.id} 
                className="stipend-card"
                onClick={() => openLightbox(image)}
              >
                <div className="stipend-image-wrap">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <div className="stipend-overlay">
                    <span className="view-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox Popup ───────────────────── */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <div className="lightbox-content">
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
          </div>
        </div>
      )}

      {/* ── Testimonials ─────────────────────── */}
      <section className="phil-testimonials">
        <div className="phil-testimonials-inner">
          <div className="section-title-block">
            {/* <p className="section-eyebrow">Student Voices</p> */}
            <h2>What Our Aspirants Say</h2>
            <p>Real stories from students whose lives were touched by our programs.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <span className="quote-icon">"</span>
                <p>{t.text}</p>
                <div className="testimonial-author">
                  {/* <div className="author-avatar">{t.initial}</div> */}
                  <div className="author-info">
                    <strong>{t.name}</strong>
                    <span>{t.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA ───────────────────────────────── */}
      {/* <section className="phil-cta">
        <div className="phil-cta-inner">
          <h2>Join Our Mission</h2>
          <p>
            Together we can unlock the potential of thousands more aspirants
            across Tamil Nadu. Reach out to us to learn how you can support
            or be part of our philanthropic journey.
          </p>
          <div className="phil-cta-buttons">
            <a href="tel:+919444227273" className="phil-btn primary">
              📞 Call Us
            </a>
            <a href="/contact-us/" className="phil-btn secondary">
              Get In Touch
            </a>
          </div>
        </div>
      </section> */}

    </div>
  );
};

export default OurPhilanthropy;
