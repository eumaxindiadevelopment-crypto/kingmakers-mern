import React from "react";
import "./IndianHistoryTable.css"; // same CSS used earlier

const data = [
  {
    section: "Ancient India",
    topics: [
      {
        topic: "Early Civilizations",
        subtopics: [
          "Indus Valley",
          "Vedic Period",
          "Religious Movements",
          "Mauryan Empire",
        ],
      },
      {
        topic: "Classical Period",
        subtopics: [
          "Gupta Empire",
          "Post-Gupta",
          "South Indian Dynasties",
        ],
      },
    ],
  },
  {
    section: "Medieval India",
    topics: [
      {
        topic: "Delhi Sultanate",
        subtopics: [
          "Establishment",
          "Administrative System",
          "Economic Policies",
        ],
      },
      {
        topic: "Mughal Empire",
        subtopics: [
          "Foundation",
          "Akbar's Policies",
          "Later Mughals",
          "Maratha Rise",
        ],
      },
    ],
  },
  {
    section: "Modern India & Freedom Struggle",
    topics: [
      {
        topic: "British Colonial Rule",
        subtopics: [
          "Company Rule",
          "Crown Rule",
          "Economic Impact",
        ],
      },
      {
        topic: "National Movement",
        subtopics: [
          "Early Phase",
          "Extremist Phase",
          "Gandhian Era",
        ],
      },
    ],
  },
];

const IndianHistoryTable = () => {
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

export default IndianHistoryTable;