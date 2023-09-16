import React, { useState, useEffect } from "react";
import {
  Page,
  Block,
} from "framework7-react";

import { 
  User
} from "firebase/auth";
import { auth } from "../js/firebase";
import StatisticView from "../components/statistic-view/statistic-view";
import Login from "../components/login/login";
import NavbarComponent from "../components/navbar/navbar";
import TimeSeriesGraph from "../components/plots/TimeSeriesGraph";

const HomePage = () => {
  const [loginScreenOpened, setLoginScreenOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user?.email) setLoginScreenOpened(true);
      else setCurrentUser(user);
    });
  }, [auth]);

  return (
    <Page name="time-series">
      <NavbarComponent />
      
      <Block>
        {currentUser && <TimeSeriesGraph />}
      </Block>
      
      {loginScreenOpened && 
        <Login 
          closeLoginScreen={() => setLoginScreenOpened(false)} 
        />
      }
    </Page>
  );
};

export default HomePage;
