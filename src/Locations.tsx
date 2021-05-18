import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Location } from "./MainPage";

interface LocationData {
  allLocations: Location[];
}

interface LocationResData {
  data?: {
    createLocation: Location;
  };
}
interface UserResData {
  data?: {
    currentLocation?: Location;
    locations?: Location[];
  };
}

// class Foo {
//   name?: string;
//   age?: number;

//   constructor(args: { name?: string; age?: number } = {}) {
//     this.name = args.name;
//     this.age = args.age;
//   }
// }


interface UpdateUserConstructor{
  locations?: number[];
  currentLocation?: number;
}

class UpdateUserInput {
  locations?: number[];
  currentLocation?: number;

  constructor(
    updateUserConstructor: UpdateUserConstructor
  ) {
    if (updateUserConstructor.locations) {
      this.locations = updateUserConstructor.locations;
    }
    if (updateUserConstructor.currentLocation) {
      this.currentLocation = updateUserConstructor.currentLocation;
    }
  }
}

class CreateLocationInput {
  name: string;
  constructor({ name }: { name: string }) {
    this.name = name;
  }
}

// GQL Queries
// updateUser mutation to add new location to user.locations or to update user.currentLocations
const UPDATE_USER = gql`
  mutation updateUser($locations: [Int!], $currentLocation: Int) {
    updateUser(locations: $locations, currentLocation: $currentLocation) {
      locations {
        name
      }
      currentLocation {
        name
      }
    }
  }
`;

const CREATE_LOCATION = gql`
  mutation createLocation($createLocationInput: CreateLocationInput!) {
    createLocation(createLocationInput: $createLocationInput) {
      id
      name
    }
  }
`;

const getLocations = gql`
  query GetAllLocations {
    allLocations {
      id
      name
    }
  }
`;
// createLocation mutation to create new location (also calls updateUser)
// GQL Queries

interface locationProps {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  currentLocation: Location;
  setCurrentLocation: React.Dispatch<React.SetStateAction<Location>>;
}

