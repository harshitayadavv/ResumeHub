import React from "react";
import SmartCustomizeForm from "../components/SmartCustomizeForm";

const CustomizePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="badge-info mb-4 w-fit mx-auto">
            ✨ Job Matching
          </div>
          <h1 className="heading-large mb-6 text-gray-900">
            Resume <span className="text-gradient">Customizer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload your resume and paste any job description to get<br/>
            AI-guided recommendations for tailoring your resume perfectly.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-6xl mx-auto">
          <SmartCustomizeForm />
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card-modern text-center group hover:-translate-y-2 transition-all">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold text-gray-800 mb-2">Smart Matching</h3>
            <p className="text-gray-600 text-sm">Find keywords & requirements</p>
          </div>
          <div className="card-modern text-center group hover:-translate-y-2 transition-all">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-bold text-gray-800 mb-2">Gap Analysis</h3>
            <p className="text-gray-600 text-sm">Identify missing skills</p>
          </div>
          <div className="card-modern text-center group hover:-translate-y-2 transition-all">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-bold text-gray-800 mb-2">Live Preview</h3>
            <p className="text-gray-600 text-sm">See changes instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
