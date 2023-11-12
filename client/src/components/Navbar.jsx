import { Link } from "react-router-dom";

function Navbar() {
  return (
      <nav>
          <div>
            <Link to="/home">Home</Link>
          </div>
          <div>
            <Link to="/cart">cart</Link>
          </div>
          <div>
            <Link to="/orders">Myorders</Link>
          </div>
          <div>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("accessKey");
              }}
            >
              logout
            </Link>
          </div>
      </nav>
  );
}

export default Navbar;
