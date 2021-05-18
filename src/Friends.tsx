import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { User } from "./MainPage";

// TODO - Display pending friends in different color on top
interface friendsProps {
  userName: string | null;
  friends: User[];
  pendingFriends: User[];
  setPendingFriends: React.Dispatch<React.SetStateAction<User[]>>;
}

// interface AllUsersData {
//   allUsers: User[];
// }

interface NotFriendsData {
  userNotFriends: User[];
}

class CreateFriendRequestInput {
  recipient: number;
  constructor(recipient: number) {
    this.recipient = recipient;
  }
}

//GQL QUERY/MUTATION
// const GET_ALL_USERS = gql`
//   query AllUsers {
//     allUsers {
//       name
//     }
//   }
// `;

const GET_NOT_FRIENDS = gql`
  query UserNotFriends {
    userNotFriends {
      name
      id
    }
  }
`;

// const UPDATE_FRIEND_REQUEST = gql`
//   mutation updateFriendRequest($id:Number!, $status:String!){
//     updateFriendRequest(id: $id, status: $status ){
//       id
//       recipient{name}
//       status
//     }
//   }
// `;

const CREATE_FRIEND_REQUEST = gql`
  mutation createFriendRequest($createFriendRequestInput: CreateFriendRequestInput!) {
    createFriendRequest(createFriendRequestInput: $createFriendRequestInput) {
      createdBy {
        name
      }
      recipient {
        name
      }
    }
  }
`;
//GQL QUERY/MUTATION

const Friends: React.FC<friendsProps> = (props) => {
  const [newFriend, setNewFriend] = useState<User>();
  const [oldFriend, setOldFriend] = useState("");
  const [notFriends, setNotFriends] = useState<User[]>([]);
  const [popupRemove, setPopupRemove] = useState(false);
  const [popupAdd, setPopupAdd] = useState(false);
  const { friends, pendingFriends, setPendingFriends } = props;

  // GQL Query/Mutations
  // const { loading: usersLoading, data: usersData } = useQuery<AllUsersData>(
  //   GET_ALL_USERS
  // );
  const {
    loading: notFriendsLoading,
    data: notFriendsData,
  } = useQuery<NotFriendsData>(GET_NOT_FRIENDS);
  console.log("Loading NotFriends: ", notFriendsLoading);
  const [createFriendRequest, { data: createFriendData }] = useMutation(
    CREATE_FRIEND_REQUEST
  );
  // GQL Query/Mutations

  useEffect(() => {
    if (notFriendsData) {
      // console.log(
      //   "this is usersData in FriendsCompnent UseEffect: ",
      //   notFriendsData
      // );
      setNotFriends(notFriendsData.userNotFriends);
    }
  }, [notFriendsData]);


  const createAddWarning: React.ReactEventHandler<HTMLSelectElement> = (
    e: React.MouseEvent<HTMLSelectElement, MouseEvent>
  ) => {
    // Grab
    console.log("this is event", (e.target as HTMLSelectElement).value);
    for (let i = 0; i < notFriends.length; i++) {
      if (notFriends[i].id === Number.parseInt((e.target as HTMLSelectElement).value)) {
        console.log('notFriends[i]: ', notFriends[i])
        const friendObj: User = notFriends[i];
        console.log('friendObj in add: ', friendObj)
        setNewFriend(friendObj);
        break;
      }
    }
    setPopupAdd(true);
  };

  const addFriend: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // Update DB
    if (newFriend) {
      const createFriendRequestInput = new CreateFriendRequestInput(
        newFriend.id
      );

      console.log(
        "this is createFriendRequestInput: ",
        createFriendRequestInput
      );

      const res = await createFriendRequest({
        variables: { createFriendRequestInput: createFriendRequestInput },
      });
      if (res) { 
        setPendingFriends([...friends, newFriend]);
        alert(`Request Sent to ${newFriend.name}`);
        setPopupAdd(false);
      } else {console.error('Failed to Add Friend')}
    } else {
      console.error("No New Friend Found");
    }
  };

  const removeFriend: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // TODO - remove Friend handle in DB
    // setFriends(friends.filter((friend: string) => friend !== oldFriend));
    setPopupRemove(false);
    console.log("Friend Removed");
  };

  const createRemoveWarning: React.MouseEventHandler<HTMLLIElement> = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    // console.log((e.target as HTMLLIElement).getAttribute("value"), "value");
    const oldFriendString = (e.target as HTMLLIElement).getAttribute("value");
    if (typeof oldFriendString === "string") {
      setOldFriend(oldFriendString);
    } else {
      console.error("Could Not Find Friend Element");
    }
    setPopupRemove(true);
  };

  const DropDown = (): JSX.Element => {
    const createOptions = () => {
      return notFriends.map((friend) => {
        return (
          <Option key={friend.name} value={friend.id}>
            {friend.name}
          </Option>
        );
      });
    };

    // console.log('these are createOptions', createOptions())

    return (
      <Select onChange={createAddWarning}>
        <Option key="DefaultOption">Add New Friend</Option>
        {createOptions()}
      </Select>
    );
  };

  const PendingFriendsList = (): JSX.Element => {
    return (
      <ul>
        <p>Pending Friends</p>
        {pendingFriends.map((friend: User) => (
          <li key={friend.id} value={friend.name} color={"blue"}>
            {friend.name}
          </li>
        ))}
      </ul>
    );
  };

  const FriendsList = (): JSX.Element => {
    return (
      <ul>
        {DropDown()}
        {friends.map((friend: User) => (
          <li key={friend.id} value={friend.name} onClick={createRemoveWarning}>
            {friend.name}
          </li>
        ))}
      </ul>
    );
  };

  const renderFriendsTool = (): JSX.Element => {
    if (popupRemove) {
      return (
        <FriendsContainer>
        <Popup>
          <PopupText>Are You Sure You Want to to remove {oldFriend}?</PopupText>
          <PopupButton onClick={removeFriend}>Remove</PopupButton>
          <PopupButton onClick={() => setPopupRemove(false)}>
            Cancel
          </PopupButton>
          </Popup>
        </FriendsContainer>
      );
    }
    if (popupAdd) {
      return (
        <FriendsContainer>
        <Popup>
          <PopupText>
            Are You Sure You Want to to add {newFriend?.name} as a friend?
          </PopupText>
          <PopupButton onClick={addFriend}>Add</PopupButton>
          <PopupButton onClick={() => setPopupAdd(false)}>Cancel</PopupButton>
          </Popup>
        </FriendsContainer>
      );
    } else {
      return (
        <FriendsContainer>
          <PendingFriendsList />  
          <FriendsList />
        </FriendsContainer>
      )
    }
  };

  return (
    <FriendsMain>
      <FriendsTitle>Friends</FriendsTitle>
      <FriendsContainer>{renderFriendsTool()}</FriendsContainer>
    </FriendsMain>
  );
};

const FriendsMain = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 2px solid yellow; */
`;

const FriendsTitle = styled.h2`
  flex: 1;
  /* border: 2px solid purple; */
  width: 100%;
  border-bottom: 1px solid tan;
`;

const FriendsContainer = styled.div`
  flex: 9;
  /* border: 2px solid teal; */
  width: 100%;
  & ul {
    list-style: none;
    padding: 0;

    & li {
      cursor: pointer;
      /* border: 2px solid black; */
    }
  }
`;

const Select = styled.select`
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  appearance: none;
`;
const Option = styled.option`
  background-color: inherit;
  font-family: inherit;
`;

const Popup = styled.div``;
const PopupText = styled.div``;
const PopupButton = styled.button``;

export default Friends;
