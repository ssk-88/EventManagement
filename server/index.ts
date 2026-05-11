import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import * as eventRoutes from "./routes/events";
import * as registrationRoutes from "./routes/registrations";
import * as announcementRoutes from "./routes/announcements";
import * as statRoutes from "./routes/stats";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Events API
  app.get("/api/events", eventRoutes.getEvents);
  app.get("/api/events/:id", eventRoutes.getEvent);
  app.post("/api/events", eventRoutes.createEvent);
  app.patch("/api/events/:id", eventRoutes.updateEvent);
  app.delete("/api/events/:id", eventRoutes.deleteEvent);

  // Registrations API
  app.get("/api/registrations", registrationRoutes.getRegistrations);
  app.post("/api/registrations", registrationRoutes.createRegistration);

  // Announcements API
  app.get("/api/announcements", announcementRoutes.getAnnouncements);
  app.post("/api/announcements", announcementRoutes.createAnnouncement);

  // Stats API
  app.get("/api/stats", statRoutes.getStats);
  app.get("/api/leaderboard", statRoutes.getLeaderboard);

  return app;
}
