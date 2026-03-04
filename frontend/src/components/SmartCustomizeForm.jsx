import React from "react";
import { useState } from "react";
import axios from "axios";
import { renderResumeText } from "../utils/renderResume.jsx";

const SmartCustomizeForm = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [customizedResumeText, setCustomizedResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription)
      return alert("Please upload a resume and paste the job description");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return alert("Please log in to customize a resume.");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc", jobDescription);

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/customize-resume`,
        formData,
        config
      );

      setCustomizedResumeText(data.customizedText);
    } catch (error) {
      alert("Something went wrong while customizing the resume");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar - Form */}
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-4 lg:sticky lg:top-32">
          {/* Resume Upload */}
          <div>
            <label htmlFor="resume-upload" className="block text-sm font-bold text-gray-800 mb-3">
              📄 Upload Your Resume (PDF)
            </label>
            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-blue-700 file:text-white hover:file:from-blue-600 hover:file:to-blue-800 cursor-pointer"
              required
            />
            {file && (
              <p className="mt-2 text-xs text-green-600 font-semibold">
                ✅ {file.name}
              </p>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="job-description" className="block text-sm font-bold text-gray-800 mb-3">
              💼 Paste Job Description
            </label>
            <textarea
              id="job-description"
              rows={12}
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-sm resize-none"
              required
            />
            {jobDescription && (
              <p className="mt-2 text-xs text-gray-500">
                {jobDescription.length} characters
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⚙️</span> Customizing...
              </>
            ) : (
              <>
                ✨ Customize Resume
              </>
            )}
          </button>

          {/* Tips */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2 text-sm">💡 Pro Tips:</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ Use full job description</li>
              <li>✓ Include all requirements</li>
              <li>✓ Better match = better score</li>
            </ul>
          </div>
        </form>

        {/* Right Side - Preview */}
        <div className="lg:col-span-8">
          <label className="block text-sm font-bold text-gray-800 mb-4">
            📋 AI-Generated Customized Resume
          </label>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin text-4xl mb-4">⚙️</div>
                <p className="text-gray-600 font-semibold">Customizing your resume...</p>
                <p className="text-gray-500 text-sm mt-2">This may take a few seconds</p>
              </div>
            ) : customizedResumeText ? (
              <div className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
                {renderResumeText(customizedResumeText, jobDescription)}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-400 text-lg font-semibold mb-2">
                    Your customized resume will appear here
                  </p>
                  <p className="text-gray-500 text-sm">
                    Upload resume + paste job description + customize
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCustomizeForm;
