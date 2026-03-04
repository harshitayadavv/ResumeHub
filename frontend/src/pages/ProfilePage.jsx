import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { renderResumeText } from "../utils/renderResume.jsx";

const ResultModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">
            {item.originalFileName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {item.customizedText && (
            <div className="text-sm leading-relaxed text-gray-800 mb-8">
              {renderResumeText(item.customizedText)}
            </div>
          )}
          {item.aiFeedback && <FeedbackDisplay feedback={item.aiFeedback} />}
        </div>
        <div className="p-4 border-t bg-gray-50 text-right">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedbackDisplay = ({ feedback }) => (
  <div className="space-y-6">
    {feedback.summary && (
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h4 className="font-bold text-gray-900 mb-2">📝 Summary</h4>
        <p className="text-gray-700">{feedback.summary}</p>
      </div>
    )}
    {feedback.score && (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <h4 className="font-bold text-gray-900 mb-3">📊 Overall Score</h4>
        <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          {feedback.score.overall}/10
        </p>
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {feedback.pros?.length > 0 && (
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h4 className="font-bold text-green-900 mb-3">✅ Strengths</h4>
          <ul className="space-y-2">
            {feedback.pros.map((p, i) => (
              <li key={i} className="text-green-800 flex items-start gap-2">
                <span>→</span> {p}
              </li>
            ))}
          </ul>
        </div>
      )}
      {feedback.cons?.length > 0 && (
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <h4 className="font-bold text-orange-900 mb-3">📌 Areas to Improve</h4>
          <ul className="space-y-2">
            {feedback.cons.map((c, i) => (
              <li key={i} className="text-orange-800 flex items-start gap-2">
                <span>→</span> {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        navigate("/login");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          config
        );
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        localStorage.removeItem("userInfo");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const openModalWithItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">⚙️</div>
          <p className="text-gray-600 font-semibold text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="md:flex md:items-center md:justify-between mb-12 pb-8 border-b border-gray-200">
            <div className="animate-slide-left">
              <h1 className="heading-large text-gray-900 mb-2">My Profile</h1>
              {profile && (
                <p className="text-lg text-gray-600">
                  Welcome back, <span className="font-bold text-blue-600">{profile.name}</span>! 👋
                </p>
              )}
              {profile && (
                <p className="text-sm text-gray-500 mt-2">
                  📧 {profile.email}
                </p>
              )}
            </div>
            <button
              onClick={logoutHandler}
              className="btn-danger mt-4 md:mt-0"
            >
              🚪 Logout
            </button>
          </div>

          {/* Activity Section */}
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="heading-medium text-gray-900 mb-3">
                📋 My Activity History
              </h2>
              <p className="text-gray-600">
                {profile?.history?.length === 0
                  ? "No resumes analyzed yet. Start improving your resume!"
                  : `You have ${profile?.history?.length} resume${profile?.history?.length !== 1 ? 's' : ''} in your history.`}
              </p>
            </div>

            {profile && profile.history && profile.history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.history.map((item, idx) => (
                  <div
                    key={item._id}
                    className="card-featured group hover:glow-pulse transition-all duration-300"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {item.customizedText ? (
                          <span className="badge-info text-xs">
                            ✨ Customized
                          </span>
                        ) : (
                          <span className="badge-success text-xs">
                            📊 Analyzed
                          </span>
                        )}
                      </div>
                      <span className="text-2xl">
                        {item.customizedText ? "✨" : "📄"}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
                      {item.originalFileName}
                    </h3>

                    {item.aiFeedback?.score?.overall && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                        <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                          {item.aiFeedback.score.overall}/10
                        </p>
                        <p className="text-xs text-gray-600">Overall Score</p>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mb-4">
                      📅 {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>

                    <button
                      onClick={() => openModalWithItem(item)}
                      className="w-full btn-primary text-sm py-2"
                    >
                      👁️ View Result
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-featured text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="heading-small text-gray-900 mb-2">No Activity Yet</h3>
                <p className="text-gray-600 mb-8">
                  Your analyzed and customized resumes will appear here.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/analyze" className="btn-primary">
                    📊 Analyze Resume
                  </Link>
                  <Link to="/customize" className="btn-secondary">
                    ✨ Customize Resume
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
};

export default ProfilePage;
