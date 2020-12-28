import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { useStateValue } from "../StateProvide";
import { getPackageTotal } from "../reducers/reducer";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Button } from "react-bootstrap";
import Paypal from "./Paypal";

function ShoppingCart() {
  const [{ cart }, dispatch] = useStateValue();

  const paymentCash = () => {
    dispatch({
      type: "EMPTY_CART",
    });
  };

  return (
    <div className="pb-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 bg-light">
                      <div className="p-2 px-3 text-uppercase">Paquete</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Precio</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Tipo</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={Math.random()}>
                      <th scope="row" className="border-0">
                        <div className="p-2">
                          <img
                            src={item.imagen}
                            alt="viaje-turismo"
                            width="200px"
                            className="img-fluid rounded shadow-sm"
                          />
                          <div className="ml-3 d-inline-block align-middle">
                            <h5 className="mb-0">{item.nombre}</h5>
                            <span className="text-muted font-weight-normal font-italic d-block">
                              Categoria: {item.categoria}
                            </span>
                          </div>
                        </div>
                      </th>
                      <td className="border-0 align-middle">
                        <strong>{`$${item.precio}`}</strong>
                      </td>
                      <td className="border-0 align-middle">
                        <strong>{item.tipo.toUpperCase()}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row py-5 p-4 bg-white rounded shadow-sm">
          <div className="col-8">
            <div className="bg-light px-4 py-3 text-uppercase font-weight-bold">
              Detalles de la compra{" "}
            </div>
            <div className="p-4">
              <p className="font-italic mb-4">
                El detalle de los paquetes tambien puede ser visto desde su
                perfil
              </p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Subtotal de la orden</strong>
                  <strong>${getPackageTotal(cart)}</strong>
                </li>

                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Impuestos de hotel</strong>
                  <strong>$0.00</strong>
                </li>
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Total</strong>
                  <h5 className="font-weight-bold">${getPackageTotal(cart)}</h5>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-4" style={{ marginTop: "140px" }}>
            <Button
              onClick={paymentCash}
              className="btn btn-dark btn-block"
              style={{
                padding: "10px",
                marginBottom: "15px",
                fontSize: "18px",
              }}
            >
              Pago en efectivo
            </Button>
            <Paypal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;

/* <td className="border-0 align-middle">
                        <IconButton
                          onClick={() => setCounterPeople(counterPeople - 1)}
                          disabled={counterPeople === 1 ? true : false}
                        >
                          <RemoveIcon></RemoveIcon>
                        </IconButton>
                        {counterPeople}
                        <IconButton
                          onClick={() => setCounterPeople(counterPeople + 1)}
                        >
                          <AddIcon></AddIcon>
                        </IconButton>
                      </td> */
