const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory user store
const users = [];

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ username: user.username }, 'SECRET_KEY');
  res.json({ token });
};
