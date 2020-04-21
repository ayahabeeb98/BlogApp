import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {handleLogin, loginWithFacebook, loginWithGoogle} from "../services/Services";
import firebase , {auth} from "../services/firebase";

const Login = ({history}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const validateForm = () => {
        let valid = true;

        if(!email || !password){
            alert('Fields is required');
            valid = false;
        }

        return valid;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
            await auth.signInWithEmailAndPassword(email,password);
            history.push('/')
        }
    };

    const handleSkip = () => {
        auth.signInAnonymously()
            .then((result) => {
                console.log('signin ' , result )
            })
            .catch((error) => console.log(error.message))

    };

    const handleLoginAnonymous = () => {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        const currentUser = auth.currentUser;

        if (currentUser) {
            currentUser.linkWithCredential(credential).then((userCredential) => {
                const user = userCredential.user;
                console.log("Account linking success", user);
            }, (error) => {
                console.log("Account linking error", error);
            });
        }
    };
    return (
        <>
            <header className="main-header">
                Blogger
            </header>
            <h2 className="pageHeading">Sign in</h2>

            <section className="formContent">
                <form action="" onSubmit={handleSubmit}>

                    <div className="inputWrapper">
                        {email.length !== 0 ? <label htmlFor="email" className="topLabel"> Email </label> : null}
                        <input type="email" id="email" placeholder=" Email" className="inpt"
                               value={email} onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="inputWrapper">
                        {password.length !== 0 ? <label htmlFor="pass" className="topLabel"> Password </label> : null}
                        <input type="password" id="pass" placeholder=" Password" className="inpt"
                               value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn-submit"> Login </button>
                </form>
                <button className="btn-submit btn-skip" onClick={handleSkip}> Skip </button>
                <br/>
                <button className="btn-submit btn-skip" onClick={handleLoginAnonymous}> Login Anonymous </button>

                <p>or Sign up using</p>
                <div className="social">
                    <div className="social">
                        <button className="btn-social btn-facebook" onClick={loginWithFacebook}>F</button>
                        <button className="btn-social btn-google" onClick={loginWithGoogle}>G</button>
                    </div>
                </div>
                <p>Not a member yet? <Link to="/signup" className="App-link"> Sign up </Link></p>

            </section>
        </>

    )
};


export default Login;