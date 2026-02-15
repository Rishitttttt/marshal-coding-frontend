import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProblemsByTopic,
  markProblemSolved,
  unmarkProblemSolved,
} from "../api/problem.api.js";
import Layout from "../components/Layout.jsx";

function Problems() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const data = await getProblemsByTopic(topicId);
      setProblems(data);
    };

    fetchProblems();
  }, [topicId]);

  const handleToggle = async (problemId, isSolved, e) => {
    e.stopPropagation(); // prevent card click navigation

    try {
      if (isSolved) {
        await unmarkProblemSolved(problemId);
      } else {
        await markProblemSolved(problemId);
      }

      // Update UI instantly
      setProblems((prev) =>
        prev.map((p) =>
          p.id === problemId
            ? { ...p, isSolved: !isSolved }
            : p
        )
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">Problems</h2>

      <div className="space-y-6">
        {problems.map((problem) => (
          <div
            key={problem.id}
            onClick={() => navigate(`/problems/${problem.id}`)}
            className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500 hover:scale-105 transition cursor-pointer"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">
                {problem.title}
              </h3>

              <input
                type="checkbox"
                checked={problem.isSolved}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleToggle(problem.id, problem.isSolved, e)
                }
                className="w-5 h-5 accent-green-500"
              />
            </div>

            <p className="text-slate-400 text-sm mb-2">
              Difficulty: {problem.difficulty}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/problems/${problem.id}`);
              }}
              className="text-blue-400 hover:underline"
            >
              Solve
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Problems;
