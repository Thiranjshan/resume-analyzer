import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/authStore";
import Navbar from "../components/Navbar";

export default function Home() {
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    if (token) {
      navigate("/analysis/new");
    } else {
      navigate("/login");
    }
  };

  const handleDemoClick = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans overflow-x-hidden selection:bg-indigo-500 selection:text-white relative">
      {/* Background Glowing Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Land Your Dream Job with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            CV Analysis
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Upload your CV, analyze skill gaps, check ATS compatibility, and get
            personalized AI recommendations to accelerate your career growth.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleAnalyzeClick}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <span>Analyze My CV Free</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={handleDemoClick}
              className="w-full sm:w-auto border border-gray-700 hover:border-gray-600 bg-gray-950/40 hover:bg-gray-900/60 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Dashboard Demo</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-sm text-gray-400 pt-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500/10 p-1 rounded-full text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>No credit card required</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-emerald-500/10 p-1 rounded-full text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>Free analysis included</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-emerald-500/10 p-1 rounded-full text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Product Preview Container */}
      <section className="relative px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Glassmorphism Laptop/Mockup Frame */}
          <div className="relative bg-[#0F1423]/70 border border-gray-800/80 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-indigo-950/20 backdrop-blur-xl">
            {/* Mock Header Controls */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-xs text-gray-500 font-mono tracking-wider bg-gray-950/40 px-3 py-1 rounded-full border border-gray-800/60">
                careerai.app/dashboard
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Mock Dashboard Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Profile Card & Upload */}
              <div className="bg-gray-950/40 border border-gray-800/50 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                    JD
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">John Doe</h3>
                    <p className="text-xs text-gray-500">Software Engineer</p>
                  </div>
                </div>

                <div className="border border-dashed border-gray-800 rounded-xl p-6 text-center space-y-2 hover:border-indigo-500/50 transition-all cursor-pointer">
                  <div className="mx-auto w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium">Upload New CV</p>
                  <p className="text-[10px] text-gray-500">PDF, DOCX up to 10MB</p>
                </div>
              </div>

              {/* ATS Score Chart */}
              <div className="bg-gray-950/40 border border-gray-800/50 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm mb-1">ATS Optimization</h3>
                  <p className="text-xs text-gray-500">Overall compatibility rating</p>
                </div>

                <div className="my-4 flex items-center justify-center relative">
                  {/* Circle SVG */}
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      className="stroke-gray-800"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      className="stroke-indigo-500"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={2 * Math.PI * 48 * (1 - 0.85)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-bold">85%</span>
                    <p className="text-[10px] text-emerald-400 font-medium">Strong</p>
                  </div>
                </div>

                <div className="flex justify-between text-xs border-t border-gray-800/60 pt-3 text-gray-400">
                  <span>Formatting: OK</span>
                  <span>Keywords: 92%</span>
                </div>
              </div>

              {/* Insights / Gaps */}
              <div className="bg-gray-950/40 border border-gray-800/50 rounded-xl p-5 space-y-3">
                <h3 className="font-semibold text-sm">Critical Keyword Gaps</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                    <span className="text-xs text-red-400">Cloud Architecture</span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                      Missing
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
                    <span className="text-xs text-amber-400">CI/CD Pipelines</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">
                      Low Density
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                    <span className="text-xs text-indigo-400">TypeScript</span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded">
                      Good
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
