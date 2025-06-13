// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData);

    fs.appendFile('submission-log.json', JSON.stringify(formData) + '\n', err => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    res.status(200).json({ message: 'Form submitted successfully' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
