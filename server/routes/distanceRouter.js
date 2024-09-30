const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/distance', async (req, res) => {
  const { origins, destinations } = req.query;
  const apiKey = process.env.GOOGLE_MAP_KEY;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins,
        destinations,
        key: apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch distance', error });
  }
});

module.exports = router;