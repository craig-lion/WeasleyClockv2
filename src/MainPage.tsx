import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import NavPanel from "./NavPanel";
import ToolPanel from "./ToolPanel";
import { Login } from "./Login";
import { ActivityFeed } from "./ActivityFeed";

//GraphQL Test

import { useQuery, gql } from "@apollo/client";

export interface User {
  id: number;
  name: string;
  currentLocation: Location;
  locations: Location[];
  friends: { accepted: User[]; pending: User[] };
}

export interface UserData {
  user: User[]
}

export class Location {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const GET_USER = gql`
  query oneUser {
    user {
      id
      name
      locations {
        id
        name
      }
      currentLocation {
        id
        name
      }
      friends {
        accepted{
          id
          name
          currentLocation{
            id
            name
          }
        }
        pending{
          id
          name
        }
        rejected{
          id
          name
        }
      }
    }
  }
`;

//GraphQL Test

const MainPage = () => {
  //TODO - useState for userName should look for context
  const [userName , setUserName] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState("none");
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    id: 0,
    name: "none",
  });
  // TODO - friends should be typed as User not string
  const [friends, setFriends] = useState<User[]>([]);
  // TODO - pendingFriends should be typed as User not string
  const [pendingFriends, setPendingFriends] = useState<User[]>([]);

  //GrapQl Test
  // Need a useQuery that will check for JWT and reset userData if not present
  const { loading: userLoading, data: userData } = useQuery<UserData>(GET_USER);
  // console.log("Loading Location: ", locationLoading);
  // console.log("if it worked Locations would be here: ", locationData?.allLocations);
  console.log("Loading User: ", userLoading);
  // console.log("if it worked User would be here: ", userData);

  useEffect(() => {

    if (userData) {
      // console.log('this should be user from db', userData.user)
      const user = userData.user[0]
      const currentLocation = user.currentLocation
      const locations = user.locations.map(location => location)
      // const friendsData = user.friends.accepted.map(friend => friend.recipient.name)
      // const pendingFriendsData = user.friends.pending.map(friend => friend.recipient.name)
      // console.log('locations from user.locations from db: ', locations)
      // console.log('friends from user.locations from db: ', friendsData)
      // console.log('pending friends from user.locations from db: ', pendingFriendsData)
      // console.log('currentLocation from user.locations from db: ', currentLocation)
      setCurrentLocation(currentLocation);
      setUserName(user.name);
      setFriends(user.friends.accepted);
      setPendingFriends(user.friends.pending);
      setLocations(locations);
    }
  }, [userData]
  )
  //GrapQl Test


  // ToDo - add interfacce to all mouseEvents
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
    friends,
    setFriends,
    pendingFriends,
    setPendingFriends,
    userName,
  };

  const clockProps = {
    locations,
    currentLocation,
    friends,
    userName,
  };


  const activityFeedProps = {
    pendingFriends,
    setPendingFriends,
    friends,
    setFriends,
  };

  const loginProps = {
    setUserName
  }

  //TODO - useQuery for user, if !user Login renders else rest renders

  const renderNavPanelContainer = () => {
    if (activeTool === "none") {
      return (
        <NavPanelContainer>
          {userName && <NavPanel {...navPanelProps} />}
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
            {userName && <ToolPanel {...toolBarProps} />}
          </ToolPanelContainer>
        );
    }
  };
  // TODO - Login doesn't render if userLoading is false
  const renderLogin = () => {
    return (
      <LoginContainer>{!userName && <Login {...loginProps} />}</LoginContainer>
    );
  };

  const renderClock = () => {
    // console.log(userData)
      return (
      <ClockContainer>
        {userName && <Clock {...clockProps} />}
      </ClockContainer>
      )
  }

  const renderActivityFeed = () => {
    return (
      <RightSideContainer>
        {userName && <ActivityFeed {...activityFeedProps}/>}
      </RightSideContainer>
    )
  }

  return (
    <MainContainer>
      {renderNavPanelContainer()}
      {renderToolPanel()}
      {!userName && renderLogin()}
      {renderClock()}
      {renderActivityFeed()}
      <TopBarContainer>You're a Wizard {userName}</TopBarContainer>
    </MainContainer>
  );
};


// TODO- Change grid locations to names instead of numbers
const MainContainer = styled.div`
  font-family: "Luminari";
  color: #ede0d4;
  background-color: #9c6644;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: [grid-start] 1fr [left-sidebar-closed] 1fr [left-sidebar-open] 1fr 1fr 1fr 1fr [right-sidebar-open] 1fr [right-sidebar-closed] 1fr [grid-end];
  grid-template-rows: [grid-top] 1fr [top-bar-bottom ] 1fr [clock-top] 80%;
`;

const NavPanelContainer = styled.div`
  /* border: 2px dashed black; */
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  z-index: 1;

  &:hover {
    /* border: 2px dashed black; */
    grid-column: 1 / 3;
    z-index: 2;
  }
`;

const ToolPanelContainer = styled.div`
  /* border: 2px solid lawngreen; */
  grid-row: grid-top / -1;
  grid-column: 1 / 3;
`;
const RightSideContainer = styled.div`
  /* border: 2px solid orange; */
  grid-row: 1 / -1;
  grid-column: right-sidebar-closed / 9;
  z-index: 1;
`;
const TopBarContainer = styled.div`
  /* border: 2px solid purple; */
  grid-row: 1 / 2;
  grid-column: 1 / 9;
  z-index: 0;
  font-size: 4rem;
`;
const ClockContainer = styled.div`
  /* border: 2px solid pink; */
  grid-column: 3 / 7;
  grid-row: clock-top / -1;
`;

const LoginContainer = styled.div`
  /* border: 2px solid red; */
  grid-column: 2 / 8;
  grid-row: 2 / -1;
  z-index: 1;
  position: relative;
`;

export default MainPage;
