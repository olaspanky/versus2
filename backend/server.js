const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-db-name', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  company: String,
  companyName: String,
  accumulatedTime: Number,
  dailyTime: [{ date: String, timeSpent: Number }],
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/updateUser', async (req, res) => {
  const { email, password, company, companyName } = req.body;
  try {
    await User.findOneAndUpdate(
      { email },
      { email, password, company, companyName },
      { upsert: true }
    );
    res.status(200).send('User updated successfully.');
  } catch (error) {
    res.status(500).send('Error updating user.');
  }
});

app.post('/api/updateSession', async (req, res) => {
  const { email, timeSpent } = req.body;
  try {
    await User.findOneAndUpdate(
      { email },
      { $inc: { accumulatedTime: timeSpent } },
      { upsert: true }
    );
    res.status(200).send('Session updated successfully.');
  } catch (error) {
    res.status(500).send('Error updating session.');
  }
});

app.post('/api/dailyUpdate', async (req, res) => {
  const { email, timeSpent } = req.body;
  const currentDate = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
  try {
    await User.findOneAndUpdate(
      { email },
      { $push: { dailyTime: { date: currentDate, timeSpent } } },
      { upsert: true }
    );
    res.status(200).send('Daily session updated successfully.');
  } catch (error) {
    res.status(500).send('Error updating daily session.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
