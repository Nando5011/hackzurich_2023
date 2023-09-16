import React from "react";
import { Navbar, NavTitle, Link, NavRight } from "framework7-react";

const NavbarComponent = ({ signOutUser }) => {
  return (
    <Navbar>
      <NavTitle>ProLog</NavTitle>
      <NavRight>
        <Link onClick={signOutUser}>Sign Out</Link>
      </NavRight>
      <Link icon="stats" href="/stats">
        Stats
      </Link>
    </Navbar>
  );
};

export default NavbarComponent;
