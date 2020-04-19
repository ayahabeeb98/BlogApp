import firebase,{auth} from "./firebase";


export function handleLogin(email,password) {
    auth.signInWithEmailAndPassword(email,password)
        .catch(error => {
        })
}

export const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();


    auth.signInWithPopup(provider).then(result => {
        const token = result.credential.accessToken;

        const user = result.user;
        console.log(user);

    }).catch(error => {
        const errorCode = error.code;
        const errorMsg = error.message;

        const email = error.email;

        const credential = error.credential;

        alert(errorMsg);
    })

};



export const loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();


    auth.signInWithPopup(provider).then(result => {
        const token = result.credential.accessToken;

        const user = result.user;
        console.log('facebook ',user);

    }).catch(error => {
        const errorCode = error.code;
        const errorMsg = error.message;

        const email = error.email;

        const credential = error.credential;

        alert(errorMsg);
    })

};

