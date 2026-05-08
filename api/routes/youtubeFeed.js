// Provides the /api/youtube-feed endpoint used by the sermon admin picker.
// Returns the church's most recent public YouTube uploads so admins can
// select a video when adding a sermon record.

const https = require('https');
const express = require('express');

const {requireAuth} = require('../firebaseAdmin');

const CHANNEL_ID = 'UCtqcWNEVAjxI4jx6ucoM0TA';
// Uploads playlist ID is channel ID with UC replaced by UU
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace(/^UC/, 'UU');

// Cache the feed for 6 hours to avoid burning YouTube API quota on every page load.
// Pass ?reload=true to bypass the cache and fetch fresh results.
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
let cache = null;

const router = express.Router();

// Fetches a URL and parses the response body as JSON.
// Uses the built-in https module since this server runs on Node 16.
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => resolve(JSON.parse(data)));
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

  const playlistUrl =
    `https://www.googleapis.com/youtube/v3/playlistItems` +
    `?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=5&key=${apiKey}`;

  try {
    // Fetch the 5 most recent videos from the channel's uploads playlist.
    const playlistJson = await fetchJson(playlistUrl);
    const items = playlistJson.items ?? [];

    // Fetch the upload status for each video. Live streams create a duplicate
    // entry in the playlist with uploadStatus "uploaded" (the offline recording),
    // while the real persistent upload has uploadStatus "processed". Filtering
    // to only "processed" removes the broken "Live stream offline" duplicates.
    const videoIds = items
      .map(({snippet}) => snippet.resourceId.videoId)
      .join(',');
    const statusJson = await fetchJson(
      `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoIds}&key=${apiKey}`,
    );
    const processedVideoIds = new Set(
      (statusJson.items ?? [])
        .filter(({status}) => status.uploadStatus === 'processed')
        .map(({id}) => id),
    );

    const videos = items
      .filter(({snippet}) => processedVideoIds.has(snippet.resourceId.videoId))
      .map(({snippet}) => ({
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
