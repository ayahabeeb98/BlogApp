import React , {useState} from 'react';
import {defaultImg} from '../img';
import './currentUser.css'
import {auth} from "../services/firebase";

const CurrentUser = ({history,user}) => {
    const [srcImg, setSrcImg] = useState(defaultImg);
    const [name, setName] = useState('user Name');
    const [location, setLocation] = useState('Gaza ');

    const logout = () => {
        auth.signOut().then(function() {
            // Sign-out successful.
            history.push('/login')
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    };

    return (
      <section className="profileCard">
          <img src={srcImg} alt=""/>
          <p className="info">{user.displayName}</p>
          <p className="info">{user.location}</p>
          <button onClick={logout} className="btn-logout">Logout</button>

      </section>
  )
};

export default CurrentUser;