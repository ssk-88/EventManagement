import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
  CheckCircle2,
} from "lucide-react";
import EventManagement from "./EventManagement";
import { Event, DashboardStats } from "@shared/api";

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

  // Queries
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      return res.json();
    },
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      return res.json();
    },
  });

  const statCards = [
    {
      label: "Active Events",
      value: stats?.activeEvents ?? "...",
      change: "+2 this week",
      icon: Calendar,
      color: "primary",
      bgClass: "bg-primary-100 dark:bg-primary-900/20",
      textClass: "text-primary-600 dark:text-primary-400",
    },
    {
      label: "Total Registrations",
      value: stats?.totalRegistrations ?? "...",
      change: "+156 today",
      icon: Users,
      color: "secondary",
      bgClass: "bg-secondary-100 dark:bg-secondary-900/20",
      textClass: "text-secondary-600 dark:text-secondary-400",
    },
    {
      label: "Participation Rate",
      value: (stats?.participationRate ?? "...") + "%",
      change: "+5% from last fest",
      icon: TrendingUp,
      color: "accent",
      bgClass: "bg-accent-100 dark:bg-accent-900/20",
      textClass: "text-accent-600 dark:text-accent-400",
    },
    {
      label: "Pending Approvals",
      value: stats?.pendingApprovals ?? "...",
      change: "12 teams waiting",
      icon: Users2,
      color: "primary",
      bgClass: "bg-primary-100 dark:bg-primary-900/20",
      textClass: "text-primary-600 dark:text-primary-400",
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
                {statCards.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${stat.bgClass} flex items-center justify-center`}
                        >
                          <Icon className={`w-6 h-6 ${stat.textClass}`} />
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
                      Recent Events
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Monitor your college fest events
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("events")}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Manage Events
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
                      </tr>
                    </thead>
                    <tbody>
                      {events.slice(0, 5).map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-medium text-slate-900 dark:text-white">
                              {event.title}
                            </p>
                            <p className="text-sm text-slate-500">
                              {event.date}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                event.category === "Technical"
                                  ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                                  : "bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300"
                              }`}
                            >
                              {event.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                                  style={{
                                    width: `${(event.registeredParticipants / event.maxParticipants) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium whitespace-nowrap">
                                {event.registeredParticipants}/{event.maxParticipants}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                event.status === "Ongoing"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {event.status}
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

          {activeTab === "events" && <EventManagement />}

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
