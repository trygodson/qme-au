import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LandinPageRoute } from '../../../../EntryFile/LandingPageRoute';
import { useAuthState } from '../../../../context/useAuthContext';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';

import { logo } from '../../../../EntryFile/images';
import './_navbar.scss';
var styles = {
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
};

const MobileNav = ({ toggle, setToggle }) => {
  const closeMobileMenu = () => {
    setToggle(false);
  };
  const { user } = useAuthState();

  return (
    <div className="mobile">
      <div className={!toggle ? 'mobile__col2' : 'mobile__col2 navbar--active'}>
        <div className="mobile__col2__container">
          {LandinPageRoute.map((route, i) => (
            <NavLink
              className="mobile__col2__link"
              activeClassName="active"
              to={route.to}
              exact
              onClick={closeMobileMenu}
              key={i}
            >
              {route.name}
            </NavLink>
          ))}
          <div>
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
                      <div className="profile-image" style={{ backgroundColor: `#cccccc` }}></div>
                    </div>
                  </div>
                </DropdownTrigger>
                <DropdownContent>
                  <div>
                    <Link to="/dashboard">Dashboard</Link>
                  </div>
                  <div>
                    <Link to="/logout">Logout</Link>
                  </div>
                </DropdownContent>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
