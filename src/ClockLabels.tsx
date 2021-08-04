import React from "react";
import styled from "styled-components";
import { Location, User } from "./MainPage";

class Labels {
  locationLabels: JSX.Element[] = [];
  friendLabels: JSX.Element[] = [];
  userLabel: JSX.Element[] = [];
}

interface ClockLabelProps {
  friends: User[],
  currentLocation: Location,
  userName: string | null,
  renderLocations: Location[],
  userColor: any,
  colorArray: any
}

// TODO - change constructor to (private x:number) and remove this.x
export class PlacementPoints {
  x: number;
  y: number;
  r: number;

  constructor() {
    this.x = 50;
    this.y = 50;
    this.r = 50;
  }
}

export const ClockLabels = (clockLabelProps: ClockLabelProps): Labels => {
  const { renderLocations, friends, currentLocation, userName, userColor, colorArray } = clockLabelProps;
  const radiansBetweenLocations = (2 * Math.PI) / renderLocations.length;
  const placementPoints = new PlacementPoints();
  // console.log('these are friends: ', friends)

  const getPointOnCircle = (
    origin: number[],
    radius: number,
    radian: number
  ) => {
    const array = [];
    const fixedAngleAdjustment = Math.PI / 2;
    const x: number =
      radius * Math.cos(radian + fixedAngleAdjustment) + origin[0];
    const y: number =
      radius * Math.sin(radian - fixedAngleAdjustment) + origin[1];
    // adjust point based on which quadrant
    array.push(x, y);
    return array;
  };
  const labels = new Labels();
  for (let i = 0; i < renderLocations.length; i++) {
    let radian = radiansBetweenLocations * i;
    let points = getPointOnCircle(
      [placementPoints.x, placementPoints.y],
      placementPoints.r,
      radian
    );
    // Adjust location of point based on which quadrant point is in
    const xAxis = points[0];
    const yAxis = points[1];
    const labelHeight = 20;
    const labelWidth = 30;
    let heightAdjust = labelHeight / 2;
    let widthAdjust = labelWidth / 2;
    //  console.log("this are points: ", points[0], "x", points[1], "y", renderLocations[i]);

    // TODO place label properly at 6 clock position
    if (yAxis === 0) {
      heightAdjust = heightAdjust + 5;
    }
    if (yAxis === 100) {
      heightAdjust = heightAdjust - 5;
    }
    if (xAxis > 50) {
      widthAdjust = widthAdjust - 10;
    }
    if (xAxis < 50) {
      widthAdjust = widthAdjust + 10;
    }

    const locationLabel: JSX.Element = (
      <LocationLable
        key={renderLocations[i].id}
        x={xAxis - widthAdjust}
        y={yAxis - heightAdjust}
        width={labelWidth}
        height={labelHeight}
      >
        <p>{renderLocations[i].name}</p>
      </LocationLable>
    );
    labels.locationLabels.push(locationLabel);
    if (renderLocations[i].id === currentLocation.id) {
      const userAdjust = 10
      const userLabel: JSX.Element = (
        <FriendLabel
          key={userName}
          x={xAxis}
          y={yAxis - userAdjust}
          width={labelWidth}
          height={labelHeight}
          color={userColor}
        >
          <p>{userName}</p>
        </FriendLabel>
      );
      labels.userLabel.push(userLabel)
    }
    let count = 0;
    for (let j = 0; j < friends.length; j++) {
      if (renderLocations[i].id === friends[j].currentLocation.id) {
        const friendAdjust = (3 * count);
        // console.log('this should now be HAPPENING', renderLocations[i].name, count, friendAdjust)
        const friendLabel: JSX.Element = (
          <FriendLabel  
            key={friends[j].id}
            x={xAxis}
            y={yAxis + friendAdjust}
            width={labelWidth}
            height={labelHeight}
            color={colorArray[j]}
          >
            <p>{friends[j].name}</p>
          </FriendLabel>
        );
        labels.friendLabels.push(friendLabel);
        count++;
      }
    }
  }
  // console.log('these are labels: ', labels)
  return labels;
};

const LocationLable = styled.foreignObject`
  font-size: 6px;
  // DO NOT MAKE WIDTH AUTO
  /* width: auto; */
  height: 300;
  /* border: 2px solid ; */
`;
const FriendLabel = styled.foreignObject`
  font-size: 3px;
  width: 200;
  height: 300;
  color: ${(props) => props.color};
  /* border: 2px solid ; */
`;
