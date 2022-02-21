import React, { useState } from 'react';
import { User } from '../../shared/interface';


function ProhibitedUsers({users, grantPermissionToUser}: {users: User[], grantPermissionToUser(userId: number): void}) {

  const [selectedUser, setSelectedUser] = useState<number | 'default'>('default');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedUser !== 'default') grantPermissionToUser(selectedUser);
    setSelectedUser('default');
  }

  return (
    <>
      <form 
        className='mw-100'
        onSubmit={handleSubmit}
      >
        <select 
          className='form-select form-select-lg my-3 mx-auto w-100 mw-100'
          onChange={(event) => {
            setSelectedUser(Number(event.target.value));
          }}
          value={selectedUser}
        >
          <option value='default'>Grant permissions to:</option>
          {users.map(({
            id,
            first_name,
            last_name,
            email
          }: User, userIdx) => (
            <option
              key={userIdx.toString()}
              value={id}
            >
              {first_name} {last_name} {email}
            </option>
          ))}
        </select>
        <button 
          type='submit'
          className='btn btn-success mw-100'
          disabled={selectedUser === 'default'}
        >
          Grant access
        </button>
      </form>
    </>
  )
}

export default ProhibitedUsers;