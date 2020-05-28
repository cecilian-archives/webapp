export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const transloaditKey = "750d26800c9411e99ff16dafffcf4ae2";
export const transloaditMinutesTemplateId = "a34188603a2611e9b44f2f1f0370e845";
export const transloaditPhotosTemplateId = "5a080bc0102211e9a9858bdad297fa5a";
export const transloaditMinutesAllowedFileTypes = [".pdf"];
export const transloaditPhotosAllowedFileTypes = ["image/*"];
