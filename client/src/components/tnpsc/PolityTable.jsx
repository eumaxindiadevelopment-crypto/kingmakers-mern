import React from "react";
import "./HistoryTable.css"; // use the same CSS file

const data = [
  {
    section: "Constitutional Framework",
    topics: [
      {
        topic: "Constitutional Development",
        subtopics: [
          "Historical Background",
          "Constituent Assembly",
        ],
      },
      {
        topic: "Fundamental Provisions",
        subtopics: [
          "Preamble",
          "Fundamental Rights",
          "Fundamental Duties",
          "Directive Principles",
        ],
      },
    ],
  },
  {
    section: "Union Government",
    topics: [
      {
        topic: "Executive",
        subtopics: [
          "President",
          "Vice-President",
          "Prime Minister",
          "Cabinet System",
        ],
      },
      {
        topic: "Legislature",
        subtopics: [
          "Lok Sabha",
          "Rajya Sabha",
          "Parliamentary Procedures",
          "Legislative Relations",
        ],
      },
      {
        topic: "Judiciary",
        subtopics: [
          "Supreme Court",
          "High Courts",
          "Judicial Review",
          "Judicial Activism",
        ],
      },
    ],
  },
  {
    section: "State Government & Federalism",
    topics: [
      {
        topic: "State Executive & Legislature",
        subtopics: [
          "Governor",
          "Chief Minister",
          "State Legislature",
        ],
      },
      {
        topic: "Centre-State Relations",
        subtopics: [
          "Legislative Relations",
          "Administrative Relations",
          "Financial Relations",
        ],
      },
    ],
  },
  {
    section: "Local Government & Contemporary Issues",
    topics: [
      {
        topic: "Panchayati Raj",
        subtopics: [
          "73rd Amendment",
          "Elections",
          "Women's Participation",
        ],
      },
      {
        topic: "Urban Local Bodies",
        subtopics: [
          "74th Amendment",
          "Functions & Finances",
          "Smart Cities",
        ],
      },
    ],
  },
];

const PolityTable = () => {
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

export default PolityTable;