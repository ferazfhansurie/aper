import express from 'express';
import { DatabaseService } from '../services/database.mjs';

const router = express.Router();

// Dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await DatabaseService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Migration statistics
router.get('/migration-stats', async (req, res) => {
  try {
    const stats = await DatabaseService.getMigrationStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Schema information
router.get('/schema', async (req, res) => {
  try {
    const schema = await DatabaseService.getSchemaInfo();
    res.json(schema);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Investors
router.get('/investors', async (req, res) => {
  try {
    const investors = await DatabaseService.getInvestors();
    res.json(investors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/investors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const investor = await DatabaseService.getInvestorById(id);
    if (!investor) {
      return res.status(404).json({ error: 'Investor not found' });
    }
    res.json(investor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Investees
router.get('/investees', async (req, res) => {
  try {
    const investees = await DatabaseService.getInvestees();
    res.json(investees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/investees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const investee = await DatabaseService.getInvesteeById(id);
    if (!investee) {
      return res.status(404).json({ error: 'Investee not found' });
    }
    res.json(investee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deals
router.get('/deals', async (req, res) => {
  try {
    const deals = await DatabaseService.getDeals();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/deals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await DatabaseService.getDealById(id);
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search across all entities
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const results = await DatabaseService.search(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router };