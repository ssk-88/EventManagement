import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  CheckCircle2,
  Clock,
  Award,
  QrCode,
  Share2,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Event, Registration, Announcement, LeaderboardEntry } from "@shared/api";
import { toast } from "sonner";

export default function ParticipantDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("participant_token");
    localStorage.removeItem("participant_email");
    localStorage.removeItem("participant_name");
    navigate("/participant/login");
  };

  const studentName = localStorage.getItem("participant_name") || "Student";
  const studentEmail = localStorage.getItem("participant_email") || "student@college.edu";

  // Queries
  const { data: allEvents = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      return res.json();
    },
  });

  const { data: myRegistrations = [] } = useQuery<Registration[]>({
    queryKey: ["/api/registrations", { email: studentEmail }],
    queryFn: async () => {
      const res = await fetch(`/api/registrations?email=${studentEmail}`);
      return res.json();
    },
  });

  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
    queryFn: async () => {
      const res = await fetch("/api/announcements");
      return res.json();
    },
  });

  const { data: leaderboard = [] } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
    queryFn: async () => {
      const res = await fetch("/api/leaderboard");
      return res.json();
    },
  });

  // Mutation
  const registerMutation = useMutation({
    mutationFn: async (eventId: number) => {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          participantEmail: studentEmail,
          participantName: studentName,
          role: "Participant",
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Registration failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/registrations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast.success("Successfully registered for the event!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const enrolledEvents = allEvents.filter(event =>
    myRegistrations.some(reg => reg.eventId === event.id)
  );

  const availableEvents = allEvents.filter(event =>
    !myRegistrations.some(reg => reg.eventId === event.id)
  );

  const filteredEvents = (activeTab === "browse" ? availableEvents : enrolledEvents).filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              <p className="text-sm font-medium text-slate-900 dark:text-white">{studentName}</p>
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
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">Enrolled Events</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{myRegistrations.length}</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-secondary-500" />
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">Active Teams</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {myRegistrations.filter(r => r.teamName).length}
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-8 h-8 text-primary-500" />
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">Best Rank</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">1st</p>
                </div>
              </div>

              {/* Enrolled Events Preview */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Enrolled Events</h2>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {enrolledEvents.length === 0 ? (
                    <p className="p-6 text-slate-500">You haven't registered for any events yet.</p>
                  ) : (
                    enrolledEvents.map((event) => {
                      const reg = myRegistrations.find(r => r.eventId === event.id);
                      return (
                        <div key={event.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" /> {event.date}
                                </div>
                                {reg?.teamName && (
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" /> {reg.teamName}
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <Award className="w-4 h-4" /> {reg?.role}
                                </div>
                              </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-900/50 transition-colors font-medium">
                              <QrCode className="w-4 h-4" /> Ticket
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "browse" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Browse Events</h1>
                <p className="text-slate-600 dark:text-slate-400">Discover and register for amazing fest events</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all group">
                    <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-6xl">
                      {event.category === "Technical" ? "💻" : event.category === "Cultural" ? "🎵" : "🏆"}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-900 dark:text-white">{event.title}</h3>
                        <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded">
                          {event.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 h-10 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Date</span>
                          <span className="font-medium text-slate-900 dark:text-white">{event.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Type</span>
                          <span className="font-medium text-slate-900 dark:text-white">{event.type}</span>
                        </div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Registered</span>
                          <span className="font-bold text-slate-900 dark:text-white">{event.registeredParticipants}/{event.maxParticipants}</span>
                        </div>
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full" style={{ width: `${(event.registeredParticipants / event.maxParticipants) * 100}%` }}></div>
                        </div>
                      </div>
                      <button
                        onClick={() => registerMutation.mutate(event.id)}
                        disabled={registerMutation.isPending || !event.registrationOpen || event.registeredParticipants >= event.maxParticipants}
                        className="w-full py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all group-hover:-translate-y-0.5 disabled:opacity-50"
                      >
                        {registerMutation.isPending ? "Registering..." : "Register"}
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
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Events</h1>
                <p className="text-slate-600 dark:text-slate-400">View and manage your enrolled events</p>
              </div>
              <div className="grid gap-6">
                {enrolledEvents.map((event) => {
                  const reg = myRegistrations.find(r => r.eventId === event.id);
                  return (
                    <div key={event.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{event.title}</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-secondary-500" />
                              <div>
                                <p className="text-slate-600 dark:text-slate-400">Event Date</p>
                                <p className="font-medium text-slate-900 dark:text-white">{event.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Users className="w-5 h-5 text-secondary-500" />
                              <div>
                                <p className="text-slate-600 dark:text-slate-400">Your Team</p>
                                <p className="font-medium text-slate-900 dark:text-white">{reg?.teamName || "Individual"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                            <QrCode className="w-5 h-5" /> Download Ticket
                          </button>
                          <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                            <Share2 className="w-5 h-5" /> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Live Leaderboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Top performing teams across all events</p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Rank</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Team</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Event</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry) => (
                      <tr key={entry.rank} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">#{entry.rank}</td>
                        <td className="px-6 py-4 font-medium">{entry.team}</td>
                        <td className="px-6 py-4">{entry.event}</td>
                        <td className="px-6 py-4 text-right font-bold">{entry.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Announcements</h1>
                <p className="text-slate-600 dark:text-slate-400">Stay updated with latest fest news</p>
              </div>
              <div className="space-y-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className={`rounded-xl border p-6 ${ann.type === "info" ? "bg-blue-50 border-blue-200" : ann.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-green-50 border-green-200"}`}>
                    <div className="flex items-start gap-4">
                      <Bell className="w-5 h-5" />
                      <div>
                        <h3 className="font-bold">{ann.title}</h3>
                        <p className="text-sm mt-1">{ann.message}</p>
                        <p className="text-xs mt-2 opacity-70">{ann.date}</p>
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
