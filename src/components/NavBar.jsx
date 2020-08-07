import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./../userContext";
import {
  Navbar,
  NavbarBrand,
  Nav,
  // NavLink,
} from "reactstrap";

function NavBar() {
  const { user, signOut } = useContext(UserContext);

  const handleLogOut = () => {
    console.log("logout");
    signOut();
  };

  const isloggedIn = () => {
    if (user)
      return (
        <Nav className="ml-auto">
          <NavLink className="mr-4" to="/companies">
            companies
          </NavLink>
          <NavLink className="mr-4" to="/jobs">
            jobs
          </NavLink>
          <NavLink className="mr-4" to="/profile">
            profile
          </NavLink>
          <NavLink className="mr-4" to="/" onClick={handleLogOut}>
            logout
          </NavLink>
        </Nav>
      );
    else {
      return (
        <Nav className="ml-auto">
          <NavLink to="/login">login</NavLink>
        </Nav>
      );
    }
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Jobly</NavbarBrand>
        {/* <NavLink to="/">Jobly</NavLink> */}
        {isloggedIn()}
      </Navbar>
    </div>
  );
}

export default NavBar;
