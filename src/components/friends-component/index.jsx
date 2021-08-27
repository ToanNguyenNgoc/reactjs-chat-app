import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import {Modal, Alert} from 'antd';
import './style.css'
import FriendItem from './FriendItem';

function FriendList(props) {
      const {isFriendListVisible, setIsFriendListVisible, friends} = useContext(AppContext);
      const handleCancel=()=>{
            setIsFriendListVisible(false)
      }
      return (
            <Modal
                  title='Danh sách bạn bè'
                  visible={isFriendListVisible}
                  onCancel={handleCancel}
                  onOk={handleCancel}
            >
                  <div className='friends-box'>
                        {friends? (
                              <div>
                                    <ul className="friend__list">
                                          {friends.map(friend => (
                                                <FriendItem
                                                      key={friend.uid}
                                                      friend={friend}
                                                      photoURL={friend.photoURL}
                                                      uid={friend.uid}
                                                      displayName={friend.displayName}
                                                />
                                          ))}
                                    </ul>
                              </div>
                        ):(
                              <Alert/>
                        )}
                  </div>
            </Modal>
      );
}

export default FriendList;