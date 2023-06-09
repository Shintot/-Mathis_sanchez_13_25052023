import React from 'react';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';

const MainNav = () => {
  // Vérifier si l'utilisateur est connecté en vérifiant la présence du token dans le local storage
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={"/"}>
        <img
          className="main-nav-logo-image"
          src="https://res.cloudinary.com/dtx8credj/image/upload/v1684236293/argentBankLogo_mnzrjl.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only"> Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <Link className="main-nav-item" to={"/user/profile"}>
            <BiUserCircle />
            {localStorage.getItem('firstName')}
          </Link>
        ) : (
          <Link className="main-nav-item" to={"/user/login"}>
            <BiUserCircle />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
