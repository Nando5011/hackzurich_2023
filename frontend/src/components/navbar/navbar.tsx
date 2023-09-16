import React from 'react';
import { Navbar, NavTitle, Link, NavRight, NavLeft } from 'framework7-react';
import { auth } from "../../js/firebase";
import { signOut } from "firebase/auth";

const NavbarComponent = () => {
  const signOutUser = () => {
    signOut(auth);
  };

  return (
    <Navbar>
      <NavTitle>ProLog</NavTitle>
      <NavRight>
        <Link onClick={signOutUser}>Sign Out</Link>
      </NavRight>
        <Link icon="stats" href="/stats">Stats</Link>
    </Navbar>
  );
};

export default NavbarComponent;
