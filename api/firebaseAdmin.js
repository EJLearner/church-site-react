const admin = require('firebase-admin');

const serviceAccountPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  '/home/deploy/service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  databaseURL:
    process.env.FIREBASE_DATABASE_URL || 'https://ct-data-773e4.firebaseio.com',
});

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const token = authHeader.slice(7);
  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({error: 'Invalid or expired token'});
  }
}

// Must run after requireAuth. Allows the request only if the signed-in user
// is a member of at least one of the given Firebase user_groups.
function requireGroup(...groups) {
  return async (req, res, next) => {
    try {
      const snapshots = await Promise.all(
        groups.map((group) =>
          admin.database().ref(`user_groups/${group}/${req.user.uid}`).get(),
        ),
      );
      if (snapshots.some((snapshot) => snapshot.val() === true)) {
        return next();
      }
      res.status(403).json({error: 'Forbidden'});
    } catch {
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
