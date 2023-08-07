const express = require('express');
const axios = require('axios');

const app = express();
const port = 5173; // Choose a port for your server

app.use(express.json());

app.get('/api/speedtest', async (req, res) => {
  try {
    const response = await axios.get('https://www.speedtest.net/api/js/servers?engine=js');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching speedtest data:', error);
    res.status(500).json({ error: 'Failed to fetch speedtest data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
