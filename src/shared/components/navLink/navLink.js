import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const CustomNavlink = ({ name, to }) => {
  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split('/');
  return (
    <div className="nav-link-wrapper">
      <NavLink className="nav-link" aria-current="page" to={to} activeClassName="now">
        {name}
        <div className={`active-line ${`/${splitLocation[1]}` === to ? `active` : ''}`}></div>
      </NavLink>
    </div>
  );
};
