import { useContext, useState } from "react";
import "./Navbar.scss";
// Link component ko import kiya
import { Link } from "react-router-dom"; 
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const avatarSrc =
    currentUser?.user?.avatar || currentUser?.avatar || "/noavatar.jpg";
  const displayName =
    currentUser?.user?.userName ||
    currentUser?.userName ||
    currentUser?.username ||
    "User";

  return (
    <nav>
      <div className="left">
        {/* href ki jagah 'to' ka use kiya */}
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/agents">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={avatarSrc} alt="" />
            <span>{displayName}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        {/* Mobile menu ke andar bhi links update kar diye */}
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/agents">Agents</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
