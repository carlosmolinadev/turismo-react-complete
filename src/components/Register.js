import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { auth, timestamp, db } from "../utils/firebase";
import { Col, Container, Row } from "react-bootstrap";

function Register() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [edad, setEdad] = useState("");
  const [date, setDate] = useState(new Date());
  const [exErrors, setExErrors] = useState({});

  const handleDateChange = (date) => {
    setDate(date);
    let [, , year] = date.toLocaleDateString().split("/");
    const fechaActual = new Date();
    let [, , currentYear] = fechaActual.toLocaleDateString().split("/");
    parseInt(year, currentYear);
    setEdad(currentYear - year);
  };

  const createUser = handleSubmit((data) => {
    setExErrors({ date: null });

    if (edad < 18) {
      setExErrors({ date: "No se puede crear cuenta si es menor a 18 años" });
      return;
    }

    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          db.collection("users").add({
            nombre: data.nombre,
            apellido: data.apellido,
            usuario: data.usuario,
            edad: edad,
            isAdmin: false,
            email: data.email,
            password: data.password,
            startedAt: timestamp(),
          });
          history.push("/");
        }
      })
      .catch((error) => console.error(error));
  });

  return (
    <>
      <Container fluid>
        <Row className="row">
          <Col md={6} className="image"></Col>
          <Col md={6} className="authUser">
            <form>
              <h2>Crear usuario</h2>
              <div>
                <TextField
                  inputRef={register({ required: "Nombre es requerido" })}
                  style={{ marginTop: 20 }}
                  name="nombre"
                  type="text"
                  label="Nombre"
                  error={errors.nombre && true}
                  helperText={errors.nombre ? errors.nombre.message : null}
                />

                <TextField
                  inputRef={register({ required: "Apellido es requerido" })}
                  style={{ marginTop: 20 }}
                  name="apellido"
                  type="text"
                  label="Apellido"
                  error={errors.apellido && true}
                  helperText={errors.apellido ? errors.apellido.message : null}
                />
              </div>

              <div>
                <TextField
                  inputRef={register({ required: "Usuario es requerido" })}
                  style={{ marginTop: 20 }}
                  name="usuario"
                  type="text"
                  label="Usuario"
                  error={errors.usuario && true}
                  helperText={errors.usuario ? errors.usuario.message : null}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk={true}
                    variant="inline"
                    format="MM/dd/yyyy"
                    style={{ marginTop: 20, width: 200 }}
                    label="Fecha Nacimiento"
                    value={date}
                    onChange={handleDateChange}
                    helperText={exErrors?.date}
                    error={exErrors.date ? true : false}
                  />
                </MuiPickersUtilsProvider>
              </div>

              <div>
                <TextField
                  inputRef={register({
                    required: "Correo Electronico requerido",
                  })}
                  style={{ marginTop: 20 }}
                  name="email"
                  type="text"
                  label="Correo Electronico"
                  fullWidth
                  error={errors.email && true}
                  helperText={errors.email ? errors.email.message : null}
                />

                <TextField
                  inputRef={register({ required: "Contraseña requerida" })}
                  style={{ marginTop: 20 }}
                  name="password"
                  type="password"
                  label="Contraseña"
                  fullWidth
                  error={errors.password && true}
                  helperText={errors.password ? errors.password.message : null}
                />
              </div>

              <button
                type="submit"
                className="signup btn btn-dark btn-block p-3"
                onClick={createUser}
              >
                Crear
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;

/* <FormControl>
                  <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                  <Select
                    native
                    value={age}
                    onChange={handleChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />

                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </Select>
                </FormControl> */
