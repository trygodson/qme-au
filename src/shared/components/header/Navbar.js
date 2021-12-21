import { useState } from 'react';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import { Link, NavLink, useParams } from 'react-router-dom';
import { anotheravatar, logo } from '../../../EntryFile/images';
import { LandinPageRoute } from '../../../EntryFile/LandingPageRoute';
import { CustomNavlink } from '../../../shared/components/navLink/navLink';
import MobileNav, { MobileMenu } from './mobileMenu/mobileMenu';
import { useAuthState } from '../../../context/useAuthContext';
import './navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleToggle = () => {
    setToggle(!toggle);
  };

  const { user } = useAuthState();
  const redirectToDashboard = id => {
    window.location.href = `https://qmedic-dash.netlify.app/${id}`;
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid ">
          <a className="navbar-brand" href="#">
            <img src={logo} />
          </a>

          <div className="collapse navbar-collapse something d-md-none" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              {LandinPageRoute.map((route, i) => (
                <CustomNavlink name={route.name} to={route.to} key={i} />
              ))}
              {user?.token == null ? (
                <div className="button-wrapper">
                  <NavLink className="button" to="/login">
                    SIGN IN
                  </NavLink>
                  <NavLink className="button sign-up" to="/register">
                    SIGN UP
                  </NavLink>
                </div>
              ) : (
                <Dropdown>
                  <DropdownTrigger>
                    <div className="button-wrapper">
                      <div className="profile-info">
                        <p>Welcome Back</p>
                        <div className="profile-name">{user?.user?.name}</div>
                      </div>
                      <div className="profile-image-wrapper">
                        <img
                          className="profile-image"
                          src={user?.image ? user?.image : anotheravatar}
                          style={{ backgroundColor: `#cccccc` }}
                        />
                      </div>
                    </div>
                  </DropdownTrigger>
                  <DropdownContent>
                    <div>
                      <a onClick={() => redirectToDashboard(user.token)}>Dashboard</a>
                    </div>
                    <div>
                      <a
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  </DropdownContent>
                </Dropdown>
              )}
            </div>

            {/* <div className={`mobile-navbar ${toggleMobileMenu ? 'open' : ''}`}>
            <div className="">
            {LandinPageRoute.map((route, i) => (
              <CustomNavlink name={route.name} to={route.to} key={i} />
              ))}
              <NavLink className="button" to="/">
              SIGN IN
              </NavLink>
              <NavLink className="button sign-up" to="/">
                SIGN UP
                </NavLink>
                </div>
              </div> */}
          </div>
          <div
            className={`navbar-toggler ${!toggle ? 'navbar__col3' : 'navbar__col3 toggle'}`}
            onClick={toggleToggle}
          >
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      </nav>
      <MobileNav toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export { Navbar };
