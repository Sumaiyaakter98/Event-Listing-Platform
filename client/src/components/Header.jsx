// import { Link, useNavigate } from "react-router-dom";

// const Header = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
    
//     <nav className="bg-[#0a2642] shadow-sm border-b-4 border-[#7f66ff] text-white  ">
     
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="navbar p-0 min-h-25">
          
//           <div className="flex-1">
//             <Link to="/" className="text-2xl font-bold tracking-wide">
//              <span className="text-[#7f66ff]">CONF</span>PRO
//             </Link>
//           </div>

//           <div className="flex-none md:text-base text-2xl">
//             <ul className="menu menu-horizontal p-0 gap-2 md:gap-4 font-medium ">
//               <li>
//                 <Link to="/events" className="rounded-lg text-lg hover:text-[#7f66ff]">
//                   Events
//                 </Link>
//               </li>

//               {token ? (
//                 <>
//                   <li>
//                     <Link to="/dashboard" className="rounded-lg text-lg hover:text-[#7f66ff]">
//                       Dashboard
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/saved" className="rounded-lg text-lg hover:text-[#7f66ff]">
//                       Saved
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       onClick={logout}
//                       className="rounded-lg text-error hover:bg-error/10 text-lg hover:text-[#7f66ff]"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li>
//                     <Link to="/login" className="rounded-lg text-lg hover:text-[#7f66ff]">
//                       Login
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/register" className="rounded-lg text-lg hover:text-[#7f66ff]">
//                       Register
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;


// import { Link, useNavigate } from "react-router-dom";

// const Header = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   // নেভিগেশন লিঙ্কগুলো এক জায়গায় রাখা হয়েছে যাতে কোড ক্লিন থাকে
//   const navLinks = (
//     <>
//       <li>
//         <Link to="/events" className="rounded-lg text-lg hover:text-[#7f66ff]">
//           Events
//         </Link>
//       </li>
//       {token ? (
//         <>
//           <li>
//             <Link to="/dashboard" className="rounded-lg text-lg hover:text-[#7f66ff]">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/saved" className="rounded-lg text-lg hover:text-[#7f66ff]">
//               Saved
//             </Link>
//           </li>
//           <li>
//             <button
//               onClick={logout}
//               className="rounded-lg text-error hover:bg-error/10 text-lg hover:text-[#7f66ff]"
//             >
//               Logout
//             </button>
//           </li>
//         </>
//       ) : (
//         <>
//           <li>
//             <Link to="/login" className="rounded-lg text-lg hover:text-[#7f66ff]">
//               Login
//             </Link>
//           </li>
//           <li>
//             <Link to="/register" className="rounded-lg text-lg hover:text-[#7f66ff]">
//               Register
//             </Link>
//           </li>
//         </>
//       )}
//     </>
//   );

//   return (
//     <nav className="bg-[#0a2642] shadow-sm border-b-4 border-[#7f66ff] text-white">
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="navbar p-0 min-h-20">
          
//           {/* মোবাইল ডিভাইসের জন্য হ্যামবার্গার মেনু (Left Side) */}
//           <div className="navbar-end w-auto lg:hidden">
//             <div className="dropdown dropdown-end">
//               <label tabIndex={0} className="btn btn-ghost p-0 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                 </svg>
//               </label>
//               <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-[#0a2642] rounded-box w-52 border border-[#7f66ff]">
//                 {navLinks}
//               </ul>
//             </div>
//           </div>

//           {/* লোগো সেকশন */}
//           <div className="flex-1 navbar-start">
//             <Link to="/" className="text-2xl font-bold tracking-wide">
//               <span className="text-[#7f66ff]">CONF</span>PRO
//             </Link>
//           </div>

//           {/* বড় স্ক্রিনের জন্য মেনু (Desktop) */}
//           <div className="navbar-center hidden lg:flex">
//             <ul className="menu menu-horizontal p-0 gap-4 font-medium">
//               {navLinks}
//             </ul>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;


import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = (
    <>
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
    </>
  );

  return (
    <nav className="bg-[#0a2642] shadow-sm border-b-4 border-[#7f66ff] text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="navbar p-0 min-h-20 flex justify-between">
          
          {/* ১. লোগো সেকশন (navbar-start এটি সবসময় বাম দিকে থাকে) */}
          <div className="navbar-start w-auto">
            <Link to="/" className="text-2xl font-bold tracking-wide">
              <span className="text-[#7f66ff]">CONF</span>PRO
            </Link>
          </div>

          {/* ২. বড় স্ক্রিনের জন্য মেনু (Desktop - Right Side) */}
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal p-0 gap-4 font-medium">
              {navLinks}
            </ul>
          </div>

          {/* ৩. মোবাইল ডিভাইসের জন্য টগলবার (Mobile - Right Side) */}
          <div className="navbar-end w-auto lg:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost p-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-4 shadow-2xl bg-[#0a2642] rounded-xl w-60 border border-[#7f66ff]">
                {navLinks}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;