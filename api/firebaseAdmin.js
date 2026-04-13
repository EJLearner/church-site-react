const admin = require('firebase-admin');

const serviceAccountPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  '/home/deploy/service-account.json';

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
    next();
  } catch {
    res.status(401).json({error: 'Invalid or expired token'});
  }
}

module.exports = {requireAuth};
