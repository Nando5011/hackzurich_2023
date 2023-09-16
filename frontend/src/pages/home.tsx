import React, { useState, useEffect } from "react";
import { Page, Block, f7, Toolbar } from "framework7-react";

import { User, signOut } from "firebase/auth";
import { auth } from "../js/firebase";
import StatisticView from "../components/statistic-view/statistic-view";
import Login from "../components/login/login";
import NavbarComponent from "../components/navbar/navbar";

const HomePage = () => {
  const [loginScreenOpened, setLoginScreenOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user?.email) setLoginScreenOpened(true);
      else {
        setCurrentUser(user);
        setLoginScreenOpened(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const signOutUser = () => {
    signOut(auth).then(() => window.location.reload());
  };

  return (
    <Page name="home">
      <Toolbar position="bottom">
        <p style={{ display: "flex", width: "100%", justifyContent: "center" }}>
          {currentUser?.email}
        </p>
      </Toolbar>
      {currentUser && (
        <>
          <NavbarComponent signOutUser={signOutUser} />
          <StatisticView currentUser={currentUser} />
        </>
      )}

      {loginScreenOpened && (
        <Login closeLoginScreen={() => setLoginScreenOpened(false)} />
      )}
    </Page>
  );
};

export default HomePage;
