import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ParticipantLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        if (email && password.length >= 6) {
          localStorage.setItem("participant_token", "mock_token_" + Date.now());
          localStorage.setItem("participant_email", email);
          setTimeout(() => {
            navigate("/participant/dashboard");
          }, 500);
        } else {
          setError("Please enter valid email and password");
        }
      } else {
        if (fullName && email && password.length >= 6) {
          localStorage.setItem("participant_token", "mock_token_" + Date.now());
          localStorage.setItem("participant_email", email);
          localStorage.setItem("participant_name", fullName);
          setTimeout(() => {
            navigate("/participant/dashboard");
          }, 500);
        } else {
          setError("Please fill all fields");
        }
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <nav className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline">FestHub</span>
          </Link>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Student Portal
          </span>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Student Portal
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Join the fest and have fun!
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setFullName("");
                }}
                className={`flex-1 py-2 px-4 rounded font-medium transition-all ${
                  isLogin
                    ? "bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
                className={`flex-1 py-2 px-4 rounded font-medium transition-all ${
                  !isLogin
                    ? "bg-white dark:bg-slate-900 text-secondary-600 dark:text-secondary-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent dark:text-white placeholder-slate-400 transition-all"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent dark:text-white placeholder-slate-400 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent dark:text-white placeholder-slate-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-secondary-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">
                  Demo Credentials
                </span>
              </div>
            </div>

            {/* Demo Info */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
              <p className="text-slate-700 dark:text-slate-300">
                <span className="font-medium">Email:</span> student@college.edu
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <span className="font-medium">Password:</span> Student123
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-3">
                Use these credentials to explore the student dashboard
              </p>
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Are you an organizer?{" "}
                <Link
                  to="/admin/login"
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                >
                  Admin Login
                </Link>
              </p>
              <Link
                to="/"
                className="inline-block text-sm text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
