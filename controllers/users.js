const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const users = await db.collection('users').find().toArray();
        
        res.json(users);
    } catch (err) {
        console.error('Error in getAll:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSingle = async (req, res) => {
    console.log('Received request for user ID:', req.params.id);
    try {
        if (!ObjectId.isValid(req.params.id)) {
            console.log('Invalid ObjectId:', req.params.id);
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const db = mongodb.getDb();
        const userId = new ObjectId(req.params.id);
        console.log('Searching for user with ObjectId:', userId);
        const user = await db.collection('users').findOne({ _id: userId });

        if (!user) {
            console.log('User not found for ID:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User found:', user);
        res.json(user);
    } catch (err) {
        console.error('Error in getSingle:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAll, getSingle };