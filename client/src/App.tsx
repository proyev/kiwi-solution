import React, {useCallback, useEffect, useState} from 'react';

import DoorsList from './components/DoorsList/DoorsList';
import DoorView from './components/DoorView/DoorView';

import { fetchAllDoorsData } from './services/api';
import { Door } from './shared/interface';

function App() {

  const [doorsData, setDoorsData] = useState<Door[]>([]);
  const [doorDetails, setDoorDetails] = useState<Door | null>(null);
  const [showingDoorModal, setShowingDoorModal] = useState(false);

  const getDoorsData = useCallback(async (): Promise<void> => {
    try {
      const response = await fetchAllDoorsData();
      setDoorsData(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const showDetails = useCallback((details: Door): void => {
    setDoorDetails(details);
    setShowingDoorModal(true);
  }, []);

  useEffect(() => {
    getDoorsData();
  }, []);

  return (
    <>
      {showingDoorModal &&
        doorDetails &&
        <DoorView 
          doorDetails={doorDetails}
          setShowingDoorModal={setShowingDoorModal}
        />
      }
      <div
        className='container app-container'
        style={{
          alignItems: 'center',
          display: 'flex',
          flexFlow: 'wrap',
          justifyContent: 'space-evenly',
      }}>
        <DoorsList 
          doors={doorsData}
          showDetails={showDetails}
        />
      </div>
    </>
  );
}

export default App;
