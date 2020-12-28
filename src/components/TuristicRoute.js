import React, { useEffect, useState } from "react";
import "./TuristicRoute.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useStateValue } from "./../StateProvide";

function TuristicRoute() {
  const [{ tourPackages }, dispatch] = useStateValue();
  const [detalleRutas, setDetallePaquetes] = useState([]);

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

  useEffect(() => {
    const loadPlaces = async () => {
      const detalleRutas = formatData(tourPackages);
      setDetallePaquetes([...detalleRutas]);
    };

    loadPlaces();
    return () => {};
  }, [tourPackages]);

  return (
    <>
      <Container className="turistic-route">
        {detalleRutas.map((item) => (
          <div key={item.id} className="route_clasification py-4">
            <Row className="route__title">
              <h1>{item.ruta}</h1>
            </Row>
            <Row>
              <Col className="route__imgTitle">
                <img src={item.imagen} alt="playa" />
              </Col>
            </Row>
            <Row>
              <Col className="route__description">
                <p>{item.descripcionRuta}</p>
              </Col>
            </Row>
            <div className="route-place">
              <Row className="py-3">
                <Col>
                  <h3>Lugares que pertenecen a la ruta</h3>
                </Col>
              </Row>

              {item.lugares.map((lugarPorRuta) => (
                <div key={Math.random()}>
                  <Row>
                    <Col className="place__description">
                      <h5>{lugarPorRuta.lugar.lugar}</h5>
                      <p>{`Departamento: ${lugarPorRuta.lugar.departamento}`}</p>
                      <p>{`Descripcion: ${lugarPorRuta.lugar.descripcion}`}</p>
                      <p>{`Categoria: ${lugarPorRuta.lugar.categoria}`}</p>
                      <p>{`Punto de interes: ${lugarPorRuta.lugar.interes}`}</p>
                    </Col>
                  </Row>
                  <Row>
                    {lugarPorRuta.lugar.imagenes.map((imagen) => (
                      <Col key={Math.random()} className="route__img">
                        <img src={imagen} alt="dummy" />
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}

export default TuristicRoute;
