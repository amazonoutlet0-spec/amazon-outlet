// Mock Firebase configuration for local development
// TODO: Add real Firebase configuration later

// Mock auth object
const mockAuth = {
  currentUser: {
    uid: "mock-user-id",
    email: "mock@example.com",
    displayName: "Mock User"
  },
  onAuthStateChanged: (callback) => {
    callback(mockAuth.currentUser);
    return () => {}; // unsubscribe function
  }
};

// Mock app object
const mockApp = {};

// Mock analytics object
const mockAnalytics = {};

export const initializeApp = () => mockApp;
export const getAuth = () => mockAuth;
export const getAnalytics = () => mockAnalytics;
export const auth = mockAuth;
