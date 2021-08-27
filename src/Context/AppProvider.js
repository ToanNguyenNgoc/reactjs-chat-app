import { id } from "date-fns/locale";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from ".";
import useFirestore from "../customHooks/useFirebase";
import { db } from "../firebase/config";

export const AppContext = createContext();

export default function AppProvider({children}){
      // Handle modal
      const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
      const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
      const [isFriendListVisible, setIsFriendListVisible] = useState(false);
      //

      const [selectedRoomId, setSelectedRoomId]= useState('');
      const [friends, setFriends] = useState();

      const {user:{uid}} = useContext(AuthContext);
      //get room list
      const roomsCondition = useMemo(()=>{
            return {
                  fieldName:'members',
                  operator:'array-contains',
                  compareValue:uid
            }
      },[uid])
      const rooms = useFirestore('rooms', roomsCondition);
      //get list friend
      useEffect(()=>{
            return db.collection('users').onSnapshot((snapshot)=>{
                  const listFriend=[];
                  snapshot.forEach(doc => {
                        listFriend.push({...doc.data()});
                  });
                  console.log({listFriend});
                  setFriends(listFriend);
            })
      },[]);
      //Selected Room
      const selectedRoom = useMemo(()=> rooms.find((room) => room.id === selectedRoomId) || {},[rooms, selectedRoomId]);
      //Get members of Room
      const memberCondition = useMemo(()=>{
            return {
                  fieldName:'uid',
                  operator:'in',
                  compareValue:selectedRoom.members
            }
      },[selectedRoom.members]);
      const members = useFirestore('users', memberCondition)
      return (
            <AppContext.Provider 
                  value={{
                        rooms, 
                        isAddRoomVisible, 
                        setIsAddRoomVisible,
                        selectedRoomId,
                        setSelectedRoomId,
                        selectedRoom,
                        members,
                        isInviteMemberVisible,
                        setIsInviteMemberVisible,
                        isFriendListVisible,
                        setIsFriendListVisible,
                        friends
                  }}
            >
                  {children}
            </AppContext.Provider>
      )
}