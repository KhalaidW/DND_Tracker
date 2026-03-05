// Imports
import express from 'express';
import db from '../db/conn.js'; 
import { ObjectId } from 'mongodb';

const router = express.Router();

// CREATE 
router
  .route('/')
  .post(async (req, res, next) => {
    try {
      const collection = db.collection('characters');
      const result = await collection.insertOne(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err); 
    }
  })
  .get(async (_req, res, next) => {
    try {
      const collection = db.collection('characters');
      const results = await collection.find({}).sort({ name: 1 }).toArray();
      res.json(results);
    } catch (err) {
      next(err);
    }
  });

// READ 
router
  .route('/:id')
  .patch(async (req, res, next) => {
    try {
      const collection = db.collection('characters');
      const query = { _id: new ObjectId(req.params.id) };
      const update = { $set: req.body };
      const result = await collection.updateOne(query, update);
      res.json(result);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const collection = db.collection('characters');
      const query = { _id: new ObjectId(req.params.id) };
      const result = await collection.deleteOne(query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  })
    .get(async (req, res, next) => {
    try {
      const collection = db.collection('characters');
      const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
      if (!result) {
        res.status(404).json({ error: 'Character not found' });
      } else {
        res.json(result);
      }
    } catch (err) {
      next(err);
    }
  })

export default router;