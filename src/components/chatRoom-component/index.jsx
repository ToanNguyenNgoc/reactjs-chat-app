import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../../Context';
import { AppContext } from '../../Context/AppProvider';
import './style.css';
import {Alert, Avatar, Form, Tooltip, Input} from 'antd';
import MessageBox from '../message-component';
import useFirestore from '../../customHooks/useFirebase';
import { addDocument } from '../../firebase/services';
import styled from 'styled-components';
import { db } from '../../firebase/config';

const FormStyle = styled(Form)`
      width: calc(100% - 40px);
      padding-right: 10px;
`


function ChatRoomWindow(props) {
      const {selectedRoom,members, setIsInviteMemberVisible} = useContext(AppContext);
      const {user:{uid, photoURL, displayName}} = useContext(AuthContext);
      const [form] = Form.useForm();
      const [inputValue, setInputValue] = useState('');
      const [hide, setHide] = useState('')

      const handleInviteMember=()=>{
            setIsInviteMemberVisible(true);
      }
      //get message
      const condition = useMemo(()=>({
            fieldName:'roomId',
            operator:'==',
            compareValue:selectedRoom.id
      }),[selectedRoom.id]);
      const messages = useFirestore('messages', condition);
      //submit message
      const handleOnchange=(e)=>{
            setInputValue(e.target.value);
      }
      const handleOnSubmit=()=>{
            addDocument('messages', {
                  text: inputValue,
                  uid,
                  photoURL,
                  roomId: selectedRoom.id,
                  displayName
            });
            form.resetFields(['message']);
      }
      const handleBack=()=>{
            document.querySelector('.chat-window__wrapper').classList.remove('chat-window__wrapper-show');
            document.querySelector('.side-bar').classList.remove('side-bar-hide');
      }
      //handle display add button
      useEffect(()=>{
            async function handleHide(){
                  if(selectedRoom.addMembers === false){
                        setHide('none');
                  }else{
                        setHide('');
                  }
            }
            handleHide();
      },[selectedRoom.addMembers])
      //handle remove chat room
      const handleRemoveChatRoom=()=>{
            if(uid === selectedRoom.adminRoomId || selectedRoom.addMembers === false){
                  db.collection('rooms').doc(selectedRoom.id).delete().then(()=>{
                        //handle back in mobile
                        handleBack();
                  }).catch((error)=>{
                        console.log(error);
                  })
            }else{
                  console.log('you are not admin!');
            }
      }
      return (
            <div className="chat-window__wrapper">
                  {selectedRoom.id ? (
                        <div className="chat-window">
                              <div className="chat-window__header">
                                    <div className="chat-window__header--left__wrapper">
                                          <button onClick={handleBack} className="cus-btn back-btn"><i className="fas fa-arrow-left"></i></button>
                                          <div className="chat-window__header--left">
                                                <span className="chat-window__header--left__name">{selectedRoom.name}</span>
                                                <span className="chat-window__header--left__name">{selectedRoom.name1}</span>
                                                <span className="chat-window__header--left__desc">{selectedRoom.description}</span>
                                          </div>
                                    </div>
                                    <div className="chat-window__header--right">
                                          <Avatar.Group size='default' maxCount={2} style={{display: hide}}>
                                                {members.map((member) => (
                                                      <Tooltip key={member.id} title={member.displayName}>
                                                            <Avatar style={{ border: 'none' }} src={member.photoURL}>
                                                                  {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                                                            </Avatar>
                                                      </Tooltip>
                                                ))}
                                          </Avatar.Group>
                                          <div className="chat-window__header--right__control">
                                                <button 
                                                      onClick={handleInviteMember} 
                                                      className="cus-btn chat-options-btn"
                                                      style={{display:hide}}
                                                >
                                                      <i className="fas fa-plus"></i></button>
                                                <button 
                                                      onClick={handleRemoveChatRoom}
                                                      className="cus-btn chat-options-btn"
                                                >
                                                      <i className="fas fa-exclamation"></i>
                                                </button>
                                          </div>
                                    </div>
                              </div>
                              <div className="chat-window__message">
                                    <ul>
                                          {messages.map(mes =>(
                                                <li key={mes.id}>
                                                      <MessageBox
                                                            style={{with:'100%'}}
                                                            text={mes.text}
                                                            photoURL={mes.photoURL}
                                                            displayName={mes.displayName}
                                                            createdAt={mes.createdAt}
                                                            uid={mes.uid}
                                                      />
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                              <div className="chat-window__input">
                                    <FormStyle form={form}>
                                          <Form.Item name='message' style={{marginBottom:'0px'}}>
                                                <Input

                                                      onChange={handleOnchange}
                                                      onPressEnter={handleOnSubmit}
                                                      className='cus-input'
                                                      placeholder='Enter Message...'
                                                      bordered={false}
                                                      autoComplete='off' />
                                          </Form.Item>
                                    </FormStyle>
                                    <button onClick={handleOnSubmit} className="cus-btn send-btn"><i className="far fa-paper-plane"></i></button>
                              </div>
                        </div>
                  ) : (
                        <Alert
                              className='hide-for-mobile'
                              message='Vui lòng chọn 1 nhóm Chat !'
                              type='warning'
                              showIcon
                              style={{ margin: '5px' }}
                              closable
                        />
                  )}
            </div>
      );
}

export default ChatRoomWindow;