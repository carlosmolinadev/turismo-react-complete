import React from "react";
import { Link } from "react-router-dom";
import "./Page404.css";

function Page404() {
  return (
    <div id="notfound">
      <div className="notfound-bg"></div>
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>Oops! Pagina no encontrada</h2>
        <Link to="/">HOME</Link>
      </div>
    </div>
  );
}

export default Page404;
