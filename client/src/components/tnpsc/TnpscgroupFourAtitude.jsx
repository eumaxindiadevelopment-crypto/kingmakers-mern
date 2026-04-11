import React from "react";
import "./HistoryTable.css";

const data = [
  {
    section: "Aptitude",
    topics: [
      {
        topic: "15 questions", 
        subtopics: [
          "Simplification , Percentage, Highest Common Factor (HCF), Lowest Common Multiple (LCM), Ratio and Proportion, Simple interest, Compound interest, Area, Volume, Time and Work.",
        ],
      },
    ],
  },
  {
    section: "Reasoning",
    topics: [
      {
        topic: "10 questions",
        subtopics: [
          "Logical reasoning, Puzzles, Dice, Visual reasoning, Alpha numeric reasoning, Number series",
        ],
      },
    ],
  },

];

const TnpscgroupFourAtitude = () => {
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

export default TnpscgroupFourAtitude;