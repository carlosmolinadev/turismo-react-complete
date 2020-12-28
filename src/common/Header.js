import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/images/logo.png";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, NavLink } from "react-router-dom";
import { useStateValue } from "./../StateProvide";
import { auth } from "../utils/firebase";
import Badge from "@material-ui/core/Badge";

function Header() {
  const [{ user, cart }, dispatch] = useStateValue();
  const [itemAdded, setItemAdded] = useState("");

  const links = [
    { name: "Inicio", route: "/" },
    { name: "Rutas turisticas", route: "/rutas" },
    { name: "Paquetes turisticos", route: "/paquetes" },
    { name: "Contactanos", route: "/contactanos" },
  ];

  const logOff = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <Navbar className="fixed-top bg-dark" variant="dark" expand="md">
      <Navbar.Brand>
        <NavLink to="/">
          <img className="img__logo" src={logo} alt="brand" />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav>
          {links.map((link) => (
            <Nav.Link
              activeClassName="active"
              key={link.name}
              as={NavLink}
              to={link.route}
              className="navlink"
            >
              {link.name}
            </Nav.Link>
          ))}

          {!user && (
            <NavDropdown
              className="navlink"
              title="Usuarios"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/crearPerfil">
                Crear usuario
              </NavDropdown.Item>
              <div onClick={logOff}>
                <NavDropdown.Item as={Link} to="/ingresarPerfil">
                  Ingresar al perfil
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          )}

          <Nav.Link
            activeClassName="active"
            as={NavLink}
            to="/admin"
            className="navlink"
          >
            Usuarios
          </Nav.Link>

          {user && (
            <NavDropdown
              className="navlink"
              title={<AccountCircleIcon />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to={user?.isAdmin ? "/admin" : "/usuario"}
              >
                Perfil
              </NavDropdown.Item>
              <div onClick={logOff}>
                <NavDropdown.Item as={Link} to="/">
                  Salir
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          )}

          {!user && (
            <Nav.Link
              activeClassName="active"
              as={NavLink}
              to="/carrito"
              className="navlink"
            >
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
