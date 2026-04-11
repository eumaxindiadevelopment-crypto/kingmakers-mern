import HeroSlider from '../home/HeroSlider';
import WhyKingmakers from '../home/WhyKingmakers';
import StatsCounter from '../home/StatsCounter';
import Achievers from '../home/Achievers';
import AboutUsSection from '../home/AboutUs';
import Founder from '../home/Founder';
import Commitment from '../home/Commitment';
import CoursesTabs from '../home/CoursesTabs';
import Testimonials from '../home/Testimonials';
import VideoReviews from '../home/VideoReviews';
import LocationsSection from '../home/LocationsSection';
import FAQ from '../home/FAQ';
import BlogSection from '../home/BlogSection';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <AboutUsSection />
      <Founder />
      {/* <StatsCounter /> */}
      <WhyKingmakers />
      <Achievers />
      <Commitment />
      <CoursesTabs />
      <Testimonials />
      <VideoReviews />
      <LocationsSection />
      <FAQ />
      {/* <BlogSection /> */}
    </>
  );
};

export default Home;