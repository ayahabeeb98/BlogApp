import {auth} from "./firebase";

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





//Handle Sign up

export const registerNewUser =  (email,password,displayName) => {
    auth.createUserWithEmailAndPassword(email,password)
        .then(() => {
            const user = auth.currentUser;
            user.updateProfile({
                displayName
            }).then(() => {
                sendEmailVerification(user);
            }).catch(function(error) {
                console.error(error.message);
            });
        })
        .catch(error =>
            handleError(error)
        )
};