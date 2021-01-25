import React from "react";
import styled from "styled-components";
import Arm from "./ClockFeatures";

const Clock = () => {

  class PlacementPoints {
    x: number;
    y: number;
    r: number;

    constructor() {
      this.x = 50;
      this.y = 50;
      this.r = 50;
    }
  }

  const placementPoints = new PlacementPoints()
  
  const ClockFeaturesProps = {
    placementPoints
  }


  return (
    <ClockMainContainer>
      <ClockTitle>Now The Clock Test is Here Ha HA!</ClockTitle>
      <SVG viewBox="0 0 100 100">
        <Arm {...ClockFeaturesProps}/>
        <ClockFace
          cx={placementPoints.x}
          cy={placementPoints.y}
          r={placementPoints.r}
          fill="rgba(204, 204, 204, 0.25)"
          stroke="tan"
          strokeWidth="2"
        />
      </SVG>
    </ClockMainContainer>
  );
};

const ClockMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
  position: relative;
`;

const ClockTitle = styled.div`
  background-color: aquamarine;
`;

const ClockFace = styled.circle`
  height: 100%;
  background-color: purple;
`;
const SVG = styled.svg`
  height: 90%;
  width: 100%;
  background-color: red;
  border-radius: 50%;
  overflow: visible;
  white-space: nowrap;
`;


export default Clock;
