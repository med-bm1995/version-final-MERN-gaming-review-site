import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
// import Showallusers from "../components/admin interface/Showallusers";
import { logout } from "../js/actions/authActions";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);
  // const users = useSelector((state) => state.authReducer.users);
  // console.log("hedhy");
  // console.log(users[2]);
  const toggle = () => setIsOpen(!isOpen);

  const logoutUser = () => {
    dispatch(logout());
  };

  const authLinks = (
    <Fragment>
      <NavItem>
        <Link to="/dashboard">
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : null}</strong>
          </span>
        </Link>
      </NavItem>
      <NavLink href="#" onClick={logoutUser}>
        {" "}
        Logout
      </NavLink>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Home</NavbarBrand>
          <>
            {user && user.admin === true && isAuth && (
              <NavbarBrand href="/show_all_users">show all users</NavbarBrand>
            )}
          </>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuth ? authLinks : guestLinks}
            </Nav>
            <Nav className="ml-auto" navbar>
              {/* {user.admin === true && isAuth && <Showallusers />} */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      {/* {user && user.map((e, i) => <Showallusers key={i} e={e} />)} */}
    </div>
  );
};

export default AppNavbar;
