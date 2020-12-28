import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import {
  Container,
  Button,
  Row,
  Col,
  Tabs,
  Tab,
  Jumbotron,
} from "react-bootstrap";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { db, storage, timestamp } from "../utils/firebase";
import "./Admin.css";
import ImgUpload from "../common/ImgUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateValue } from "./../StateProvide";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import slugify from "react-slugify";

function Admin() {
  //MULTIPLE SELECTION PROPERTIES
  const ITEM_HEIGHT = 50;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
      },
    },
  };
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  //END MULTIPLE SELECTION PROPERTIES

  //Reducer state
  const [{ places, tourPackages }, dispatch] = useStateValue();
  const [key, setKey] = useState("home");

  //State variables
  //const { register, handleSubmit, errors } = useForm();
  const [arrImages, setArrImages] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [exErrors, setExErrors] = useState({});
  const [placesToAdd, setPlacesToAdd] = useState([]);
  const [precioPaquete, setPrecioPaquete] = useState("basico");
  const [place, setLugar] = useState({
    lugar: "",
    departamento: "",
    categoria: "",
    interes: "",
    descripcion: "",
    imagenes: [],
  });
  const [tempPaquete, setTempPaquete] = useState("");
  const [paqueteBasico, setPaqueteBasico] = useState({
    opciones: {
      transporte: true,
      alojamiento: false,
      alimentacion: false,
      guia: false,
      extras: false,
    },
    lugarHospedaje: "",
    ubicacionHospedaje: "",
    descripcionAlimentacion: "",
    detalleTransporte: "",
    correoGuia: "",
    nombreGuia: "",
    precio: "",
    extras: "",
  });
  const [paquetePremium, setPaquetePremium] = useState({
    opciones: {
      transporte: true,
      alojamiento: false,
      alimentacion: false,
      guia: false,
      extras: false,
    },
    lugarHospedaje: "",
    ubicacionHospedaje: "",
    descripcionAlimentacion: "",
    detalleTransporte: "",
    correoGuia: "",
    nombreGuia: "",
    precio: "",
    extras: "",
  });
  const [paqueteVIP, setPaqueteVIP] = useState({
    opciones: {
      transporte: true,
      alojamiento: false,
      alimentacion: false,
      guia: false,
      extras: false,
    },
    lugarHospedaje: "",
    ubicacionHospedaje: "",
    descripcionAlimentacion: "",
    detalleTransporte: "",
    correoGuia: "",
    nombreGuia: "",
    precio: "",
    extras: "",
  });
  const [paquete, setPaquete] = useState({
    nombre: "",
    slug: "",
    categoria: "",
    descripcionPaquete: "",
    ruta: "",
    descripcionRuta: "",
    fechaEvento: new Date(),
    fechaFinal: new Date(),
    duracion: "",
    agenda: "",
  });

  //To calculate duration of the package
  useEffect(() => {
    const calculateDuration = () => {
      const result = Math.round(
        (paquete.fechaFinal.getTime() - paquete.fechaEvento.getTime()) /
          (1000 * 3600 * 24)
      );
      setPaquete(() => ({ ...paquete, duracion: result }));
    };
    calculateDuration();
    return () => {};
    /* eslint-disable */
  }, [paquete.fechaEvento, paquete.fechaFinal]);
  /* eslint-enable */

  useEffect(() => {
    if (!tourPackages) {
      return null;
    }
  }, [tourPackages]);

  useEffect(() => {
    const slug = slugify(paquete.ruta);
    setPaquete({ ...paquete, slug });
  }, [paquete.ruta]);
  //Other variables
  const lugares = places.map((item) => item.place.lugar);

  //Date Picker function
  const handleDateChange = (iniDate) => {
    setPaquete({ ...paquete, fechaEvento: iniDate });
  };
  const handleFinalDateChange = (finDate) => {
    setPaquete({ ...paquete, fechaFinal: finDate });
  };

  //Package multiSite selector
  const handleMultipleChange = (e) => {
    const tempPlaces = e.target.value;
    const placesToAdd = [];

    places.filter((plac) => {
      if (tempPlaces.includes(plac.place.lugar)) {
        const lugar = plac.place;
        placesToAdd.push({ lugar });
      }

      return null;
    });

    setPlacesToAdd(tempPlaces);
    setPaquete({ ...paquete, lugares: placesToAdd });
  };

  //Package options selector in price tab
  const handleBasicPackage = (e) => {
    const { name, checked } = e.target;

    setPaqueteBasico({
      ...paqueteBasico,
      opciones: {
        ...paqueteBasico.opciones,
        [name]: checked,
      },
    });
  };
  const handleChangeBasic = (e) => {
    const { name, value } = e.target;
    setPaqueteBasico({
      ...paqueteBasico,
      [name]: value,
    });
  };

  const handlePremiumPackage = (e) => {
    const { name, checked } = e.target;

    setPaquetePremium({
      ...paquetePremium,
      opciones: {
        ...paquetePremium.opciones,
        [name]: checked,
      },
    });
  };
  const handleChangePremium = (e) => {
    const { name, value } = e.target;
    setPaquetePremium({
      ...paquetePremium,
      [name]: value,
    });
  };

  const handleVIPPackage = (e) => {
    const { name, checked } = e.target;

    setPaqueteVIP({
      ...paqueteVIP,
      opciones: {
        ...paqueteVIP.opciones,
        [name]: checked,
      },
    });
  };
  const handleChangeVIP = (e) => {
    const { name, value } = e.target;
    setPaqueteVIP({
      ...paqueteVIP,
      [name]: value,
    });
  };

  const handleChangeSelection = (e) => {
    setTempPaquete(e.target.value);
  };
  const handleRadioChange = (e) => {
    setPrecioPaquete(e.target.value);
  };
  //Toast notifications
  const successNotify = () =>
    toast.success("Registro se ha ingresado correctamente!");
  const failureEqualName = () =>
    toast.error("El lugar ya existe en la base de datos!");
  //Ends Toast notifications

  //DB functions
  const addPackagePlan = (id) => {
    if (precioPaquete === "basico") {
      db.collection("paquetes").doc(id).set({ paqueteBasico }, { merge: true });
    }
    if (precioPaquete === "premium") {
      db.collection("paquetes")
        .doc(id)
        .set({ paquetePremium }, { merge: true });
    }
    if (precioPaquete === "vip") {
      db.collection("paquetes").doc(id).set({ paqueteVIP }, { merge: true });
    }
  };

  const updatePlace = (lugar) => {
    const isIdEqual = places.filter((place) => place.lugar === lugar);
    if (isIdEqual) {
      failureEqualName();
      return;
    }
  };

  //Reset Price Tab function
  function resetPriceForm() {
    setPaqueteBasico({
      opciones: {
        transporte: true,
        alojamiento: false,
        alimentacion: false,
        guia: false,
        extras: false,
      },
      lugarHospedaje: "",
      ubicacionHospedaje: "",
      descripcionAlimentacion: "",
      detalleTransporte: "",
      correoGuia: "",
      nombreGuia: "",
      precio: "",
      extras: "",
    });
    setPaquetePremium({
      opciones: {
        transporte: true,
        alojamiento: false,
        alimentacion: false,
        guia: false,
        extras: false,
      },
      lugarHospedaje: "",
      ubicacionHospedaje: "",
      descripcionAlimentacion: "",
      detalleTransporte: "",
      correoGuia: "",
      nombreGuia: "",
      precio: "",
      extras: "",
    });
    setPaqueteVIP({
      opciones: {
        transporte: true,
        alojamiento: false,
        alimentacion: false,
        guia: false,
        extras: false,
      },
      lugarHospedaje: "",
      ubicacionHospedaje: "",
      descripcionAlimentacion: "",
      detalleTransporte: "",
      correoGuia: "",
      nombreGuia: "",
      precio: "",
      extras: "",
    });
  }

  /*UPLOAD FUNCTION*/
  const handleUploadPlace = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const newList = arrImages.concat(url);
            setArrImages(newList);
            setLugar({
              ...place,
              imagenes: { ...place.imagenes, imagenes: newList },
            });
            setImage(null);
            setProgress(0);
          });
      }
    );
  };
  /*ENDS UPLOAD FUNCTION*/

  /*HANDLE INPUTS*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLugar({ ...place, [name]: value });
  };

  const handleChangePaq = (e) => {
    const { name, value } = e.target;
    setPaquete({ ...paquete, [name]: value });
  };
  //Validates the places form
  const formIsValid = () => {
    //Create errors object and assigns the errors according the object that is passed
    const errors = {};
    const { lugar, departamento, categoria, interes } = place;
    if (lugar === "") errors.lugar = "Lugar es requerido";
    if (departamento === "") errors.departamento = "Departamento es requerido";
    if (categoria === "") errors.categoria = "Categoria es requerido";
    if (interes === "") errors.interes = "Punto de interes es requerido";
    setExErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /*STARTS PLACE FORM*/
  const handleUploadEvent = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const submitPlace = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;

    // const samePlace = places.filter((item) => item.place.lugar === place.lugar);

    // if (samePlace) {
    //   failureEqualName();
    //   return;
    // }
    db.collection("lugares").add({
      place,
      fechaCreacion: timestamp(),
    });
    setLugar({
      lugar: "",
      departamento: "",
      categoria: "",
      interes: "",
      descripcion: "",
    });
    setArrImages([]);
    successNotify();
  };
  /*ENDS PLACE FORM*/

  /*START PACKAGE FORM FUNCTIONS*/
  const submitPackage = (e) => {
    e.preventDefault();

    const paqueteRef = db.collection("paquetes").doc();
    paqueteRef.set({ paquete, fechaCreacion: timestamp() });
    successNotify();
  };
  /*END PACKAGE FORM FUNCTIONS*/

  /*START PRICES FORM FUNCTIONS*/
  const submitPrices = (e) => {
    e.preventDefault();

    addPackagePlan(tempPaquete);
    successNotify();
    resetPriceForm();
  };
  /*END PRICES FORM FUNCTIONS*/
  return (
    <>
      <Jumbotron className="jumbotron__admin">
        <h1>Administrador</h1>
      </Jumbotron>
      <Container className="container">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="home" title="Lugares">
            <div className="tab__inside">
              <h3>INGRESAR LUGAR</h3>

              <form id="placeForm">
                <Row className="my-3">
                  <Col md={4}>
                    <TextField
                      id="lugar"
                      label="Lugar"
                      name="lugar"
                      onChange={handleChange}
                      value={place.lugar}
                      helperText={exErrors.lugar}
                      error={exErrors.lugar ? true : false}
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      id="departamento"
                      label="Departamento"
                      name="departamento"
                      onChange={handleChange}
                      value={place.departamento}
                      helperText={exErrors.departamento}
                      error={exErrors.departamento ? true : false}
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      id="categoria"
                      label="Categoria"
                      name="categoria"
                      onChange={handleChange}
                      value={place.categoria}
                      helperText={exErrors.categoria}
                      error={exErrors.categoria ? true : false}
                    />
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col md={4}>
                    <TextField
                      id="puntoDeInteres"
                      label="Punto de interes"
                      name="interes"
                      onChange={handleChange}
                      value={place.interes}
                      helperText={exErrors.interes}
                      error={exErrors.interes ? true : false}
                    />
                  </Col>
                  <Col md={8}>
                    <TextField
                      fullWidth
                      id="descripcion"
                      label="Descripción"
                      name="descripcion"
                      multiline
                      rowsMax={4}
                      onChange={handleChange}
                      value={place.descripcion}
                    />
                  </Col>
                </Row>

                <Row className="my-4">
                  <Col>
                    <ImgUpload
                      disabled={!image ? true : false}
                      progress={progress}
                      onClick={handleUploadPlace}
                      onChange={handleUploadEvent}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {arrImages.map((image) => (
                      <div className="mb-2" key={Math.random()}>
                        <h6>Imagen cargada</h6>
                        <img src={image} alt="img" width="200px" />
                      </div>
                    ))}
                  </Col>
                </Row>

                <Button className="my-3" variant="dark" onClick={submitPlace}>
                  Ingresar lugar
                </Button>
                <ToastContainer autoClose={1500} />
              </form>
            </div>
          </Tab>

          <Tab eventKey="packages" title="Paquetes turisticos">
            <div className="tab__inside">
              <h3>INGRESAR PAQUETE TURISTICO</h3>
              <form action="">
                <Row className="my-3">
                  <Col md={3}>
                    <TextField
                      label="Nombre del paquete"
                      name="nombre"
                      onChange={handleChangePaq}
                      value={paquete.nombre}
                    />
                  </Col>
                  <Col md={9}>
                    <TextField
                      label="Descripción del paquete"
                      name="descripcionPaquete"
                      onChange={handleChangePaq}
                      value={paquete.descripcionPaquete}
                      fullWidth
                      multiline
                    />
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col md={3}>
                    <TextField
                      label="Nombre de la ruta"
                      name="ruta"
                      onChange={handleChangePaq}
                      value={paquete.ruta}
                    />
                  </Col>

                  <Col md={3}>
                    <TextField
                      label="Categoria"
                      name="categoria"
                      onChange={handleChangePaq}
                      value={paquete.categoria}
                    />
                  </Col>

                  <Col md={6}>
                    <TextField
                      label="Descripción de la ruta"
                      name="descripcionRuta"
                      onChange={handleChangePaq}
                      value={paquete.descripcionRuta}
                      fullWidth
                      multiline
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="multiple">
                    <FormControl className={classes.formControl}>
                      <InputLabel>Seleccionar lugares de la ruta</InputLabel>
                      <Select
                        multiple
                        value={placesToAdd}
                        onChange={handleMultipleChange}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                        style={{ width: 400, marginLeft: "-10px" }}
                      >
                        {lugares.map((item) => (
                          <MenuItem key={item} value={item}>
                            <Checkbox
                              checked={placesToAdd.indexOf(item) > -1}
                            />
                            <ListItemText primary={item} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        format="MM/dd/yyyy"
                        style={{ marginTop: 20, width: 200 }}
                        label="Fecha inicio del evento"
                        value={paquete.fechaEvento}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Col>

                  <Col>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        format="MM/dd/yyyy"
                        style={{ marginTop: 20, width: 200 }}
                        label="Fecha final del evento"
                        value={paquete.fechaFinal}
                        onChange={handleFinalDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Col>
                </Row>
                <Button className="my-3" variant="dark" onClick={submitPackage}>
                  Ingresar lugar
                </Button>
                <ToastContainer autoClose={1500} />
              </form>
            </div>
          </Tab>

          <Tab eventKey="precios" title="Gestion paquete de precios">
            <div className="tab__inside">
              <h3>GESTIONAR PRECIOS</h3>
              <form action="">
                <Row className="py-3">
                  <Col>
                    <FormControl>
                      <InputLabel id="demo-simple-select-helper-label">
                        Seleccionar para agregar paquete de precio
                      </InputLabel>
                      <Select
                        style={{ width: 500 }}
                        value={tempPaquete}
                        onChange={handleChangeSelection}
                      >
                        {tourPackages.map((i) => (
                          <MenuItem
                            key={i.id}
                            value={i?.id}
                          >{`Paquete: ${i.paquete?.nombre}, Ruta: ${i.paquete?.ruta}`}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Categoria de precios
                      </FormLabel>
                      <RadioGroup
                        name="precioPaquete"
                        value={precioPaquete}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="basico"
                          control={<Radio />}
                          label="Basico"
                        />
                        <FormControlLabel
                          value="premium"
                          control={<Radio />}
                          label="Premium"
                        />
                        <FormControlLabel
                          value="vip"
                          control={<Radio />}
                          label="VIP"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {precioPaquete === "basico" ? (
                      <Row className="my-3">
                        <Col>
                          <FormLabel component="legend">
                            Elegir caracteristicas del paquete
                          </FormLabel>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteBasico.opciones.transporte}
                                  onChange={handleBasicPackage}
                                  name="transporte"
                                />
                              }
                              label="Transporte"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteBasico.opciones.alimentacion}
                                  onChange={handleBasicPackage}
                                  name="alimentacion"
                                />
                              }
                              label="Alimentación"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteBasico.opciones.alojamiento}
                                  onChange={handleBasicPackage}
                                  name="alojamiento"
                                />
                              }
                              label="Alojamiento"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteBasico.opciones.guia}
                                  onChange={handleBasicPackage}
                                  name="guia"
                                />
                              }
                              label="Guia turistico"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteBasico.opciones.extras}
                                  onChange={handleBasicPackage}
                                  name="extras"
                                />
                              }
                              label="Extras"
                            />
                          </FormGroup>

                          {paqueteBasico.opciones.transporte && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  label="Detalles del transporte"
                                  name="detalleTransporte"
                                  onChange={handleChangeBasic}
                                  value={paqueteBasico.detalleTransporte}
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          {paqueteBasico.opciones.alimentacion && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  name="descripcionAlimentacion"
                                  onChange={handleChangeBasic}
                                  value={paqueteBasico.descripcionAlimentacion}
                                  fullWidth
                                  label="Detalles de la alimentación"
                                />
                              </Col>
                            </Row>
                          )}

                          {paqueteBasico.opciones.alojamiento && (
                            <Row className="py-2">
                              <Col md={4}>
                                <TextField
                                  name="lugarHospedaje"
                                  onChange={handleChangeBasic}
                                  value={paqueteBasico.lugarHospedaje}
                                  label="Nombre del hospedaje"
                                />
                              </Col>
                              <Col>
                                <TextField
                                  name="ubicacionHospedaje"
                                  onChange={handleChangeBasic}
                                  value={paqueteBasico.ubicacionHospedaje}
                                  label="Ubicación del hospedaje"
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          {paqueteBasico.opciones.guia && (
                            <Row className="py-2">
                              <Col md={4}>
                                <TextField
                                  name="nombreGuia"
                                  onChange={handleChangeBasic}
                                  value={paqueteBasico.nombreGuia}
                                  label="Nombre del guia"
                                />
                              </Col>
                              <Col>
                                <TextField
                                  name="correoGuia"
                                  onChange={handleChangeBasic}
                                  value={paqueteBasico.correoGuia}
                                  label="Correo del guia"
                                />
                              </Col>
                            </Row>
                          )}

                          {paqueteBasico.opciones.extras && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  name="extras"
                                  onChange={handleChangeBasic}
                                  value={paqueteBasico.extras}
                                  label="Prestaciones adicionales del paquete"
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          <Row className="py-4">
                            <Col>
                              <TextField
                                name="precio"
                                onChange={handleChangeBasic}
                                value={paqueteBasico.precio}
                                label="Precio del paquete"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) : null}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {precioPaquete === "premium" ? (
                      <Row className="my-3">
                        <Col>
                          <FormLabel component="legend">
                            Elegir caracteristicas del paquete
                          </FormLabel>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paquetePremium.opciones.transporte}
                                  onChange={handlePremiumPackage}
                                  name="transporte"
                                />
                              }
                              label="Transporte"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paquetePremium.opciones.alimentacion}
                                  onChange={handlePremiumPackage}
                                  name="alimentacion"
                                />
                              }
                              label="Alimentación"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paquetePremium.opciones.alojamiento}
                                  onChange={handlePremiumPackage}
                                  name="alojamiento"
                                />
                              }
                              label="Alojamiento"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paquetePremium.opciones.guia}
                                  onChange={handlePremiumPackage}
                                  name="guia"
                                />
                              }
                              label="Guia turistico"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paquetePremium.opciones.extras}
                                  onChange={handlePremiumPackage}
                                  name="extras"
                                />
                              }
                              label="Extras"
                            />
                          </FormGroup>

                          {paquetePremium.opciones.transporte && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  label="Detalles del transporte"
                                  name="detalleTransporte"
                                  onChange={handleChangePremium}
                                  value={paquetePremium.detalleTransporte}
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          {paquetePremium.opciones.alimentacion && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  name="descripcionAlimentacion"
                                  onChange={handleChangePremium}
                                  value={paquetePremium.descripcionAlimentacion}
                                  fullWidth
                                  label="Detalles de la alimentación"
                                />
                              </Col>
                            </Row>
                          )}

                          {paquetePremium.opciones.alojamiento && (
                            <Row className="py-2">
                              <Col md={4}>
                                <TextField
                                  name="lugarHospedaje"
                                  onChange={handleChangePremium}
                                  value={paquetePremium.lugarHospedaje}
                                  label="Nombre del hospedaje"
                                />
                              </Col>
                              <Col>
                                <TextField
                                  name="ubicacionHospedaje"
                                  onChange={handleChangePremium}
                                  value={paquetePremium.ubicacionHospedaje}
                                  label="Ubicación del hospedaje"
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          {paquetePremium.opciones.guia && (
                            <Row className="py-2">
                              <Col md={4}>
                                <TextField
                                  name="nombreGuia"
                                  onChange={handleChangePremium}
                                  value={paquetePremium.nombreGuia}
                                  label="Nombre del guia"
                                />
                              </Col>
                              <Col>
                                <TextField
                                  name="correoGuia"
                                  onChange={handleChangePremium}
                                  value={paquetePremium.correoGuia}
                                  label="Correo del guia"
                                />
                              </Col>
                            </Row>
                          )}

                          {paquetePremium.opciones.extras && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  name="extras"
                                  onChange={handleChangePremium}
                                  value={paquetePremium.extras}
                                  label="Prestaciones adicionales del paquete"
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          <Row className="py-4">
                            <Col>
                              <TextField
                                name="precio"
                                onChange={handleChangePremium}
                                value={paquetePremium.precio}
                                label="Precio del paquete"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) : null}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {precioPaquete === "vip" ? (
                      <Row className="my-3">
                        <Col>
                          <FormLabel component="legend">
                            Elegir caracteristicas del paquete
                          </FormLabel>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteVIP.opciones.transporte}
                                  onChange={handleVIPPackage}
                                  name="transporte"
                                />
                              }
                              label="Transporte"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteVIP.opciones.alimentacion}
                                  onChange={handleVIPPackage}
                                  name="alimentacion"
                                />
                              }
                              label="Alimentación"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteVIP.opciones.alojamiento}
                                  onChange={handleVIPPackage}
                                  name="alojamiento"
                                />
                              }
                              label="Alojamiento"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteVIP.opciones.guia}
                                  onChange={handleVIPPackage}
                                  name="guia"
                                />
                              }
                              label="Guia turistico"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={paqueteVIP.opciones.extras}
                                  onChange={handleVIPPackage}
                                  name="extras"
                                />
                              }
                              label="Extras"
                            />
                          </FormGroup>

                          {paqueteVIP.opciones.transporte && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  label="Detalles del transporte"
                                  name="detalleTransporte"
                                  onChange={handleChangeVIP}
                                  value={paqueteVIP.detalleTransporte}
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          {paqueteVIP.opciones.alimentacion && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  name="descripcionAlimentacion"
                                  onChange={handleChangeVIP}
                                  value={paqueteVIP.descripcionAlimentacion}
                                  fullWidth
                                  label="Detalles de la alimentación"
                                />
                              </Col>
                            </Row>
                          )}

                          {paqueteVIP.opciones.alojamiento && (
                            <Row className="py-2">
                              <Col md={4}>
                                <TextField
                                  name="lugarHospedaje"
                                  onChange={handleChangeVIP}
                                  value={paqueteVIP.lugarHospedaje}
                                  label="Nombre del hospedaje"
                                />
                              </Col>
                              <Col>
                                <TextField
                                  name="ubicacionHospedaje"
                                  onChange={handleChangeVIP}
                                  value={paqueteVIP.ubicacionHospedaje}
                                  label="Ubicación del hospedaje"
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          {paqueteVIP.opciones.guia && (
                            <Row className="py-2">
                              <Col md={4}>
                                <TextField
                                  name="nombreGuia"
                                  onChange={handleChangeVIP}
                                  value={paqueteVIP.nombreGuia}
                                  label="Nombre del guia"
                                />
                              </Col>
                              <Col>
                                <TextField
                                  name="correoGuia"
                                  onChange={handleChangeVIP}
                                  value={paqueteVIP.correoGuia}
                                  label="Correo del guia"
                                />
                              </Col>
                            </Row>
                          )}

                          {paqueteVIP.opciones.extras && (
                            <Row className="py-2">
                              <Col>
                                <TextField
                                  name="extras"
                                  onChange={handleChangeVIP}
                                  value={paqueteVIP.extras}
                                  label="Prestaciones adicionales del paquete"
                                  fullWidth
                                />
                              </Col>
                            </Row>
                          )}

                          <Row className="py-4">
                            <Col>
                              <TextField
                                name="precio"
                                onChange={handleChangeVIP}
                                value={paqueteVIP.precio}
                                label="Precio del paquete"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) : null}
                  </Col>
                </Row>

                <Button className="my-3" variant="dark" onClick={submitPrices}>
                  Ingresar paquete de precios
                </Button>
                <ToastContainer autoClose={1500} />
              </form>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default Admin;

