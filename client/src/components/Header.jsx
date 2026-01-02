import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    
    <nav className="bg-[#0a2642] shadow-sm border-b-4 border-[#7f66ff] text-white  ">
     
      <div className="container mx-auto px-4 lg:px-8">
        <div className="navbar p-0 min-h-25">
          
          <div className="flex-1">
            <Link to="/" className="text-2xl font-bold tracking-wide">
             <span className="text-[#7f66ff]">CONF</span>PRO
            </Link>
          </div>

          <div className="flex-none md:text-base text-2xl">
            <ul className="menu menu-horizontal p-0 gap-2 md:gap-4 font-medium ">
              <li>
                <Link to="/events" className="rounded-lg text-lg hover:text-[#7f66ff]">
                  Events
                </Link>
              </li>

              {token ? (
                <>
                  <li>
                    <Link to="/dashboard" className="rounded-lg text-lg hover:text-[#7f66ff]">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/saved" className="rounded-lg text-lg hover:text-[#7f66ff]">
                      Saved
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="rounded-lg text-error hover:bg-error/10 text-lg hover:text-[#7f66ff]"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="rounded-lg text-lg hover:text-[#7f66ff]">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="rounded-lg text-lg hover:text-[#7f66ff]">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
