var firebase = require("firebase/app");


require("firebase/auth");


const firebaseConfig = {
    apiKey: "AIzaSyDKejyIt6V2ymKyT5rElniQre98BxX_ZYE",
    authDomain: "databasecourse-f0022.firebaseapp.com",
    databaseURL: "https://databasecourse-f0022.firebaseio.com",
    projectId: "databasecourse-f0022",
    storageBucket: "databasecourse-f0022.appspot.com",
    messagingSenderId: "514995572745",
    appId: "1:514995572745:web:4a3921cc0674a51a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
