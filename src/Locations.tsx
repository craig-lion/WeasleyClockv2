import React from "react";
import styled from "styled-components";

const Locations = () => {

  const addLocation = () => {
    console.log("Location Added");
  };
  const removeLocation = () => {
    console.log("Location Removed");
  };

  const LocationsList = (): JSX.Element => {
    let listOfLocations = ["Home", "Gym", "Work", "Dinner"];
    return (
      <>
      {listOfLocations.map((location) => (
        <li
        className="location"
        key={location}
        value={location}
        onClick={removeLocation}
      >
        {location}
      </li>
      ))}
      </>
    )
    
  };

  return (
    <LocationsMain>
      <p>Locations</p>
      <LocationsGrid color="blue">
        <LocationsList />
        <li onClick={addLocation}>Add Location</li>
      </LocationsGrid>
    </LocationsMain>
  );
};


const LocationsMain = styled.div`
  background-color: crimson;
`;
const LocationsGrid = styled.div`
  color: ${(props) => props.color};
  & li {
    list-style: none;
    cursor: pointer;
  }
`;

export default Locations;
