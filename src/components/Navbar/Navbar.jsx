import React, { use, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';


const Navbar = () => {
  const nafRef = React.createRef();

  useEffect(() => {
    window.addEventListener('scroll', ()=>{
      if (window.scrollY >= 80) {
        nafRef.current.classList.add('nav-dark'); 
      } else {
        nafRef.current.classList.remove('nav-dark');
      }     
    } )
  }, []);
  return (
    <div  ref={nafRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV shows</li>
          <li>Movies</li>
          <li>News & Popular</li>
          <li>My list</li>
          <li>Browse by languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="Bell" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="" />
           <div className="dropdown">
            <p onClick={() => logout()}>Sign Out of Netflix</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;