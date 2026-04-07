// ============================================
// HOLOCENE CMS — Firebase Configuration
// ============================================
// Using Firebase v9+ CDN (compat mode for simplicity with plain HTML/JS)

// Your Firebase project config
const firebaseConfig = {
  apiKey: "MY KEY",
  authDomain: "crossgate-cms.firebaseapp.com",
  projectId: "crossgate-cms",
  storageBucket: "crossgate-cms.firebasestorage.app",
  messagingSenderId: "298950831226",
  appId: "MY ID",
  measurementId: "G-9MV82QQFE3"
};

// Initialize Firebase (compat SDK — works directly in HTML without bundler)
firebase.initializeApp(firebaseConfig);

// Export references used throughout the CMS
const db      = firebase.firestore();
const auth    = firebase.auth();
const storage = firebase.storage();