//ONE TO ONE RELATION
// const routeRef = db.collection("routes").doc();
// routeRef.set({ route, fechaCreacion: timestamp });
//routeRef.set({ matched }, { merge: true });
//MANY TO ONE RELATION
// const routeManyToOne = db
//   .collection("routes")
//   .doc("pital")
//   .collection("lugares");
// routeManyToOne.add({ matched });
//
// db.collection("routes")
//   .where("categoria", "==", "Gastronomia")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => console.log(doc.data()));
//   });
// db.collection("lugares")
//   .orderBy("place.descripcion")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => console.log(doc.data()));
//   });
//set the match to route.lugares

//GET DATA FROM DB
// db.collection("lugares").onSnapshot((snapshot) => {
//   snapshot.docs.map((doc) => {
//     return dispatch({
//       type: "SET_PLACES",
//       places: { id: doc.id, ...doc.data() },
//     });
//   });
// });
//********************************/
// db.collection("lugares")
//   .orderBy("fechaCreacion", "desc")
//   .get()
//   .then((snapshot) =>
//     snapshot.docs.forEach((doc) => {
//       console.log(doc.data());
//     })
//   );

// IF IMG IS UPLOADED ASYNC
// const onFileChange = async (e) => {
//   e.preventDefault();
//   const file = e.target.files[0];
//   const storageRef = storage.storage().ref();
//   const fileRef = storageRef.child(file.name);
//   await fileRef.put(file);
//   setFileURL(await fileRef.getDownloadURL());
// };

