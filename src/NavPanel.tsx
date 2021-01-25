import React from "react";
import styled from "styled-components";



interface navPanelProps {
  navigate: React.MouseEventHandler;
}

const NavPanel:React.FC<navPanelProps> = (props) => {

  const { navigate } = props;

  return (
    <NavPanelMain>
      <p>Nav Panel Go Burrrrrr</p>
      <Nav>
        <li id="clock" onClick={navigate}>Clock</li>
        <li id="friends" onClick={navigate}>Friends</li>
        <li id="locations" onClick={navigate}>Locations</li>
        <li id="adventures" onClick={navigate}>Adventures</li>
      </Nav>
    </NavPanelMain>
  );
};
  
  const NavPanelMain = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
  `;

  const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & li {
      list-style: none;
      cursor: pointer;
    }
  `;
export default NavPanel;