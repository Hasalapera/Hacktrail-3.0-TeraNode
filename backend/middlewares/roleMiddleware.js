// Role-based access control middleware
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    // req.user is set by the authenticate middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: `Forbidden: Access is restricted to ${requiredRole} accounts.` });
    }
    next();
  };
};

module.exports = { checkRole };