// MATERIAL OPTION USE
// const [age, setAge] = React.useState("");

// const handleChange1 = (event) => {
//   setAge(event.target.value);
// };

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));
// const classes = useStyles();

/* <FormControl className={classes.formControl}>
                    <InputLabel>Age</InputLabel>
                    <Select value={age} onChange={handleChange1}>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl> */

//DB FETCH DATA ASYNC
// const placesData = await db.collection("lugares").get();
// const variables = placesData.docs.map((doc) => {
//   return doc.data();
// });

//FETCH USING FOREACTH
// db.collection("lugares").onSnapshot((snapshot) => {
//   const collection = [];
//   snapshot.forEach((doc) => {
//     collection.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(collection);
// });

//USE EFFECT
// useEffect(() => {
//   let unsubscribe = () =>
//     db.collection("lugares").onSnapshot((snapshot) => {
//       snapshot.docs.map((doc) => {
//         if (places.length === 0) {
//           return dispatch({
//             type: "SET_PLACES",
//             places: { id: doc.id, ...doc.data() },
//           });
//         }
//       });
//     });
//   unsubscribe();

// const loadPlaces = () => {
//   if (places.length === 0) {
//     db.collection("lugares")
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           dispatch({
//             type: "SET_PLACES",
//             places: { id: doc.id, ...doc.data() },
//           });
//         });
//       });
//   }
// };
