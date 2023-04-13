// Replace with your app config object
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_Firebase_CONFIGURATION",
  authDomain: "REPLACE_WITH_YOUR_Firebase_CONFIGURATION",
  databaseURL: "REPLACE_WITH_YOUR_Firebase_CONFIGURATION",
  projectId: "REPLACE_WITH_YOUR_Firebase_CONFIGURATION",
  storageBucket: "REPLACE_WITH_YOUR_Firebase_CONFIGURATION",
  messagingSenderId: "REPLACE_WITH_YOUR_Firebase_CONFIGURATION",
  appId: "REPLACE_WITH_YOUR_Firebase_CONFIGURATION"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Make auth and database references
const auth = firebase.auth();
const db = firebase.database();