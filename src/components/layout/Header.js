// import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiArrowCircleLeft, HiFilter, HiHome, HiSearch, HiShoppingBag } from "react-icons/hi";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
// import Searchinput from "../Form/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
import { BiInfoCircle, BiLogOutCircle, BiSolidDashboard } from "react-icons/bi";
import { AiFillContacts } from "react-icons/ai";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const category = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <HiHome />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/searching" className="nav-link">
                  <HiSearch />
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  <HiFilter />
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories <HiArrowCircleLeft />
                    </Link>
                  </li>
                  {category?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  <BiInfoCircle />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  <AiFillContacts />
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/deshboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          className="dropdown-item overflow-hidden"
                        >
                          <BiSolidDashboard />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item overflow-hidden"
                        >
                          <BiLogOutCircle />
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item m-2">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    {/* <HiShoppingCart /> */} CART
                  </NavLink>
                </Badge>
              </li>
            </ul>
            <Link to="/" className="navbar-brand ms-auto mb-2 mb-lg-0">
              CEASAR STORES
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
