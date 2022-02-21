import React from "react";
import { User } from "../../../shared/interface";
import PermittedUser from "./PermittedUser";

function PermittedUsers({users}: {users: User[]}) {

  return (
    <>
      <h3 className="text-center">{users.length !== 0 ? 'Permitted Users:' :  'No users so far!'}</h3>
        {users.length !== 0 && 
        <div className="mh-100 users-container">
          {users.map(user => (
            <PermittedUser
              key={user.id}
              data={user}
            />
          ))}
        </div>}
    </>
  )
}

export default PermittedUsers;