import React from 'react';

export const Gradient = (props) => {
  return(
    <div className={`gradient gradient${props.index} ${props.show ? 'show-gradient' : ''}`}/>
  )
}

export default Gradient;
