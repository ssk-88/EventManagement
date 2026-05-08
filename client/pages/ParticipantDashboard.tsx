import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Menu,
  X,
  Search,
  Sparkles,
  Calendar,
  Users,
  Trophy,
  Bell,
  Ticket,
  TrendingUp,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  Award,
  QrCode,
  Share2,
  ArrowRight,
} from "lucide-react";

export default function ParticipantDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("participant_token");
    localStorage.removeItem("participant_email");
    localStorage.removeItem("participant_name");
    navigate("/participant/login");
  };

  const studentName =
    localStorage.getItem("participant_name") || "Student";
  const studentEmail = localStorage.getItem("participant_email") || "student@college.edu";

  // Mock data
  const enrolledEvents = [
    {
      id: 1,
      name: "CodeMasters 2024",
      status: "registered",
      date: "2024-05-20",
      team: "Lambda Coders",
      role: "Team Lead",
      registeredDate: "2024-05-01",
    },
    {
      id: 2,
      name: "Quiz Master",
      status: "registered",
      date: "2024-05-28",
      team: "Brain Busters",
      role: "Participant",
      registeredDate: "2024-05-02",
    },
  ];

  const availableEvents = [
    {
      id: 3,
      name: "Design Jam",
      type: "Technical",
      date: "2024-05-22",
      description: "Create amazing UI/UX designs",
      teamLimit: 4,
      teamSize: 2,
      difficulty: "Intermediate",
      registered: 187,
      limit: 250,
      image: "🎨",
    },
    {
      id: 4,
      name: "Battle of Bands",
      type: "Cultural",
      date: "2024-05-25",
      description: "Showcase your musical talent",
      teamLimit: 8,
      teamSize: 4,
      difficulty: "Beginner",
      registered: 45,
      limit: 100,
      image: "🎵",
    },
    {
      id: 5,
      name: "Web Development",
      type: "Technical",
      date: "2024-06-01",
      description: "Build amazing web applications",
      teamLimit: 3,
      teamSize: 2,
      difficulty: "Advanced",
      registered: 92,
      limit: 150,
      image: "💻",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "CodeMasters 2024 Round 1 Results",
      message: "Top 10 teams have been selected for the next round!",
      date: "2024-05-15",
      type: "info",
    },
    {
      id: 2,
      title: "Venue Change for Design Jam",
      message:
        "The event venue has been changed to Auditorium B effective immediately.",
      date: "2024-05-14",
      type: "warning",
    },
    {
      id: 3,
      title: "New Event Added: Web Development",
      message: "Register now for the exciting Web Development event!",
      date: "2024-05-13",
      type: "success",
    },
  ];

  const leaderboard = [
    { rank: 1, team: "Lambda Coders", event: "CodeMasters 2024", score: 850 },
    { rank: 2, team: "Code Ninjas", event: "CodeMasters 2024", score: 780 },
    { rank: 3, team: "Debug Squad", event: "CodeMasters 2024", score: 720 },
    {
      rank: 4,
      team: "Brain Busters",
      event: "Quiz Master",
      score: 650,
    },
    {
      rank: 5,
      team: "Algorithm Artists",
      event: "CodeMasters 2024",
      score: 580,
    },
  ];

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Trophy },
    { id: "browse", label: "Browse Events", icon: Calendar },
    { id: "enrolled", label: "My Events", icon: CheckCircle2 },
    { id: "teams", label: "Teams", icon: Users },
    { id: "leaderboard", label: "Leaderboard", icon: TrendingUp },
    { id: "announcements", label: "Announcements", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="hidden sm:inline">FestHub</span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent dark:text-white placeholder-slate-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {studentName}
              </p>
              <p className="text-xs text-slate-500">{studentEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-hidden lg:w-64 lg:static fixed h-[calc(100vh-80px)] z-30`}
        >
          <nav className="p-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Welcome, {studentName.split(" ")[0]}!
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Explore events, manage teams, and track your participation
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-8 h-8 text-secondary-500" />
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                    Enrolled Events
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {enrolledEvents.length}
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-secondary-500" />
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                    Active Teams
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    2
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-8 h-8 text-accent-500" />
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                    Best Rank
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    1st
                  </p>
                </div>
              </div>

              {/* Enrolled Events */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    My Enrolled Events
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Events you've registered for
                  </p>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {enrolledEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                            {event.name}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {event.team}
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              {event.role}
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-900/50 transition-colors font-medium">
                          <QrCode className="w-4 h-4" />
                          Ticket
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "browse" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Browse Events
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Discover and register for amazing fest events
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all group"
                  >
                    <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-6xl">
                      {event.image}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {event.name}
                        </h3>
                        <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded">
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Date
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {event.date}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Team Size
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {event.teamSize}-{event.teamLimit} members
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Level
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {event.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">
                            Registered
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {event.registered}/{event.limit}
                          </span>
                        </div>
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full"
                            style={{
                              width: `${(event.registered / event.limit) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <button className="w-full py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all group-hover:-translate-y-0.5">
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "enrolled" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  My Events
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  View and manage your enrolled events
                </p>
              </div>

              <div className="grid gap-6">
                {enrolledEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                          {event.name}
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-secondary-500" />
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">
                                Event Date
                              </p>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {event.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-secondary-500" />
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">
                                Your Team
                              </p>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {event.team}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-secondary-500" />
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">
                                Your Role
                              </p>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {event.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                          <QrCode className="w-5 h-5" />
                          Download Ticket
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                          <Share2 className="w-5 h-5" />
                          Share
                        </button>
                        <button className="px-6 py-3 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/20 rounded-lg font-medium transition-all">
                          View Rules
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "teams" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Team Management
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Create teams or join with invite codes
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  <Plus className="w-5 h-5" />
                  Create Team
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Lambda Coders",
                    members: 3,
                    event: "CodeMasters 2024",
                  },
                  {
                    name: "Brain Busters",
                    members: 4,
                    event: "Quiz Master",
                  },
                ].map((team, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                      {team.name}
                    </h3>
                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Members
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {team.members} members
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Event
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {team.event}
                        </p>
                      </div>
                    </div>
                    <button className="w-full py-2 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/20 rounded-lg font-medium transition-all">
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 rounded-xl p-6">
                <h3 className="font-bold text-secondary-900 dark:text-secondary-300 mb-2">
                  Join a Team
                </h3>
                <p className="text-secondary-700 dark:text-secondary-400 text-sm mb-4">
                  Have an invite code? Enter it here to join a team.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter invite code..."
                    className="flex-1 px-4 py-2 border border-secondary-300 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-900/20 dark:text-white focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-secondary-600 text-white rounded-lg font-medium hover:bg-secondary-700 transition-all">
                    Join
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Live Leaderboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Top performing teams across all events
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Rank
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Team
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Event
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry) => (
                        <tr
                          key={entry.rank}
                          className={`border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                            entry.team === "Lambda Coders"
                              ? "bg-secondary-50 dark:bg-secondary-900/10"
                              : ""
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {entry.rank === 1 && (
                                <Trophy className="w-5 h-5 text-yellow-500" />
                              )}
                              {entry.rank === 2 && (
                                <Trophy className="w-5 h-5 text-gray-400" />
                              )}
                              {entry.rank === 3 && (
                                <Trophy className="w-5 h-5 text-orange-500" />
                              )}
                              {entry.rank > 3 && (
                                <span className="font-bold text-slate-900 dark:text-white">
                                  #{entry.rank}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`font-medium ${
                                entry.team === "Lambda Coders"
                                  ? "text-secondary-600 dark:text-secondary-400"
                                  : "text-slate-900 dark:text-white"
                              }`}
                            >
                              {entry.team}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-600 dark:text-slate-400">
                              {entry.event}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {entry.score}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Announcements
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Stay updated with latest fest news and updates
                </p>
              </div>

              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`rounded-xl border p-6 ${
                      announcement.type === "info"
                        ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                        : announcement.type === "warning"
                          ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800"
                          : "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          announcement.type === "info"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : announcement.type === "warning"
                              ? "bg-yellow-100 dark:bg-yellow-900/30"
                              : "bg-green-100 dark:bg-green-900/30"
                        }`}
                      >
                        <Bell
                          className={`w-5 h-5 ${
                            announcement.type === "info"
                              ? "text-blue-600 dark:text-blue-400"
                              : announcement.type === "warning"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-green-600 dark:text-green-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${
                          announcement.type === "info"
                            ? "text-blue-900 dark:text-blue-300"
                            : announcement.type === "warning"
                              ? "text-yellow-900 dark:text-yellow-300"
                              : "text-green-900 dark:text-green-300"
                        }`}>
                          {announcement.title}
                        </h3>
                        <p className={`text-sm mt-1 ${
                          announcement.type === "info"
                            ? "text-blue-800 dark:text-blue-400"
                            : announcement.type === "warning"
                              ? "text-yellow-800 dark:text-yellow-400"
                              : "text-green-800 dark:text-green-400"
                        }`}>
                          {announcement.message}
                        </p>
                        <p className={`text-xs mt-2 ${
                          announcement.type === "info"
                            ? "text-blue-700 dark:text-blue-500"
                            : announcement.type === "warning"
                              ? "text-yellow-700 dark:text-yellow-500"
                              : "text-green-700 dark:text-green-500"
                        }`}>
                          {announcement.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
