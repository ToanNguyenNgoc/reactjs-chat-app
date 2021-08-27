import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import {Avatar} from 'antd';
import { AuthContext } from '../../Context';
import { formatRelative } from 'date-fns/esm'

MessageBox.propTypes = {
      
};
function formatDate(seconds) {
      let formattedDate = '';
      if (seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date());
            formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      }
      return formattedDate;
}
function MessageBox(props) {
      const [right, setRight] = useState('');
      const [none, setNone] = useState('');
      const [dateRight, setDateRight] = useState('');
      const [changeColor, setChangeColor] = useState('');

      const {photoURL, displayName, uid, text, createdAt} = props;
      const {user} = useContext(AuthContext);
      useEffect(()=>{
            async function changeStyle(){
                  if(user.uid === uid){
                        setRight('flex-end');
                        setNone('none');
                        setDateRight('end');
                        setChangeColor('#0084FF');
                        return;
                  }
            }
            changeStyle();
      },[uid, user.uid])

      return (
            <div className="chat-window__message--item">
                  <Avatar src={photoURL} size='small' style={{display:none, marginRight:'12px'}}>
                        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <div className="message--item__details">
                        <div style={{display:none}} className="message--item__details--title">
                              {displayName}
                        </div>
                        <div className="message--item__details--text" style={{justifyContent:right}}>
                              <div className="message--item__details--text__box" style={{backgroundColor: changeColor}}>
                                    {text}
                              </div>
                        </div>
                        <div style={{ textAlign: dateRight }} className="message--item__details--date">
                              {formatDate(createdAt?.seconds)}
                        </div>
                  </div>
            </div>
      );
}

export default MessageBox;