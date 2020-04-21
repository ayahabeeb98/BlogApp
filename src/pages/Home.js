import React, {useEffect, useState} from 'react';
import Card from "../components/Card";
import {auth} from "../services/firebase";
import {createUserDocument} from "../helpers/db";
import CurrentUser from "../components/CurrentUser";
import './style.css';

const Home = () => {
    const [user,setUser]  = useState('');


    useEffect( () => {
        // listen for auth state changes
        const unsubscribe =  auth.onAuthStateChanged(async userAuth=>{
            const user = await createUserDocument(userAuth);
        if (user) {
           console.log(auth.currentUser);
            setUser(user)
        }else {
            console.log("logout")
        }
    });
        // unsubscribe to the listener when unmounting
        return () => unsubscribe()
    }, []);

    return (
        <main className="pageContent">

            <h1>Home</h1>
            <CurrentUser user={user}/>
            <Card/>
        </main>
    )
};


export default Home;