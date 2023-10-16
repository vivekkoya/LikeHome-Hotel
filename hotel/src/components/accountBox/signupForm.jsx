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

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <RadioButtonContainer>
          <RadioButton checked={userType === "user"}>
            <input
              type="radio"
              onChange={handleRadioChange}
              value="user"
              checked={userType == "user"}
              style={{ display: "none" }}
            />
            Client
          </RadioButton>
          <RadioButton checked={userType === "hotel"}>
            <input
              type="radio"
              onChange={handleRadioChange}
              value="hotel"
              checked={userType == "hotel"}
              style={{ display: "none" }}
            />
            Owner
          </RadioButton>
        </RadioButtonContainer>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
