// middleware.js - simple request validation middleware

function validateUser(req, res, next) {
  // Basic example validation: require a name field on POST
  if (req.method === 'POST') {
    const { name } = req.body || {};
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Invalid or missing `name` in request body' });
    }
  }
  next();
}

module.exports = {
  validateUser,
};
