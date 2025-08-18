const jwt = require('jsonwebtoken');

//JWT TOKEN AUTHENTICATION
function verifySupabaseToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    req.user = payload; // attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

//API KEY AUTHENTICATION
function verifyApiKey(req, res, next) {
  const key = req.headers['x-api-key'];

  if (!key || key !== process.env.MY_API_KEY) {
    return res.status(403).json({ message: 'Forbidden - Invalid API Key' });
  }

  next();
}

module.exports = {
  verifySupabaseToken,
  verifyApiKey,
};
