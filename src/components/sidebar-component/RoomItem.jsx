import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../Context/AppProvider';
import DisplayName from './DisplayName';

RoomItem.propTypes = {
      id: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.array,
      room:PropTypes.array,
};
RoomItem.defaultProps={
      id:'',
      description:'',
      name:[],
      room:[]
}

function RoomItem(props) {
      const {id, name, description, room} = props;
      const {setSelectedRoomId} = useContext(AppContext);
      const handleSelectedRoom=(id)=>{
            setSelectedRoomId(id);
            document.querySelector('.chat-window__wrapper').classList.add('chat-window__wrapper-show');
            document.querySelector('.side-bar').classList.add('side-bar-hide');
      }
      return (
            <li
                  onClick={() => handleSelectedRoom(id)}
            >
                  <div className="chat--list__item">
                        <div className="list__item--left">
                              <div className="chat--list__item--img">
                                    <img src="https://cdn.prime1studio.com/media/catalog/product/cache/1/small_image/460x460/9df78eab33525d08d6e5fb8d27136e95/l/s/lstpr-01_face.jpg"
                                          alt="" />
                              </div>
                              <div className="chat--list__item--content">
                                    {
                                          name.map((value, index) => (
                                                <DisplayName
                                                      key={index}
                                                      displayName={value}
                                                />
                                          ))
                                    }
                                    <span className="item--content__desc">{description}</span>
                              </div>
                        </div>
                        <span className="list__item--right">{room.members.length} người</span>
                  </div>
            </li>
      );
}

export default RoomItem;