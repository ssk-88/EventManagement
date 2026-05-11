import { Event, Registration, Announcement } from "@shared/api";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

export class DataStore {
  private events: Event[] = [];
  private registrations: Registration[] = [];
  private announcements: Announcement[] = [];

  constructor() {
    this.load();
    if (this.events.length === 0) {
      this.seed();
    }
  }

  private seed() {
    this.events = [
      {
        id: 1,
        title: "CodeMasters 2024",
        description: "Competitive programming challenge with exciting prizes",
        category: "Technical",
        type: "Team",
        venue: "Auditorium A",
        date: "2024-05-20",
        time: "10:00 AM",
        deadline: "2024-05-18",
        coordinator: "Dr. John Smith",
        coordinatorEmail: "john@college.edu",
        maxParticipants: 500,
        registeredParticipants: 324,
        maxTeams: 100,
        teamSize: 3,
        teamSizeMin: 2,
        teamSizeMax: 4,
        rules: "Team must follow competition rules. No external help allowed.",
        eligibility: "All students except final year students",
        status: "Upcoming",
        registrationOpen: true,
      },
      {
        id: 2,
        title: "Design Jam",
        description: "UI/UX design competition showcasing creativity",
        category: "Technical",
        type: "Team",
        venue: "Lab Block 2",
        date: "2024-05-22",
        time: "02:00 PM",
        deadline: "2024-05-20",
        coordinator: "Ms. Sarah Johnson",
        coordinatorEmail: "sarah@college.edu",
        maxParticipants: 250,
        registeredParticipants: 187,
        maxTeams: 60,
        teamSize: 3,
        teamSizeMin: 2,
        teamSizeMax: 4,
        rules: "Original designs only. Must use provided tools.",
        eligibility: "All students",
        status: "Upcoming",
        registrationOpen: true,
      },
      {
          id: 3,
          title: "Battle of Bands",
          description: "Showcase your musical talent",
          category: "Cultural",
          type: "Team",
          venue: "Main Stage",
          date: "2024-05-25",
          time: "06:00 PM",
          deadline: "2024-05-23",
          coordinator: "Mr. Mike Ross",
          coordinatorEmail: "mike@college.edu",
          maxParticipants: 100,
          registeredParticipants: 45,
          maxTeams: 20,
          teamSize: 5,
          teamSizeMin: 3,
          teamSizeMax: 8,
          rules: "Live instruments only. Max 15 mins per band.",
          eligibility: "Open to all colleges",
          status: "Upcoming",
          registrationOpen: true,
      },
      {
          id: 4,
          title: "Quiz Master",
          description: "General knowledge quiz marathon",
          category: "Technical",
          type: "Individual",
          venue: "Seminar Hall",
          date: "2024-05-28",
          time: "11:00 AM",
          deadline: "2024-05-26",
          coordinator: "Prof. Alan Turing",
          coordinatorEmail: "alan@college.edu",
          maxParticipants: 600,
          registeredParticipants: 512,
          rules: "Individual participation only.",
          eligibility: "All students",
          status: "Upcoming",
          registrationOpen: true,
      }
    ];

    this.registrations = [
      {
          id: 1,
          eventId: 1,
          participantEmail: "student@college.edu",
          participantName: "Demo Student",
          teamName: "Lambda Coders",
          role: "Team Lead",
          registrationDate: "2024-05-01"
      },
      {
          id: 2,
          eventId: 4,
          participantEmail: "student@college.edu",
          participantName: "Demo Student",
          role: "Participant",
          registrationDate: "2024-05-02"
      }
    ];

    this.announcements = [
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
        message: "The event venue has been changed to Auditorium B effective immediately.",
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
    this.save();
  }

  private load() {
    if (fs.existsSync(DB_PATH)) {
      try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
        this.events = data.events || [];
        this.registrations = data.registrations || [];
        this.announcements = data.announcements || [];
      } catch (e) {
        console.error("Failed to load database", e);
      }
    }
  }

  private save() {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify({
        events: this.events,
        registrations: this.registrations,
        announcements: this.announcements,
      }, null, 2));
    } catch (e) {
      console.error("Failed to save database", e);
    }
  }

  // Events
  getEvents() {
    return this.events;
  }

  getEvent(id: number) {
    return this.events.find(e => e.id === id);
  }

  addEvent(event: Omit<Event, "id" | "registeredParticipants">) {
    const newEvent: Event = {
      ...event,
      id: this.events.length > 0 ? Math.max(...this.events.map(e => e.id)) + 1 : 1,
      registeredParticipants: 0,
    };
    this.events.push(newEvent);
    this.save();
    return newEvent;
  }

  updateEvent(id: number, updates: Partial<Event>) {
    const index = this.events.findIndex(e => e.id === id);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...updates };
      this.save();
      return this.events[index];
    }
    return null;
  }

  deleteEvent(id: number) {
    const index = this.events.findIndex(e => e.id === id);
    if (index !== -1) {
      const deleted = this.events[index];
      this.events.splice(index, 1);
      this.save();
      return deleted;
    }
    return null;
  }

  // Registrations
  getRegistrations() {
    return this.registrations;
  }

  getRegistrationsByEmail(email: string) {
    return this.registrations.filter(r => r.participantEmail === email);
  }

  addRegistration(registration: Omit<Registration, "id" | "registrationDate">) {
    const event = this.getEvent(registration.eventId);
    if (!event || !event.registrationOpen) return null;
    if (event.registeredParticipants >= event.maxParticipants) return null;

    const newRegistration: Registration = {
      ...registration,
      id: this.registrations.length > 0 ? Math.max(...this.registrations.map(r => r.id)) + 1 : 1,
      registrationDate: new Date().toISOString().split('T')[0],
    };
    this.registrations.push(newRegistration);

    // Update event participant count
    this.updateEvent(registration.eventId, {
      registeredParticipants: event.registeredParticipants + 1
    });

    this.save();
    return newRegistration;
  }

  // Announcements
  getAnnouncements() {
    return this.announcements;
  }

  addAnnouncement(announcement: Omit<Announcement, "id" | "date">) {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: this.announcements.length > 0 ? Math.max(...this.announcements.map(a => a.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0],
    };
    this.announcements.push(newAnnouncement);
    this.save();
    return newAnnouncement;
  }
}

export const store = new DataStore();
