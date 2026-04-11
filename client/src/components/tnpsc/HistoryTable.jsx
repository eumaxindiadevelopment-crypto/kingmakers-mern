import React from "react";
import "./HistoryTable.css";

const data = [
  {
    section: "Ancient Tamil Nadu",
    topics: [
      {
        topic: "Sangam Period",
        subtopics: [
          "Three Kingdoms",
          "Sangam Literature",
          "Society & Economy",
          "Religion",
        ],
      },
      {
        topic: "Post-Sangam Period",
        subtopics: [
          "Kalabhras Rule",
          "Pallava Dynasty",
          "Temple Architecture",
        ],
      },
    ],
  },
  {
    section: "Medieval Tamil Nadu",
    topics: [
      {
        topic: "Chola Empire",
        subtopics: [
          "Administrative System",
          "Cultural Achievements",
          "Maritime Trade",
        ],
      },
      {
        topic: "Pandya Revival & Other Dynasties",
        subtopics: [
          "Later Pandyas",
          "Hoysala Influence",
          "Vijayanagara Period",
        ],
      },
    ],
  },
  {
    section: "Colonial Period",
    topics: [
      {
        topic: "British Establishment",
        subtopics: [
          "East India Company",
          "Colonial Administration",
          "Economic Impact",
          "Social Changes",
        ],
      },
      {
        topic: "Resistance Movements",
        subtopics: [
          "Polygar Wars",
          "1857 Revolt",
          "Early Nationalism",
          "Peasant Movements",
        ],
      },
    ],
  },
  {
    section: "Modern Socio-Political Movements",
    topics: [
      {
        topic: "Justice Party & Self-Respect Movement",
        subtopics: [
          "Justice Party",
          "Periyar E.V. Ramasamy",
          "Anti-Brahmin Movement",
          "Women's Rights",
        ],
      },
      {
        topic: "Dravidian Movement",
        subtopics: [
          "DMK Formation",
          "AIADMK Split",
          "Political Impact",
          "Cultural Renaissance",
        ],
      },
      {
        topic: "Contemporary Politics",
        subtopics: [
          "Regional Parties",
          "Social Justice",
          "Tamil Nationalism",
          "Recent Developments",
        ],
      },
    ],
  },
];

const HistoryTable = () => {
  return (
    <div className="history-table-wrapper">
      <table className="history-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Topic</th>
            <th>Subtopics</th>
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

export default HistoryTable;