const Locations: React.FC<locationProps> = (props) => {
  const {
    locations,
    setLocations,
    currentLocation,
    setCurrentLocation,
  } = props;
  const [newLocationName, setNewLocationName] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>();
  const [currentPopup, setCurrentPopup] = useState(false);
  const [popup, setPopup] = useState(false);
  const [updateUser, { data: updateUserData }] = useMutation(UPDATE_USER);
  const [createLocation, { data: createLocationData }] = useMutation(
    CREATE_LOCATION
  );
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const {
    loading: locationLoading,
    data: locationData,
  } = useQuery<LocationData>(getLocations);

  useEffect(() => {
    if (locationData?.allLocations) {
      setAllLocations(locationData.allLocations);
      console.log(
        "this should be locations from db",
        locationData.allLocations
      );
    }
  }, [locationData?.allLocations]);

  // TODO add location when you press enter
  const addLocation: React.MouseEventHandler<HTMLInputElement> = async () => {
    let locationRes: LocationResData;
    let createLocationInput: CreateLocationInput;
    if (newLocationName !== "") {
      createLocationInput = new CreateLocationInput({ name: newLocationName });
      locationRes = await createLocation({
        variables: { createLocationInput },
      });
      if (locationRes.data) {
        // use newLocation to createLocation, grab location.id and add to newLocations array, then update user
        console.log("this is locationRes.data: ", locationRes.data);
        const addLocation = new Location(
          locationRes.data.createLocation.id,
          locationRes.data.createLocation.name
        );
        const updatedLocations = [...locations, addLocation];
        const locationIds: number[] = updatedLocations.map(
          (location) => location.id
        );
        const updateUserInput = new UpdateUserInput({locations: locationIds});
        const userRes: UserResData = await updateUser({
          variables: { updateUserInput },
        });
        if (userRes.data) {
          //TODO - Probably should actually use data from userRes.data
          setLocations(updatedLocations);
          setNewLocationName("");
        } else {
          console.error("Update User Locations in DB Failed");
        }
      } else {
        console.error("Add Location to DB Failed");
      }
    }
  };

  const removeLocation = () => {
    if (selectedLocation) {
      console.log("removeLocation");
      console.log("selectedLocation", selectedLocation);
      console.log(
        locations.filter((location) => location.id !== selectedLocation.id)
      );
      setLocations(
        locations.filter((location) => location.id !== selectedLocation.id)
      );
      setPopup(false);
    }
  };

  // TODO - this doesn't need to grab value since I already set selectedLocation
  const updateLocation: React.MouseEventHandler<HTMLButtonElement> = async (
    e: React.MouseEvent
  ) => {
    const locationId: number = Number.parseInt(
      (e.target as HTMLButtonElement).value
    );
    console.log("updateLocation", locationId);
    const updateUserInput = new UpdateUserInput({currentLocation: locationId })
    const res: UserResData = await updateUser({
      variables: updateUserInput,
    });
    if (res.data?.currentLocation) {
      console.log("this is res in updateLocation useMutation: ", res.data);
      setCurrentLocation(res.data.currentLocation);
      setPopup(false);
    }
  };

  const removeCurrentLocation = (e: any) => {
    removeLocation();
    updateLocation(e);
  };

  const createPopup: React.MouseEventHandler<HTMLLIElement> = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const locationString: string | null = (e.target as HTMLLIElement).getAttribute(
      "value"
    );
    if (locationString) {
      const locationId = Number.parseInt(locationString);
      const locationObj = locations.find(location => location.id === locationId)
      setSelectedLocation(locationObj)
      setPopup(true);
    } else {console.error('Could not find Location ID to Add Location')}
  };

  const removeOptions = () => {
    return (
      <Select onChange={removeCurrentLocation}>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </Select>
    );
  };
  // TODO - Add Types to All Elements
  const renderCurrentPopup = (): JSX.Element => {
    return (
      <PopupContainer>
        <PopupText>
          You are trying to remove the current location. Where are you now?
        </PopupText>
        {removeOptions()}
      </PopupContainer>
    );
  };

  const renderPopup = (): JSX.Element => {
    if (selectedLocation) {
      return (
        <PopupContainer>
          <PopupText>
            What do you want to do to the location "{selectedLocation.name}"
          </PopupText>
          <PopupButton onClick={updateLocation} value={selectedLocation.id}>
            Update
          </PopupButton>
          <PopupButton onClick={removeLocation}>Remove</PopupButton>
        </PopupContainer>
      );
    } else {
      throw new Error("Could Not Locate Selected Location");
    }
  };

  const LocationItems = (): JSX.Element => {
    const notCurrent = locations.filter(
      (location) => location.name !== currentLocation.name
    );
    const createCurrentPopup = (e: any) => {
      let value = e.target.getAttribute("value");
      console.log("value", value);
      setSelectedLocation(e.target.getAttribute("value"));
      setCurrentPopup(true);
    };

    // Return a list of all locations, currentLocation will always be top because it has a different popup for removing
    return (
      <ul>
        <li
          key={currentLocation.id}
          value={currentLocation.id}
          onClick={createCurrentPopup}
        >
          {currentLocation.name}
        </li>
        {notCurrent.map((location) => (
          <li key={location.id} value={location.id} onClick={createPopup}>
            {location.name}
          </li>
        ))}
      </ul>
    );
  };

  const handleLocationInput: React.ChangeEventHandler<HTMLInputElement> = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const locationName: string = (e.target as HTMLInputElement).value;
    setNewLocationName(locationName);
  };

  const newLocationInput = () => {
    return (
      <Input
        key="newLocation"
        type="text"
        value={newLocationName}
        onChange={handleLocationInput}
        onClick={addLocation}
        placeholder="Add Location"
      />
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
        <LocationsList>
          {newLocationInput()}
          <LocationItems />
        </LocationsList>
      );
    }
  };

  return (
    <LocationsMain>
      <LocationsTitle>Locations</LocationsTitle>
      {renderLocationsTool()}
    </LocationsMain>
  );
};

const LocationsMain = styled.div`
  /* border: 2px solid crimson; */
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const LocationsTitle = styled.h2`
  border-bottom: 1px solid tan;
  flex: 1;
`;

const LocationsList = styled.div`
  flex: 9;
  & :focus {
    outline: none;
  }

  & ul {
    /* border: 2px solid blue; */
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;

    & li {
      /* border: 2px solid yellow; */
      text-align: center;
      width: 80%;
      margin: auto;
      cursor: pointer;
    }
  }
`;

const Input = styled.input`
  border: none;
  /* border: 2px solid green; */
  background-color: transparent;
  font-size: inherit;
  text-align: center;
  &&::placeholder {
    color: #ede0d4;
    font-family: "Luminari";
  }
`;

const PopupContainer = styled.div``;

const PopupText = styled.div``;
const PopupButton = styled.button``;
const Select = styled.select``;

export default Locations;
