import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  var { loginWithRedirect, isAuthenticated, error } = useAuth0();
  const [authorized, setAuthorized] = useState(false);
  const authorize = async () => {
    await loginWithRedirect();
    setAuthorized(true);
    console.log("we are called");
  };
  return (
    <>
      {!authorized ? (
        <button onClick={() => authorize()}>
          Log In
        </button>
      ) : (
        <></>
      )}

    </>
  );
};

export default LoginButton;
