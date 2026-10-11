const https = require('https');

const admin = require('firebase-admin');

const serviceAccountPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  '/home/deploy/service-account.json';

const DATABASE_URL =
  process.env.FIREBASE_DATABASE_URL || 'https://ct-data-773e4.firebaseio.com';

// How long to wait for the group lookup before giving up
const GROUP_LOOKUP_TIMEOUT_MS = 5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const token = authHeader.slice(7);
  try {
    req.user = await admin.auth().verifyIdToken(token);
    // Kept for requireGroup, which reads the database as this user
    req.idToken = token;
    next();
  } catch {
    res.status(401).json({error: 'Invalid or expired token'});
  }
}

// Reads one Realtime Database value through the REST API, as the signed-in
// user (so the database rules apply). Resolves to null when the rules deny
// the read. admin.database() is not used because its service account token
// request needs fetch/Headers, which the server's Node 16 does not have.
function readDatabaseValue(path, idToken) {
  const url = `${DATABASE_URL}/${path}.json?auth=${encodeURIComponent(idToken)}`;

  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {timeout: GROUP_LOOKUP_TIMEOUT_MS},
      (response) => {
        let body = '';
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          if (response.statusCode === 401 || response.statusCode === 403) {
            resolve(null);
          } else if (response.statusCode !== 200) {
            reject(new Error(`Database returned ${response.statusCode}`));
          } else {
            try {
              resolve(JSON.parse(body));
            } catch (error) {
              reject(error);
            }
          }
        });
      },
    );
    request.on('timeout', () =>
      request.destroy(new Error('Group lookup timed out')),
    );
    request.on('error', reject);
  });
}

// Must run after requireAuth. Allows the request only if the signed-in user
// is a member of at least one of the given Firebase user_groups.
function requireGroup(...groups) {
  return async (req, res, next) => {
    try {
      const memberships = await Promise.all(
        groups.map((group) =>
          readDatabaseValue(
            `user_groups/${group}/${encodeURIComponent(req.user.uid)}`,
            req.idToken,
          ),
        ),
      );
      if (memberships.some((membership) => membership === true)) {
        return next();
      }
      res.status(403).json({error: 'Forbidden'});
    } catch (error) {
      console.error('requireGroup lookup failed:', error.message);
      res.status(500).json({error: 'Unable to verify permissions'});
    }
  };
}

// Auth chain for sermon, meditation and verse admin routes
const requireContentAccess = [
  requireAuth,
  requireGroup('admins', 'contentAdmin'),
];

module.exports = {requireAuth, requireGroup, requireContentAccess};
