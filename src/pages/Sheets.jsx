import { useEffect, useState } from "react";
import { getSheets, getResumeProblem } from "../api/sheet.api.js";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Sheets() {
  const [sheets, setSheets] = useState([]);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetsData = await getSheets();
        setSheets(sheetsData);

        const resumeData = await getResumeProblem();
        setResume(resumeData);
      } catch (error) {
        console.error("Sheets page error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">DSA Pattern Sheets</h2>

      {/* Resume Card */}
      {resume && resume.problemId && (
        <div
          onClick={() => navigate(`/problems/${resume.problemId}`)}
          className="bg-green-900 p-6 rounded-xl border border-green-500 mb-8 cursor-pointer hover:scale-105 transition"
        >
          <h3 className="text-lg font-semibold mb-1">
            📌 Resume Learning
          </h3>
          <p className="text-sm text-slate-300">
            {resume.topicName} → {resume.problemTitle}
          </p>
        </div>
      )}

      {sheets.length === 0 ? (
        <p className="text-slate-400">No sheets available</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {sheets.map((sheet) => {
            const total = sheet.totalProblems || 0;
            const solved = sheet.solvedProblems || 0;

            return (
              <div
                key={sheet.id}
                onClick={() => navigate(`/sheets/${sheet.id}`)}
                className="bg-slate-900 p-6 rounded-xl border border-slate-800 
                           hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 
                           hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {sheet.title}
                </h3>

                <p className="text-slate-400 text-sm mb-3">
                  {solved} / {total} Completed
                </p>

                <div className="w-full bg-slate-800 rounded-full h-2">
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

                <div className="mt-4 text-right text-blue-400 text-sm">
                  Explore →
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}

export default Sheets;
