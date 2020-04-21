import React , {useState} from 'react';
import {loginWithFacebook, loginWithGoogle} from "../services/Services";
import './style.css'
import { sendEmailVerification} from "../helpers/auth";
import {Link} from "react-router-dom";
import {createUserDocument} from "../helpers/db";
import {auth} from "../services/firebase";

const Signup = ({history}) => {
    const [displayName,setDisplayName] = useState('');
    const [email,setEmail] = useState('');
    const [location,setLocation] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const validateForm = () => {
      let valid = true;
      let error = {};

      if (!displayName || !email || !password || !confirmPassword){
          valid = false;
      }

      if (displayName.length <= 2) {
          error['nameError'] = "too short";
          valid = false;
      }

      if (password !== confirmPassword) {
          valid = false;
      }

      if (password.length < 4) {
          alert('Your password is weak.');
          valid=false;
      }

      return valid;
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      if (validateForm()) {
          try {
              const {user}  = await auth.createUserWithEmailAndPassword(
                     email,
                     password,
                 );

              console.log(user);
             await createUserDocument(user,{displayName,location});
             await sendEmailVerification(user);
             history.push('/');
         }catch (e) {
             alert(e)
         }
      }else {
          alert('ni')
      }
    };

    return (
      <>
          <header className="main-header">
              Blogger
          </header>
          <h2 className="pageHeading">Sign up</h2>

          <section className="formContent">
              <form action="" onSubmit={handleSubmit}>
                  <div className="inputWrapper">
                      {displayName.length !== 0 ? <label htmlFor="name" className="topLabel"> Name </label> : null}
                      <input type="text" id="name" placeholder=" User Name" className="inpt"
                            value={displayName} onChange={(e)=>setDisplayName(e.target.value)}
                       />
                  </div>

                  <div className="inputWrapper">
                      {email.length !== 0 ? <label htmlFor="email" className="topLabel"> Email </label> : null}
                      <input type="email" id="email" placeholder=" Email" className="inpt"
                             value={email} onChange={(e)=>setEmail(e.target.value)}
                      />
                  </div>

                  <div className="inputWrapper">
                      {location.length !== 0 ? <label htmlFor="location" className="topLabel"> Location </label> : null}
                      <input type="text" id="location" placeholder=" Location" className="inpt"
                             value={location} onChange={(e)=>setLocation(e.target.value)}
                      />
                  </div>


                  <div className="inputWrapper">
                      {password.length !== 0 ? <label htmlFor="pass" className="topLabel"> Password </label> : null}
                      <input type="password" id="pass" placeholder=" Password" className="inpt"
                             value={password} onChange={(e)=>setPassword(e.target.value)}
                      />
                  </div>

                  <div className="inputWrapper">
                      {confirmPassword.length !== 0 ? <label htmlFor="confirm" className="topLabel"> confirm password </label> : null}
                      <input type="password" id="confirm" placeholder=" Confirm password" className="inpt"
                         value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                      />
                  </div>

                  <button type="submit" className="btn-submit"> Sign up </button>

              </form>

              <p>or Sign up using</p>
              <div className="social">
                  <div className="social">
                      <button className="btn-social btn-facebook" onClick={loginWithFacebook}>F</button>
                      <button className="btn-social btn-google" onClick={loginWithGoogle}>G</button>
                  </div>
              </div>
              <p>Already have an account?  <Link to="/login" className="App-link"> Login </Link></p>

          </section>
      </>
    );
};

export default Signup;