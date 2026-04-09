// One-time migration script: seeds all sermon video data into SQLite.
// Run once from the api/ directory: node seed.js
// Safe to re-run — uses INSERT OR IGNORE to skip existing rows.

const db = require('./db');

const sermons = [
  {date: '2026-04-05', youtube_id: 'DdQ_MM3Va0w', preacher: 'Minister Lori Pierce', title: 'Easter Sunday!!!', scripture: null, bible_version: null},
  {date: '2026-03-29', youtube_id: 'i7RJ352SNPA', preacher: 'Minister Michelle Hamiel', title: 'Palm Sunday!!!', scripture: null, bible_version: null},
  {date: '2026-03-22', youtube_id: 'VqXyYUbiF1k', preacher: 'Rev. Shawntay Thomas', title: null, scripture: 'Psalm 23', bible_version: null},
  {date: '2026-03-15', youtube_id: 'ROSoP6EpkjM', preacher: 'Rev. Donald Wright Jr', title: null, scripture: null, bible_version: null},
  {date: '2026-03-08', youtube_id: 'algk38coGWY', preacher: 'Rev. Dr. William Burgess', title: 'The Best Is Yet To Come!!!', scripture: null, bible_version: null},
  {date: '2026-03-01', youtube_id: 'oDPoDC6RIwE', preacher: 'Minister Michelle Hamiel', title: null, scripture: null, bible_version: null},
  {date: '2026-02-22', youtube_id: '2QQ4wREc4Ng', preacher: 'Rev. Renee Hammock', title: 'From Toxicity to Testimony', scripture: null, bible_version: null},
  {date: '2026-02-15', youtube_id: 'jfXWDAfmW3E', preacher: 'Minister Michelle Hamiel', title: 'Sunday Service!!!', scripture: null, bible_version: null},
  {date: '2026-02-08', youtube_id: 'Lp1-MFeSvwI', preacher: 'Rev. Renee Hammock', title: 'Fix My Life!!!', scripture: 'Luke 17:11-19', bible_version: 'NRSV'},
  {date: '2026-01-18', youtube_id: 'QKkghznuRi0', preacher: 'Rev. Donald Wright Jr', title: 'Keep Dreaming!!!', scripture: 'Genesis 37:5-11', bible_version: null},
  {date: '2026-01-11', youtube_id: 'sSAaHEtzQZw', preacher: 'Rev. Shawntay Thomas', title: 'A Blindsided Blessing!!!', scripture: null, bible_version: null},
  {date: '2026-01-04', youtube_id: 'Hw9mVkL2t5M', preacher: 'Rev. Debra Hickman-Arnette', title: "The Manifestations of God\u2019s Promises!!!", scripture: 'Ezekiel 36:26-27; 2 Corinthians 1:20', bible_version: null},
  {date: '2025-12-28', youtube_id: 'gaDXVtv9P6I', preacher: 'Rev. Dr. William Burgess', title: 'Baggage!', scripture: 'Philippians 4:4-7', bible_version: null},
  {date: '2025-12-21', youtube_id: 'EjjOWU7n0-I', preacher: 'Minister Michelle Hamiel', title: null, scripture: 'Philippians 4:1-9; John 14:27', bible_version: null},
  {date: '2025-11-30', youtube_id: 'xpDnlzCdNjI', preacher: 'Rev. Dr. Kevin A. Slayton, Sr.', title: null, scripture: null, bible_version: null},
  {date: '2025-11-23', youtube_id: 'DRABtKMorrg', preacher: 'Rev. Dr. Douglass Summers', title: "Gossiping about God\u2019s Goodness", scripture: 'Psalm 145:1-21', bible_version: null},
  {date: '2025-11-16', youtube_id: '_dIz6FdpN0g', preacher: 'Minister Michelle Hamiel', title: 'Keep Hope Alive!!!', scripture: 'Amos 8:1-2; 9:11-15', bible_version: 'MSG'},
  {date: '2025-11-09', youtube_id: 'LLzgrDGt-7U', preacher: 'Rev. Shawntay Thomas', title: 'Healing is coming to your house!', scripture: 'Amos 8:1-2; 9:11-15', bible_version: 'MSG'},
  {date: '2025-11-02', youtube_id: 'Oa9IL59h_CA', preacher: 'Rev. Debra Hickman-Arnette', title: 'Ripe for the Gathering!!!', scripture: 'Amos 8:1-2; 9:11-15', bible_version: 'MSG'},
  {date: '2025-10-26', youtube_id: 'NSbxQzJmgAA', preacher: 'Rev. Arnold Howard', title: null, scripture: '2 Kings 6:8-23', bible_version: 'KJV'},
  {date: '2025-10-19', youtube_id: 'F-viqheqMCg', preacher: 'Minister Lori Pierce', title: null, scripture: 'Isaiah 54:16-17', bible_version: 'KJV'},
  {date: '2025-10-12', youtube_id: 'UUny_Ni_LJM', preacher: 'Rev. Debra Hickman-Arnette', title: 'Trust God!!!', scripture: null, bible_version: null},
  {date: '2025-10-05', youtube_id: 'Q4ZV99zIPZM', preacher: 'Minister Michelle Hamiel', title: 'Just Wait!', scripture: null, bible_version: null},
  {date: '2025-09-28', youtube_id: '5n0p3YBWoNk', preacher: 'Rev. Dr. William Burgess', title: 'Hit by God!', scripture: 'Acts 9:1-9, 17-19', bible_version: null},
  {date: '2025-09-21', youtube_id: 'n-fOVVXE8fM', preacher: 'Rev. Renee Hammock', title: 'How To Make It Through!!!', scripture: 'Jeremiah 29:4-14', bible_version: 'ESV'},
  {date: '2025-09-14', youtube_id: 'V39yo7FV4I4', preacher: 'Rev. Donald Wright Jr', title: 'Strength for the Journey', scripture: null, bible_version: null},
  {date: '2025-09-07', youtube_id: 'Uq2CTL50dRY', preacher: 'Rev. Debra Hickman-Arnette', title: 'Communion in Divisive Times', scripture: '1 Corinthians 11:17-32', bible_version: null},
  {date: '2025-08-31', youtube_id: 'xWrZPbi9eXc', preacher: 'Rev. Renee Hammock', title: "Put it in the Lord\u2019s Hands", scripture: 'John 6:1-11', bible_version: null},
  {date: '2025-08-24', youtube_id: '3iVXV1pl8S8', preacher: 'Minister Lori Pierce', title: null, scripture: null, bible_version: null},
  {date: '2025-08-17', youtube_id: '0gcJCa0JAYcqIYzv', preacher: 'Minister Michelle Hamiel', title: "Let\u2019s Get Rooted", scripture: 'Luke 22:18-19', bible_version: null},
  {date: '2025-08-10', youtube_id: '-C4IvtslYis', preacher: 'Minister Lori Pierce', title: null, scripture: null, bible_version: null},
  {date: '2025-08-03', youtube_id: 'YK6WKwgTyg4', preacher: 'Minister Michelle Hamiel', title: null, scripture: 'Luke 22:18-19', bible_version: null},
  {date: '2025-07-27', youtube_id: '0vycUN4m_Qg', preacher: 'Rev. Renee Hammock', title: 'Give God Your Best!', scripture: 'Mark 14:3-9', bible_version: null},
  {date: '2025-07-20', youtube_id: 'bYE9dGJvFpQ', preacher: 'Minister Michelle Hamiel', title: 'We are the Ones!', scripture: 'Matthew 5:13-16', bible_version: null},
  {date: '2025-07-13', youtube_id: 'rxW4710tbVw', preacher: 'Rev. Dr. William Burgess', title: null, scripture: 'Jeremiah 29:10-14', bible_version: null},
  {date: '2025-07-06', youtube_id: '_a8wG1XFPKE', preacher: 'Rev. Debra Hickman-Arnette', title: 'Servants of Righteousness!!!', scripture: 'Romans 6:15-18', bible_version: 'ESV'},
  {date: '2025-06-29', youtube_id: 'op7K4HlY1Vw', preacher: 'Rev. Renee Hammock', title: 'Walking into a New Season\u2026Embracing Change and Renewal!!!', scripture: 'Joel 2:1-13', bible_version: 'NIV'},
  {date: '2025-06-22', youtube_id: 'BNqaADb5WDE', preacher: 'Minister Michelle Hamiel', title: 'Busting Out!', scripture: 'Isaiah 43:18-19', bible_version: null},
  {date: '2025-06-15', youtube_id: 'kGIy01Odu6I', preacher: null, title: "Happy Father\u2019s Day", scripture: null, bible_version: null},
  {date: '2025-06-08', youtube_id: 'UNH_YpMftzA', preacher: 'Minister Michelle Hamiel', title: 'Signed, Sealed, Delivered!', scripture: 'Ephesians 1:13-14', bible_version: null},
  {date: '2025-06-01', youtube_id: 'rx8310nWngc', preacher: 'Rev. Debra Hickman-Arnette', title: 'The Ascension of Our Lord & Its Meaning & The Importance', scripture: 'Acts 1:1-11; Ephesians 1:17-23', bible_version: null},
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO sermon_videos (date, youtube_id, preacher, title, scripture, bible_version, expires)
  VALUES (@date, @youtube_id, @preacher, @title, @scripture, @bible_version, 1)
`);

const insertMany = db.transaction((rows) => {
  for (const row of rows) {
    insert.run(row);
  }
});

insertMany(sermons);
console.log(`Seeded ${sermons.length} sermon records.`);
