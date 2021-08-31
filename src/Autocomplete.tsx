import React from "react";
import Autocomplete from "react-autocomplete";
import { Location } from "./MainPage";


interface AutocompleteProps {
  allLocations: Location[];
  setNewLocationName: React.Dispatch<React.SetStateAction<string>>;
  addLocation: (value: string) => Promise<Location | string>;
  newLocationName: string;
  updateAllLocations: (location: Location, type: 'add' | 'remove') => void;
}

// why did I have to type this as an element instead of a react.fc
export const AutocompleteInput = (
  autocompleteProps: AutocompleteProps
): JSX.Element => {
  const { setNewLocationName, addLocation, newLocationName, updateAllLocations, allLocations } =
    autocompleteProps;
  console.log('HERE IS all Locations: ', allLocations);

  const handleLocationInput: React.ChangeEventHandler<HTMLInputElement> =
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const locationName: string = (e.target as HTMLInputElement).value;
      setNewLocationName(locationName);
    };
  
  const inputOnClick = async () => {
    if (newLocationName !== "") {
      console.log("new location Name: ", newLocationName);
      const res = await addLocation(newLocationName);
      if (typeof res === 'string') { console.error(res); }
      else {
        updateAllLocations(res, 'add');
        console.log('else')
      }
    }
  }
  
  const inputStyle: React.CSSProperties = {
    border: "2px solid purple",
    backgroundColor: "transparent",
    fontSize: "inherit",
    textAlign: "center",
    fontFamily: "inherit",
    color: "inherit",
  };
  

  return (
    <Autocomplete
      key="newLocation"
      getItemValue={(item) => item.name}
      items={allLocations}
      renderItem={(item, isHighlighted): React.ReactNode => (
        <div
          style={{
            background: isHighlighted ? "lightgray" : "transparent",
            border: "2px solid green",
            textAlign: "center",
            fontFamily: "inherit",
          }}
        >
          {item.name}
        </div>
      )}
      renderMenu={(items) => {
        return <div style={{ border: "2px solid yellow" }} children={items} />;
      }}
      renderInput={(props) => {
        return (
          <input
            style={inputStyle}
            placeholder="Add New Location"
            {...props}
            onClick={inputOnClick}
            onSubmit={() => {console.log('this is the onSubmit: ', newLocationName)}}
          />
        );
      }}
      value={newLocationName}
      onChange={handleLocationInput}
      onSelect={addLocation}
      wrapperStyle={{
        flex: 1,
        border: " 2px solid blue",
      }}
    />
  );
};
