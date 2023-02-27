import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, signInAnonymously, onAuthStateChanged, User } from "firebase/auth";
import Application from "../Application";
import Events from "../const/Events";
import { Database, getDatabase } from "firebase/database";

export default class AuthController {
    private firebaseApp: FirebaseApp;
    private analytics: Analytics;
    private auth: Auth;
    private user: User;
    private database: Database;

    constructor() {

        const firebaseConfig = {
            apiKey: "AIzaSyBlIWHvoG7nSuxK_quV0CCn1SQnAR9V66g",
            authDomain: "chesspixi.firebaseapp.com",
            projectId: "chesspixi",
            storageBucket: "chesspixi.appspot.com",
            messagingSenderId: "862140523943",
            appId: "1:862140523943:web:770d3b93ac67693c1e0282",
            measurementId: "G-0EG6YFZ6NF",
            databaseURL: "https://chesspixi-default-rtdb.europe-west1.firebasedatabase.app/"
        };

        // Initialize Firebase
        this.firebaseApp = initializeApp(firebaseConfig);
        this.analytics = getAnalytics(this.firebaseApp);
        this.auth = getAuth(this.firebaseApp);
        this.database = getDatabase(this.firebaseApp);

        this.signIn();

        onAuthStateChanged(this.auth, this.onAuthStateChanged);
    }

    private onAuthStateChanged(user: User): void {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            this.user = user;
            Application.APP.dispatcher.emit(Events.AUTHENTICATED);
        } else {
            this.user = null;
            // User is signed out
            // handle sign out...
        }
    }

    private signIn(): void {
        signInAnonymously(this.auth)
            .then(() => {
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // handle failed sign in
            });
    }
}