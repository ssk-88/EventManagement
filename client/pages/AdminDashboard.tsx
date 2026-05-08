import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Trophy,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  Users2,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    navigate("/admin/login");
  };

  const adminEmail = localStorage.getItem("admin_email") || "admin@college.edu";

  // Mock data
  const stats = [
    {
      label: "Active Events",
      value: "12",
      change: "+2 this week",
      icon: Calendar,
      color: "primary",
    },
    {
      label: "Total Registrations",
      value: "3,247",
      change: "+156 today",
      icon: Users,
      color: "secondary",
    },
    {
      label: "Participation Rate",
      value: "78%",
      change: "+5% from last fest",
      icon: TrendingUp,
      color: "accent",
    },
    {
      label: "Pending Approvals",
      value: "24",
      change: "12 teams waiting",
      icon: Users2,
      color: "primary",
    },
  ];

  const events = [
    {
      id: 1,
      name: "CodeMasters 2024",
      type: "Technical",
      date: "2024-05-20",
      registrations: 324,
      status: "Active",
      limit: 500,
    },
    {
      id: 2,
      name: "Design Jam",
      type: "Technical",
      date: "2024-05-22",
      registrations: 187,
      status: "Active",
      limit: 250,
    },
    {
      id: 3,
      name: "Battle of Bands",
      type: "Cultural",
      date: "2024-05-25",
      registrations: 45,
      status: "Draft",
      limit: 100,
    },
    {
      id: 4,
      name: "Quiz Master",
      type: "Technical",
      date: "2024-05-28",
      registrations: 512,
      status: "Active",
      limit: 600,
    },
  ];

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "events", label: "Events", icon: Calendar },
    { id: "registrations", label: "Registrations", icon: Users },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:inline">
                FestHub Admin
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white placeholder-slate-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Admin User
              </p>
              <p className="text-xs text-slate-500">{adminEmail}</p>
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
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 dark:border-slate-800">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Welcome back! Here's your fest management summary.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  const colorClass = `text-${stat.color}-600 dark:text-${stat.color}-400`;
                  const bgClass = `bg-${stat.color}-100 dark:bg-${stat.color}-900/20`;
                  return (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${bgClass} flex items-center justify-center`}
                        >
                          <Icon className={`w-6 h-6 ${colorClass}`} />
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500">{stat.change}</p>
                    </div>
                  );
                })}
              </div>

              {/* Events Section */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Events
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Manage and monitor your college fest events
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("events")}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    New Event
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Registrations
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-medium text-slate-900 dark:text-white">
                              {event.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {event.date}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                event.type === "Technical"
                                  ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                                  : "bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300"
                              }`}
                            >
                              {event.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                                  style={{
                                    width: `${(event.registrations / event.limit) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium whitespace-nowrap">
                                {event.registrations}/{event.limit}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                event.status === "Active"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Event Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Create, edit, and manage all your college fest events
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                <Calendar className="w-16 h-16 text-primary-500 mx-auto mb-4 opacity-20" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Event Management Interface
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Create new events, set limits, add rules, venues, timings, and deadlines
                </p>
                <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  <Plus className="w-5 h-5 inline mr-2" />
                  Create Event
                </button>
              </div>
            </div>
          )}

          {activeTab === "registrations" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Registration Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  View, approve, and manage participant registrations and teams
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                <Users className="w-16 h-16 text-secondary-500 mx-auto mb-4 opacity-20" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Registrations Dashboard
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Approve/reject teams, manage participant lists, and handle registrations
                </p>
                <button className="px-6 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  View Registrations
                </button>
              </div>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Leaderboard Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Update scores, rankings, and publish live leaderboards
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                <Trophy className="w-16 h-16 text-accent-500 mx-auto mb-4 opacity-20" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Live Leaderboard
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Update live scores, manage rankings, and publish results
                </p>
                <button className="px-6 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  Manage Scores
                </button>
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
                  Send real-time notifications to participants
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                <Bell className="w-16 h-16 text-primary-500 mx-auto mb-4 opacity-20" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Send Announcements
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Post real-time updates and notifications to all participants
                </p>
                <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  New Announcement
                </button>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Analytics
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  View participation stats and event performance metrics
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                <BarChart3 className="w-16 h-16 text-secondary-500 mx-auto mb-4 opacity-20" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Analytics Dashboard
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  View registrations, participation rates, and event success metrics
                </p>
                <button className="px-6 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  View Reports
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
