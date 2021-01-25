import React from "react";
import styled from "styled-components";

interface ClockFeaturesProps {
  placementPoints: {
    x: number;
    y: number;
    r: number;
  };
}

const Arm: React.FC<ClockFeaturesProps> = (props) => {
  const { placementPoints } = props;
  const currentLocation = "Beach";
  const locations = ["Beach", "Work", "Home", "Bar"];
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
};

// const SVG = styled.svg`
//   height: 100%;
//   width: 100%;
//   background-color: blanchedalmond;
//   overflow: visible;
//   white-space: nowrap;
// `;

const Line = styled.line``;

const Text = styled.text`
  font-size: 30px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  z-index: 100;
  position: absolute;
`;

export default Arm;
