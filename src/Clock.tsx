import React from "react";
import styled from "styled-components";
import { ClockLabels, PlacementPoints } from "./ClockLabels";
import { Location, User } from "./MainPage";
import { Bellatrix } from "./wands/components/Bellatrix";
import { DeathEaters } from "./wands/components/DeathEaters";
import { Dumbeldore } from "./wands/components/Dumbeldore";
import { Dumbeldore2 } from "./wands/components/Dumbeldore2";
import { Fleur } from "./wands/components/Fleur";
import { Ginny } from "./wands/components/Ginny";
import { Harry } from "./wands/components/Harry";
import { Hermione } from "./wands/components/Hermione";
import { Krum } from "./wands/components/Krum";
import { Longbottom } from "./wands/components/Longbottom";
import { Luna } from "./wands/components/Luna";
import { Malfoy } from "./wands/components/Malfoy";
import { Minerva } from "./wands/components/Minerva";
import { Narcissa } from "./wands/components/Narcissa";
import { Ron } from "./wands/components/Ron";
import { Sirius } from "./wands/components/Sirius";
import { Slughorn } from "./wands/components/Slughorn";
import { Snape } from "./wands/components/Snape";
import { Voldemort } from "./wands/components/Voldemort";
const randomColor = require("randomcolor");

export interface ClockProps {
  locations: Location[];
  currentLocation: Location;
  friends: User[];
  userName: string | null;
}

const Clock: React.FC<ClockProps> = (clockProps) => {
  const { locations, currentLocation, friends, userName } = clockProps;
  const colorArray: string[] = [];
  for (let i = 0; i < friends.length; i++){
    colorArray.push(randomColor())
  }
  const userColor = randomColor()

  const friendLocations: Location[] = ((): Location[] => {
    const locationsArray: Location[] = [];
    friends.forEach((friend) => {
      const locationsIncludes = locations.some(location => location.id === friend.currentLocation.id);
      const locationsArrayIncludes = locationsArray.some(
        (location) => location.id === friend.currentLocation.id
      );

      if (!locationsIncludes && !locationsArrayIncludes) {
        locationsArray.push(friend.currentLocation);
      }
    });
    return locationsArray;
  })();

  
  // class Coordinates {
  //     x: number;
  //     y: number;
  //     constructor() {
  //       this.x = 0;
  //       this.y = 0;
  //     }
  // }

  const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };
  const placementPoints = new PlacementPoints();

  const radiansBetweenLocations = (2 * Math.PI) / locations.length;
  
  const placeArm = (location: string): number => {
    let degrees: number = 0;
    for (let i = 0; i < locations.length; i++) {
      if (location === locations[i].name) {
        let radian = radiansBetweenLocations * i;
        degrees = radian * (180 / Math.PI);
      }
    }

    return 180 - degrees;
  };

  const rotateComponent = (rotate: number, fill: string): JSX.Element => {
    const elements = [
      <Bellatrix rotate={rotate} fill={fill} />,
      <Dumbeldore rotate={rotate} fill={fill} />,
      <DeathEaters rotate={rotate} fill={fill} />,
      <Dumbeldore2 rotate={rotate} fill={fill} />,
      <Fleur rotate={rotate} fill={fill} />,
      <Ginny rotate={rotate} fill={fill} />,
      <Harry rotate={rotate} fill={fill} />,
      <Hermione rotate={rotate} fill={fill} />,
      <Krum rotate={rotate} fill={fill} />,
      <Longbottom rotate={rotate} fill={fill} />,
      <Luna rotate={rotate} fill={fill} />,
      <Malfoy rotate={rotate} fill={fill} />,
      <Minerva rotate={rotate} fill={fill} />,
      <Narcissa rotate={rotate} fill={fill} />,
      <Ron rotate={rotate} fill={fill} />,
      <Sirius rotate={rotate} fill={fill} />,
      <Slughorn rotate={rotate} fill={fill} />,
      <Snape rotate={rotate} fill={fill} />,
      <Voldemort rotate={rotate} fill={fill} />,
    ];

    return elements[getRandomIntInclusive(0, elements.length - 1)];
  };

  // const armLocation: number = placeArm(currentLocation.name);

  // TODO - friend currentLocations are added to



  const Arm = (): JSX.Element => {
    const rotate = placeArm(currentLocation.name);
    return rotateComponent(rotate, userColor);
  };

  const makeFriendArms = (): JSX.Element[] => {
    const friendArmElements: JSX.Element[] = [];
    for (let i = 0; i < friends.length; i++) {
      // console.log('friends[i]: ', friends[i])
      const rotate = placeArm(friends[i].currentLocation.name);
      friendArmElements.push(
        rotateComponent(rotate, colorArray[i])
      );
    }
    return friendArmElements;
  };

  const clockLabelProps = {
    friends,
    currentLocation,
    userName,
    renderLocations: [...locations, ...friendLocations],
    userColor,
    colorArray
  }
  const clockLabels = ClockLabels(clockLabelProps)

  return (
    <ClockMainContainer>
      <SVG viewBox="0 0 100 100">
        <ClockFace
          cx={placementPoints.x}
          cy={placementPoints.y}
          r={placementPoints.r}
          fill="#B08968"
          stroke="tan"
          strokeWidth="2"
          />
        {Arm()}
        {makeFriendArms()}
        {clockLabels.friendLabels}
        {clockLabels.locationLabels}
        {clockLabels.userLabel}
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
  overflow: visible;
`;

const ClockFace = styled.circle``;

const SVG = styled.svg`
  height: 90%;
  height: ${(clockProps) => clockProps.height};
  width: 100%;
  /* border: 2px solid red; */
  border-radius: 50%;
  overflow: visible;
  white-space: nowrap;
  transform: rotate(${(clockProps) => clockProps.rotate}deg);
`;

// const SVGARM = styled.svg`
//   position: absolute;
//   height: 90%;
//   top: 0;
//   right: 0;
//   height: ${(clockProps) => clockProps.height};
//   width: 100%;
//   /* border: 2px solid blue; */
//   transform: rotate(${(clockProps) => clockProps.rotate}deg);
// `;

// const Image = styled.image`
//   width:50%;
//   height: 50%;
//   transform-origin: center;
//   transform: rotate(${clockProps => clockProps.rotate}deg);
// `;

// const Line = styled.line``;



export default Clock;
