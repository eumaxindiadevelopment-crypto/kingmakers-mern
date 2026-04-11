import React from "react";
import "./EconomyTable.css";

const tableData = [
  {
    section: "Indian Economy Fundamentals",
    topics: [
      {
        topic: "Economic Planning & Development",
        subtopics: [
          "Five Year Plans",
          "NITI Aayog",
          "Economic Surveys",
          "GDP, GNP",
          "Economic Indicators",
        ],
      },
      {
        topic: "Sectoral Analysis",
        subtopics: ["Agriculture", "Industry", "Services", "Infrastructure"],
      },
      {
        topic: "Economic Reforms",
        subtopics: [
          "1991 Economic Reforms",
          "Recent Reforms",
          "Financial Inclusion",
          "Startup India",
        ],
      },
    ],
  },
  {
    section: "Tamil Nadu Economic Development",
    topics: [
      {
        topic: "State Economy Overview",
        subtopics: [
          "GSDP Trends",
          "Per Capita Income",
          "Economic Planning",
          "Budget Analysis",
        ],
      },
      {
        topic: "Industrial Development",
        subtopics: [
          "Manufacturing",
          "IT & Software",
          "MSME Sector",
          "Industrial Parks",
        ],
      },
      {
        topic: "Agriculture & Allied Activities",
        subtopics: [
          "Cropping Patterns",
          "Irrigation",
          "Agricultural Schemes",
          "Animal Husbandry",
        ],
      },
      {
        topic: "Infrastructure Development",
        subtopics: [
          "Transport",
          "Urban Development",
          "Water Resources",
          "Inter-state disputes, management projects",
        ],
      },
    ],
  },
  {
    section: "Government Schemes & Policies",
    topics: [
      {
        topic: "Social Welfare",
        subtopics: ["Amma schemes", "Pension programs"],
      },
      {
        topic: "Employment",
        subtopics: ["MGNREGA implementation in TN"],
      },
      {
        topic: "Education",
        subtopics: ["Mid-day meal", "Scholarship schemes"],
      },
      {
        topic: "Health",
        subtopics: ["Govt. health insurance", "Medical facilities"],
      },
    ],
  },
];

const EconomyTable = () => {
  return (
    <div className="table-wrapper">
      <table className="economy-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Topic</th>
            <th>Subtopics</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((section, sectionIndex) =>
            section.topics.map((topic, topicIndex) => (
              <tr key={`${sectionIndex}-${topicIndex}`}>
                {topicIndex === 0 && (
                  <td
                    className="section-cell"
                    rowSpan={section.topics.length}
                  >
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

export default EconomyTable;