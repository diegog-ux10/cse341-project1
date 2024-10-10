const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    // swagger.tag=[Users]
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

const createUser = async (req, res) => {
    try {
        console.log('Received request body:', req.body);  // Agregar este log

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty or undefined' });
        }

        const user = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            ipaddress: req.body.ipaddress
        };

        const db = mongodb.getDb();
        const result = await db.collection('users').insertOne(user);

        if (result.acknowledged) {
            res.status(201).json({ id: result.insertedId, message: 'User created successfully' });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    } catch (err) {
        console.error('Error in createUser:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            console.log('Invalid ObjectId:', req.params.id);
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const db = mongodb.getDb();
        const userId = new ObjectId(req.params.id);
        const result = await db.collection('users').updateOne({ _id: userId }, { $set: req.body });

        if (result.modifiedCount === 0) {
            console.log('User not found for ID:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error in updateUser:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            console.log('Invalid ObjectId:', req.params.id);
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const db = mongodb.getDb();
        const userId = new ObjectId(req.params.id);
        const result = await db.collection('users').deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            console.log('User not found for ID:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error in deleteUser:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };