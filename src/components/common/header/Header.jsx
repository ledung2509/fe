import React, { useState, useEffect } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("data");
    if (storedUsername) {
      setUserInfo(JSON.parse(storedUsername));
    }
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("data");
    setUserInfo(null);
    history.push("/");
  }

  const isAdmin = userInfo && userInfo.role === "LANDLORD";

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <a href='http://localhost:3000' className='navbar-brand'>
              <img src="./images/logo.png" alt="" />
            </a>
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path} style={{ textDecoration: 'none', marginLeft: '30px' }}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            {userInfo ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {userInfo.fullname}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {isAdmin ? (
                    <>
                      <Dropdown.Item href="/manageuser">Manage User</Dropdown.Item>
                      <Dropdown.Item href="/manageroom">Manage Room</Dropdown.Item>
                      <Dropdown.Item href="/changepass">Change password</Dropdown.Item>
                      <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item href="/changepass">Change password</Dropdown.Item>
                      <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </>
                  ) }
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <button className='btn btn-primary me-2'>
                  <Link to='/login' className='nav-link'>Login</Link>
                </button>
                <button className='btn btn-outline-primary'>
                  <Link to='/register' className='nav-link'>Register</Link>
                </button>
              </>
            )}
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div >
      </header >
    </>
  );
};

export default Header;
