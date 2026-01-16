const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/', leadController.getLeads);
router.get('/stats', leadController.getLeadStats);
router.get('/:id', leadController.getLeadById);

module.exports = router;
