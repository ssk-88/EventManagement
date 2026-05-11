import { RequestHandler } from "express";
import { store } from "../store";

export const getEvents: RequestHandler = (req, res) => {
  res.json(store.getEvents());
};

export const getEvent: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const event = store.getEvent(id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

export const createEvent: RequestHandler = (req, res) => {
  const newEvent = store.addEvent(req.body);
  res.status(201).json(newEvent);
};

export const updateEvent: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = store.updateEvent(id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

export const deleteEvent: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = store.deleteEvent(id);
  if (deleted) {
    res.json(deleted);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};
