import React from "react";
import styled from "styled-components";
import Locations from "./Locations";
import Friends from "./Friends";
import { User, Location } from "./MainPage";


interface toolBarProps {
  activeTool: string;
  setActiveTool: React.Dispatch<React.SetStateAction<string>>;
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  currentLocation: Location;
  setCurrentLocation: React.Dispatch<React.SetStateAction<Location>>;
  friends: User[];
  setFriends: React.Dispatch<React.SetStateAction<User[]>>;
  pendingFriends: User[];
  setPendingFriends: React.Dispatch<React.SetStateAction<User[]>>;
  userName: string | null;
}

const ToolPanel: React.FC<toolBarProps> = (props) => {
  const {
    activeTool,
    setActiveTool,
    locations,
    setLocations,
    currentLocation,
    setCurrentLocation,
    friends,
    setFriends,
    pendingFriends,
    setPendingFriends,
    userName,
  } = props;



  const locationProps = {
    userLocations: locations,
    setLocations,
    currentLocation,
    setCurrentLocation,
  };

  const friendsProps = {
    userName,
    friends,
    setFriends,
    pendingFriends,
    setPendingFriends,
  };

  const closeWindow = () => {
    setActiveTool("none");
  };

  const renderTool = () => {
    switch (activeTool) {
      case "locations":
        return <Locations {...locationProps} />;

      case "friends":
        return <Friends {...friendsProps} />;

      case "test":
        return <p>I am a coding god</p>;
    }
  };

  const exitButton = () => {
    return <Button onClick={closeWindow}>Back</Button>;
  };

  return (
    <ToolPanelMain>
      {exitButton()}
      {renderTool()}
    </ToolPanelMain>
  );
};

const ToolPanelMain = styled.div`
  height: 100%;
  position: relative;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid;
  box-shadow: 1px 1px 2px 1px;
  font-family: inherit;
  font-size: inherit;
  color: #e6ccb2;
  position: absolute;
  bottom: 0;
  left: 0;
  height: auto;
  width: auto;
`;
export default ToolPanel;
