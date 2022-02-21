import React from 'react';
import { User } from '../../../shared/interface';

function PermittedUser({
  data: {
    first_name, 
    last_name, 
    email,
  }} : {data: User}) {

  return (
    <>
      <div className='card m-3'>
        <div className='card-body'>
          <p className='card-text'>{first_name}</p>
          <p className='card-text' >{last_name}</p>
        </div>
        <div className='card-footer'>{email}</div>
      </div>
    </>
  );
}

export default PermittedUser;