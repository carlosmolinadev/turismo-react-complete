import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvide";
import "./Home.css";

function Home() {
  const [{ tourPackages }, dispatch] = useStateValue();
  const [detallePaquetes, setDetallePaquetes] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const detallePaquete = formatData(tourPackages);
      setDetallePaquetes([...detallePaquete]);
    };

    loadPlaces();
    return () => {};
  }, [tourPackages]);

  function formatData(items) {
    let lugaresInfo = items.map((item) => {
      const id = item.id;
      const ruta = item.paquete.ruta;
      const descripcionRuta = item.paquete.descripcionRuta;
      const lugares = item.paquete.lugares;
      const imagenes = item.paquete.lugares.map(
        (subitem) => subitem.lugar.imagenes
      );
      const imagenDummy = imagenes[0];
      const imagen = imagenDummy[0];
      return { id, ruta, descripcionRuta, lugares, imagen };
    });
    return lugaresInfo;
  }

  return (
    <>
      <header>
        <div className="jumbotron jumbotron-detail jumbotron-fluid">
          <div className="container">
            <h1 className="display offset-7 pt-5">TOURS EL SALVADOR</h1>
            <p className="offset-7 mt-3">
              Preparate a vivir tu experiencia al maximo!
            </p>
          </div>
        </div>
      </header>

      <section id="more-services" className="more-services">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Tours</h2>
            <p>
              Laborum repudiandae omnis voluptatum consequatur mollitia ea est
              voluptas ut
            </p>
          </div>

          <div className="row">
            {detallePaquetes.map((detalle) => (
              <div
                key={detalle.id}
                className="col-md-6 d-flex align-items-stretch mt-4"
              >
                <div
                  className="card"
                  style={{
                    background: `url(${detalle.imagen})`,
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/paquetes/${detalle.slug}`}>
                        {detalle.ruta}
                      </Link>
                    </h5>
                    <p className="card-text">{detalle.descripcionRuta}</p>
                    <div className="read-more">
                      <Link to={`/paquetes/${detalle.slug}`}>
                        <i className="icofont-arrow-right"></i> Mas
                        información...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-us" className="about-us">
        <div className="container">
          <div className="section-title">
            <h2>Acerca de nosotros</h2>
          </div>

          <div className="row content">
            <div className="col-lg-6">
              <h2>Eum ipsam laborum deleniti velitena</h2>
              <h3>
                Voluptatem dignissimos provident quasi corporis voluptates sit
                assum perenda sruen jonee trave
              </h3>
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0">
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum
              </p>
              <ul>
                <li> Ullamco laboris nisi ut aliquip ex ea commodo consequa</li>
                <li>
                  Duis aute irure dolor in reprehenderit in voluptate velit
                </li>
                <li>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in
                </li>
              </ul>
              <p className="font-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
