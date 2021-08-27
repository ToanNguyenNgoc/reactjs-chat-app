import React, { useContext, useEffect} from 'react';
import { AppContext } from '../../Context/AppProvider';
import { db } from '../../firebase/config';
import RoomItem from './RoomItem';
import './style.css'

function SlideBar(props) {
      const {rooms, setIsAddRoomVisible,setIsFriendListVisible, setSelectedRoomId} = useContext(AppContext);
      const handleAddRoom=()=>{
            setIsAddRoomVisible(true);
      }
      const handleSelectedRoom=(id)=>{
            //console.log(name);
            setSelectedRoomId(id);
            document.querySelector('.side-bar').classList.add('side-bar-hide');
            document.querySelector('.chat-window__wrapper').classList.add('chat-window__wrapper-show');
      };
      const handleOpenFriendList=()=>{
            setIsFriendListVisible(true);
      }
      return (
            <div className="side-bar">
                  <div className="side-bar__header">
                        <span>Chat</span>
                        <div className="side-bar__header--control">
                              <button 
                                    className="cus-btn cus-sidebar-btn"
                                    onClick={handleOpenFriendList}
                              >
                                    <i class="fas fa-user-friends"></i>
                              </button>
                              <button 
                                    title="Tùy chọn" 
                                    className="cus-btn cus-sidebar-btn"
                              >
                                          <i className="fas fa-ellipsis-h"></i>
                              </button>
                              <button 
                                    title="Tạo nhóm mới" 
                                    className="cus-btn cus-sidebar-btn"
                                    onClick={handleAddRoom}
                              >
                                          <i className="fas fa-plus"></i>
                              </button>
                        </div>
                  </div>
                  <div className="chat--group__list">
                        <ul className="side-bar__chat--list">
                              {rooms.map(room => (
                                    <RoomItem
                                          key={room.id}
                                          id={room.id}
                                          description={room.description}
                                          name={room.name}
                                          room={room}
                                    />
                              ))}
                        </ul>
                  </div>
            </div>
      );
}

export default SlideBar;