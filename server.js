const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BOOKINGS_FILE = path.join(__dirname, 'src', 'data', 'bookings.json');

app.get('/api/bookings', async (req, res) => {
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, 'utf8');
    res.json(JSON.parse(raw || '[]'));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read bookings file' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const booking = req.body;
    if (!booking || !booking.id) {
      return res.status(400).json({ error: 'Invalid booking payload' });
    }

    let current = [];
    try {
      const raw = await fs.readFile(BOOKINGS_FILE, 'utf8');
      current = JSON.parse(raw || '[]');
    } catch (e) {
      current = [];
    }

    current.push(booking);
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(current, null, 2), 'utf8');

    res.status(201).json(booking);
  } catch (err) {
    console.error('Failed to save booking', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Booking API server running on http://localhost:${PORT}`);
});