// Simplified authentication middleware for local development
// TODO: Add real Firebase authentication later

async function authenticateFirebaseToken(req, res, next) {
  // For local development, always pass through with a mock user
  req.firebaseUid = 'mock-user-id';
  next();
}

module.exports = { authenticateFirebaseToken };
