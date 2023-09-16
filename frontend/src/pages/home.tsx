import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Link,
  Toolbar,
  Block,
  Button,
  BlockFooter,
  List,
  ListButton,
  ListInput,
  LoginScreen,
  LoginScreenTitle,
  f7,
  NavRight,
} from "framework7-react";

import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../js/firebase";
import StatisticView from "../components/statistic-view/statistic-view";

const HomePage = () => {
  const [loginScreenOpened, setLoginScreenOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsInvalidEmail] = useState(true);
  const [isValidPassword, setIsInvalidPassword] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user?.email) setLoginScreenOpened(true);
      else {
        setCurrentUser(user);
      }
    });
  }, [auth]);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        f7.loginScreen.close();
      })
      .catch((error) => {
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
          f7.dialog.alert("Login created for new user", () =>
            f7.loginScreen.close()
          );
        });
        console.log(error);
        if (error.code === "auth/user-not-found") {
        } else {
          f7.dialog.alert("Login Failed, please try again");
        }
      });
  };

  const signOutUser = () => {
    signOut(auth);
  };

  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar>
        <NavTitle>ProLog</NavTitle>
        <NavRight>
          <Link onClick={signOutUser}>Sign Out</Link>
        </NavRight>
      </Navbar>
      {/* Toolbar */}
      {/* Page content */}

      <Block>{currentUser && <StatisticView currentUser={currentUser} />}</Block>

      <LoginScreen
        className="demo-login-screen"
        opened={loginScreenOpened}
        onLoginScreenClosed={() => {
          setLoginScreenOpened(false);
        }}
      >
        <Page loginScreen>
          <LoginScreenTitle>ProLog Login</LoginScreenTitle>
          <List form>
            <ListInput
              label="E-Mail"
              type="email"
              validate
              onValidate={(isValid: boolean) => setIsInvalidEmail(!isValid)}
              placeholder="Your email"
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
              }}
              onInputEmpty={(isEmpty) => setIsInvalidEmail(true)}
            />
            <ListInput
              label="Password"
              type="password"
              placeholder="Your password"
              value={password}
              validate
              onValidate={(isValid: boolean) => setIsInvalidPassword(!isValid)}
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              onInputEmpty={(isEmpty) => setIsInvalidPassword(true)}
            />
          </List>
          <List inset>
            <Button disabled={isValidEmail || isValidPassword} onClick={signIn}>
              Sign In
            </Button>
            <BlockFooter>
              Provide email and password to sign in or sign up
            </BlockFooter>
          </List>
        </Page>
      </LoginScreen>
    </Page>
  );
};
export default HomePage;
