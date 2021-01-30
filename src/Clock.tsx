import React from "react";
import styled from "styled-components";

interface clockProps {
  locations: string[];
  currentLocation: string;
}

const Clock:React.FC<clockProps> = (props) => {
  const { locations, currentLocation} = props;
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

   const radius = 50;
   const radiansBetweenLocations = (2 * Math.PI) / locations.length;

   const getPointOnCircle = (
     origin: number[],
     radius: number,
     radian: number
   ) => {
     const array = [];
     const x: number = radius * Math.cos(radian) + origin[0];
     const y: number = radius * Math.sin(radian) + origin[1];
     array.push(x, y);
     return array;
   };

   const placeArm = (location: string) => {
     class Coordinates {
       x?: number;
       y?: number;
     }

     let coordinate = new Coordinates();

     // loop thru locations
     for (let i = 0; i < locations.length; i++) {
       // if location equals locations[i]
       if (location === locations[i]) {
         // use i to calculate radian and call helper
         let radian = radiansBetweenLocations * i;
         let point = getPointOnCircle([50, 50], radius, radian);
         coordinate.x = point[0];
         coordinate.y = point[1];
       }
     }
     return coordinate;
   };

   const armLocation = placeArm(currentLocation);

   const makeLocations = () => {
     const array = [];
     for (let i = 0; i < locations.length; i++) {
       let radian = radiansBetweenLocations * i;
       let point = getPointOnCircle(
         [placementPoints.x, placementPoints.y],
         placementPoints.r,
         radian
       );
       const location = (
         <Text
           fill="antiquewhite"
           className="text"
           key={locations[i]}
           textAnchor="middle"
           x={point[0]}
           y={point[1]}
         >
           {locations[i]}
         </Text>
       );
       array.push(location);
     }
     return array;
   };

   const allLocations = makeLocations();
  
  const Arm = () => {
         return (
           <Line
             x1={50}
             y1={50}
             x2={armLocation.x}
             y2={armLocation.y}
             style={{
               stroke: "cadetblue",
               strokeWidth: 3,
               strokeLinecap: "round",
             }}
           />
         );
   }
  


  return (
    <ClockMainContainer>
      <ClockTitle>Now The Clock Test is Here Ha HA!</ClockTitle>
      <SVG viewBox="0 0 100 100">
        <Arm />
        <ClockFace
          cx={placementPoints.x}
          cy={placementPoints.y}
          r={placementPoints.r}
          fill="rgba(204, 204, 204, 0.25)"
          stroke="tan"
          strokeWidth="2"
        />
        {allLocations}
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

const Line = styled.line``;

const Text = styled.text`
  font-size: 10px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  z-index: 100;
  position: absolute;
`;



export default Clock;
