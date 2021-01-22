import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const devConfig = {
    apiKey: process.env.REACT_APP_DEV_API_KEY,
    authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
    projectId: process.env.REACT_APP_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_DEV_APP_ID,
};

const prodConfig = {
    apiKey: process.env.REACT_APP_PROD_API_KEY,
    authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
    projectId: process.env.REACT_APP_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_PROD_APP_ID,
};

const firebaseConfig = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    // ** Authentication API

    // This method creates user with email and password at firebase endpoint.
    doCreatUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    // This method allows logging in/singing up with email and password
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // This method signs out user
    doSignOut = () => this.auth.signOut();

    // This method resets user's password
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    // This method changes user's password
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);


    // **User API**

    //This method returns single user
    user = uid => this.db.ref(`users/${uid}`);

    //This method returns all users object
    users = () => this.db.ref(`users`);

}

export default Firebase;