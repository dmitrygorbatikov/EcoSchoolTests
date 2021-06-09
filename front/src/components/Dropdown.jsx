import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function Dropdown({ title, items, multiSelect = false }) {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter((current) => current.id !== item.id);
      setSelection([...selectionAfterRemoval]);
    }
    if(item.value == 'Logout'){
      auth.logout()
      history.push('/')
    }
  }

  function isItemInSelection(item) {
    if (selection.find((current) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="menu__popup"
        role="button"
        onKetPress={() => toggle(!open)}
        onClick={() => toggle(!open)}>
        {/* <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div> */}
        {/* <div className="dd-header__action"><p>{open ? 'Close' : 'Open'}</p></div> */}
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item) => (
            <Link to={`/${item.value}`}>
              <li className="dd-list-item" key={item.id}>
                <div type="link" className="dd-list-link" onClick={() => handleOnClick(item)}>
                  <span className="left">{item.value}</span>
                  {/* <span className="right">{isItemInSelection(item) && 'Selected'}</span> */}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
