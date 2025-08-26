import express from 'express';
import { processResearchQuery } from '../research.js';

const router = express.Router();

router.post('/research', async (req, res) => {
  try {
    const { url } = req.body;
    const result = await processResearchQuery(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;