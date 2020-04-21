import {auth} from "../services/firebase";

//Handle Error

const handleError = (error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
    } else {
        alert(errorMessage);
    }
};

/**
 * Sends an email verification to the user.
 */
export function sendEmailVerification(user) {
    // [START sendemailverification]
    auth.currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
    });
    // [END sendemailverification]
}


export const authProvider = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("login")
        } else {
            console.log("logout")
        }
    });
};




//Handle Sign up

export const registerNewUser = async (email,password,displayName) => {
    await auth.createUserWithEmailAndPassword(email,password);
    return auth.currentUser.updateProfile({displayName})
};