import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery, FetchResult } from "@apollo/client";
import styled from "styled-components";
import { Location } from "./MainPage";
import { AutocompleteInput } from "./Autocomplete";

interface LocationData {
  allLocations: Location[];
}

interface NewLocationData {
  createLocation: Location;
}

interface UpdateUserConstructor {
  locations?: number[];
  currentLocation?: number;
}

class UpdateUserInput {
  locations?: number[];
  currentLocation?: number;

  constructor(updateUserConstructor: UpdateUserConstructor) {
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
    updateUser(
      updateUserInput: {
        locations: $locations
        currentLocation: $currentLocation
      }
    ) {
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
  query friendAndPublicLocations {
    friendAndPublicLocations {
      id
      name
    }
  }
`;

// GQL Queries

interface locationProps {
  userLocations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  currentLocation: Location;
  setCurrentLocation: React.Dispatch<React.SetStateAction<Location>>;
}

const Locations: React.FC<locationProps> = (props) => {
  const { userLocations, setLocations, currentLocation, setCurrentLocation } =
    props;
  const [newLocationName, setNewLocationName] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>();
  const [currentPopup, setCurrentPopup] = useState(false);
  const [popup, setPopup] = useState(false);
  const [updateUser, { error: updateUserError }] = useMutation(UPDATE_USER);
  const [createLocation] = useMutation(CREATE_LOCATION);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const { data: locationData } = useQuery<LocationData>(getLocations);

  useEffect(() => {
    if (locationData) {
      setAllLocations(locationData.allLocations);
    }
  }, [locationData]);

  // TODO - this doesn't need to grab value since I already set selectedLocation
  const updateCurrentLocation = async (id: number) => {
    console.log("updateCurrentLocation", id);
    const updateUserInput = new UpdateUserInput({
      currentLocation: id,
    });
    const res: FetchResult<
      any,
      Record<string, any>,
      Record<string, any>
    > = await updateUser({
      variables: updateUserInput,
    });
    if (updateUserError) {
      console.log("o snap Error: ", updateUserError);
    }
    if (res.data) {
      console.log("res.data", res.data);
      const newCurrentLocation = allLocations.filter(
        (location) => location.id === id
      )[0];
      setCurrentLocation(newCurrentLocation);
      setPopup(false);
    }
  };
  const updateAllLocations = async (
    location: Location,
    type: "add" | "remove"
  ) => {
    console.log("updateAllLocations", location, type);
    let updateUserInput: UpdateUserInput = {};
    if (type === "add") {
      updateUserInput = new UpdateUserInput({
        locations: [...userLocations.map((loc) => loc.id), location.id],
      });
    }
    new UpdateUserInput({
      currentLocation: location.id,
    });
    if (type === "remove") {
      updateUserInput = new UpdateUserInput({
        locations: [
          ...userLocations
            .filter((loc) => loc.id !== location.id)
            .map((location) => location.id),
        ],
      });

      console.log('updateUserInput: ', updateUserInput)
    }
    const res: FetchResult<
      any,
      Record<string, any>,
      Record<string, any>
    > = await updateUser({
      variables: updateUserInput,
    });
    if (updateUserError) {
      console.log("o snap Error: ", updateUserError);
    }
    if (res.data) {
      console.log("res.data", res.data);
      setLocations([...res.data.updateUser.locations]);
      setPopup(false);
    }
  };

  const addLocation = async (value: string): Promise<Location | string> => {
    // let locationRes: FetchResult<any, Record<string, any>, Record<string, any>>;
    let createLocationInput: CreateLocationInput;
    if (newLocationName !== "") {
      createLocationInput = new CreateLocationInput({
        name: newLocationName,
      });
      //
      return createLocation({
        variables: { createLocationInput },
      }).then(
        (res: FetchResult<any, Record<string, any>, Record<string, any>>) => {
          console.log("lets see if it works: ", res.data);
          const newLocationData: NewLocationData = res.data;
          if (newLocationData) {
            setLocations([...userLocations, newLocationData.createLocation]);
            setNewLocationName("");
            return newLocationData.createLocation;
          } else {
            return "Error Creating New Location";
          }
        }
      );
    } else {
      return "Add Location Name First";
    }
  };

  const handleCurrentLocationUpdate = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const locationId: number = Number.parseInt(
      (e.target as HTMLSelectElement).value
    );
    updateCurrentLocation(locationId);
  };

  // How can I combine these two handlers? SHould I do that? Problem is typing - one is Select element and one is Button

  const removeLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedLocation) {
      const locationId: number = Number.parseInt(
        (e.target as HTMLSelectElement).value
      );
      console.log("locationID: ", locationId);
      const locationToRemove = userLocations.find(
        (location) => location.id === locationId
      );
      if (locationToRemove) {
        updateAllLocations(locationToRemove, "remove");
        setLocations(
          userLocations.filter((location) => location.id !== locationId)
        );
        setPopup(false);
      } else {
        console.error("Trying to remove a location that does not exist");
      }
    } else {
      console.error("No Location Selected");
    }
  };

  const removeCurrentLocation = (e: React.MouseEvent<HTMLSelectElement>) => {
    const locationId: number = Number.parseInt(
      (e.target as HTMLSelectElement).value
    );
    const locationToRemove = userLocations.find(
      (location) => location.id === locationId
    );
    if (locationToRemove) {
      updateAllLocations(locationToRemove, "remove");
      setLocations(
        userLocations.filter((location) => location.id !== locationId)
      );
      setPopup(false);
    } else {
      console.error(
        "Trying to remove a location that does not exist - CURRENT"
      );
    }
  };

  const chooseNewCurrentLocation = () => {
    return (
      <Select onSelect={removeCurrentLocation}>
        {userLocations
          .filter((location) => location.id !== currentLocation.id)
          .map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
      </Select>
    );
  };

  const renderCurrentPopup = (): JSX.Element => {
    return (
      <PopupContainer>
        <PopupText>
          You are trying to remove the current location. Where are you now?
        </PopupText>
        {chooseNewCurrentLocation()}
      </PopupContainer>
    );
  };

  const createPopup = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const locationString: string | null = (
      e.target as HTMLLIElement
    ).getAttribute("value");
    if (locationString) {
      const locationId = Number.parseInt(locationString);
      const locationObj = userLocations.find(
        (location) => location.id === locationId
      );
      setSelectedLocation(locationObj);
      setPopup(true);
    } else {
      console.error("Could not find Location ID to Add Location");
    }
  };

  const renderPopup = (): JSX.Element => {
    if (selectedLocation) {
      return (
        <PopupContainer>
          <PopupText>
            What do you want to do to the location "{selectedLocation.name}"
          </PopupText>
          <PopupButton
            onClick={handleCurrentLocationUpdate}
            value={selectedLocation.id}
          >
            Update Current Location
          </PopupButton>
          <PopupButton onClick={removeLocation} value={selectedLocation.id}>
            Remove
          </PopupButton>
        </PopupContainer>
      );
    } else {
      throw new Error("Could Not Locate Selected Location");
    }
  };

  const LocationItems = (): JSX.Element => {
    const notCurrent = userLocations.filter(
      (location) => location.name !== currentLocation.name
    );

    const createCurrentPopup = (e: any) => {
      let locationName = e.target.getAttribute("value");
      const locationObj: Location | undefined = userLocations.find(
        (location) => location.name === locationName
      );
      if (locationObj) {
        setSelectedLocation(locationObj);
        setCurrentPopup(true);
      } else {
        console.error("Cant find Location");
      }
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

  const autocompleteProps = {
    userLocations,
    addLocation,
    setNewLocationName,
    newLocationName,
    updateAllLocations,
  };

  const renderLocationsTool = (): JSX.Element => {
    if (popup) {
      return renderPopup();
    }
    if (currentPopup) {
      return <PopupContainer>{renderCurrentPopup()}</PopupContainer>;
    } else {
      return (
        <LocationsList>
          <AutocompleteInput {...autocompleteProps} />
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

// const Input = styled.input`
//   border: none;
//   /* border: 2px solid green; */
//   background-color: transparent;
//   font-size: inherit;
//   text-align: center;
//   &&::placeholder {
//     color: #ede0d4;
//     font-family: "Luminari";
//   }
// `;

const PopupContainer = styled.div`
  flex: 9;
`;

const PopupText = styled.div``;
const PopupButton = styled.button``;
const Select = styled.select``;

export default Locations;

// if (locationRes.data) {
//   // createLocation Mutation should return user's locations and update state
//   // use newLocation to createLocation, grab location.id and add to newLocations array, then update user
//   console.log("this is locationRes.data: ", locationRes.data);
//   const addLocation : Location = new Location(
//     locationRes.data.createLocation.id,
//     locationRes.data.createLocation.name
//   );
//   const updatedLocations: Location[] = [...userLocations, addLocation];
//   const locationIds: number[] = updatedLocations.map(
//     (location) => location.id
//   );
//   const updateUserInput: UpdateUserInput = new UpdateUserInput({
//     locations: locationIds,
//   });
//   const userRes: FetchResult<
//     any,
//     Record<string, any>,
//     Record<string, any>
//   > = await updateUser({
//     variables: { updateUserInput },
//   });
//   if (userRes.data) {
//     //TODO - Probably should actually use data from userRes.data
//     console.log('this is userRes.data: ', userRes.data)
//     setLocations(updatedLocations);
//     setNewLocationName("");
//   } else {
//     console.error("Update User Locations in DB Failed");
//   }
// }
