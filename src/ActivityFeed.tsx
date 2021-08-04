import React from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { User } from "./MainPage";


// TODO - Do I need to issue separate requests for pending and accepted so I don't return currentLocation for pending request

interface ActivityFeedProps {
  pendingFriends: User[];
  friends: User[];
  setFriends: React.Dispatch<React.SetStateAction<User[]>>;
  setPendingFriends: React.Dispatch<React.SetStateAction<User[]>>;
}

class UpdateFriendRequestInput {
  id: number;
  status: "accepted" | "rejected";
  constructor(id: number, status: "accepted" | "rejected") {
    this.id = id;
    this.status = status;
  }
}

const HANDLE_FRIEND_REQUEST = gql`
  mutation UpdateFriendRequest($updateFriendRequestInput: UpdateFriendRequestInput!) {
    updateFriendRequest(updateFriendRequestInput: $updateFriendRequestInput){
      id
      recipient{name}
    }
  }
`;

export const ActivityFeed: React.FC<ActivityFeedProps> = (props) => {
  const { pendingFriends, friends, setFriends, setPendingFriends } = props;
  // TODO - should use data from res to update state
  const [updateFriendRequest, { error: updateFriendRequestError }] = useMutation(HANDLE_FRIEND_REQUEST);
  //TODO - accept/reject need to grab createdBy to update db

  const acceptFriend: React.MouseEventHandler<HTMLButtonElement> = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // const updateFriendRequestInput = new UpdateFriendRequestInput()
    console.log("you got a friend in me", (e.target as HTMLButtonElement).value);
    const friendId = Number.parseInt((e.target as HTMLButtonElement).value);
    const updateFriendRequestInput = new UpdateFriendRequestInput(friendId, "accepted");
    const res = await updateFriendRequest({ variables: { updateFriendRequestInput } })
    let addFriend: User | undefined;
    let updatedPendingFriends: User[] | undefined;
    if (updateFriendRequestError) { console.log('Error', updateFriendRequestError)}
    if (res) {
      updatedPendingFriends = (pendingFriends.filter(friend => friend.id !== friendId))
      addFriend = pendingFriends.find((friend) => friend.id === friendId);
    }
    if (addFriend && updatedPendingFriends) {
      setFriends([...friends, addFriend])
      setPendingFriends(updatedPendingFriends)
      console.log('this is the new friend', addFriend)
    } else { console.error('Cant Find Friend To Add')}
  };

  // TODO - additional popup to confirm rejecting friend since they can't invite again
  const rejectFriend: React.MouseEventHandler<HTMLButtonElement> = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // const updateFriendRequestInput = new UpdateFriendRequestInput()
    console.log("no new firends", (e.target as HTMLButtonElement).value);
    const friendId: number = Number.parseInt((e.target as HTMLButtonElement).value);

    const updateFriendRequestInput = new UpdateFriendRequestInput(friendId, "rejected");
    const res = await updateFriendRequest({ variables: { updateFriendRequestInput } })
    let updatedFriends: User[] | undefined;
    let updatedPendingFriends: User[] | undefined;
    if (res) {
      updatedFriends = pendingFriends.filter(
       (friend) => friend.id === friendId
     );
      
      updatedPendingFriends = pendingFriends.filter(
       (friend) => friend.id !== friendId
       );
      }
    if (updatedFriends && updatedPendingFriends) {
      setFriends(updatedFriends);
      setPendingFriends(updatedPendingFriends);
    } else {
      console.error("Cant Find Friend To Remove");
    }
  };

  const renderRequests = (): JSX.Element[] => {

    // TODO: TAKE THIS BULLSHIT OUT
    if (!pendingFriends) {
      return [<ItemBox>No Pending Requests</ItemBox>]
    } else {

      const requestList = pendingFriends.map((req) => {
        return (
          <ItemBox>
            <BoxRequestText>
              {req.name} would like to be your friend
            </BoxRequestText>
            <AcceptButton onClick={acceptFriend} value={req.id}>Accept</AcceptButton>
            <RejectButton onClick={rejectFriend} value={req.id}>Reject</RejectButton>
          </ItemBox>
        );
      });
      return requestList;
    }
  };

  // const renderUpdates = () => {

  
  //   const updateList = friends.map((friend) => {
  //     return (
  //       <ItemBox>
  //         <BoxUpdateText>
  //           Your Friend {friend.name} is at {friend.currentLocation.name}
  //         </BoxUpdateText>
  //       </ItemBox>
  //     );
  //   });
  //   return updateList;
  // };

  return (
    <ActivityMain>
      <ActivityHeader>Activity Feed</ActivityHeader>
      <ActivityBody>
        {renderRequests()}
        {/* {renderUpdates()} */}
      </ActivityBody>
    </ActivityMain>
  );
};

const ActivityMain = styled.div`
  /* border: 2px dashed black; */
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ActivityHeader = styled.h2`
  border-bottom: 2px solid tan;
  flex: 1;
`;
const ActivityBody = styled.div`
  /* border: 2px dashed orangered; */
  flex: 9;
  overflow: scroll;
`;

const ItemBox = styled.div`
  border: 2px solid tan;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 3px tan;
  display: grid;
  margin: 5px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const BoxRequestText = styled.div`
  /* border: 2px dashed orange; */
  grid-column: 1/-1;
  grid-row: 1/2;
`;

// const BoxUpdateText = styled.div`
//   /* border: 2px dashed red; */
//   grid-column: 1/-1;
//   grid-row:1/-1;
// `;

const AcceptButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  color: #0e440e;
  margin: 15px;
  border: 2px solid tan;
  box-shadow: 2px 2px 5px 5px tan;
  background: none;
  font-size: 2rem;
  grid-column: 1/1;
  grid-row: 2/-1;
`;
const RejectButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  color: #ac0000;
  margin: 15px;
  border: 2px solid tan;
  box-shadow: 2px 2px 5px 5px tan;
  background: none;
  font-size: 2rem;
  grid-column: 2/-1;
  grid-row: 2/-1;
`;
