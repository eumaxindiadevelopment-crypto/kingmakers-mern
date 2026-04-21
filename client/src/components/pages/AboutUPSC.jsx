import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/about-upsc.css';

const AboutUPSC = () => {
  const [activeTab, setActiveTab] = useState('about');

  /* ── Data ─────────────────────────────────────── */

  const prelimsGS = [
    'Current events of national and international importance',
    'History of India and the Indian National Movement',
    'Indian and World Geography – Physical, Social and Economic',
    'Indian Polity and Governance – Constitution, Panchayati Raj, Rights Issues, etc.',
    'Economic and Social Development – Sustainable Development, Poverty, Demographics',
    'General issues on Environmental Ecology, Bio-diversity and Climate Change',
    'General Science',
  ];

  const prelimsCSAT = [
    'Comprehension',
    'Interpersonal skills including communication skills',
    'Logical reasoning and Analytical ability',
    'Decision-making and Problem-solving',
    'General mental ability',
    'Basic numeracy and Data interpretation (Class X level)',
  ];

  const mainsData = [
    {
      label: 'Paper I',
      title: 'Essay',
      desc: 'Candidates write essays on specific topics. Orderly arrangement of ideas and concise expression are rewarded.',
      topics: [],
    },
    {
      label: 'Paper II',
      title: 'General Studies I – Heritage, History & Geography',
      desc: 'Indian Heritage & Culture, Modern Indian History, World History, Indian Society, World Geography.',
      topics: [
        'Indian culture – Art, Literature & Architecture (ancient to modern)',
        'Modern Indian history – significant events and personalities',
        'The Freedom Struggle – stages and contributors',
        'Post-independence consolidation and reorganization',
        'World history – Industrial Revolution, World Wars, colonization',
        'Salient features of Indian Society; Diversity of India',
        'Role of women, population, poverty and urbanization',
        'Effects of globalization on Indian Society',
        'Key natural resources across the world',
        'Geophysical phenomena – earthquakes, Tsunami, cyclone etc.',
      ],
    },
    {
      label: 'Paper III',
      title: 'General Studies II – Governance, Polity & IR',
      desc: 'Indian Constitution, Governance, Social Justice, and International Relations.',
      topics: [
        'Indian Constitution – historical underpinnings, evolution, features',
        'Functions of Union and States; federal structure challenges',
        'Separation of powers; dispute redressal mechanisms',
        'Parliament and State Legislatures – structure and functioning',
        'Executive and Judiciary structure and functioning',
        'Salient features of the Representation of People Act',
        'Government policies and interventions for development',
        'Welfare schemes for vulnerable sections',
        'Governance, transparency and accountability; e-governance',
        'Role of civil services in a democracy',
        "India's bilateral, regional and global relations",
        'Important international institutions and agencies',
      ],
    },
    {
      label: 'Paper IV',
      title: 'General Studies III – Technology, Economy & Security',
      desc: 'Economic Development, Technology, Environment, Biodiversity, Security & Disaster Management.',
      topics: [
        'Indian Economy – planning, growth, development and employment',
        'Inclusive growth and related issues',
        'Government Budgeting',
        'Major crops, irrigation systems, agricultural supply chain',
        'Food processing industries in India',
        'Land reforms in India',
        'Infrastructure: Energy, Ports, Roads, Railways',
        'Science and Technology – developments and applications',
        'IT, Space, Robotics, Nano-technology, Bio-technology',
        'Conservation, environmental pollution, Climate Change',
        'Disaster and disaster management',
        'Internal security challenges; Cyber security',
        'Security forces and agencies and their mandate',
      ],
    },
    {
      label: 'Paper V',
      title: 'General Studies IV – Ethics, Integrity & Aptitude',
      desc: 'Covers ethics, integrity, attitude, emotional intelligence and public service values.',
      topics: [
        'Essence and determinants of Ethics in human actions',
        'Human Values – lessons from great leaders and reformers',
        'Attitude and its influence on thought and behaviour',
        'Foundational values for Civil Service – integrity, impartiality, empathy',
        'Emotional intelligence – concepts and application in governance',
        'Contributions of moral thinkers from India and world',
        'Ethics in Public administration – dilemmas and concerns',
        'Probity in Governance – transparency, Right to Information',
        'Code of conduct; Quality of public service delivery',
        'Case Studies on ethical issues',
      ],
    },
    {
      label: 'Paper VI & VII',
      title: 'Optional Subject – Papers I & II',
      desc: 'Candidates choose any one optional subject from the prescribed list for two papers (Paper VI & Paper VII).',
      topics: [],
    },
  ];

  const optionalSubjects = [
    'Agriculture',  'Anthropology',
    'Botany', 'Chemistry', 'Civil Engineering', 'Commerce & Accountancy',
    'Economics', 'Electrical Engineering', 'Geography', 'Geology',
    'History', 'Law', 'Management', 'Mathematics', 'Mechanical Engineering',
    'Medical Science', 'Philosophy', 'Physics',
    'Psychology',
    'Public Administration', 'Sociology', 'Statistics', 'Zoology','Animal Husbandry & Vet. Science','Political Science & International Relations'
  ];

  const whyFacts = [
    { icon: 'fa-landmark', label: '24 Services', desc: 'IAS, IPS, IFS, IRS and 21 other All India & Central Services' },
    { icon: 'fa-layer-group', label: '3 Stages', desc: 'Prelims → Mains → Interview – a comprehensive multi-stage selection' },
    { icon: 'fa-graduation-cap', label: 'Any Graduate', desc: 'Open to graduates of any recognised university (UGC/AICTE)' },
    { icon: 'fa-calendar-alt', label: 'Once a Year', desc: 'Notified and conducted annually by UPSC' },
    { icon: 'fa-globe', label: 'All-India Level', desc: 'National-level exam open to all Indian citizens' },
    { icon: 'fa-trophy', label: '~1000 Vacancies', desc: 'Approximately 800–1000+ posts filled each year across all services' },
  ];

  const tabs = [
    { id: 'about', label: 'About The Exam' },
    { id: 'structure', label: 'Exam Structure' },
    { id: 'syllabus', label: 'Syllabus' },
  ];


  
  const eligibility = [
    {
      category: 'General Category',
      minAge: '21 Years',
      maxAge: '32 Years',
      attempts: '6 Attempts',
      icon: '👤'
    },
    {
      category: 'OBC Category',
      minAge: '21 Years',
      maxAge: '35 Years',
      attempts: '9 Attempts',
      icon: '👥'
    },
    {
      category: 'SC/ST Category',
      minAge: '21 Years',
      maxAge: '37 Years',
      attempts: 'No Limit',
      icon: '🌍'
    },
    {
      category: 'PwD Category',
      minAge: '21 Years',
      maxAge: '42 Years',
      attempts: 'Varies',
      icon: '♿'
    }
  ];


    const Foresteligibility = [
    {
      category: 'General Category',
      minAge: '21 Years',
      maxAge: '32 Years',
      attempts: '6 Attempts',
      icon: '👤'
    },
    {
      category: 'OBC Category',
      minAge: '21 Years',
      maxAge: '35 Years',
      attempts: '9 Attempts',
      icon: '👥'
    },
    {
      category: 'SC/ST Category',
      minAge: '21 Years',
      maxAge: '37 Years',
      attempts: 'No Limit',
      icon: '🌍'
    },
    {
      category: 'PwD Category',
      minAge: '21 Years',
      maxAge: '42 Years',
      attempts: 'Varies',
      icon: '♿'
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

    const ForestexamSchedule = [
    { event: 'Preliminary Examination', timing: 'May / June' },
    { event: 'Prelims Results', timing: 'July / August' },
    { event: 'Mains Examinations', timing: 'November / December' },
    { event: 'Mains Results', timing: 'January 1st Week / 2nd Week' },
    { event: 'Interview', timing: 'January / February' },
    { event: 'Final Results', timing: 'February / March' }
  ];

  return (
    <div className="about-upsc-page">

      {/* ── Hero ── */}
      <section className="au-hero">
        <div className="au-hero-inner">
          {/* <span className="au-hero-tag">Civil Services</span> */}
          <h1>About UPSC</h1>
          <p>
            Everything you need to know about the Union Public Service Commission Civil Services Examination
            — from eligibility and exam structure to the complete syllabus.
          </p>
        </div>
      </section>

      {/* ── Tabs Navigation ── */}
      <div className="au-tabs-wrap">
        <div className="container-au">
          <div className="au-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`au-tab-btn ${activeTab === tab.id ? 'au-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TAB 1 — ABOUT THE EXAM
      ═══════════════════════════════════════════ */}
      {activeTab === 'about' && (
        <div className="au-tab-content">

          {/* What is UPSC */}
          <section className="au-about-intro">
            <div className="container-au">
              <div className="au-about-grid">
                <div className="au-about-text">
                  <span className="au-section-tag">Overview</span>
                  <h2>What is UPSC?</h2>
                  <p>
                    The <strong>Union Public Service Commission (UPSC)</strong> is a constitutional body established
                    under Article 315 of the Indian Constitution. It is the premier central recruiting agency of
                    India, responsible for conducting the Civil Services Examination (CSE) — the gateway to the
                    most prestigious administrative, police, and foreign service positions in the country.
                  </p>
                  <p>
                    Conducted once every year, the UPSC Civil Services Examination selects officers for
                    <strong> 24 services</strong> including the Indian Administrative Service (IAS), Indian Police
                    Service (IPS), Indian Foreign Service (IFS), and the Indian Revenue Service (IRS), among others.
                  </p>
                  <p>
                    The examination is widely regarded as one of the most <strong>challenging and comprehensive
                    competitive exams in the world</strong>, testing a candidate across a vast range of subjects —
                    from history and geography to economics, ethics, and current affairs.
                  </p>
                </div>
                <div className="au-about-facts">
                  {whyFacts.map((f, i) => (
                    <div key={i} className="au-fact-card">
                      <span className="au-fact-icon"><i className={`fa fa-fw ${f.icon}`}></i></span>
                      <div>
                        <strong>{f.label}</strong>
                        <p>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why Prestigious */}
          <section className="au-why-prestigious">
            <div className="container-au">
              <div className="au-section-head why-prestigious">
                <span className="au-section-tag">Significance</span>
                <h2>Why is UPSC So Prestigious?</h2>
                {/* <p className="au-section-sub">
                  The UPSC CSE is more than an exam — it is a life-defining journey that shapes the future leaders of India.
                </p> */}
              </div>
              <div className="au-prestige-grid">
                <div className="au-prestige-card">
                  <div className="au-prestige-num">01</div>
                  <h3>Gateway to Nation-Building</h3>
                  <p>IAS and IPS officers directly shape policy, law enforcement, and development at every level of government — from villages to the Union Cabinet.</p>
                </div>
                <div className="au-prestige-card">
                  <div className="au-prestige-num">02</div>
                  <h3>Exceptional Selectivity</h3>
                  <p>Over 10 lakh candidates apply each year, yet only ~1,000 are selected — a selection rate of less than 0.1%, making it one of the toughest exams globally.</p>
                </div>
                <div className="au-prestige-card">
                  <div className="au-prestige-num">03</div>
                  <h3>Holistic Assessment</h3>
                  <p>The exam tests knowledge, analytical thinking, writing ability, ethical reasoning, and personality — ensuring only the most well-rounded individuals serve as officers.</p>
                </div>
                <div className="au-prestige-card">
                  <div className="au-prestige-num">04</div>
                  <h3>Job Security & Power</h3>
                  <p>Civil servants enjoy permanent tenure, All-India posting authority, significant decision-making power, and the respect of holding constitutional positions.</p>
                </div>
                <div className="au-prestige-card">
                  <div className="au-prestige-num">05</div>
                  <h3>Social Impact</h3>
                  <p>Officers drive welfare programmes, implement government schemes, and have a direct hand in alleviating poverty and improving education, health, and infrastructure.</p>
                </div>
                <div className="au-prestige-card">
                  <div className="au-prestige-num">06</div>
                  <h3>Lifelong Learning</h3>
                  <p>Preparing for UPSC requires mastering a wide interdisciplinary syllabus, making aspirants versatile, well-informed citizens regardless of their final result.</p>
                </div>
              </div>
            </div>
          </section>




          {/* Eligibility */}
          <section className="au-eligibility">
            <div className="container-au">
              <div className="au-section-head">
                {/* <span className="au-section-tag">Who Can Apply</span> */}
                <h2>Eligibility Criteria</h2>
                <p className="au-section-sub">
                  Check the age, educational, and attempt criteria for Civil Services and Forest Service examinations.
                </p>
              </div>
              <div className="au-elig-grid">
                <div className="au-elig-card">
                  <div className="au-elig-card-head">
                    {/* <div className="au-elig-icon"><i className="fa fa-university fa-fw"></i></div> */}
                    <h3>Civil Services Examination</h3>
                  </div>
                  <ul className="au-elig-list">
                    <li>Must have attained 21 years of age on 1st August of the year of examination.</li>
                    <li>Must not have attained 32 years (35 / 37 years for reserved categories) on 1st August.</li>
                    <li>Educational Qualification: Any Degree recognized by UGC / AICTE.</li>
                    <li>Attempts: General – 6 | OBC – 9 | SC/ST – Unlimited (up to age limit).</li>
                  </ul>
                </div>
                <div className="au-elig-card">
                  <div className="au-elig-card-head">
                    {/* <div className="au-elig-icon"><i className="fa fa-tree fa-fw"></i></div> */}
                    <h3>Forest Service Examination</h3>
                  </div>
                  <ul className="au-elig-list">
                    <li>Must have attained 21 years of age before 1st August of the year of examination.</li>
                    <li>Must not have attained 32 years (35 / 37 years for reserved categories) on 1st August.</li>
                    <li>Degree in Agriculture, Forestry, Botany, Zoology, Chemistry, Geology, Maths, Physics, Statistics, Animal Husbandry & Vet. Science, or Engineering.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          
      {/* Eligibility Section */}
      <section className="upsc-eligibility">
        <div className="container-upsc">
          <h2>Civil Services Eligibility Criteria</h2>
          <div className="eligibility-grid">
            {eligibility.map((item, idx) => (
              <div key={idx} className="eligibility-card">
                {/* <span className="eligibility-icon">{item.icon}</span> */}
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
      </section> 

      {/* Exam Schedule Section */}
    <section className="exam-schedule">
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
      </section> 


          
      {/* Eligibility Section */}
      <section className="upsc-eligibility">
        <div className="container-upsc">
          <h2>Forest Service Eligibility Criteria</h2>
          <div className="eligibility-grid">
            {Foresteligibility.map((item, idx) => (
              <div key={idx} className="eligibility-card">
                {/* <span className="eligibility-icon">{item.icon}</span> */}
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
      </section> 


      {/* Exam Schedule Section */}
    <section className="exam-schedule">
        <div className="container-upsc">
          <h2>UPSC Forest Service Exam Schedule</h2>
          <div className="schedule-grid">
            {ForestexamSchedule.map((item, idx) => (
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
      </section> 


        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB 2 — EXAM STRUCTURE
      ═══════════════════════════════════════════ */}
      {activeTab === 'structure' && (
        <div className="au-tab-content">

          {/* Three stages overview */}
          <section className="au-structure-intro">
            <div className="container-au">
              <div className="au-section-head">
                <span className="au-section-tag">Exam Pattern</span>
                <h2>Three Stages of UPSC CSE</h2>
                <p className="au-section-sub">
                  The Civil Services Examination is conducted in three progressive stages.
                  Each stage must be cleared to proceed to the next.
                </p>
              </div>
              <div className="au-stage-flow">
                <div className="au-stage-flow-card">
                  <div className="au-stage-flow-num">1</div>
                  <div className="au-stage-flow-icon"><i className="fa fa-pencil-alt"></i></div>
                  <h3>Preliminary Examination</h3>
                  <span className="au-stage-badge">Objective &bull; Screening</span>
                  <p>Conducted in May / June every year. Consists of two objective-type MCQ papers on the same day.</p>
                </div>
                <div className="au-stage-flow-arrow"><i className="fa fa-arrow-right"></i></div>
                <div className="au-stage-flow-card">
                  <div className="au-stage-flow-num">2</div>
                  <div className="au-stage-flow-icon"><i className="fa fa-book-open"></i></div>
                  <h3>Mains Examination</h3>
                  <span className="au-stage-badge">Descriptive &bull; Merit-Based</span>
                  <p>Conducted in September / October. Nine papers including Essay, GS papers, and one Optional Subject.</p>
                </div>
                <div className="au-stage-flow-arrow"><i className="fa fa-arrow-right"></i></div>
                <div className="au-stage-flow-card">
                  <div className="au-stage-flow-num">3</div>
                  <div className="au-stage-flow-icon"><i className="fa fa-microphone"></i></div>
                  <h3>Personality Test</h3>
                  <span className="au-stage-badge">Interview &bull; 275 Marks</span>
                  <p>Conducted in Delhi. Assesses personality, communication, and awareness. Final rank = Mains + Interview.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Prelims deep dive */}
          <section className="au-structure-section au-bg-light">
            <div className="container-au">
              <div className="au-structure-block">
                <div className="au-structure-label">
                  <span className="au-str-num">Stage 1</span>
                  <h2>Preliminary Examination</h2>
                  <p className="au-str-sub">Common for Civil & Forest Services</p>
                </div>
                <div className="au-structure-detail">
                  <p>
                    The Preliminary Examination is a <strong>screening test</strong> — its marks do not count towards the final merit list.
                    It is conducted once a year and consists of two papers held on the same day (forenoon and afternoon sessions).
                    Both papers are <strong>objective-type (MCQ)</strong> with negative marking for wrong answers (1/3rd mark deducted per wrong answer).
                  </p>

                  <div className="au-str-paper-row">
                    <div className="au-str-paper">
                      <div className="au-str-paper-head">
                        <span className="au-str-paper-tag">Paper I</span>
                        <h4>General Studies</h4>
                        <span className="au-str-marks">200 Marks | 100 Questions | 2 Hours</span>
                      </div>
                      <p>Tests general awareness covering history, geography, polity, economy, science, environment, and current affairs. Marks determine eligibility for Mains.</p>
                    </div>
                    <div className="au-str-paper">
                      <div className="au-str-paper-head">
                        <span className="au-str-paper-tag au-tag-gold">Paper II – CSAT</span>
                        <h4>Aptitude Test</h4>
                        <span className="au-str-marks">200 Marks | 80 Questions | 2 Hours</span>
                      </div>
                      <p>Tests comprehension, reasoning, numerical ability, and decision-making. <strong>Qualifying paper — minimum 33% (66 marks) required</strong>, marks not counted for Mains merit.</p>
                    </div>
                  </div>

                  <div className="au-str-info-box">
                    <h4><i className="fa fa-info-circle"></i> Key Points</h4>
                    <ul>
                      <li>Candidates must appear in <strong>both papers</strong> on the exam day; absence in one is counted as an attempt.</li>
                      <li>If you apply but do not appear, it is <strong>not counted as an attempt</strong>.</li>
                      <li>Two separate merit lists are published — one for Civil Service Mains and one for Forest Service Mains.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mains deep dive */}
          <section className="au-structure-section">
            <div className="container-au">
              <div className="au-structure-block">
                <div className="au-structure-label">
                  <span className="au-str-num">Stage 2</span>
                  <h2>Main Examination</h2>
                  <p className="au-str-sub">Descriptive | 9 Papers</p>
                </div>
                <div className="au-structure-detail">
                  <p>
                    The Mains Examination consists of <strong>9 written papers</strong> — 2 qualifying papers and 7 merit-ranking papers.
                    It is a <strong>descriptive/analytical</strong> examination that demands in-depth knowledge, structured answers, and strong writing ability.
                    The syllabus and pattern differ for Civil Service and Forest Service examinations.
                  </p>

                  <div className="au-mains-table">
                    <div className="au-mains-row au-mains-header">
                      <span>Paper</span><span>Subject</span><span>Marks</span><span>Type</span>
                    </div>
                    {[
                      { paper: 'Paper A', subject: 'Indian Language (compulsory)', marks: 300, type: 'Qualifying' },
                      { paper: 'Paper B', subject: 'English (compulsory)', marks: 300, type: 'Qualifying' },
                      { paper: 'Paper I', subject: 'Essay', marks: 250, type: 'Merit' },
                      { paper: 'Paper II', subject: 'General Studies I', marks: 250, type: 'Merit' },
                      { paper: 'Paper III', subject: 'General Studies II', marks: 250, type: 'Merit' },
                      { paper: 'Paper IV', subject: 'General Studies III', marks: 250, type: 'Merit' },
                      { paper: 'Paper V', subject: 'General Studies IV (Ethics)', marks: 250, type: 'Merit' },
                      { paper: 'Paper VI', subject: 'Optional Subject – Paper I', marks: 250, type: 'Merit' },
                      { paper: 'Paper VII', subject: 'Optional Subject – Paper II', marks: 250, type: 'Merit' },
                    ].map((row, i) => (
                      <div key={i} className={`au-mains-row ${row.type === 'Qualifying' ? 'au-qualifying-row' : ''}`}>
                        <span><strong>{row.paper}</strong></span>
                        <span>{row.subject}</span>
                        <span>{row.marks}</span>
                        <span>
                          <span className={`au-type-badge ${row.type === 'Qualifying' ? 'au-badge-qualifying' : 'au-badge-merit'}`}>
                            {row.type}
                          </span>
                        </span>
                      </div>
                    ))}
                    <div className="au-mains-row au-mains-total">
                      <span></span><span><strong>Total Merit Marks</strong></span><span><strong>1750</strong></span><span></span>
                    </div>
                  </div>

                  <div className="au-str-info-box">
                    <h4><i className="fa fa-info-circle"></i> Key Points</h4>
                    <ul>
                      <li>Qualifying papers (A & B) require a minimum of <strong>25%</strong> to pass — marks not counted in merit.</li>
                      <li>Merit is calculated out of <strong>1750 marks</strong> (7 merit papers × 250).</li>
                      <li>Optional subject papers carry significant weight — choosing wisely is crucial.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interview deep dive */}
          <section className="au-structure-section au-bg-light">
            <div className="container-au">
              <div className="au-structure-block">
                <div className="au-structure-label">
                  <span className="au-str-num">Stage 3</span>
                  <h2>Personality Test</h2>
                  <p className="au-str-sub">Interview | 275 Marks</p>
                </div>
                <div className="au-structure-detail">
                  <p>
                    The Personality Test (Interview) is the <strong>final stage</strong> of the Civil Services Examination,
                    conducted by a panel of expert members at the UPSC Bhawan in New Delhi. It is not just a knowledge
                    test — it assesses whether a candidate has the <strong>mental calibre, integrity, leadership, and social
                    awareness</strong> required to serve as a civil servant.
                  </p>

                  <div className="au-interview-grid">
                    <div className="au-interview-card">
                      <span className="au-iv-icon"><i className="fa fa-bullseye fa-fw"></i></span>
                      <h4>Purpose</h4>
                      <p>Assess the candidate's suitability for a career in civil services — beyond academic knowledge.</p>
                    </div>
                    <div className="au-interview-card">
                      <span className="au-iv-icon"><i className="fa fa-users fa-fw"></i></span>
                      <h4>Panel</h4>
                      <p>A Board of competent and unbiased observers — experienced administrators and domain experts.</p>
                    </div>
                    <div className="au-interview-card">
                      <span className="au-iv-icon"><i className="fa fa-chart-bar fa-fw"></i></span>
                      <h4>Marks</h4>
                      <p>Carries 275 marks. Final merit = Mains (1750) + Interview (275) = <strong>2025 marks total</strong>.</p>
                    </div>
                    <div className="au-interview-card">
                      <span className="au-iv-icon"><i className="fa fa-comments fa-fw"></i></span>
                      <h4>Topics Covered</h4>
                      <p>Current affairs, personal background, general awareness, ethical dilemmas, and situational questions.</p>
                    </div>
                    <div className="au-interview-card">
                      <span className="au-iv-icon"><i className="fa fa-star fa-fw"></i></span>
                      <h4>Qualities Assessed</h4>
                      <p>Mental alertness, critical thinking, balance of judgement, communication, leadership, and integrity.</p>
                    </div>
                    <div className="au-interview-card">
                      <span className="au-iv-icon"><i className="fa fa-calendar-check fa-fw"></i></span>
                      <h4>Schedule</h4>
                      <p>Conducted in March–April. Final results released in May. Selected candidates begin training thereafter.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB 3 — SYLLABUS
      ═══════════════════════════════════════════ */}
      {activeTab === 'syllabus' && (
        <div className="au-tab-content">

          {/* Prelims Syllabus */}
          <section className="au-syl-section au-bg-light">
            <div className="container-au">
              <div className="au-section-head">
                <span className="au-section-tag">Stage 1</span>
                <h2>Preliminary Examination Syllabus</h2>
                <p className="au-section-sub">Two objective-type papers — GS Paper I (200 marks) and CSAT Paper II (qualifying).</p>
              </div>
              <div className="au-paper-grid">
                <div className="au-paper-card">
                  <div className="au-paper-head">
                    <span className="au-paper-badge">Paper I</span>
                    <h3>General Studies</h3>
                  </div>
                  <ul className="au-paper-list">
                    {prelimsGS.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="au-paper-card">
                  <div className="au-paper-head">
                    <span className="au-paper-badge au-badge-gold">Paper II – CSAT</span>
                    <h3>Aptitude & Reasoning</h3>
                  </div>
                  <ul className="au-paper-list">
                    {prelimsCSAT.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="au-paper-note">
                    <p><i className="fa fa-thumbtack"></i> Qualifying paper — minimum 33% (66 marks) required.</p>
                    <p><i className="fa fa-thumbtack"></i> Candidates must appear in both papers; absence counts as an attempt.</p>
                    <p><i className="fa fa-thumbtack"></i> Applying but not appearing does NOT count as an attempt.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mains Syllabus */}
          <section className="au-syl-section">
            <div className="container-au">
              <div className="au-section-head">
                <span className="au-section-tag">Stage 2</span>
                <h2>Civil Services Mains Syllabus</h2>
                <p className="au-section-sub">
                  9 papers total — 2 qualifying + 7 merit-based. Final merit is out of 1750 + 275 (interview) = 2025 marks.
                </p>
              </div>
              <div className="au-mains-papers">
                {mainsData.map((paper, i) => (
                  <div key={i} className="au-mains-paper">
                    <div className="au-mains-paper-head">
                      <div className="au-mains-paper-num">{paper.label}</div>
                      <div className="au-mains-paper-info">
                        <h4>{paper.title}</h4>
                        <p>{paper.desc}</p>
                      </div>
                    </div>
                    {paper.topics.length > 0 && (
                      <div className="au-mains-paper-body">
                        <ul className="au-mains-topics">
                          {paper.topics.map((t, j) => (
                            <li key={j}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Optional Subjects */}
          <section className="au-syl-section au-bg-light">
            <div className="container-au">
              <div className="au-section-head">
                <span className="au-section-tag">Papers VI & VII</span>
                <h2>Optional Subjects for Mains</h2>
                <p className="au-section-sub">
                  Choose any one optional subject from the list below. Two papers (VI & VII) of 250 marks each.
                </p>
              </div>
              <div className="au-optional-grid">
                {optionalSubjects.map((subj, i) => (
                  <div key={i} className="au-optional-item">{subj}</div>
                ))}
                <div className="au-optional-item au-optional-literature">
                  <i className="fa fa-book"></i> Literature of any one language: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santhali, Sindhi, Tamil, Telugu, Urdu & English.
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ── CTA ── */}
      {/* <section className="au-cta">
        <div className="container-au">
          <h2>Ready to Begin Your IAS Journey?</h2>
          <p>Join KingMakers IAS Academy — where aspirants become civil servants.</p>
          <div className="au-cta-btns">
            <Link to="/upsc/" className="au-cta-btn primary"><i className="fa fa-list-alt"></i> Explore UPSC Courses</Link>
            <Link to="/contact-us/" className="au-cta-btn secondary"><i className="fa fa-phone"></i> Contact Us</Link>
          </div>
        </div>
      </section> */}

    </div>
  );
};

export default AboutUPSC;
