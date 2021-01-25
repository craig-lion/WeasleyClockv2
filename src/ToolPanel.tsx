import React from "react";
import styled from "styled-components";
import Locations from "./Locations";
import Friends from "./Friends";

// TODO: what is the proper way to type setActiveTool fn

interface toolBarProps {
  activeTool: string;
  setActiveTool: any;
}

const ToolPanel: React.FC<toolBarProps> = (props) => {
  const { activeTool, setActiveTool } = props;
  
  const closeWindow = () => {
    setActiveTool("none")
  }

  const renderTool = () => {
    switch (activeTool) {
      case "locations":
        return <Locations />;

      case "friends":
        return <Friends />;

      case "test":
        return <p>I am a coding god</p>;
    }
  };

    const exitButton = () => {
      return (
        <Button onClick={closeWindow}>
          Back
        </Button>
      );
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
  background-color: slateblue;
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  width: 50px;
`;
export default ToolPanel;
