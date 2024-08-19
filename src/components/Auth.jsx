

import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const Auth = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Auth;

