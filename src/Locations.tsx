import React, { useState } from "react";
import styled from "styled-components";

interface locationProps {
  locations: string[];
  setLocations: any;
  currentLocation: string;
  setCurrentLocation: any;
}

const Locations: React.FC<locationProps> = (props) => {
  const {
    locations,
    setLocations,
    currentLocation,
    setCurrentLocation,
  } = props;
  const [newLocation, setNewLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPopup, setCurrentPopup] = useState(false);
  const [popup, setPopup] = useState(false);


  // TODO add location when you press enter

  const addLocation = () => {
    if (newLocation !== "") {
      console.log(newLocation);
      setLocations([...locations, newLocation]);
    }
    setNewLocation("");
  };

  const removeLocation = () => {
    console.log("removeLocation");
    console.log("selectedLocation", selectedLocation);
    console.log(locations.filter((location) => location !== selectedLocation));
    setLocations(locations.filter((location) => location !== selectedLocation));
    setPopup(false);
  };

  const updateLocation = (e: any) => {
    console.log("updateLocation", e.target.value);
    setCurrentLocation(e.target.value);
    setPopup(false);
  };

  const removeCurrentLocation = (e: any) => {
    removeLocation();
    updateLocation(e);
  };

  const createPopup = (e: any) => {
    let value = e.target.getAttribute("value");
    console.log("value", value);
    setSelectedLocation(e.target.getAttribute("value"));
    setPopup(true);
  };

  const removeOptions = () => {
    return (
      <Select onChange={removeCurrentLocation}>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </Select>
    );
  };

  const renderCurrentPopup = ():JSX.Element => {
    return (
      <PopupContainer>
        <PopupText>
          You are trying to remove the current location. Where are you now?
        </PopupText>
        {removeOptions()}
      </PopupContainer>
    );
  };

  const renderPopup = ():JSX.Element => {
    return (
      <PopupContainer>
        <PopupText>
          What do you want to do to the location "{selectedLocation}"
        </PopupText>
        <PopupButton onClick={updateLocation} value={selectedLocation}>
          Update
        </PopupButton>
        <PopupButton onClick={removeLocation}>Remove</PopupButton>
      </PopupContainer>
    );
  };

  const LocationsList = ():JSX.Element => {
    const notCurrent = locations.filter(
      (location) => location !== currentLocation
    );
    const createCurrentPopup = (e: any) => {
      let value = e.target.getAttribute("value");
      console.log("value", value);
      setSelectedLocation(e.target.getAttribute("value"));
      setCurrentPopup(true);
    };
    return (
      <ul>
        <li
          key={currentLocation}
          value={currentLocation}
          onClick={createCurrentPopup}
        >
          {currentLocation}
        </li>
        {notCurrent.map((location) => (
          <li key={location} value={location} onClick={createPopup}>
            {location}
          </li>
        ))}
        <li>
          <Input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onClick={addLocation}
            placeholder="Add Location"
          />
        </li>
      </ul>
    );
  };

  const renderLocationsTool = () => {
    if (popup) {
      return <PopupContainer>{renderPopup()}</PopupContainer>;
    }
    if (currentPopup) {
      return <PopupContainer>{renderCurrentPopup()}</PopupContainer>;
    } else {
      return (
        <LocationsGrid color="blue">
          <LocationsList />
        </LocationsGrid>
      );
    }
  };

  return (
    <LocationsMain>
      <p>Locations</p>
      {renderLocationsTool()}
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

const Input = styled.input`
  border: none;
  background-color: transparent;
  font-size: inherit;
`;

const PopupContainer = styled.div``;

const PopupText = styled.div``;
const PopupButton = styled.button``;
const Select = styled.select``;

export default Locations;
