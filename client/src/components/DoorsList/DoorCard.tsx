import React from 'react';

import { Door } from '../../shared/interface';

function DoorCard({
  data: {
    id, 
    sensor_uuid, 
    name, 
    street,
    postal_code, 
    city, 
    state, 
    country_code, 
    geolocation
  }, showDetails}: {data: Door, showDetails(details: Door): void}) {

  return (
    <div 
      className='card m-3'
      onClick={() => showDetails({
        id,
        sensor_uuid,
        name,
        street,
        postal_code,
        city,
        state,
        country_code,
        geolocation
      })}
    >
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
        Location: {geolocation} 
      </div>
    </div>
  )
}

export default DoorCard;