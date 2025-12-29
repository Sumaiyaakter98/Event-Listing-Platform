import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-lg">
          EventPlatform
        </Link>

        <div className="space-x-4">
          <Link to="/events">Events</Link>

          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/saved">Saved</Link>
              <button onClick={logout} className="ml-3">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
