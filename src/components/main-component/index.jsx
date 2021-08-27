import React from 'react';
import ChatRoomWindow from '../chatRoom-component';
import Header from '../header-component';
import SlideBar from '../sidebar-component';
import './style.css'

function Home(props) {
      return (
            <div>
                  <Header/>
                  <div className="cus-container">
                        <SlideBar/>
                        <ChatRoomWindow/>
                  </div>
            </div>
      );
}

export default Home;