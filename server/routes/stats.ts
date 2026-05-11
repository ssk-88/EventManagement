import { RequestHandler } from "express";
import { store } from "../store";
import { DashboardStats, LeaderboardEntry } from "@shared/api";

export const getStats: RequestHandler = (req, res) => {
  const events = store.getEvents();
  const registrations = store.getRegistrations();

  const stats: DashboardStats = {
    activeEvents: events.filter(e => e.status !== "Completed").length,
    totalRegistrations: registrations.length,
    participationRate: 78, // Mock calculation
    pendingApprovals: 24, // Mock
  };

  res.json(stats);
};

export const getLeaderboard: RequestHandler = (req, res) => {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, team: "Lambda Coders", event: "CodeMasters 2024", score: 850 },
    { rank: 2, team: "Code Ninjas", event: "CodeMasters 2024", score: 780 },
    { rank: 3, team: "Debug Squad", event: "CodeMasters 2024", score: 720 },
    { rank: 4, team: "Brain Busters", event: "Quiz Master", score: 650 },
    { rank: 5, team: "Algorithm Artists", event: "CodeMasters 2024", score: 580 },
  ];

  res.json(leaderboard);
};
