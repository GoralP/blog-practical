import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Button,
  NavItem,
  NavLink,
  Input,
} from "reactstrap";
import bloglogo from "../images/blog_logo.PNG";
import { useHistory } from "react-router-dom";
import { FaUser, FaBell, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");

  const logout = () => {
    if (localStorage.clear("token")) {
      history.push("/");
    } else {
      history.push("/");
    }
  };

  return (
    <Container fluid className="shadow">
      <Navbar className="header" light expand="md">
        <NavbarBrand>
          <img className="blog-logo" src={bloglogo} alt="logo" />
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Input
                type="text"
                placeholder="Search..."
                className="search-textbox"
              ></Input>
            </NavItem>
            <NavbarText>
              <Link to="/admin/tags">
                <NavItem>Tags</NavItem>
              </Link>
            </NavbarText>
            <NavbarText>
              <Link to="/admin/categories">
                <NavItem>Categories</NavItem>
              </Link>
            </NavbarText>
            <NavbarText>
              <Link to="/admin/posts">
                <NavItem>Posts</NavItem>
              </Link>
            </NavbarText>
          </Nav>

          <NavbarText className="user pr-2 login-user">
            {token ? <div>{user}</div> : ""}
          </NavbarText>

          {token ? (
            <Button className="logout-button" onClick={logout}>
              <FaSignOutAlt />
            </Button>
          ) : (
            <Link to="/login">
              <Button>Sign in</Button>
            </Link>
          )}
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
