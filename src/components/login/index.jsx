import React from 'react';
import firebase, {auth} from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';
import './style.css'
Login.propTypes = {
      
};
const googleProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
function Login(props) {
      const handleLogin = async(provider)=>{
            const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
            console.log({user});
            console.log({additionalUserInfo});
            if(additionalUserInfo?.isNewUser){
                  addDocument('users', {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid,
                        providerId: additionalUserInfo.providerId,
                        keywords: generateKeywords(user.displayName)
                  })
            }
      }
      return (
            <div className="wrapper-content">
                  <div className="login__form">
                        <span className="login__form--header">
                              Đăng nhập để sử dụng
                        </span>
                        <button style={{marginBottom:'10px'}} onClick={()=> handleLogin(googleProvider)} className="cus-btn">Đăng nhập với Google</button>
                        <button onClick={()=> handleLogin(fbProvider)} className="cus-btn">Đăng nhập với Facebook</button>
                  </div>
            </div>
      );
}

export default Login;