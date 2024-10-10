const express = require('express');
const router = express.Router();

const { getAll, getSingle, createUser, updateUser, deleteUser } = require('../controllers/users');

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;