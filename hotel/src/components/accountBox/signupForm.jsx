import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  RadioButtonContainer,
  RadioButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [userType, setUserType] = useState("");

  const handleRadioChange = (event) => {
    setUserType(event.target.value);
  };

  const [email, setEmail] = useState("");
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const [pass1, setPass1] = useState("");
  const pass1Change = (event) => {
    setPass1(event.target.value);
  };

  const [pass2, setPass2] = useState("");
  const pass2Change = (event) => {
    setPass2(event.target.value);
  };

  const [match, setMatch] = useState(true);
  const SignUp = async () => {
    if (pass1 !== pass2) {
      setMatch(false);
      return;
    }
    if (email === "" || pass1 === "" || pass2 === "") {
      return;
    }
    try {
      const isAdmin = userType === "hotel";
      const response = await fetch("http://localhost:5001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pass1,
          isAdmin: isAdmin,
        }),
      });

      if (response.ok) {
        alert("successful");
      } else {
        const errorData = await response.json();
        alert("Signup failed: " + errorData.message);
      }
    } catch (error) {
      alert("Error:" + error);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={emailChange}
        />
        <Input
          type="password"
          placeholder="Password"
          value={pass1}
          onChange={pass1Change}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={pass2}
          onChange={pass2Change}
        />
      </FormContainer>
      {!match && (
        <p style={{ color: "red" }}>Passwords don't match Please try again</p>
      )}
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={SignUp}>
        Sign up
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}