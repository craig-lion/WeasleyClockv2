import React, { useState } from "react";
import styled from "styled-components";

//GraphQL Test

import { useMutation, gql, QueryLazyOptions, OperationVariables } from "@apollo/client";
import { UserData } from "./MainPage";


interface LoginProps {
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  getUserData: (options?: QueryLazyOptions<OperationVariables> | undefined) => void
}

const LOGIN = gql`
  mutation login($password: String!, $name: String!) {
    login(password: $password, name: $name) {
      token
    }
  }
`;

//GraphQL Test

export const Login:React.FC<LoginProps> = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data }] = useMutation(LOGIN);
  const { setUserName, getUserData } = props
  if (data) {
    //add jwt to localStorage
    localStorage.setItem('token', data.login.token);
    // console.log("this is data in Login", data.login.token);
  }
    // TODO - Login updates state so main page is rendered (possibly conditional render on userName)
  const loginUser: React.MouseEventHandler<HTMLButtonElement> = async () => {
    console.log(`Trying to login ${name} with password: ${password}`);
    const res = await login({ variables: { password, name } });
    console.log('this should be a jwt: ', res !== undefined)
    // GraphQL login mutation should return jwt
    await getUserData();
    // Test to move setUserNane back to MainPage
    setUserName(name);
    // ResetUser + Pass input
    setName("");
    setPassword("");
  };
  const createNewUser = () => {
    console.log(`Trying to create ${name} with password: ${password}`);
    // GraphQL createNewUser mutation returns jwt
    setName("");
    setPassword("");
  };

  const loginButton = () => {
    return <Button type="submit" onClick={loginUser}>Login</Button>;
  };
  const newUserButton = () => {
    return <Button onClick={createNewUser}>Create New Wizard</Button>;
  };

  // console.log(name);
  // console.log(password);
  
  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <LoginMain
      className="LoginMain"
      onSubmit={(e) => {
        // TODO - check to see if this onsubmit is actually doing anything or if just changing the button type to submit is enough
        e.preventDefault();
        console.log("o this submit work too");
      }}
    >
      <InputContainer>
        <Input
          type="text"
          value={name}
          onChange={userNameHandler}
          placeholder="UserNamE"
        />
        <Input
          type="password"
          value={password}
          onChange={passwordHandler}
          placeholder="Password"
        />
      </InputContainer>
      <ToolContainer>
        {loginButton()}
        {newUserButton()}
      </ToolContainer>
    </LoginMain>
  );
};

const LoginMain = styled.form`
  background-color: blanchedalmond;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10rem;
  width: 50%;
  height: 50%;
  position: absolute;
  top: 25%;
  right: 25%;
`;

const InputContainer = styled.div`
  /* border: 2px solid aliceblue; */
  border-radius: inherit;
  flex: 1;
  flex-direction: column;
  display: flex;

  & :focus {
    outline: none;
  }
`;

const ToolContainer = styled.div`
  /* border: 2px solid yellow; */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  border-radius: inherit;
  font-size: inherit;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const Button = styled.button`
  /* background-color: #ddb892; */
  background-color: transparent;
  border: none;
  border-radius: 10%;
  box-shadow: 2px 2px 5px 2px ;
  top: 0;
  right: 0;
  height: auto;
  width: auto;
  font-size: 2rem;
`;
