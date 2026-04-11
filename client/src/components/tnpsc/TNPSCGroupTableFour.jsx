import React from "react";
import "./HistoryTable.css";

const data = [
  {
    section: "General Science",
    topics: [
      {
        topic: "5 question", 
        subtopics: [
          "Nature of Universe, Measurement of physical quantities, General scientific laws in motion - force, pressure, and energy - Everyday application of the basic principles of mechanics, electricity, magnetism, light, sound, heat, and nuclear physics in our daily life; Elements and compounds, acids, bases, salts, petroleum products, fertilizers, pesticides, metallurgy, and food adulterants; main concepts of life science, classification of living organisms, evolution, genetics, physiology, nutrition, health and hygiene, human diseases; Environmental science; Latest inventions in science and technology; Current affairs",
        ],
      },
    ],
  },
  {
    section: "Geography",
    topics: [
      {
        topic: "5 questions",
        subtopics: [
          "Earth location - Physical features - Monsoon, rainfall, weather, and climate - Water resources - Rivers - Soil, Minerals, and Natural resources - Forest and Wildlife - Agriculture pattern; Transport - Communication; Population density and distribution in Tamil Nadu and India; Calamities - Disaster management - Environment - Climate change; Geographical landmarks; Current affairs",
        ],
      },
    ],
  },
  {
    section: "History, Culture of India, and Indian National Movement",
    topics: [
      {
        topic: "10 questions",
        subtopics: [
          "Indus Valley Civilization - Guptas, Delhi Sultans, Mughals, and Marathas – South Indian History; National Renaissance - Early uprising against British Rule - Indian National Congress - Emergence of Leaders - B.R.Ambedkar, Bhagat Singh, Bharathiar, V.O.Chidambaranar, Thanthai Periyar, Jawaharlal Nehru, Rabindranath Tagore, Kamarajar, Mahatma Gandhi, Maulana Abul Kalam Azad, Rajaji, Subhash Chandra Bose, Muthulaksmi Ammaiyar, Muvalur Ramamirtham, and other National Leaders; Different modes of agitation of Tamil Nadu and movements; Characteristics of Indian Culture, Unity in Diversity - Race, Language, Custom; India as a secular state."
        ],
      },
    ],
  },
  {
    section: "Indian Polity",
    topics: [
      {
        topic: "15 questions",
        subtopics: [
          "Constitution of India - Preamble to the Constitution – Salient features of the Constitution - Union, State, and Union Territory; Citizenship, Fundamental Rights, Fundamental Duties, Directive Principles of State Policy; Union Executive, Union Legislature – State Executive, State Legislature - Local Governments, Panchayat Raj; Spirit of federalism: Centre - State relationships; Election - Judiciary in India - Rule of Law; Corruption in public life - Anti-Corruption measures - Lokpal and Lokayukta – Right to Information - Empowerment of Women - Consumer Protection Forums - Human Rights Charter; Political parties and political system in Tamil Nadu and India; Current affairs.",
        ],
      },
    ],
  },
    {
    section: "Indian Economy and Development Administration in Tamil Nadu",
    topics: [
      {
        topic: "20 questions",
        subtopics: [
          "Nature of Indian economy - Five-year plan models - an assessment - Planning Commission and Niti Aayog; Sources of revenue - Reserve Bank of India - Finance Commission - Resource sharing between Union and State Governments - Goods and Services Tax; Economic trends - Employment generation, Land reforms and Agriculture - Application of Science and Technology in Agriculture; Industrial growth - Rural Welfare oriented programmes - Social problems – Population, Education, Health, Employment, Poverty; Social Justice and Social Harmony as the cornerstones of socioeconomic development; Education and Health systems in Tamil Nadu; Geography of Tamil Nadu and its impact on economic growth; Welfare schemes of Government; Current socio-economic issues; Current affairs.",
        ],
      },
    ],
  },

   {
    section: "History, Culture, Heritage, and Socio-Political Movements of Tamil Nadu",
    topics: [
      {
        topic: "20 questions",
        subtopics: [
          "History of Tamil Society, related archaeological discoveries - Tamil Literature from Sangam age till contemporary times; Thirukkural - Significance as a Secular Literature - Relevance to everyday life - Impact of Thirukkural on Humanity - Thirukkural and Universal Values – Relevance to Sociopolitico-economic affairs - Philosophical content in Thirukkural; Role of Tamil Nadu in freedom Page 2 of 4 struggle - Early agitations against British Rule - Role of women in freedom struggle; Various Social reformers, Social reform movements and Social transformation of Tamil Nadu",
        ],
      },
    ],
  },

];

const TNPSCGroupTableFour = () => {
  return (
    <div className="history-table-wrapper">
      <table className="history-table">
        <thead>
          <tr>
            <th>Unit</th>
            <th>No.of.questions</th>
            <th>Topics</th>
          </tr>
        </thead>

        <tbody>
          {data.map((section, sIndex) =>
            section.topics.map((topic, tIndex) => (
              <tr key={`${sIndex}-${tIndex}`}>
                {tIndex === 0 && (
                  <td rowSpan={section.topics.length} className="section-cell">
                    {section.section}
                  </td>
                )}

                <td className="topic-cell">{topic.topic}</td>

                <td>
                  <ul className="subtopic-list">
                    {topic.subtopics.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TNPSCGroupTableFour;