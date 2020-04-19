
import React, {useEffect, useState} from 'react';
import Card from "../components/Card";
import {auth,db} from "../services/firebase";

const Home = (props) => {
    const [name,setName]  = useState('');

    const logout = () => {
        auth.signOut().then(function() {
            // Sign-out successful.
            props.history.push('/login')
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    };


    useEffect(()=> {
        auth.onAuthStateChanged(user => {
            if(user) {
               setName(user.displayName);
            }
        })
    },[name]);

    // useEffect(() => auth.onAuthStateChanged(()=>getUser()),[]);
    // const getUser = () => {
    //   const user = auth.currentUser;
    //   if (user !== null) {
    //       const result = db.collection('users').where('email' , '==' , user.email).get()
    //           .then(function(querySnapshot) {
    //               querySnapshot.forEach(function(doc) {
    //                   // doc.data() is never undefined for query doc snapshots
    //                   setName(doc.data().name)
    //               });
    //           })
    //           .catch(function(error) {
    //               console.log("Error getting documents: ", error);
    //           });
    //       console.log(user.getIdToken());
    //       console.log(user.uid)
    //   }
    // };


    return (
        <>
            <h1>Home</h1>
            <p>Welcome , {name}</p>
            <button onClick={logout}>Logout</button>
            <Card/>
        </>
    )
};


export default Home;