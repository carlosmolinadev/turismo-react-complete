import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-5 footer-contact">
              <h3>El Salvador Tours</h3>
              <p>
                La Libertad <br />
                Boulevard Vijosa
                <br />
                El Salvador <br />
                <br />
                <strong>Phone:</strong> 7898 5855
                <br />
                <strong>Email:</strong> elsalvadortours@gmal.com
                <br />
              </p>
            </div>

            <div className="col-4 footer-links">
              <h4>Enlaces de interes</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Contactanos</li>
                <li>Rutas turisticas</li>
              </ul>
            </div>

            <div className="col-3 footer-links">
              <h4>Tours mas solicitados</h4>
              <ul>
                <li>
                  <Link to="#">Rutas las flores</Link>
                </li>
                <li>
                  <Link to="#">El Pital</Link>
                </li>
                <li>
                  <Link to="#">El Cuco</Link>
                </li>
                <li>
                  <Link to="#">El Boqueron</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-md-flex py-3">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright mt-1">
            &copy; Copyright{" "}
            <strong>
              <span>El Salvador Tours</span>
            </strong>
            . Todos los derechos reservados
          </div>
        </div>
        <div className="social-links text-center text-md-right pt-3 pt-md-0">
          <Link to="#" className="twitter">
            <TwitterIcon />
          </Link>
          <Link to="#" className="facebook">
            <FacebookIcon />
          </Link>
          <Link to="#" className="instagram">
            <InstagramIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
