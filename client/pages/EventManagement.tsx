import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Clock,
  X,
  AlertCircle,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { Event, EventCategory } from "@shared/api";

export default function EventManagement() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    description: "",
    category: "Technical",
    type: "Team",
    venue: "",
    date: "",
    time: "",
    deadline: "",
    coordinator: "",
    coordinatorEmail: "",
    maxParticipants: 100,
    maxTeams: 25,
    teamSize: 3,
    teamSizeMin: 2,
    teamSizeMax: 4,
    rules: "",
    eligibility: "",
    status: "Upcoming",
    registrationOpen: true,
  });

  // Queries
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (newEvent: Partial<Event>) => {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setShowModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Event> }) => {
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setShowModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
    },
  });

  const categories: EventCategory[] = ["Technical", "Cultural", "Sports", "Workshop"];
  const categoryColors: {
    [key in EventCategory]: { bg: string; text: string; border: string };
  } = {
    Technical: {
      bg: "bg-primary-100 dark:bg-primary-900/20",
      text: "text-primary-700 dark:text-primary-300",
      border: "border-primary-300 dark:border-primary-700",
    },
    Cultural: {
      bg: "bg-secondary-100 dark:bg-secondary-900/20",
      text: "text-secondary-700 dark:text-secondary-300",
      border: "border-secondary-300 dark:border-secondary-700",
    },
    Sports: {
      bg: "bg-accent-100 dark:bg-accent-900/20",
      text: "text-accent-700 dark:text-accent-300",
      border: "border-accent-300 dark:border-accent-700",
    },
    Workshop: {
      bg: "bg-blue-100 dark:bg-blue-900/20",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-300 dark:border-blue-700",
    },
  };

  const statusColors: { [key: string]: string } = {
    Upcoming: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
    Ongoing: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    Completed: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
  };

  const handleAddEvent = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "Technical",
      type: "Team",
      venue: "",
      date: "",
      time: "",
      deadline: "",
      coordinator: "",
      coordinatorEmail: "",
      maxParticipants: 100,
      maxTeams: 25,
      teamSize: 3,
      teamSizeMin: 2,
      teamSizeMax: 4,
      rules: "",
      eligibility: "",
      status: "Upcoming",
      registrationOpen: true,
    });
    setShowModal(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingId(event.id);
    setFormData(event);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (!formData.title || !formData.venue || !formData.date) {
      alert("Please fill required fields");
      return;
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, updates: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleRegistration = (event: Event) => {
    updateMutation.mutate({
      id: event.id,
      updates: { registrationOpen: !event.registrationOpen }
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || event.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getDeadlineStatus = (deadline: string) => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days < 0) return { text: "Closed", color: "text-red-600" };
    if (days === 0) return { text: "Today", color: "text-red-600" };
    if (days === 1) return { text: "Tomorrow", color: "text-orange-600" };
    return { text: `${days} days left`, color: "text-green-600" };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Event Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create, edit, and manage all your college fest events
          </p>
        </div>
        <button
          onClick={handleAddEvent}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white"
          />
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option value="All">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
          <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4 opacity-50" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No events found matching your filters
          </p>
          <button
            onClick={handleAddEvent}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition"
          >
            <Plus className="w-4 h-4" />
            Create First Event
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredEvents.map((event) => {
            const color = categoryColors[event.category];
            const deadlineStatus = getDeadlineStatus(event.deadline);
            const registrationPercentage =
              (event.registeredParticipants / event.maxParticipants) * 100;

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${color.bg} ${color.text}`}
                        >
                          {event.category}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[event.status]}`}>
                          {event.status}
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            event.registrationOpen
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {event.registrationOpen ? "Open" : "Closed"}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {event.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {event.date} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Users className="w-4 h-4" />
                          <span>
                            {event.type === "Team"
                              ? `${event.teamSizeMin}-${event.teamSizeMax} members/team`
                              : "Individual event"}
                          </span>
                        </div>
                        <div className={`flex items-center gap-2 font-medium ${deadlineStatus.color}`}>
                          <Clock className="w-4 h-4" />
                          <span>Deadline: {deadlineStatus.text}</span>
                        </div>
                      </div>

                      {/* Registration Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Registrations
                          </span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {event.registeredParticipants}/{event.maxParticipants}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {Math.round(registrationPercentage)}% capacity
                        </p>
                      </div>

                      {/* Coordinator Info */}
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-sm">
                        <p className="text-slate-600 dark:text-slate-400 mb-1">
                          <span className="font-medium">Coordinator:</span>{" "}
                          {event.coordinator}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          <span className="font-medium">Email:</span>{" "}
                          {event.coordinatorEmail}
                        </p>
                      </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex gap-2 lg:flex-col w-full lg:w-auto">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleRegistration(event)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition font-medium"
                      >
                        {event.registrationOpen ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Close
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Open
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {editingId ? "Edit Event" : "Create New Event"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter event title"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter event description"
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category || "Technical"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Event Type
                    </label>
                    <select
                      value={formData.type || "Team"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as "Individual" | "Team",
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Team">Team</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Venue */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Date & Location
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Event Time
                    </label>
                    <input
                      type="time"
                      value={formData.time || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Venue *
                    </label>
                    <input
                      type="text"
                      value={formData.venue || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, venue: e.target.value })
                      }
                      placeholder="Enter venue name"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Registration Deadline
                    </label>
                    <input
                      type="date"
                      value={formData.deadline || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, deadline: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Coordinator Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Coordinator Details
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Coordinator Name
                    </label>
                    <input
                      type="text"
                      value={formData.coordinator || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinator: e.target.value,
                        })
                      }
                      placeholder="Coordinator name"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.coordinatorEmail || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinatorEmail: e.target.value,
                        })
                      }
                      placeholder="email@college.edu"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Participation Limits */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Participation Limits
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      value={formData.maxParticipants || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxParticipants: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {formData.type === "Team" && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Max Teams
                      </label>
                      <input
                        type="number"
                        value={formData.maxTeams || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            maxTeams: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  )}
                </div>

                {formData.type === "Team" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Min Team Size
                      </label>
                      <input
                        type="number"
                        value={formData.teamSizeMin || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            teamSizeMin: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Max Team Size
                      </label>
                      <input
                        type="number"
                        value={formData.teamSizeMax || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            teamSizeMax: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Rules & Eligibility */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Rules & Eligibility
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Event Rules
                  </label>
                  <textarea
                    value={formData.rules || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, rules: e.target.value })
                    }
                    placeholder="Enter event rules"
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Eligibility Criteria
                  </label>
                  <textarea
                    value={formData.eligibility || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, eligibility: e.target.value })
                    }
                    placeholder="Enter eligibility criteria"
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Event Status
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status || "Upcoming"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.registrationOpen || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationOpen: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded"
                  />
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Allow Registrations
                  </span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex gap-3 justify-end sticky bottom-0">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                {editingId ? "Update Event" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
