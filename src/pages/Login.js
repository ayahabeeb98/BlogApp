import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {handleLogin, loginWithFacebook, loginWithGoogle} from "../services/Services";

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
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()) {
            handleLogin(email,password);
            history.push('/')
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