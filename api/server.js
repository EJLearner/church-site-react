require('dotenv').config();
const cors = require('cors');
const express = require('express');

const dailyVersesRouter = require('./routes/dailyVerses');
const meditationsRouter = require('./routes/meditations');
const sermonsRouter = require('./routes/sermons');
const verseRouter = require('./routes/verse');
const youtubeFeedRouter = require('./routes/youtubeFeed');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/sermons', sermonsRouter);
app.use('/api/daily-verses', dailyVersesRouter);
app.use('/api/weekly-meditation', meditationsRouter);
app.use('/api/verse', verseRouter);
app.use('/api/youtube-feed', youtubeFeedRouter);

app.listen(PORT, () => {
  console.log(`Church API running on port ${PORT}`);
});
