import React, { useContext } from 'react';
import { AuthContext } from '../../Context';
import './style.css';
import {Avatar} from 'antd'
import { auth } from '../../firebase/config';

function Header(props) {
      const {user:{displayName, photoURL}} = useContext(AuthContext)
      return (
            <div className="cus-header">
                  <div className="header__user">
                        <Avatar className="header__user--avatar" src={photoURL}>
                              {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <span className="header__user--name">{displayName}</span>
                  </div>
                  <button  onClick={() => auth.signOut()} className="cus-btn logout-btn">Đăng xuất</button>
            </div>
      );
}

export default Header;