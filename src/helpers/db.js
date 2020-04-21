import {auth, db} from "../services/firebase";

export const createUserDocument = async (user,additionalData) => {
    if (!user) return;
    //Get a reference of the user in database
    const userRef = db.doc(`users/${user.uid}`);

    //get user data

    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const { displayName, email, photoURL } = user;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData,
            });
        } catch (e) {
            console.error('Error creating user', e.message)
        }
    }

    return getUserDocument(user.uid);
};


export const getUserDocument = async (uid) => {
    if(!uid) return null;

    try {
        const userDoc =  await db
            .collection('users')
            .doc(uid)
            .get();

        return { uid, ...userDoc.data() };

    }catch (e) {
        console.error('User not found' , e.message)
    }
};