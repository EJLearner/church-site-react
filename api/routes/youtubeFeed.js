const https = require('https');
const express = require('express');

const {requireAuth} = require('../firebaseAdmin');

const CHANNEL_ID = 'UCtqcWNEVAjxI4jx6ucoM0TA';
// Uploads playlist ID is channel ID with UC replaced by UU
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace(/^UC/, 'UU');

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
let cache = null;

const router = express.Router();

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

router.get('/', requireAuth, async (req, res) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({error: 'YOUTUBE_API_KEY not configured'});
  }

  const reload = req.query.reload === 'true';
  const cacheValid = cache && Date.now() - cache.timestamp < CACHE_TTL_MS;

  if (!reload && cacheValid) {
    return res.json(cache.data);
  }

  const url =
    `https://www.googleapis.com/youtube/v3/playlistItems` +
    `?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=5&key=${apiKey}`;

  try {
    const body = await fetchUrl(url);
    const json = JSON.parse(body);
    const videos = (json.items ?? []).map(({snippet}) => ({
      videoId: snippet.resourceId.videoId,
      title: snippet.title,
      published: snippet.publishedAt,
      thumbnail: snippet.thumbnails?.medium?.url,
    }));
    cache = {data: videos, timestamp: Date.now()};
    res.json(videos);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
