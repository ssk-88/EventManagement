import { RequestHandler } from "express";
import { store } from "../store";

export const getRegistrations: RequestHandler = (req, res) => {
  const email = req.query.email as string;
  if (email) {
    res.json(store.getRegistrationsByEmail(email));
  } else {
    res.json(store.getRegistrations());
  }
};

export const createRegistration: RequestHandler = (req, res) => {
  const registration = store.addRegistration(req.body);
  if (registration) {
    res.status(201).json(registration);
  } else {
    res.status(400).json({ message: "Registration failed. Event may be full or closed." });
  }
};
