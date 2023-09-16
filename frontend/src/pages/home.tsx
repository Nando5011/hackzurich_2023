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
} from "framework7-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../js/firebase";

const HomePage = () => {
  const [loginScreenOpened, setLoginScreenOpened] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsInvalidEmail] = useState(true);
  const [isValidPassword, setIsInvalidPassword] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user?.email) setLoginScreenOpened(true);
    });
  }, []);

  const signIn = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((user) => {
        f7.loginScreen.close();
      })
      .catch((error) => {
        createUserWithEmailAndPassword(auth, username, password).then(
          (user) => {
            f7.dialog.alert("Login created for new user", () =>
              f7.loginScreen.close()
            );
          }
        );
        console.log(error);
        if (error.code === "auth/user-not-found") {
        } else {
          f7.dialog.alert("Login Failed, please try again");
        }
      });
  };

  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar large>
        <NavTitle>ProLog</NavTitle>
        <NavTitleLarge>ProLog</NavTitleLarge>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom>
        <Link>Left Link</Link>
        <Link>Right Link</Link>
      </Toolbar>
      {/* Page content */}

      <Block>
        <Button raised large fill loginScreenOpen=".demo-login-screen">
          As Overlay
        </Button>
      </Block>

      <Navbar title="Login Screen"></Navbar>
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
              placeholder="Your username"
              value={username}
              onInput={(e) => {
                setUsername(e.target.value);
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
