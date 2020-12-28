import React from "react";
import { TextField } from "@material-ui/core";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../utils/firebase";
import { Col, Container, Row } from "react-bootstrap";

function Login() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const signIn = handleSubmit((data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => alert(error));
  });

  return (
    <>
      <Container fluid>
        <Row className="row">
          <Col md={6} className="image"></Col>
          <Col md={6} className="authUser">
            <form>
              <h2>Bienvenid@</h2>
              <TextField
                inputRef={register({ required: "Campo obligatorio" })}
                style={{ marginTop: 20 }}
                name="email"
                type="text"
                label="Correo Electronico"
                fullWidth
                error={errors.email && true}
                helperText={errors.email ? errors.email.message : null}
              />

              <TextField
                inputRef={register({ required: "Campo obligatorio" })}
                style={{ marginTop: 20 }}
                name="password"
                type="password"
                label="Contraseña"
                fullWidth
                error={errors.password && true}
                helperText={errors.password ? errors.password.message : null}
              />

              <button
                type="submit"
                className="signup btn btn-dark btn-block p-3"
                onClick={signIn}
              >
                Ingresar al perfil
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;

//------------------FUNCTIONS

//Filter from reactApi
// const usuario = state.filter((user) => {
//   if (user.name === "Benedicto") {
//     return user;
//   }
//   return null;
// });

/*name: "Carlos",
  lastName: "Molina",
  email: "carlosmm_89@hotmail.com",
  password: "WWOOTSxx-55sspxhjahx15",
  isAdmin: true,*/

// const loginTo = () => {
//   authentication();
//   dispatch({
//     type: "SET_USER",
//     user: { name: "Jorge", direccion: "Repto santa alegria" },
//   });
// };

// const sendUser = () => {
//   db.collection("user")
//     .add({
//       user,
//     })
//     .then(console.log("Usuario agregado"))
//     .catch((e) => console.log(e));
// };

/* <Controller
                as={<TextField />}
                control={control}
                style={{ marginTop: 20 }}
                id="email"
                type="text"
                label="Correo Electronico"
                name="email"
                fullWidth
                defaultValue={""}
                inputRef={register({ required: "required" })}
                error={!errors.email && false}
                helperText={errors.email.message}
              ></Controller> */

// const validationSchema = Yup.object({
//   email: Yup.string().required("Required"),
//   password: Yup.string().required("Required"),
// });
