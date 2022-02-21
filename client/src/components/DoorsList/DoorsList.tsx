import React, { memo } from 'react';

import DoorCard from './DoorCard';
import { Door } from '../../shared/interface';

const DoorsList = memo(({
  doors, 
  showDetails}: {doors: Door[], showDetails(details: Door): void}) => {

  return (
    <>
      {doors.map(door => (
        <DoorCard 
          key={door.id} 
          data={door} 
          showDetails={showDetails}
        />
      ))}
    </>
  )
});

export default DoorsList;
