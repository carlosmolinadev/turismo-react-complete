import React, { useEffect, useRef } from "react";
import { useStateValue } from "../StateProvide";
import { getPackageTotal } from "../reducers/reducer";
import { useHistory } from "react-router-dom";

function Paypal() {
  const paypal = useRef();
  const [{ cart }, dispatch] = useStateValue();
  const history = useHistory();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Paquete turistico",
                amount: {
                  currency_code: "USD",
                  value: getPackageTotal(cart),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

          console.log(order);
          dispatch({
            type: "EMPTY_CART",
          });
          history.push("/");
        },
        onError: (err) => console.log(err),
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

export default Paypal;
