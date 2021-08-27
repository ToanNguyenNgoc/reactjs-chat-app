import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Avatar} from 'antd';
import { AuthContext } from '../../Context';
import { addDocument } from '../../firebase/services';
import { AppContext } from '../../Context/AppProvider';

FriendItem.propTypes = {
      friend:PropTypes.object,
      uid:PropTypes.string,
      displayName: PropTypes.string,
      photoURL: PropTypes.string
};
FriendItem.defaultProps={
      friend:{},
      uid:'',
      displayName:'',
      photoURL:''
}

function FriendItem(props) {
      const {friend, uid, displayName, photoURL} = props;
      const {setIsFriendListVisible} = useContext(AppContext);
      const {user}= useContext(AuthContext);
      const [hideUser, setHideUser] = useState('');

      useEffect(()=>{
            async function handleHideUser(){
                  if(user.uid === uid){
                        setHideUser('none');
                  }else{
                        setHideUser('');
                  }
            }
            handleHideUser();
      },[uid, user.uid])

      const handleSendMessage =(friend)=>{
            addDocument('rooms',{
                  name:[user.displayName, friend.displayName],
                  name1:friend.displayName,
                  addMembers: false,
                  description:null, 
                  members:[user.uid, friend.uid]
            })
            setIsFriendListVisible(false);
      }
      return (
            <li style={{display:hideUser}}>
                  <div className='friend__list--box'>
                        <div className="friend__list--box__details">
                              <Avatar src={photoURL}>
                                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                              </Avatar>
                              <span>{displayName}</span>
                        </div>
                        <button
                              onClick={()=> handleSendMessage(friend)}
                              className="cus-btn send-message-btn"
                        >
                              Nhắn tin
                        </button>
                  </div>
            </li>
      );
}

export default FriendItem;