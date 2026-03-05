// Imports
import express from "express";
import db from "../db/conn.js"; // direct DB import
import { ObjectId } from "mongodb";

const router = express.Router();

// Allowed fields to prevent extra unwanted data
const allowedFields = ["name", "class", "race", "level"];

// CREATE 
router
  .route("/")
  .post(async (req, res, next) => {
    try {
      const collection = db.collection("characters");

      // Only insert allowed fields
      const cleanBody = {};
      allowedFields.forEach((key) => {
        if (req.body[key] !== undefined) cleanBody[key] = req.body[key];
      });

      const result = await collection.insertOne(cleanBody);
      const createdCharacter = await collection.findOne({ _id: result.insertedId });
      res.status(201).json(createdCharacter);
    } catch (err) {
      next(err);
    }
  })
  .get(async (_req, res, next) => {
    try {
      const collection = db.collection("characters");
      const results = await collection.find({}).sort({ _id: -1 }).toArray();
      res.json(results);
    } catch (err) {
      next(err);
    }
  });

// READ 
router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const collection = db.collection("characters");
      const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
      if (!result) return res.status(404).json({ error: "Character not found" });
      res.json(result);
    } catch (err) {
      next(err);
    }
  })
.patch(async (req, res, next) => {
  try {
    const collection = db.collection("characters");
    const query = { _id: new ObjectId(req.params.id) };

    // Only update allowed fields
    const update = { $set: {} };
    ["name", "class", "race", "level"].forEach((key) => {
      if (req.body[key] !== undefined) update.$set[key] = req.body[key];
    });

    if (Object.keys(update.$set).length === 0) {
      return res.status(400).json({ error: "No valid fields provided to update" });
    }

    const result = await collection.updateOne(query, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Character not found" });
    }

    // Fetch the updated character
    const updatedCharacter = await collection.findOne(query);
    res.json(updatedCharacter);
  } catch (err) {
    next(err);
  }
})
  .delete(async (req, res, next) => {
    try {
      const collection = db.collection("characters");
      const query = { _id: new ObjectId(req.params.id) };
      const result = await collection.deleteOne(query);
      if (result.deletedCount === 0) return res.status(404).json({ error: "Character not found" });
      res.json({ message: "Character deleted successfully" });
    } catch (err) {
      next(err);
    }
  });

export default router;