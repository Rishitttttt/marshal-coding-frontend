import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTopicsBySheet } from "../api/topic.api.js";

function Topics() {
  const { sheetId } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopicsBySheet(sheetId);
      setTopics(data);
    };

    fetchTopics();
  }, [sheetId]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h2 className="text-3xl font-bold mb-8">Topics</h2>

      {topics.length === 0 ? (
        <p className="text-slate-400">No topics found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {topics.map((topic) => {
            const total = topic.totalProblems || 0;
            const solved = topic.solvedProblems || 0;

            return (
              <div
                key={topic.id}
                onClick={() => navigate(`/topics/${topic.id}`)}
                className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500 hover:scale-105 transition cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {topic.name}
                </h3>

                <p className="text-slate-400 text-sm">
                  {solved} / {total} Completed
                </p>

                {/* Optional Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 mt-3">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{
                      width:
                        total > 0
                          ? `${(solved / total) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Topics;
