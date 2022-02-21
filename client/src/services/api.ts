import { Door, User } from "../shared/interface";

// if required can be moved to .env to make it hidden
const baseUrl = 'http://127.0.0.1:5001';

// GET /doors
export const fetchAllDoorsData = async (): Promise<Door[]> => {
  const response = await fetch(baseUrl + '/doors');
  
  if(!response.ok) throw new Error('Error fetching data');
  const result: Door[] = await response.json();
  return result;
};

// GET /doors/:doorId/permitted
export const fetchPermittedUsers = async (id: number): Promise<User[]> => {
  const response = await fetch(baseUrl + '/doors/' + id + '/permitted');

  if(!response.ok) throw new Error('Error fetching data');
  const result: User[] = await response.json();
  return result;
}

// GET /doors/:doorId/prohibited
export const fetchProhibitedUsers = async (id: number): Promise<User[]> => {
  const response = await fetch(baseUrl + '/doors/' + id + '/prohibited');

  if(!response.ok) throw new Error('Error fetching data');
  const result: User[] = await response.json();
  return result;
}

// POST /doors/:doorID
export const grantAccessToUser = async (doorId: number, userId: number): Promise<void> => {
  const response = await fetch(baseUrl + '/doors/' + doorId, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: userId
    })
  });

  if (!response.ok) throw new Error('Error granting access');
}