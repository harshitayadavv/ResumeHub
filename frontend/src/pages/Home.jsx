import { Link } from "react-router-dom";

const AnalyzeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CustomizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="card-featured group hover:glow-pulse">
    <div className="mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300">
      <Icon />
    </div>
    <h3 className="heading-small mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-left">
              <div className="badge-info mb-4 w-fit">
                🚀 Powered by AI
              </div>
              <h1 className="heading-large mb-6 text-gray-900 leading-tight">
                Elevate Your Resume with <span className="text-gradient">AI Intelligence</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Get instant, data-driven feedback on your resume or tailor it perfectly to any job description in seconds. Let AI guide your career journey.
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  to="/analyze"
                  className="btn-primary"
                >
                  Start Analyzing →
                </Link>
                <Link
                  to="/customize"
                  className="btn-secondary"
                >
                  Tailor Resume
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-6 text-center">
                <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <p className="text-sm text-gray-600 mt-2">Resumes Analyzed</p>
                </div>
                <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <div className="text-3xl font-bold text-blue-600">95%</div>
                  <p className="text-sm text-gray-600 mt-2">Satisfaction Rate</p>
                </div>
                <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <p className="text-sm text-gray-600 mt-2">Available</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-3/4"></div>
                  <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-full"></div>
                  <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full w-5/6"></div>
                  <div className="pt-6 border-t border-blue-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-600">8.5</div>
                        <div className="text-xs text-green-700 font-semibold">Score</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-600">✨</div>
                        <div className="text-xs text-blue-700 font-semibold">Premium</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-large mb-6 text-gray-900">
              Two Powerful Features at Your Fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a standout resume and land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/analyze" className="group">
              <FeatureCard
                icon={AnalyzeIcon}
                title="Resume Analyzer"
                description="Upload your resume and get instant AI-powered analysis. Receive detailed scores, personalized suggestions, and actionable insights to improve your chances of landing interviews."
              />
            </Link>

            <Link to="/customize" className="group">
              <FeatureCard
                icon={CustomizeIcon}
                title="Job Customizer"
                description="Paste any job description and get AI-guided recommendations to tailor your resume perfectly. Match keywords, highlight relevant skills, and increase your ATS score."
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-large text-center mb-16 text-gray-900">
            Why Choose ResumeHub?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { emoji: "⚡", title: "Instant Analytics", desc: "Get results in seconds" },
              { emoji: "🤖", title: "AI-Powered", desc: "Advanced AI analysis" },
              { emoji: "📈", title: "Score Tracking", desc: "Monitor your progress" },
              { emoji: "🎯", title: "ATS Optimized", desc: "Pass applicant systems" },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="card-modern text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl mb-4">{benefit.emoji}</div>
                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 shadow-2xl text-center">
          <h2 className="heading-medium text-white mb-6">
            Ready to Transform Your Resume?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join hundreds of professionals who've already improved their resumes with ResumeHub.
          </p>
          <Link
            to="/analyze"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Now 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}
