const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use(express.json()); // body-parser
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const SERVER_PORT = 3000;
app.listen(SERVER_PORT, () => {
  console.log(`🚀 Server running at http://localhost:${SERVER_PORT}`);
});
