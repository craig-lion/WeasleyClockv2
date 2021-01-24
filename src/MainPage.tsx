import React, {useState} from "react";
import styled from "styled-components";
import Clock from "./Clock";



const MainPage = () => {
  const [testColor, setTestColor] = useState("yellow");

  const MainContainer = styled.div`
    background-color: blue;
    color: black;
    height: 100vh;
    display: grid;
    grid-template-columns: [grid-start] 1fr [left-sidebar-closed] 1fr [left-sidebar-open] 1fr 1fr 1fr 1fr [right-sidebar-open] 1fr [right-sidebar-closed] 1fr [grid-end];
    grid-template-rows: 10% [top-bar-bottom clock-top] 1fr;
  `;

  const NavPanelContainer = styled.div`
    background-color: ${testColor};
    grid-column: 1 / 2;
    grid-row: 1 / -1;

    &:hover {
      background-color: green;
      grid-column: 1 / 3;
      z-index: 2;
    }
  `;

  const FeaturesContainer = styled.div`
    background-color: lawngreen;
    grid-row: 2 / -1;
    grid-column: 2 / 3;

    &:hover {
      grid-column: 1 / 3;
      z-index: 3;
    }
  `;
  const RightSideContainer = styled.div`
    background-color: orange;
    grid-row: 1 / -1;
    grid-column: right-sidebar-closed / 9;
  `;
  const TopBarContainer = styled.div`
    background-color: purple;
    grid-row: 1 / 2;
    grid-column: 2 / 8;
    z-index: 1;
  `;
  const ClockContainer = styled.div`
    background-color: pink;
    grid-column: 3 / 7;
    grid-row: 2 / -1;

  `;

  return (
    <MainContainer>
      <NavPanelContainer>Nav Panel header</NavPanelContainer>
      <FeaturesContainer>
        Features In Hurr Fam
      </FeaturesContainer>
      <RightSideContainer>Activity Feed Here</RightSideContainer>
      <TopBarContainer>Dis Be D Top Bar</TopBarContainer>
      <ClockContainer>
        <Clock />
      </ClockContainer>
    </MainContainer>
  )
  
}


export default MainPage;