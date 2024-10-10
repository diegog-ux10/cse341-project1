const express = require('express');
const router = express.Router();

const { getAll, getSingle } = require('../controllers/users');

router.get('/', getAll);
router.get('/:id', getSingle);

module.exports = router;