import { useState, useEffect, Fragment } from 'react';
import '../../css/tnpsc-courses.css';
import EconomyTable from '../tnpsc/EconomyTable';
import HistoryTable from '../tnpsc/HistoryTable';
import PolityTable from '../tnpsc/PolityTable';
import IndianHistoryTable from '../tnpsc/IndianHistoryTable';
import GeographyTable from '../tnpsc/GeographyTable';
import ScienceTable from '../tnpsc/ScienceTable';
import TNPSCGroupTableFour from '../tnpsc/TNPSCGroupTableFour';
import TnpscgroupFourAtitude from '../tnpsc/TnpscgroupFourAtitude';
import TnpscForm from '../forms/TnpscForm';

import API from '../../apiConfig';

const TNPSC = () => {
  const [activeTab, setActiveTab] = useState('group1');
  const [activeFaq, setActiveFaq] = useState(null);
  const [dbCourses, setDbCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/api/courses?category=TNPSC`);
        const data = await res.json();
        // Only show published courses
        const published = Array.isArray(data) ? data.filter(c => c.status === 'Published') : [];
        setDbCourses(published);
      } catch (err) {
        console.error('Error fetching TNPSC courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const eligibilityData = [
    {
      exam: 'TNPSC Group 1',
      ageGeneral: '21–32 years',
      ageReserved: 'SC/ST/OBC: Up to 37 years',
      qualification: "Bachelor's degree from a recognized university (UGC/Central/State)",
      special: 'Physical standards for DSP and District Officer posts (height, weight, chest)',
    },
    {
      exam: 'TNPSC Group 2 & 2A',
      ageGeneral: '18–32 years',
      ageReserved: 'No upper age limit for SC/ST/BC and some posts',
      qualification: "Bachelor's degree from recognized university (varies by post)",
      special: 'Adequate knowledge of Tamil language mandatory',
    },
    {
      exam: 'TNPSC Group 4',
      ageGeneral: '18–30 years',
      ageReserved: 'MBC/DC/BC: Up to 32 yrs | SC/ST/Destitute Widows: Up to 35 yrs',
      qualification: 'SSLC or equivalent from recognized board',
      special: 'Must be qualified to enroll in higher secondary or college studies',
    },
    {
      exam: 'TNPSC Combined Engineering Services',
      ageGeneral: '18–30 years',
      ageReserved: 'No upper age limit (minimum 18 years)',
      qualification: 'B.E. or relevant engineering degree from recognized university',
      special: 'Specializations vary by post',
    },
    {
      exam: 'TNPSC Assistant Conservator of Forests (ACF)',
      ageGeneral: '21–32 years',
      ageReserved: 'As per TNPSC guidelines',
      qualification: "Bachelor's degree in Forestry, Environmental Science, Botany, Zoology or related fields",
      special: 'Physical fitness and ability to work in forest conditions',
    },
    {
      exam: 'TNPSC District Educational Officer (DEO)',
      ageGeneral: '32–40 years',
      ageReserved: 'No upper age limit for SC/ST/SC(A)',
      qualification: "Master's degree, B.T., or B.Ed. from recognized university",
      special: '–',
    },
    {
      exam: 'TNPSC Assistant Section Officer (ASO)',
      ageGeneral: '18–30 years',
      ageReserved: 'Age relaxation as per Tamil Nadu government norms',
      qualification: "Bachelor's degree from recognized university",
      special: '–',
    },
  ];

  const syllabusTabs = [
    { id: 'group1', label: 'Group 1' },
    { id: 'group2', label: 'Group 2 & 2A' },
    { id: 'group4', label: 'Group 4' },
  ];

  const group1Prelims = {
    title: 'TNPSC Group 1 – Prelims Syllabus',
    description: '200 objective questions | 300 marks | 3 hours duration',
    parts: [
      {
        part: 'Part A: General Studies (175 Questions)',
        topics: [
          {
            name: 'Indian Economy and Development', questions: '50 Questions',
            tnspdescription1: 'Indian economy and development consists of topics like monetary policy, economic planning, taxations and government schemes. It’s also emphasized on economic development in Tamilnadu, including topics like welfare schemes, rural programs, human development indicators, and pressing challenges such as unemployment and poverty.',
            subTable: [
              {
                section: 'Indian Economy Fundamentals',
                icon: '🏦',
                color: '#043053',
                rows: [
                  { topic: 'Economic Planning & Development', subtopics: ['Five Year Plans', 'NITI Aayog', 'Economic Surveys', 'GDP, GNP', 'Economic Indicators'] },
                  { topic: 'Sectoral Analysis', subtopics: ['Agriculture', 'Industry', 'Services', 'Infrastructure'] },
                  { topic: 'Economic Reforms', subtopics: ['1991 Economic Reforms', 'Recent Reforms', 'Financial Inclusion', 'Startup India'] },
                ]
              },
              {
                section: 'Tamil Nadu Economic Development',
                icon: '🌾',
                color: '#0a5a8f',
                rows: [
                  { topic: 'State Economy Overview', subtopics: ['GSDP Trends', 'Per Capita Income', 'Economic Planning', 'Budget Analysis'] },
                  { topic: 'Industrial Development', subtopics: ['Manufacturing', 'IT & Software', 'MSME Sector', 'Industrial Parks'] },
                  { topic: 'Agriculture & Allied Activities', subtopics: ['Cropping Patterns', 'Irrigation', 'Agricultural Schemes', 'Animal Husbandry'] },
                  { topic: 'Infrastructure Development', subtopics: ['Transport', 'Urban Development', 'Water Resources'] },
                ]
              },
              {
                section: 'Government Schemes & Policies',
                icon: '🏛️',
                color: '#1a6b3a',
                rows: [
                  { topic: 'Social Welfare', subtopics: ['Amma Schemes', 'Pension Programs'] },
                  { topic: 'Employment', subtopics: ['MGNREGA in TN'] },
                  { topic: 'Education', subtopics: ['Mid-Day Meal', 'Scholarship Schemes'] },
                  { topic: 'Health', subtopics: ['Health Insurance', 'Medical Facilities'] },
                ]
              },
            ]
          },

          { name: 'Tamil Nadu History, Culture & Movements', questions: '40 Questions', detail: 'Sangam age, Chola-Pandya-Pallava dynasties, colonial period, Self-respect movement, Periyar, Dravidian movement.' },
          { name: 'Indian Polity', questions: '40 Questions', detail: 'Constitution, fundamental rights, duties, DPSP, Union/State executives, Panchayati Raj, centre-state relations.' },
          { name: 'History and Indian National Movement', questions: '25 Questions', detail: 'Ancient India, medieval dynasties, British colonial rule, freedom struggle, national leaders.' },
          { name: 'Geography of India', questions: '10 Questions', detail: 'Physical features, climate, monsoon, rivers, natural resources, population geography.' },
          { name: 'General Science', questions: '10 Questions', detail: 'Physics, chemistry, biology, environmental science, recent science & technology developments.' },
        ]
      },
      {
        part: 'Part B: Aptitude & Mental Ability (25 Questions)',
        topics: [
          { name: 'Logical Reasoning', questions: '', detail: '' },
          { name: 'Quantitative Aptitude', questions: '', detail: 'Simplification, Ratios, Syllogism, Percentage' },
          { name: 'Number Series & Puzzles', questions: '', detail: 'Visual reasoning, dice, alphanumeric problems, number series' },
        ]
      }
    ]
  };

  const group1Mains = {
    title: 'TNPSC Group 1 – Mains Syllabus',
    description: '4 descriptive papers | 750 marks | 3 hours each',
    papers: [
      { name: 'Paper 1: Tamil Eligibility Test', marks: '100 marks', detail: 'In this paper, candidates will get descriptive type questions, which test their Tamil language proficiency.' },
      { name: 'Paper 2: General Studies I', marks: '250 marks', detail: 'Here, candidates will be asked questions based on modern history of India and culture, social issues in India and Tamilnadu and general aptitude and mental ability. ' },
      { name: 'Paper 3: General Studies II', marks: '250 marks', detail: 'In this paper, questions are devised based on Indian polity and emerging political trends, science and technology in development, and Tamilnadu society, culture, & heritage.' },
      { name: 'Paper 4: General Studies III', marks: '250 marks', detail: 'Here, candidates will be asked questions derived from subjects like geography of India, environment, biodiversity, Indian economy and global trends. ' },
    ]
  };

  const group2Syllabus = {
    prelims: [
      { subject: 'General Tamil', detail: ' It comprises grammar, literature, comprehension, vocabulary and translation.' },
      { subject: 'General Studies', detail: 'This section covered subjects like history, geography, polity, economics and current affairs.' },
      { subject: 'Aptitude & Mental Ability', detail: 'The section tests the candidates’ numerical ability, logical reasoning, and mental ability.' },
    ],
    mains: [
      { subject: 'General Tamil', detail: 'This paper tests candidates’ Tamil linguistic ability with essay writing and translation tests. It covers topics like Tamil classics, modern literature and advanced grammar and rules.' },
      { subject: 'General Studies', detail: 'This paper covers all the prelims topics with greater depth, recent developments of the state, state specific issues, policies and governance.' },
      { subject: 'General English', detail: 'Candidates’ reading comprehension, vocabulary, english language rules, and sentence correction. ' },
      { subject: 'Tamil Eligibility Test (Compulsory)', detail: 'This qualifying paper tests the Tamil language proficiency of the candidates.' },
    ]
  };

  const group4Syllabus = [
    { unit: 'General Science', questions: '5 Questions', topics: 'Nature of Universe, Physics, Chemistry, Biology, Environmental Science, Recent Inventions' },
    { unit: 'Geography', questions: '5 Questions', topics: 'Earth, Physical features, Climate, Monsoon, Water resources, Disaster management' },
    { unit: 'History, Culture of India & National Movement', questions: '10 Questions', topics: 'Indus Valley, Guptas, Mughals, South Indian History, Freedom fighters, Indian National Congress' },
    { unit: 'Indian Polity', questions: '15 Questions', topics: 'Constitution, Preamble, Fundamental Rights, Union/State/Local governments, Elections, Judiciary' },
    { unit: 'Indian Economy & Development', questions: '20 Questions', topics: 'Indian economy, Five-year plans, RBI, GST, Agriculture, Industrial growth, Social problems' },
    { unit: 'History, Culture, Heritage & Movements of Tamil Nadu', questions: '20 Questions', topics: 'Tamil literature from Sangam age, Thirukkural, freedom struggle role, Social reformers, Social reform movements' },
    { unit: 'Aptitude & Mental Ability', questions: '25 Questions', topics: 'Simplification, Percentage, HCF, LCM, Ratio, Interest, Area, Volume, Logical reasoning, Puzzles, Dice' },
    { unit: 'Tamil Eligibility-cum-Scoring Test', questions: '100 Questions', topics: 'Grammar, vocabulary, idioms, comprehension, writing skills, translation and literature' },
  ];

  const faqs = [
    {
      q: 'Which is the best TNPSC coaching centre in Chennai?',
      a: 'The best TNPSC coaching centre in Chennai is one that offers expert faculty, structured syllabus coverage, regular test series, and personalised mentoring. KingMakers IAS Academy stands out as one of the top TNPSC coaching centres in Chennai, with guidance from experienced civil service officers, exam-oriented training, and a proven track record of helping aspirants succeed.'
    },
    {
      q: 'Which coaching is best for TNPSC?',
      a: 'The best TNPSC coaching combines conceptual clarity with exam-focused preparation. With comprehensive study materials, daily practice tests, performance analysis, and continuous mentorship, TNPSC aspirants are destined to become civil service officers. KingMakers IAS Academy, with its structured programs and result-driven approach, turns aspirants into achievers.'
    },
    {
      q: 'What makes KingMakers IAS Academy different from other TNPSC coaching centres in Chennai?',
      a: 'KingMakers IAS Academy is driven by the motto – "IAS training by IAS officers", which differentiates itself from other centres. Aspirants are mentored by serving and retired civil servants, ensuring real-time insights into exam strategy and preparation.'
    },
    {
      q: 'Does KingMakers IAS Academy offer coaching for all TNPSC Group exams?',
      a: 'Yes, KingMakers IAS Academy provides coaching for all major TNPSC Group exams, including Group 1, Group 2, Group 2A and Group 4. The programs are designed to cover both Prelims and Mains, along with dedicated test series and revision modules to ensure complete preparation.'
    },
    {
      q: 'Does KingMakers IAS Academy provide online and offline TNPSC coaching in Chennai?',
      a: 'Yes, KingMakers IAS Academy offers both online and offline TNPSC coaching in Chennai. Students can choose classroom learning for direct interaction or opt for online programs that provide live sessions, recorded classes, study materials, and doubt-clearing support — ensuring flexibility for all types of aspirants.'
    },
  ];

  const whyChooseUs = [
    { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Experienced teachers who deeply understand TNPSC exam pattern, trends, and marking schemes.' },
    { icon: '📖', title: 'Comprehensive Study Materials', desc: 'Covers full syllabus  General Studies, Tamil, Aptitude, and Current Affairs with updated content.' },
    { icon: '📊', title: 'Regular Mock Tests', desc: 'Frequent test series that simulate real exam conditions with detailed performance analysis.' },
    { icon: '🤝', title: 'Personalized Mentorship', desc: 'One-on-one guidance and continuous doubt support from civil service experts.' },
  ];

  return (
    <div className="tnpsc-page">

      {/* Hero Section */}
      <section className="tnpsc-hero">
        <div className="container-tnpsc">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="tnpsc-text">
                <h2>Best TNPSC Coaching in Chennai, Tamilnadu</h2>
                <p>KingMakers IAS Academy is a best TNPSC coaching centre in Chennai, determined to deliver comprehensive and result-oriented TNPSC exam coaching for all TNPSC Group exams - Group 1, Group 2, Group 2A, and Group 4. With a team of highly experienced and skilled faculty, the academy provides TNPSC training for aspirants through structured courses, in-depth syllabus coverage, and personalised mentoring. Known for its proven track record and academic excellence, KingMakers IAS Academy helps students with the knowledge, discipline, ethics, and confidence needed to succeed in Tamil Nadu Public Service Commission (TNPSC) examinations and secure positions in Tamil Nadu government departments.</p>
              </div>
            </div>
            <div className="col-md-5">
               <div className="reg-form-container">
                <TnpscForm />
              </div>
              </div>
            </div>
        </div>
      </section>



      {/* Why Choose Us Section */}
      <section className="tnpsc-intro">
        <div className="container-tnpsc">
          <div className="section-head">
            {/* <span className="section-tag">Why Us</span> */}
            <h2>Why Choose Our TNPSC Programs?</h2>
            <p className="section-subtitle">Expert-led coaching that prepares you end-to-end for every stage of TNPSC exams.</p>
          </div>
          <div className="intro-grid">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="intro-card">
                <div className="intro-icon-wrap">
                  <span className="intro-icon">{item.icon}</span>
                  <span className="intro-number">0{idx + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      {/* 
      <section className="courses-section">
        <div className="container-tnpsc">
          <div className="section-head">
            <span className="section-tag">Programs</span>
            <h2>Our TNPSC Courses</h2>
            <p className="section-subtitle">Choose the right program for your TNPSC goal </p>
          </div>
          <div className="courses-grid">
            {loading ? (
              <div className="text-center py-5">Loading courses...</div>
            ) : dbCourses.length === 0 ? (
              <div className="text-center py-5">No courses available at the moment.</div>
            ) : dbCourses.map((course) => (
              <div key={course._id} className="course-card">
                <div className="course-header">
                  <h3>{course.title}</h3>
                </div>
                <div className="course-body">
                  <p className="course-description">{course.description}</p>
                  <div className="course-details">
                    <div className="detail-item">
                      <span className="detail-label">⏱ Year / Duration</span>
                      <span className="detail-value">{course.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label"> Fees</span>
                      <span className="price">₹{course.fees?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="course-actions">
                    {course.schedulePdf && (
                      <a href={course.schedulePdf} target="_blank" rel="noreferrer" className="btn-schedule" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        View Schedule
                      </a>
                    )}
                    <button className="btn-enroll">Pay Here</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Upcoming Batches Section */}
      <section className="batches-header-section" style={{ padding: '4rem 0 1rem' }}>
        <div className="container-tnpsc">
          <div className="section-head" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <span className="section-tag" style={{ margin: '0 auto 1rem' }}>Batches</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Upcoming Batches in Our Best TNPSC Academy in Chennai</h2>
            <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>Quality coaching for all TNPSC groups. Choose your path to success.</p>
          </div>
        </div>
      </section>

      {/* Dynamic Course-wise Batch Sections */}
      {dbCourses.filter(c => c.upcomingBatches?.length > 0).map((course) => (
        <section className="batches-section" key={course._id} style={{ padding: '2rem 0 4rem' }}>
          <div className="container-tnpsc">
            <div className="course-batch-heading" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '10px' }}>{course.title}</h3>
              {/* <p style={{ color: '#0a5a8f', fontWeight: '600', fontSize: '1.1rem' }}>TNPSC Examination Success Batch Schedule</p> */}
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
          <div className="container-tnpsc text-center py-5">
            <p className="no-batches-msg">No upcoming batches announced at the moment. Please contact us for more information.</p>
          </div>
        </section>
      )}

      {/* Eligibility Section */}
      <section className="eligibility-section">
        <div className="container-tnpsc">
          <div className="section-head eligibility-section-head">
            {/* <span className="section-tag">Eligibility</span> */}
            <h2>TNPSC Exam Eligibility Criteria</h2>
            {/* <p className="section-subtitle">Check the eligibility requirements for each TNPSC group exam before you apply.</p> */}
          </div>
          <div className="eligibility-table-wrap">
            <table className="eligibility-table">
              <thead>
                <tr>
                  <th>Exam / Post</th>
                  <th>Age Limit (General)</th>
                  <th>Age Limit (Reserved)</th>
                  <th>Educational Qualification</th>
                  <th>Special Requirements</th>
                </tr>
              </thead>
              <tbody>
                {eligibilityData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="exam-name">{row.exam}</td>
                    <td>{row.ageGeneral}</td>
                    <td>{row.ageReserved}</td>
                    <td>{row.qualification}</td>
                    <td>{row.special}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="syllabus-section">
        <div className="container-tnpsc">
          <div className="section-head">
            <span className="section-tag">Syllabus</span>
            <h2>TNPSC Exam Syllabus</h2>
            <p className="section-subtitle">Expert faculties of KingMakers IAS Academy give thorough understanding of the TNPSC exam syllabus for every candidate.</p>
          </div>

          {/* Tabs */}
          <div className="syllabus-tabs">
            {syllabusTabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Group 1 Tab */}
          {activeTab === 'group1' && (
            <div className="tab-content">
              {/* Prelims */}
              <div className="syllabus-box-wrap">
                <h3 className="syllabus-box-title">{group1Prelims.title}</h3>
                <p className="syllabus-box-meta">{group1Prelims.description}</p>
                <div className="syllabus-scroll-box">
                  <p><b>1. Indian Economy and Development - 50 Questions</b></p>
                  <p>Indian economy and development consists of topics like monetary policy, economic planning, taxations and government schemes. It’s also emphasized on economic development in Tamilnadu, including topics like welfare schemes, rural programs, human development indicators, and pressing challenges such as unemployment and poverty.</p>
                  <EconomyTable />
                  <p><b>2. Tamilnadu History, Culture & Movements - 40 Questions</b></p>
                  <p>Since TNPSC Group 1 exam is a state exam conducted by and in Tamilnadu, it brings forth topics related to Tamilnadu’s contribution to Indian culture, literature, and history. It focuses on the movements such as self-respect movement, contributions of periyar, and literary significance of Thirukkural. </p>
                  <HistoryTable />
                  <p><b>3. Indian Polity - 40 Questions</b></p>
                  <p>The Indian Polity section is primarily related to the Indian constitution, its features, governance, structures and federal relations. It covers topics such as fundamental rights, duties, local governance, judiciary systems, etc.</p>
                  <PolityTable />
                  <p><b>4. History and Indian National Movement - 25 Questions</b></p>
                  <p>This section covers the major Indian national movements spanning freedom struggle, rise of dynasties and cultural evolution. It also includes several notable personalities involved in the freedom struggle and social reforms movements.</p>
                  <IndianHistoryTable />
                  <p><b>5. Geography of India - 10 Questions</b></p>
                  <p>It focused on the physical and social geography of India. The former includes climate, rivers, natural resources and agriculture. And, the latter includes population, communication and disaster management. </p>
                  <GeographyTable />
                  <p><b>6. General Science - 10 Questions</b></p>
                  <p>This part of the TNPSC Group 1 syllabus focuses on the basic concepts in Physics, chemistry, biology, and environmental science.  </p>
                  <ScienceTable />
                </div>
              </div>

              {/* Mains */}
              <div className="syllabus-box-wrap" style={{ marginTop: '30px' }}>
                <h3 className="syllabus-box-title">{group1Mains.title}</h3>
                <p className="syllabus-box-meta">{group1Mains.description}</p>
                <div className="syllabus-scroll-box">
                  {group1Mains.papers.map((paper, pi) => (
                    <div key={pi} className="syllabus-topic-item">
                      <div className="topic-name">{paper.name} <span className="topic-q-badge">{paper.marks}</span></div>
                      <div className="topic-detail">{paper.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview */}
              <div className="interview-note">
                <span className="interview-label">TNPSC Group 1 - Interview</span>
                <p>TNPSC Group 1 is the final step of the recruitment process for the various positions in Tamilnadu. In this stage, the candidates’ personality, communication skills and general awareness of the society will be tested. This interview is conducted by a panel of experts including experienced administrators and subject matter experts. Mostly, questions are based on current affairs, general knowledge, personal and behavioural questions, etc. </p>
                <p>This is the complete information on the TNPSC group 1 syllabus. You might think of how to schedule these subjects properly and study them. In the succeeding section, we are providing some tips to manage your study process. </p>
              </div>
            </div>
          )}

          {/* Group 2 & 2A Tab */}
          {activeTab === 'group2' && (
            <div className="tab-content">
              <div className="group2-note">
                Prelims and Mains are common to both TNPSC Group 2 and 2A. The only difference is that Group 2 involves interviews, while Group 2A is not. Here is the brief syllabus breakdown for TNPSC Group 2 and Group 2A Syllabus. 
              </div>

              <div className="syllabus-box-wrap">
                <h3 className="syllabus-box-title">TNPSC Group 2 & 2A – Prelims Syllabus</h3>
                <div className="syllabus-scroll-box">
                  {group2Syllabus.prelims.map((item, idx) => (
                    <div key={idx} className="syllabus-topic-item">
                      <div className="topic-name">{item.subject}</div>
                      <div className="topic-detail">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="syllabus-box-wrap" style={{ marginTop: '30px' }}>
                <h3 className="syllabus-box-title">TNPSC Group 2 & 2A – Mains Syllabus</h3>
                <div className="syllabus-scroll-box">
                  {group2Syllabus.mains.map((item, idx) => (
                    <div key={idx} className="syllabus-topic-item">
                      <div className="topic-name">{item.subject}</div>
                      <div className="topic-detail">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 4 Tab */}
          {activeTab === 'group4' && (
            <div className="tab-content">

              <div className="syllabus-box-wrap">
                <h3 className="syllabus-box-title">TNPSC Group 4 Syllabus</h3>
                <p className="syllabus-box-meta">TNPSC Group 4 Syllabus: General Studies (75 Questions)</p>
                <div className="syllabus-scroll-box">
                 <p>As per TNPSC group 4 syllabus, general studies has 75 questions, designed based on SSLC standards. It covers a diverse topics including the nature of the universe, disaster management, indus valley civilization, constitution of India, and the nature of Indian economy. </p>
                 <TNPSCGroupTableFour />
                </div>
              </div>

               <div className="syllabus-box-wrap" style={{ marginTop: '30px' }}>
                <h3 className="syllabus-box-title">TNPSC Group 4 Syllabus: Aptitude and Mental Ability Test (25 Questions)</h3>
                <div className="syllabus-scroll-box">
                  <p>Aptitude and Mental ability consists of 25 questions, covering topics like simplification, logical reasoning, compound interest, and number series.</p>
                  <TnpscgroupFourAtitude />
                </div>
              </div>

              <div className="syllabus-box-wrap" style={{ marginTop: '30px' }}>
                <h3 className="syllabus-box-title">TNPSC Group 4 Syllabus: Tamil Eligibility-cum-Scoring Test (100 Questions)</h3>
                <div className="syllabus-scroll-box">
                  <p>This section of the TNPSC Group 4 exam contains 100 questions for the candidates to answer.  It focuses on testing the candidate’s tamil language proficiency, covering grammar, vocabulary, idioms, comprehension, writing skills, translation and literature. In this part, candidates have the option to choose over the language, either Tamil or English, based on their convenience and preference.</p>
                </div>
              </div>


            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container-tnpsc">
          <div className="section-head">
            <span className="section-tag">FAQs</span>
            <h2>Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about TNPSC coaching at KingMakers IAS Academy.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'faq-open' : ''}`}>
                <button className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="tnpsc-cta">
        <div className="cta-inner">
          <h2>Ready to Start Your TNPSC Journey?</h2>
          <p>Join thousands of successful officers trained at KingMakers IAS Academy</p>
          <div className="cta-buttons">
            <a className="cta-btn primary" href="tel:+919444227273">📞 Call: +91 94442 27273</a>
            <a className="cta-btn secondary" href="mailto:kingmakersiasacademy@gmail.com">📧 Email Us</a>
          </div>
        </div>
      </section> */}

    </div>
  );
};

export default TNPSC;
