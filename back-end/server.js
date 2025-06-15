const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const LOG_FILE = path.join(__dirname, 'submission-log.json');

app.post('/submit-form', (req, res) => {
  const formData = {
    ...req.body,
    submittedAt: new Date().toISOString()
  };

  // Check if file exists
  if (fs.existsSync(LOG_FILE)) {
    const fileContent = fs.readFileSync(LOG_FILE, 'utf-8');
    let data;
    try {
      data = JSON.parse(fileContent);
      if (!Array.isArray(data)) data = [];
    } catch (err) {
      console.error('Invalid JSON in log file. Overwriting.');
      data = [];
    }
    data.push(formData);
    fs.writeFileSync(LOG_FILE, JSON.stringify(data, null, 2));
  } else {
    fs.writeFileSync(LOG_FILE, JSON.stringify([formData], null, 2));
  }

  res.status(200).json({ message: 'Form submitted successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
