// Firebase configuration
const config = {
  apiKey: "AIzaSyBk535Bm5ZzIYS9xo7KqFPJYNIo-uo3K4g",
  authDomain: "project-72570450909.firebaseapp.com",
  databaseURL: "quiz-bf573-default-rtdb.firebaseio.com",
  projectId: "quiz-bf573",
  storageBucket: "project-72570450909.appspot.com",
  messagingSenderId: "72570450909",
};

firebase.initializeApp(config);

export const database = firebase.database();
