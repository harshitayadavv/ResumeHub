import React from "react";
import { useState } from "react";
import axios from "axios";

const ScoreCard = ({ label, score, max = 10 }) => {
  const percentage = (score / max) * 100;
  const getColor = () => {
    if (percentage >= 80) return "from-green-400 to-green-600";
    if (percentage >= 60) return "from-blue-400 to-blue-600";
    if (percentage >= 40) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-gray-700 capitalize">{label}</label>
        <span className="text-lg font-bold text-gray-800">{score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const SuggestionItem = ({ suggestion, index }) => {
  const replaceWithMatch = suggestion.match(/Replace '(.+?)' with '(.+?)'/i);
  if (replaceWithMatch) {
    const before = replaceWithMatch[1];
    const after = replaceWithMatch[2];
    return (
      <div className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-red-600">
            Change from: <span className="line-through italic font-mono">{before}</span>
          </div>
          <div className="text-sm text-green-700 font-semibold">
            Change to: <span className="font-mono">{after}</span>
          </div>
        </div>
      </div>
    );
  }

  if (suggestion.includes("→")) {
    const parts = suggestion.split("→");
    const before = parts[0].replace("Replace", "").trim();
    const after = parts[1].trim();
    return (
      <div className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-red-600">
            Current: <span className="line-through">{before}</span>
          </div>
          <div className="text-sm text-green-700 font-semibold">
            Better: <span>{after}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all">
      <p className="text-gray-700 text-sm">{suggestion}</p>
    </div>
  );
};

const SmartAnalyzeForm = () => {
  const [file, setFile] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [showParsed, setShowParsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF resume");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return alert("Please log in to analyze a resume");

    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/upload`,
        formData,
        config
      );
      setResumeText(data.resumeText);
      setAiFeedback(data.aiFeedback);
      setResumeUrl(data.resumeUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong during analysis.");
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="resume-upload" className="block text-sm font-semibold text-gray-800 mb-3">
            Upload Your Resume
          </label>
          <div className="relative">
            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              required
            />
            {file && (
              <div className="mt-2 text-sm text-green-600 font-medium">
                Selected: {file.name}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing your resume..." : "Analyze Resume"}
        </button>
      </form>

      {/* Results Section */}
      {aiFeedback && (
        <div className="mt-12 pt-10 border-t border-gray-300">
          {/* Overall Score */}
          {aiFeedback.score && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Resume Score</h2>
              
              {/* Overall Score - Large */}
              <div className="mb-10 text-center p-10 bg-white rounded-2xl border-2 border-blue-200 shadow-md">
                <div className="text-7xl font-bold text-blue-600 mb-2">
                  {aiFeedback.score.overall}/10
                </div>
                <p className="text-lg text-gray-700 font-semibold">Overall Score</p>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(aiFeedback.score)
                  .filter(([key]) => key !== "overall")
                  .map(([key, value]) => (
                    <ScoreCard key={key} label={key} score={value} />
                  ))}
              </div>
            </div>
          )}

          {/* Summary Section */}
          {aiFeedback.summary && (
            <div className="mb-10 p-6 bg-white border-2 border-blue-200 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Summary</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{aiFeedback.summary}</p>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Strengths */}
            {aiFeedback.pros?.length > 0 && (
              <div className="bg-white p-6 rounded-xl border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Strengths</h3>
                <ul className="space-y-3">
                  {aiFeedback.pros.map((item, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex gap-3">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas for Improvement */}
            {aiFeedback.cons?.length > 0 && (
              <div className="bg-white p-6 rounded-xl border-2 border-red-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Areas to Improve</h3>
                <ul className="space-y-3">
                  {aiFeedback.cons.map((item, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex gap-3">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {aiFeedback.suggestions?.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Suggestions for Improvement</h3>
              <div className="space-y-4">
                {aiFeedback.suggestions.map((item, idx) => (
                  <SuggestionItem key={idx} suggestion={item} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* Toggle Resume Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowParsed(!showParsed)}
              className="px-6 py-2 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
            >
              {showParsed ? "Hide Resume Preview" : "View Resume Preview"}
            </button>
          </div>
        </div>
      )}

      {/* Resume Preview */}
      {showParsed && (
        <div className="mt-12 pt-10 border-t border-gray-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Resume Preview</h3>
          {resumeUrl ? (
            <iframe
              src={resumeUrl}
              title="Uploaded Resume"
              className="w-full h-screen border-2 border-gray-300 rounded-lg shadow-md"
            />
          ) : (
            <div className="whitespace-pre-wrap bg-gray-50 font-mono text-xs md:text-sm text-gray-800 border-2 border-gray-300 p-6 rounded-lg overflow-auto max-h-96">
              {resumeText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartAnalyzeForm;
