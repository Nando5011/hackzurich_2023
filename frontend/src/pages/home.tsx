import React, { useState, useEffect } from "react";
import { Page, Toolbar, Fab, Icon } from "framework7-react";

import { User, signOut } from "firebase/auth";
import { auth } from "../js/firebase";
import StatisticView from "../components/statistic-view/statistic-view";
import Login from "../components/login/login";
import NavbarComponent from "../components/navbar/navbar";

const HomePage = () => {
  const [loginScreenOpened, setLoginScreenOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [doRefetch, setDoRefetch] = useState(false);

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

  const refetch = () => {
    setDoRefetch(false);
  };

  const signOutUser = () => {
    signOut(auth).then(() => window.location.reload());
  };

  return (
    <Page name="home">
      <NavbarComponent signOutUser={signOutUser} />
      {currentUser && (
        <Toolbar position="bottom">
          <p
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {currentUser.email}
          </p>
        </Toolbar>
      )}
      {currentUser && !doRefetch && (
        <Fab position="right-bottom" slot="fixed" onClick={() => setDoRefetch(true)}>
          <Icon f7="goforward" />
        </Fab>
      )}
      {currentUser && <StatisticView currentUser={currentUser} refetch={refetch} doRefetch={doRefetch} />}

      {loginScreenOpened && <Login closeLoginScreen={() => setLoginScreenOpened(false)} />}
    </Page>
  );
};

export default HomePage;
