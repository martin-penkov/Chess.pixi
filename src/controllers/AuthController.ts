import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from "firebase/auth";
import Application from "../Application";
import Events from "../const/Events";

export default class AuthController {
    private firebaseApp: FirebaseApp;
    private analytics: Analytics;
    private auth: Auth;
    private user: User;

    constructor() {
        // Import the functions you need from the SDKs you need
        
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyBlIWHvoG7nSuxK_quV0CCn1SQnAR9V66g",
            authDomain: "chesspixi.firebaseapp.com",
            projectId: "chesspixi",
            storageBucket: "chesspixi.appspot.com",
            messagingSenderId: "862140523943",
            appId: "1:862140523943:web:770d3b93ac67693c1e0282",
            measurementId: "G-0EG6YFZ6NF"
        };

        // Initialize Firebase
        this.firebaseApp = initializeApp(firebaseConfig);
        this.analytics = getAnalytics(this.firebaseApp);
        this.auth = getAuth(this.firebaseApp);
    }

    private login(email: string, password: string): void {
        signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in 
                this.user = userCredential.user;
                Application.APP.dispatcher.emit(Events.AUTHENTICATED);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //HANDLE the failed login
            });
    }
    
    private register(email: string, password: string): void {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in 
                this.user = userCredential.user;
                Application.APP.dispatcher.emit(Events.AUTHENTICATED);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //HANDLE the failed login
            });
    }
}