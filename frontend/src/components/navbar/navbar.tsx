import React from 'react';
import { Navbar, NavTitle, Link, NavRight } from 'framework7-react';
import { auth } from "../../js/firebase";
import { signOut} from "firebase/auth";

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
    </Navbar>
  );
};

export default NavbarComponent;
