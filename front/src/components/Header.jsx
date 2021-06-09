import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown } from '../components';
import logo from '../images/logo.png';

const items = [
  {
    id: 1,
    value: 'Home',
  },
  {
    id: 2,
    value: 'Statistics',
  },
  {
    id: 3,
    value: 'Settings',
  },
  {
    id: 3,
    value: 'Logout',
  }
];

function Header() {
  return (
    <header id="header-section" className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__box">
            <Link className="logo" to="/Home">
              <img className="logo__img" src={logo} alt="logo" />
            </Link>

            <Dropdown title="Select movie" items={items} />
            {/* <Dropdown title="Select movie" items={items} multiselect /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
