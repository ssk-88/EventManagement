/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface DemoResponse {
  message: string;
}

export type EventCategory = "Technical" | "Cultural" | "Sports" | "Workshop";
export type EventType = "Individual" | "Team";
export type EventStatus = "Upcoming" | "Ongoing" | "Completed";

export interface Event {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  type: EventType;
  venue: string;
  date: string;
  time: string;
  deadline: string;
  coordinator: string;
  coordinatorEmail: string;
  maxParticipants: number;
  registeredParticipants: number;
  maxTeams?: number;
  teamSize?: number;
  teamSizeMin?: number;
  teamSizeMax?: number;
  rules: string;
  eligibility: string;
  status: EventStatus;
  registrationOpen: boolean;
  posterUrl?: string;
}

export interface Registration {
  id: number;
  eventId: number;
  participantEmail: string;
  participantName: string;
  teamName?: string;
  role: string;
  registrationDate: string;
}

export interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "info" | "warning" | "success";
}

export interface DashboardStats {
  activeEvents: number;
  totalRegistrations: number;
  participationRate: number;
  pendingApprovals: number;
}

export interface LeaderboardEntry {
  rank: number;
  team: string;
  event: string;
  score: number;
}
