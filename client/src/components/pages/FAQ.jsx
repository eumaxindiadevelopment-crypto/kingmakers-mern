import React, { useState } from 'react';
import '../../css/faq-page.css';

const faqData = [
  {
    category: 'About UPSC CSE',
    icon: '🎓',
    questions: [
      {
        id: 1,
        question: 'What are all the Services in UPSC CSE?',
        answer: 'UPSC Civil Services include ALL INDIA CIVIL SERVICES (IAS, IFS, IPS) and various GROUP A & B services including IAAS, ICAS, ICLS, IDAS, IDES, IIS, IPos, IRS, ITS, IRMS and many others. Each service has different roles and responsibilities in the Indian administration.'
      },
      {
        id: 2,
        question: 'What is the eligibility condition for appearing in the UPSC CSE?',
        answer: 'Candidates must be Indian citizens, have completed 21 years of age, possess a degree from a recognized university, and appear for the examination at least 5 times before reaching the age limit. There are different age limits for General, OBC, SC/ST categories (40, 43, 45 years respectively).'
      },
      {
        id: 3,
        question: 'What is the maximum attempts in different categories?',
        answer: 'General Category: 6 attempts or till age 32, OBC: 9 attempts or till age 35, SC/ST: Unlimited attempts till age 37.'
      },
      {
        id: 4,
        question: 'What is the pattern of UPSC CSE Prelims Exam?',
        answer: 'Prelims consists of 2 papers (100 marks each = 200 marks total). Paper 1: General Studies, Paper 2: CSAT (Civil Service Aptitude Test). Both are objective type multiple-choice questions (MCQ).'
      },
      {
        id: 5,
        question: 'What is the pattern of UPSC CSE Mains Exam?',
        answer: 'Mains consists of 9 papers - 2 language papers (English & Indian language), 1 essay paper, and 6 general study papers + 1 optional subject (2 papers). Each paper is evaluated out of 250 marks.'
      },
      {
        id: 6,
        question: 'How many Optional Subjects available in UPSC CSE Mains Exam?',
        answer: 'Candidates can choose from multiple optional subjects including History, Geography, Political Science, Economics, Philosophy, Sociology, Public Administration, and many more. Each subject has 2 papers of 250 marks each totaling 500 marks.'
      }
    ]
  },
  {
    category: 'About TNPSC',
    icon: '🏛️',
    questions: [
      {
        id: 7,
        question: 'What is the eligibility condition for appearing in TNPSC Gr-I/II/IIA?',
        answer: 'Group I: Minimum age 21 years, Maximum age 32 years (OC), 33 years (Law Degree), 37 years (Others). Group II/IIA: Minimum age 21 years, No maximum age limit. All require UG degree from any recognized university.'
      },
      {
        id: 8,
        question: 'What is the Exam pattern of TNPSC Gr-I Exam?',
        answer: 'TNPSC Group I consists of Prelims (2 papers of 150 marks each), Mains (8 papers), and Interview. Prelims is objective MCQ based, while Mains consists of written descriptive papers in different subjects.'
      },
      {
        id: 9,
        question: 'What is the pattern of TNPSC Gr-II/IIA Exam?',
        answer: 'Group II/IIA has a 2-tier exam system consisting of Prelims (objective MCQ) and Mains (written examination) followed by interview/viva for some positions. The syllabus focuses on General Studies and Tamil language.'
      },
      {
        id: 10,
        question: 'What is Syllabus of TNPSC Gr-I/II/IIA Prelims Exam?',
        answer: 'The prelims syllabus covers General Studies including Indian History, Geography, Polity, Economics, Current Affairs, and General Knowledge. Tamil language proficiency is also important for both prelims and mains.'
      },
      {
        id: 11,
        question: 'What is Syllabus of TNPSC Gr-I Mains Exam?',
        answer: 'TNPSC Group I Mains covers comprehensive syllabi in History, Geography, Political Science, Economics, General Studies, Tamil Language, and Administrative Law. The exam is designed to test conceptual knowledge and analytical skills.'
      }
    ]
  },
  {
    category: 'About Our Academy',
    icon: '🏢',
    questions: [
      {
        id: 12,
        question: 'What is the Fee structure?',
        answer: 'Our fee structures vary based on the course type and duration. For detailed information about course fees, please visit our UPSC Courses page or TNPSC Courses page. We offer flexible payment options and special discounts for early enrollments.'
      },
      {
        id: 13,
        question: 'Will the Syllabus be completed on time?',
        answer: 'Yes, we ensure complete syllabus coverage within the stipulated course duration. Our curriculum is meticulously designed with phase-wise mastery approach to ensure students grasp concepts thoroughly and complete the entire syllabus before exams.'
      },
      {
        id: 14,
        question: 'What is batch size for each course?',
        answer: 'We maintain limited batch sizes to ensure personalized attention. Regular batches typically have 15-25 students, allowing faculty to focus on individual learning needs and provide better mentorship.'
      },
      {
        id: 15,
        question: 'Do we have to make payment for Course repetition?',
        answer: 'Course repetition allows students to attend classes again if they fail the exam. Usually, repeat students can attend classes at a reduced fee or sometimes free, depending on the course terms and conditions.'
      },
      {
        id: 16,
        question: 'Does the Academy have experienced Faculties?',
        answer: 'Yes! Our faculty comprises highly experienced educators including retired IAS and IPS officers. Each facet of the syllabus is handled by subject matter experts with years of teaching and real-world experience in their respective fields.'
      },
      {
        id: 17,
        question: 'What is the duration of Regular / Weekend Batch classes?',
        answer: 'Regular Batch: Five days a week (Monday to Friday). Weekend Batch: Two days a week (Saturdays and Sundays). Both batches cover the same comprehensive curriculum with flexible scheduling for working professionals.'
      },
      {
        id: 18,
        question: 'Do we have regular Tests?',
        answer: 'Yes! We conduct regular tests including Good Morning Tests (GMT), unit tests, and full-length mock exams. Our comprehensive test series is designed to assess progress and familiarize students with actual exam patterns.'
      },
      {
        id: 19,
        question: 'What is IAP?',
        answer: 'IAP stands for Intensive Answer writing Program. It focuses on developing strong answer-writing skills for UPSC Mains and TNPSC exams. Students get hands-on practice and personalized feedback from experienced faculty.'
      },
      {
        id: 20,
        question: 'Does the Academy have Hostel facility?',
        answer: 'Yes, we provide hostel facilities for outstation students. Our hostels are well-equipped with modern amenities, providing a conducive environment for focused preparation along with proper accommodation and meals.'
      },
      {
        id: 21,
        question: 'Is there any Scholarship Available?',
        answer: 'Yes, we offer scholarships based on merit and financial need. Scholarships are available for deserving candidates, including TOP Scholar Program and need-based financial assistance. Contact our admission team for detailed information.'
      },
      {
        id: 22,
        question: 'Do you have any other branches?',
        answer: 'Yes! We have multiple centers across Tamil Nadu including Chennai (2 branches), Trichy, Coimbatore, Madurai, Pondicherry, Namakkal, Thanjavur, and Salem. Each center is equipped with the same quality of education and facilities.'
      }
    ]
  }
];

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const allQuestions = filteredData.length === 0 && searchQuery 
    ? [] 
    : filteredData.length === 0 
    ? faqData 
    : filteredData;

  return (
    <section id="faq-page" className="faq-page-section">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="faq-hero-content">
          <h1>Frequently Asked Questions</h1>
          {/* <p>Get answers to common questions about UPSC, TNPSC, and Kingmakers Academy</p>
          <div className="hero-accent"></div> */}
        </div>
      </section>

      {/* Search Section */}
      {/* <div className="faq-search-section">
        <div className="container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search FAQ... (e.g., 'eligibility', 'fees', 'syllabus')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          {searchQuery && <p className="search-results-info">
            Showing {allQuestions.reduce((acc, cat) => acc + cat.questions.length, 0)} results
          </p>}
        </div>
      </div> */}

      {/* FAQ Content */}
      <div className="faq-content-section">
        <div className="container">
          {allQuestions.length === 0 && searchQuery ? (
            <div className="no-results">
              <p>🔍 No results found for "{searchQuery}"</p>
              <p>Try different keywords or browse all categories below</p>
            </div>
          ) : (
            <div className="faq-categories">
              {allQuestions.map((category, categoryIndex) => (
                <div key={categoryIndex} className="faq-category">
                  <div
                    className="category-header"
                    onClick={() => setActiveCategory(
                      activeCategory === categoryIndex ? null : categoryIndex
                    )}
                  >
                    <div className="category-title">
                      {/* <span className="category-icon">{category.icon}</span> */}
                      <h2>{category.category}</h2>
                    </div>
                    <span className={`toggle-arrow ${activeCategory === categoryIndex ? 'active' : ''}`}>
                      ▼
                    </span>
                  </div>

                  {(activeCategory === categoryIndex || searchQuery) && (
                    <div className="accordion-container">
                      {category.questions.map((item) => (
                        <div key={item.id} className="accordion-item">
                          <button
                            className={`accordion-header ${expandedId === item.id ? 'active' : ''}`}
                            onClick={() => toggleAccordion(item.id)}
                          >
                            <span className="accordion-title">{item.question}</span>
                            <span className="accordion-arrow">+</span>
                          </button>
                          {expandedId === item.id && (
                            <div className="accordion-content">
                              <p>{item.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="faq-cta-section">
        <div className="container">
          <h2>Didn't find your answer?</h2>
          <p>Contact our team for more detailed information</p>
          <div className="cta-buttons">
            <a href="tel:+919444227273" className="cta-btn cta-btn-primary">
              📞 Call Us Now
            </a>
            <a href="mailto:kingmakersiasacademy@gmail.com" className="cta-btn cta-btn-secondary">
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default FAQ;
