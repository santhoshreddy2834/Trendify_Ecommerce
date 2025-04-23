const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Save or find user by email
router.post('/login', async (req, res) => {
  const { name, email, authProvider, phone } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(200).json(user);

    const newUser = await User.create({ name, email, authProvider, phone });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
