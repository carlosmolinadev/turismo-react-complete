import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useStateValue } from "../StateProvide";
import "./Packages.css";

function Paquetes() {
  const [{ tourPackages }, dispatch] = useStateValue();
  const [detallePaquetes, setDetallePaquetes] = useState([]);

  function formatData(items) {
    let lugaresInfo = items.map((item) => {
      const { id, paqueteBasico, paquetePremium, paqueteVIP } = item;
      const {
        descripcionPaquete,
        descripcionRuta,
        categoria,
        duracion,
        fechaEvento,
        nombre,
        ruta,
        lugares,
      } = item.paquete;
      let imagenes = [];
      lugares.forEach((lugar) => {
        imagenes = [...imagenes, lugar.lugar.imagenes];
      });
      imagenes = imagenes.flat(1);

      return {
        id,
        nombre,
        categoria,
        descripcionPaquete,
        ruta,
        descripcionRuta,
        duracion,
        fechaEvento,
        lugares,
        paqueteBasico,
        paquetePremium,
        paqueteVIP,
        imagenes,
      };
    });
    return lugaresInfo;
  }

  useEffect(() => {
    const loadPlaces = async () => {
      const detallePaquetes = formatData(tourPackages);
      setDetallePaquetes([...detallePaquetes]);
    };

    loadPlaces();
    return () => {};
  }, [tourPackages]);

  function returnFormattedDate(seconds) {
    const date = new Date(parseInt(seconds * 1000));
    return date.toLocaleDateString();
  }

  const addBasicToCart = (basico) => {
    const { paqueteBasico, nombre, categoria, tipo, precio, imagen } = basico;
    dispatch({
      type: "ADD_CART",
      cartItem: { nombre, categoria, tipo, paqueteBasico, precio, imagen },
    });
  };

  const addPremiumToCart = (premium) => {
    const { paquetePremium, nombre, categoria, tipo, precio, imagen } = premium;
    dispatch({
      type: "ADD_CART",
      cartItem: { nombre, categoria, tipo, paquetePremium, precio, imagen },
    });
  };

  const addVIPToCart = (VIP) => {
    const { nombre, categoria, paqueteVIP, tipo, precio, imagen } = VIP;
    dispatch({
      type: "ADD_CART",
      cartItem: { nombre, categoria, tipo, paqueteVIP, precio, imagen },
    });
  };

  console.log(detallePaquetes);
  return (
    <>
      <Container className="turistic-route">
        {detallePaquetes.map((item) => (
          <div key={item.id} className="route_clasification py-4">
            <Row className="route__title">
              <h1>{item.nombre}</h1>
            </Row>
            <Row>
              <Col className="route__description">
                <p>{`Categoria: ${item.categoria}`}</p>
                <p>{`Descripción del paquete: ${item.descripcionPaquete}`}</p>
                <p>{`Descripción de la ruta: ${item.descripcionRuta}`}</p>
                <p>{`Fecha del evento: ${returnFormattedDate(
                  item.fechaEvento.seconds
                )}`}</p>
                <p>{`Duración del evento: ${item.duracion} dias`}</p>
              </Col>
            </Row>
            <div className="route-place">
              <Row className="py-3">
                <Col>
                  <h3>Paquete de precios</h3>
                </Col>
              </Row>

              <Row className="paquetes__precio py-3">
                <Col className="paquetes__basico">
                  {item.paqueteBasico?.opciones.transporte && (
                    <div>
                      <h5>Tranporte</h5>
                      <p>{item.paqueteBasico.detalleTransporte}</p>
                    </div>
                  )}
                  {item.paqueteBasico?.opciones.alimentacion && (
                    <div>
                      <h5>Alimentacion</h5>
                      <p>{item.paqueteBasico.descripcionAlimentacion}</p>
                    </div>
                  )}
                  {item.paqueteBasico?.opciones.alojamiento && (
                    <div>
                      <h5>Alojamiento</h5>
                      <p>{item.paqueteBasico.lugarHospedaje}</p>
                    </div>
                  )}
                  {item.paqueteBasico?.opciones.guia && (
                    <div>
                      <h5>Guia</h5>
                      <p>{item.paqueteBasico.nombreGuia}</p>
                    </div>
                  )}
                  {item.paqueteBasico?.opciones.extras && (
                    <div>
                      <h5>Prestaciones adicionales</h5>
                      <p>{item.paqueteBasico.extras}</p>
                    </div>
                  )}
                  <div className="precio">
                    <p>
                      <strong>{`$${item.paqueteBasico?.precio}`}</strong>
                    </p>
                    <button
                      onClick={() =>
                        addBasicToCart({
                          nombre: item.nombre,
                          categoria: item.categoria,
                          tipo: "basico",
                          precio: item.paqueteBasico.precio,
                          paqueteBasico: item.paqueteBasico,
                          imagen: item.imagenes[0],
                        })
                      }
                      className="btn btn-dark"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </Col>

                <Col className="paquetes__premium">
                  {item.paquetePremium?.opciones.transporte && (
                    <div>
                      <h5>Tranporte</h5>
                      <p>{item.paquetePremium.detalleTransporte}</p>
                    </div>
                  )}
                  {item.paquetePremium?.opciones.alimentacion && (
                    <div>
                      <h5>Alimentacion</h5>
                      <p>{item.paquetePremium.descripcionAlimentacion}</p>
                    </div>
                  )}
                  {item.paquetePremium?.opciones.alojamiento && (
                    <div>
                      <h5>Alojamiento</h5>
                      <p>{item.paquetePremium.lugarHospedaje}</p>
                    </div>
                  )}
                  {item.paquetePremium?.opciones.guia && (
                    <div>
                      <h5>Guia</h5>
                      <p>{item.paquetePremium.nombreGuia}</p>
                    </div>
                  )}
                  {item.paquetePremium?.opciones.extras && (
                    <div>
                      <h5>Prestaciones adicionales</h5>
                      <p>{item.Premium.extras}</p>
                    </div>
                  )}
                  <div className="precio">
                    <p>
                      <strong>{`$${item.paquetePremium?.precio}`}</strong>
                    </p>
                    <button
                      onClick={() =>
                        addPremiumToCart({
                          nombre: item.nombre,
                          categoria: item.categoria,
                          tipo: "premium",
                          precio: item.paquetePremium.precio,
                          paquetePremium: item.paquetePremium,
                          imagen: item.imagenes[0],
                        })
                      }
                      className="btn btn-dark"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </Col>

                <Col className="paquetes__VIP">
                  {item.paqueteVIP?.opciones.transporte && (
                    <div>
                      <h5>Tranporte</h5>
                      <p>{item.paqueteVIP.detalleTransporte}</p>
                    </div>
                  )}
                  {item.paqueteVIP?.opciones.alimentacion && (
                    <div>
                      <h5>Alimentacion</h5>
                      <p>{item.paqueteVIP.descripcionAlimentacion}</p>
                    </div>
                  )}
                  {item.paqueteVIP?.opciones.alojamiento && (
                    <div>
                      <h5>Alojamiento</h5>
                      <p>{item.paqueteVIP.lugarHospedaje}</p>
                    </div>
                  )}
                  {item.paqueteVIP?.opciones.guia && (
                    <div>
                      <h5>Guia</h5>
                      <p>{item.paqueteVIP.nombreGuia}</p>
                    </div>
                  )}
                  {item.paqueteVIP?.opciones.extras && (
                    <div>
                      <h5>Prestaciones adicionales</h5>
                      <p>{item.paqueteVIP.extras}</p>
                    </div>
                  )}
                  <div className="precio">
                    <p>
                      <strong>{`$${item.paqueteVIP?.precio}`}</strong>
                    </p>
                    <button
                      //onClick={(e) => console.log(item.id)}
                      className="btn btn-dark package__button"
                      onClick={() =>
                        addVIPToCart({
                          nombre: item.nombre,
                          categoria: item.categoria,
                          tipo: "VIP",
                          precio: item.paqueteVIP.precio,
                          paqueteVIP: item.paqueteVIP,
                          imagen: item.imagenes[0],
                        })
                      }
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="place__description">
                  <h3>Catálogo de fotos</h3>
                </Col>
              </Row>

              <Row>
                <Col className="package__images">
                  {item.imagenes.map((img) => (
                    <img key={item.id + Math.random()} src={img} alt="dummy" />
                  ))}
                </Col>
              </Row>
              {/* {item.lugares.map((imagenes) => (
                <div className="package__images">
                  {imagenes.lugar.imagenes.map((imagen) => (
                    <img src={imagen} alt="dummy" />
                  ))}
                </div>
              ))} */}
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}

export default Paquetes;
