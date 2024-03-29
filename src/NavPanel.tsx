import React from "react";
import styled from "styled-components";



interface navPanelProps {
  navigate: React.MouseEventHandler<Element>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  clearUserData: () => void;
}

const NavPanel:React.FC<navPanelProps> = (props) => {

  const { navigate, setUserName, clearUserData } = props;

  const handleSignout = (): void => {
    console.log('this is doing stuff')
    localStorage.removeItem('token');
    clearUserData();
    setUserName(null);

  }

  return (
    <NavPanelMain>
      <SignOut onClick={handleSignout}>Sign Out</SignOut>
        <li id="clock" onClick={navigate}>Clock</li>
        <li id="friends" onClick={navigate}>Friends</li>
        <li id="locations" onClick={navigate}>Locations</li>
        <li id="adventures" onClick={navigate}>Adventures</li>
    </NavPanelMain>
  );
};
  
  const NavPanelMain = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & li {
      list-style: none;
      cursor: pointer;
      font-size: 2.25rem;
      text-align: center;
    }
  `;

const SignOut = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
export default NavPanel;