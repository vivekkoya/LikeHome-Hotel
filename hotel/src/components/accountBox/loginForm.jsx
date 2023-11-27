import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useCookies } from "react-cookie";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [cookies, setCookie] = useCookies(["users"]);

  const [email, setEmail] = useState("");
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const [pass, setPass] = useState("");
  const passChange = (event) => {
    setPass(event.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:5001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      });
      if (!response.ok) {
        alert("incorrect credentials");
      } else {
        setCookie("user", email, "/");
        const data = await response.json();
        console.log(data);
        console.log(data.rewards);
        setCookie("points", data.rewards, { path: "/" });
        setCookie("id", data.id, { path: "/" });
        if (data.isAdmin) {
          setCookie("isAdmin", "hotel", "/");
        } else {
          setCookie("isAdmin", "client", "/");
        }
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onChange={emailChange}
          value={email}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={passChange}
          value={pass}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={login}>
        Login
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}