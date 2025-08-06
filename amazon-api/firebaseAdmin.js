// Simplified Firebase Admin setup - disabled for now
// TODO: Add Firebase configuration later

const mockAdmin = {
  auth: () => ({
    verifyIdToken: async (token) => {
      // Mock verification - always return a mock user
      return {
        uid: 'mock-user-id',
        email: 'mock@example.com'
      };
    }
  })
};

module.exports = mockAdmin;
