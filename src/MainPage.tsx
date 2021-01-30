import React, { useState } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import NavPanel from "./NavPanel";
import ToolPanel from "./ToolPanel";

const MainPage = () => {
  const [activeTool, setActiveTool] = useState("none");
  const [locations, setLocations] = useState([
    "Beach",
    "Work",
    "Home",
    "Bar",
    "Club",
  ]);
  const [currentLocation, setCurrentLocation] = useState("Beach");
  const [sharedFriends, setSharedFriends] = useState([]);

  interface ReactMouseEvent extends EventTarget {
    id: string;
  }

  interface MouseEvent extends React.MouseEvent<HTMLElement> {
    target: ReactMouseEvent;
  }

  const navigate = (e: MouseEvent): void => {
    e.preventDefault();
    setActiveTool(e.target.id);
  };

  const navPanelProps = {
    navigate,
  };

  const toolBarProps = {
    activeTool,
    setActiveTool,
    locations,
    setLocations,
    currentLocation,
    setCurrentLocation,
    sharedFriends,
    setSharedFriends
  };

  const clockProps = {
    locations,
    currentLocation,
    sharedFriends
  };

  const renderNavPanelContainer = () => {
    if (activeTool === "none") {
      return (
        <NavPanelContainer>
          <NavPanel {...navPanelProps} />
        </NavPanelContainer>
      );
    }
  };

  const renderToolPanel = () => {
    switch (activeTool) {
      case "none":
        break;
      case "friends":
      case "locations":
      case "adventures":
        return (
          <ToolPanelContainer>
            <ToolPanel {...toolBarProps} />
          </ToolPanelContainer>
        );
    }
  };

  return (
    <MainContainer>
      {renderNavPanelContainer()}
      {renderToolPanel()}
      <RightSideContainer>Activity Feed Here</RightSideContainer>
      <TopBarContainer>Dis Be D Top Bar</TopBarContainer>
      <ClockContainer>
        <Clock {...clockProps} />
      </ClockContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  background-color: blue;
  color: black;
  height: 100vh;
  display: grid;
  grid-template-columns: [grid-start] 1fr [left-sidebar-closed] 1fr [left-sidebar-open] 1fr 1fr 1fr 1fr [right-sidebar-open] 1fr [right-sidebar-closed] 1fr [grid-end];
  grid-template-rows: 10% [top-bar-bottom clock-top] 1fr;
`;

const NavPanelContainer = styled.div`
  background-color: yellow;
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  z-index: 1;

  &:hover {
    background-color: green;
    grid-column: 1 / 3;
    z-index: 2;
  }
`;

const ToolPanelContainer = styled.div`
  background-color: lawngreen;
  grid-row: 2 / -1;
  grid-column: 1 / 3;
`;
const RightSideContainer = styled.div`
  background-color: orange;
  grid-row: 1 / -1;
  grid-column: right-sidebar-closed / 9;
  z-index: 1;
`;
const TopBarContainer = styled.div`
  background-color: purple;
  grid-row: 1 / 2;
  grid-column: 1 / 9;
  z-index: 0;
`;
const ClockContainer = styled.div`
  background-color: pink;
  grid-column: 3 / 7;
  grid-row: 2 / -1;
`;

export default MainPage;
