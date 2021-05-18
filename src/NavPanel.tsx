import React from "react";
import styled from "styled-components";



interface navPanelProps {
  navigate: React.MouseEventHandler<Element>;
}

const NavPanel:React.FC<navPanelProps> = (props) => {

  const { navigate } = props;

  return (
    <NavPanelMain>
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

export default NavPanel;