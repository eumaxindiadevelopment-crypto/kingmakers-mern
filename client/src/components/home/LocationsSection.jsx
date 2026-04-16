import { Link } from 'react-router-dom';
import './locations.css';

const locations = [
    { city: 'Chennai', name: 'Chennai - Sri Sai Tower', slug: 'chennai-sri-sai-tower', image: '/images/location/sri-sai-tower.webp' },
    { city: 'Chennai', name: 'Chennai - Kalam Tower', slug: 'chennai-kalam-tower', image: '/images/location/chennai-branch.webp' },
    { city: 'Salem', name: 'Salem', slug: 'salem', image: '/images/location/selam-branch.webp' },
    { city: 'Trichy', name: 'Trichy', slug: 'trichy', image: '/images/location/thiruchy-branch.webp' },
    { city: 'Coimbatore', name: 'Coimbatore', slug: 'coimbatore', image: '/images/location/coimbator-branch.webp' },
    { city: 'Madurai', name: 'Madurai', slug: 'madurai', image: '/images/location/madurai.webp' },
    { city: 'Pondicherry', name: 'Pondicherry', slug: 'pondicherry', image: '/images/location/pondichary-branch.webp' },
    { city: 'Namakkal', name: 'Namakkal', slug: 'namakkal', image: '/images/location/Namakkal.webp' },
    { city: 'Thanjavur', name: 'Thanjavur', slug: 'thanjavur', image: '/images/location/Thanjavur.webp' },
];

const LocationsSection = () => {
    return (
        <section className="locations-section" id="locations">

            {/* Top: headline band */}
            <div className="locations-header-band">
                <div className="container">
                    <h2>Our Coaching Centres Across India</h2>
                    {/* <p>
                        8 cities. One mission — to place the right people in civil service.
                        Find a Kingmakers centre near you and begin your journey today.
                    </p> */}
                </div>
            </div>

            {/* Bottom: dark panel with cards + CTA col */}
            <div className="locations-body">
                <div className="container">
                    <div className="locations-layout">

                        {/* Left sticky CTA column */}
                        <div className="locations-cta-col">
                            <div className="locations-cta-card">
                                <div className="locations-cta-icon">📍</div>
                                <h3>Find Your Nearest Centre</h3>
                                <p>
                                    Can't find your city? We also offer live online batches accessible from anywhere in India. 
                                    Experience the same premium classroom experience with live interactive sessions, 
                                </p>
                                <a href="#contact" className="btn-primary">Contact Us</a>
                                <a href="#courses" className="locations-link">View Online Courses →</a>
                                <div className="locations-cta-meta">
                                    <span>⭐ 4.9 / 5 Student Rating</span>
                                    <span>🎓 1,000+ Officers Placed</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: cards grid */}
                        <div className="locations-cards-grid">
                            {locations.map((loc, index) => (
                                <Link 
                                    to={`/best-ias-coaching-centre-in-${loc.slug}`}
                                    className="location-card" 
                                    key={index}
                                    style={{ backgroundImage: `url(${loc.image})`, textDecoration: 'none' }}
                                >
                                    <div className="location-overlay">
                                        <h3 className="location-status-tag">{loc.name || loc.city}</h3>
                                        {/* <div className="view-branch-btn">View Branch Details</div> */}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationsSection;
