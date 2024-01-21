import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();


  return (
    <>
      {isAuthenticated && <p>Welcome, {user.name}!</p>}
    </>
  );
};

export default Profile;
