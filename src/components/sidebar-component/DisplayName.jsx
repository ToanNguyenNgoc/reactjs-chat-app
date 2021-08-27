import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../Context';

DisplayName.propTypes = {
      displayName:PropTypes.string
};
DisplayName.defaultProps={
      displayName:''
}

function DisplayName(props) {
      const [hideDisplayName,setHideDisplayName ] = useState('');
      const {displayName} = props;
      const {user} = useContext(AuthContext);
      
      useEffect(()=>{
            async function handleHide(){
                  if(user.displayName === displayName){
                        setHideDisplayName('none');
                  }else{
                        setHideDisplayName('');
                  }
            }
            handleHide();
      },[displayName, user.displayName])

      return (
            <span style={{display:hideDisplayName}} className="item--content__name">
                  {displayName}
            </span>
      );
}

export default DisplayName;