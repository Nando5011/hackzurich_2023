import React from "react";
import { Navbar, NavTitle, Link, NavRight, NavLeft } from "framework7-react";

const NavbarComponent = ({ signOutUser }) => {
  return (
    <Navbar sliding>
      <NavLeft>
        <Link onClick={signOutUser}>Sign Out</Link>
      </NavLeft>
      <NavTitle style={{ margin: "auto" }}>BreakWise</NavTitle>
      <NavRight>
        <Link icon="stats" href="/stats">
          Stats
        </Link>
      </NavRight>
    </Navbar>
  );
};

export default NavbarComponent;
