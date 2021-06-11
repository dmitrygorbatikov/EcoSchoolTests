import React, {useContext} from 'react';
import {Link, useHistory, withRouter} from 'react-router-dom';
import { Dropdown } from '../components';
import logo from '../images/logo.png';
import {AuthContext} from "../context/AuthContext";

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
    value: 'Logout',
  }
];

function Header() {

  const auth = useContext(AuthContext)
  const history = useHistory()

  const logoutHandler = () => {
    auth.logout()
    history.push('/')
  }
  return (
    <header id="header-section" className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__box">
            <div>
                <Link className="logo" to="/Home">
                  <img className="logo__img" src={logo} alt="logo" />
                </Link>
            </div>
            <div className="header__item">
                  <Link to="/Home">Головна</Link>
                  <Link to="/statistics">Статистика</Link>
                  <Link onClick={logoutHandler}>Вихід</Link>
            </div>


            <Dropdown title="Select movie" items={items} />
            {/* <Dropdown title="Select movie" items={items} multiselect /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
