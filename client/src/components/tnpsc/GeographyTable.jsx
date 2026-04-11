import React from "react";
import "./HistoryTable.css"; // same CSS used earlier

const data = [
  {
    section: "Physical Geography",
    topics: [
      {
        topic: "Physiographic Divisions",
        subtopics: [
          "Northern Mountains",
          "Northern Plains",
          "Peninsular Plateau",
          "Coastal Plains",
          "Islands",
        ],
      },
      {
        topic: "Climate & Monsoon",
        subtopics: [
          "Monsoon System",
          "Seasonal Variations",
          "Rainfall Distribution",
        ],
      },
    ],
  },
  {
    section: "Human Geography",
    topics: [
      {
        topic: "Population Geography",
        subtopics: [
          "Distribution Patterns",
          "Demographic Trends",
          "Census Data",
        ],
      },
      {
        topic: "Economic Geography",
        subtopics: [
          "Agricultural Regions",
          "Industrial Centers",
          "Transport Networks",
        ],
      },
    ],
  },
  {
    section: "Environmental Geography",
    topics: [
      {
        topic: "Environmental Issues",
        subtopics: [
          "Natural Disasters",
          "Environmental Issues",
          "Conservation",
        ],
      },
    ],
  },
];

const GeographyTable = () => {
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

export default GeographyTable;