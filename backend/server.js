const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Backend is running' });
});

app.post('/submit', (req, res) => {
  const { name, message } = req.body;

  console.log('New form submission:', {
    name,
    message,
    submittedAt: new Date().toISOString()
  });

  res.json({
    success: true,
    message: `Thanks, ${name || 'User'}! Your message was received.`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
