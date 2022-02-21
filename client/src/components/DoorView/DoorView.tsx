import React, { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';

import PermittedUsers from './PermittedUsers/PermittedUsers';
import ProhibitedUsers from './ProhibitedUsers';

import { fetchPermittedUsers, fetchProhibitedUsers, grantAccessToUser } from '../../services/api';
import { Door, User } from '../../shared/interface';
import './DoorView.css';


const DoorView = memo(({doorDetails: {
  id,
  name,
  street,
  postal_code,
  city,
  state,
  country_code,
  geolocation
}, setShowingDoorModal}: {doorDetails: Door, setShowingDoorModal: Dispatch<SetStateAction<boolean>>}) => {

  const [permittedUsers, setPermittedUsers] = useState<User[]>([]);
  const [prohibitedUsers, setProhibitedUsers] = useState<User[]>([]);

  const getPermittedUsers = async (id: number): Promise<void> => {
    try {
      const data = await fetchPermittedUsers(id);
      setPermittedUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProhibitedUsers = async (id: number): Promise<void> => {
    try {
      const data = await fetchProhibitedUsers(id);
      setProhibitedUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const grantPermissionToUser = async (userId: number, doorId=id): Promise<void> => {
    try {
      await grantAccessToUser(doorId, userId);
      await getPermittedUsers(doorId);
      await getProhibitedUsers(doorId);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      await getPermittedUsers(id);
      await getProhibitedUsers(id);
    })();
  }, [id]);

  return (
    <div className='modal-container'>
      <div className='row door-info-container'>
        <div className='row col-6'>
          <div className='col-12 h-50 mh-50'>
            <div className='card m-3'>
              <div className='card-header'>
                <h5 className='card-title'>
                  {name}
                </h5>
              </div>
              <div className='card-body'>
                <p className='card-text'>{street}, {postal_code}</p>
                <p className='card-text' >{country_code} {city}, {state}</p>
              </div>
              <div className='card-footer'>
                <h5>Location</h5>
                <p className='card-text'>{geolocation}</p>
              </div>
            </div>
          </div>
          <div className='col-12 h-50'>
            <ProhibitedUsers 
              users={prohibitedUsers}
              grantPermissionToUser={grantPermissionToUser}
            />
            <button 
              type='button'
              className='row btn btn-danger mw-100 mx-auto mt-2'
              onClick={() => setShowingDoorModal(false)}
            >
              Close
            </button>
          </div>
        </div>
        <div className='col-6 h-75 mh-75 my-5 mx-auto'>
          <PermittedUsers 
            users={permittedUsers}
          />
        </div>
      </div>
    </div>
  )
});

export default DoorView;