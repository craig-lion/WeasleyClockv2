import React from "react";
import styled from "styled-components";

const Friends = () => {
  const FriendsMain = styled.div``;
  const FriendsGrid = styled.div`
    & li {
      list-style: none;
      cursor: pointer;
      border: 2px solid black;
    }
  `;

  const addFriend = () => {
    console.log("Friend Added");
  };
  const removeFriend = () => {
    console.log("Friend Removed");
  };

  const FriendsList = (): JSX.Element => {
    let listOfFriends = ["Lion", "Jobbie", "Liandra", "Hails"];
    return (
      <>
        {listOfFriends.map((friend) => (
          <li
            className="Friend"
            key={friend}
            value={friend}
            onClick={removeFriend}
          >
            {friend}
          </li>
        ))}
      </>
    );
  };

  return (
    <FriendsMain>
      <p>Friends</p>
      <FriendsGrid>
        <FriendsList />
        <li className="Friend" onClick={addFriend}>
          Add Friend
        </li>
      </FriendsGrid>
    </FriendsMain>
  );
};

export default Friends;
