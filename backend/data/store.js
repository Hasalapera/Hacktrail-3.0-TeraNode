// ============================================================
// In-Memory Data Store (Replaces PostgreSQL for now)
// Swap this out with real DB queries when PostgreSQL is ready
// ============================================================

const users = [
  {
    id: 1,
    phone: '0712345678',
    username: 'student1',
    password: 'tempPassword123',
    isFirstLogin: true,
    profileCompleted: false,
    basicDetails: {},
  },
];

module.exports = { users };
