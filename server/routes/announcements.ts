import { RequestHandler } from "express";
import { store } from "../store";

export const getAnnouncements: RequestHandler = (req, res) => {
  res.json(store.getAnnouncements());
};

export const createAnnouncement: RequestHandler = (req, res) => {
  const announcement = store.addAnnouncement(req.body);
  res.status(201).json(announcement);
};
