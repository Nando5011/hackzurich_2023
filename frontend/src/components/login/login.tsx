import React, { useState } from "react";
import {
  Page,
  Button,
  BlockFooter,
  List,
  ListInput,
  LoginScreen,
  LoginScreenTitle,
  f7,
} from "framework7-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../js/firebase";

const Login = ({ closeLoginScreen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsInvalidEmail] = useState(true);
  const [isValidPassword, setIsInvalidPassword] = useState(true);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        f7.loginScreen.close();
      })
      .catch((error) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            f7.dialog.alert("Login created for new user", () =>
              f7.loginScreen.close()
            );
          })
          .catch((error) => {
            if (error.message.includes("email-already-in-use")) {
              f7.dialog.alert("Wrong Password");
            } else {
              f7.dialog.alert("Password length minimum 6");
            }
          });
      });
  };

  return (
    <LoginScreen
      className="demo-login-screen"
      opened={true}
      onLoginScreenClosed={closeLoginScreen}
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
            onInput={(e) => setEmail(e.target.value)}
            onInputEmpty={() => setIsInvalidEmail(true)}
          />
          <ListInput
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            validate
            onValidate={(isValid) => setIsInvalidPassword(!isValid)}
            onInput={(e) => setPassword(e.target.value)}
            onInputEmpty={() => setIsInvalidPassword(true)}
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
  );
};

export default Login;
