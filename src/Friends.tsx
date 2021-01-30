import React, {useState, useEffect} from "react";
import styled from "styled-components";
// import Autocomplete from "../node_modules/react-autocomplete/build/lib/Autocomplete";

const Autocomplete = require('react-autocomplete')

interface friendsProps {
  sharedFriends: any;
  setSharedFriends: any;
}

const Friends:React.FC<friendsProps> = () => {
  let [friendsList, setFriendsList] = useState(["Lion", "Jobbie", "Liandra", "Hails"]);
  const [newFriend, setNewFriend] = useState("");
  const [oldFriend, setOldFriend] = useState("");
  const [allFriends, setAllFriends] = useState([""])
  const [popupRemove, setPopupRemove] = useState(false);
  const [popupAdd, setPopupAdd] = useState(false);

  useEffect(() => {
    setAllFriends(["Lion", "Jobbie", "Liandra", "Hails","Mark", "Jackeye", "Ruthie", "Jesse", "Dan", "Courtney"]);
  },[])

  const makeItemsArray = () => {
    const notFriends = allFriends.filter( (item) => {
      return friendsList.indexOf(item) === -1;
    });


    return notFriends.map(name => {
      let obj = { label: "" };
      obj.label = name;
      return obj
    })

  }

  const addFriend = (e: any) => {
    setFriendsList([...friendsList, newFriend]);
    console.log("Friend Added");
    setPopupAdd(false)
  };

  const removeFriend = () => {
    setFriendsList(friendsList.filter(friend => friend !== oldFriend));
    setPopupRemove(false)
    console.log("Friend Removed");
  };


  const createRemoveWarning = (e: any) => {
    console.log(e.target.getAttribute("value"), "value")
    setOldFriend(e.target.getAttribute("value"))
    setPopupRemove(true);
    ;}

  const createAddWarning = (value:string) => {
    setNewFriend(value);
    setPopupAdd(true)
  };

// TODO: Search should clear after name is selected

  // const changeFriend = (e: any) => setNewFriend(e.target.getAttribute("value"));

  const renderAutocomplete = () => {
            return (<Autocomplete
              getItemValue={(item: any) => item.label}
              items={makeItemsArray()}
              renderItem={(item: any, isHighlighted: any) => (
                <div
                  style={{ background: isHighlighted ? "lightgray" : "white" }}
                >
                  {item.label}
                </div>
              )}
              value={newFriend}
              // onChange={changeFriend}
              onSelect={createAddWarning}
            />
            )}

  const FriendsList = (): JSX.Element => {
    return (
      <ul>
        {friendsList.map((friend) => (
          <li
            key={friend}
            value={friend}
            onClick={createRemoveWarning}
          >
            {friend}
          </li>
        ))}
        <li>
          {renderAutocomplete()}
        </li>
      </ul>
    );
  };

  const renderFriendsTool = () => {
    if (popupRemove) {
      return (
        <Popup>
          <PopupText>Are You Sure You Want to to remove {oldFriend}?</PopupText>
          <PopupButton onClick={removeFriend}>Remove</PopupButton>
          <PopupButton onClick ={() => setPopupRemove(false)}>Cancel</PopupButton>
        </Popup>
      )
    }
    if (popupAdd) {
      return (
        <Popup>
          <PopupText>Are You Sure You Want to to add {newFriend} as a  friend?</PopupText>
          <PopupButton onClick={addFriend}>Add</PopupButton>
          <PopupButton onClick={() => setPopupAdd(false)}>Cancel</PopupButton>
        </Popup>
      )
    }
    else {
      return (
        <FriendsList />
      )
    }
  }

  return (
    <FriendsMain>
      <p>Friends</p>
      <FriendsContainer>
        {renderFriendsTool()}
      </FriendsContainer>
    </FriendsMain>
  );
};

  const FriendsMain = styled.div``;
  const FriendsContainer = styled.div`
    & li {
      list-style: none;
      cursor: pointer;
      border: 2px solid black;
    }
  `;

const Popup = styled.div``;
const PopupText = styled.div``;
const PopupButton = styled.button``;

export default Friends;
