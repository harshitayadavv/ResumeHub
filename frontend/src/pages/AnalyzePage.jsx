import React from "react";
import SmartAnalyzeForm from "../components/SmartAnalyzeForm";

const AnalyzePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analyze Your Resume
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume and get instant feedback on how to improve it. Our AI analyzes your resume across key dimensions and provides actionable suggestions.
          </p>
        </div>

        {/* Main Blue Box */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-3xl p-8 md:p-12 shadow-lg">
          <SmartAnalyzeForm />
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
