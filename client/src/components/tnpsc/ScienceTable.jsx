import React from "react";
import "./ScienceTable.css";

const scienceData = [
  {
    section: "Physics",
    topics: [
      {
        topic: "Classical Physics",
        subtopics: ["Mechanics", "Heat & Thermodynamics", "Optics", "Electricity & Magnetism"],
      },
      {
        topic: "Modern Physics",
        subtopics: ["Atomic Structure", "Space Science", "Nuclear Science"],
      },
    ],
  },
  {
    section: "Chemistry",
    topics: [
      {
        topic: "Basic Chemistry",
        subtopics: ["Atomic Theory", "Chemical Reactions", "Organic Chemistry", "Environmental Chemistry"],
      },
      {
        topic: "Applied Chemistry",
        subtopics: ["Industrial Chemistry", "Food Chemistry", "Biochemistry"],
      },
    ],
  },
  {
    section: "Biology",
    topics: [
      {
        topic: "Life Sciences",
        subtopics: ["Cell Biology", "Genetics", "Evolution", "Ecology"],
      },
      {
        topic: "Human Biology",
        subtopics: ["Human Physiology", "Health & Disease", "Reproduction"],
      },
    ],
  },
  {
    section: "Current Science & Technology",
    topics: [
      {
        topic: "Contemporary Issues",
        subtopics: ["Recent Discoveries", "Technology Applications", "Medical Advances", "Environmental Technology"],
      },
    ],
  },
];

const ScienceTable = () => {
  return (
    <div className="table-container">
      <table className="science-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Topic</th>
            <th>Subtopics</th>
          </tr>
        </thead>
        <tbody>
          {scienceData.map((section, sIdx) =>
            section.topics.map((topic, tIdx) => (
              <tr key={`${sIdx}-${tIdx}`}>
                {/* Only render the Section cell for the first topic in that section */}
                {tIdx === 0 && (
                  <td className="section-column" rowSpan={section.topics.length}>
                    {section.section}
                  </td>
                )}
                <td className="topic-column">{topic.topic}</td>
                <td className="subtopic-column">
                  <div className="subtopic-list">
                    {topic.subtopics.map((sub, i) => (
                      <div key={i} className="subtopic-item">{sub}</div>
                    ))}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScienceTable;