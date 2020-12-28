import React, { useEffect } from "react";
import "./App.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/Login";
import Packages from "./components/Packages";
import Package from "./components/Package";
import ShoppingCart from "./components/ShoppingCart";
import User from "./components/User";
import ContactUs from "./components/ContactUs";
import Page404 from "./components/Page404";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvide";
import { db, auth } from "./utils/firebase";
import Register from "./components/Register";
import TuristicRoute from "./components/TuristicRoute";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const loadPlaces = async () =>
      await db.collection("lugares").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            dispatch({
              type: "SET_PLACES",
              places: { id: change.doc.id, ...change.doc.data() },
            });
          }

          return null;
        });
      });

    const loadPackages = async () =>
      await db.collection("paquetes").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            dispatch({
              type: "SET_PACKAGES",
              tourPackages: { id: change.doc.id, ...change.doc.data() },
            });
          }
          if (change.type === "modified") {
            dispatch({
              type: "MODIFY_PACKAGES",
              tourPackages: { id: change.doc.id, ...change.doc.data() },
            });
          }
          return null;
        });
      });

    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        const currentUser = auth.currentUser.email;

        db.collection("users").onSnapshot((snapshot) => {
          snapshot.docs.filter((doc) => {
            if (doc.data().email === currentUser) {
              dispatch({
                type: "SET_USER",
                user: { id: doc.id, ...doc.data() },
              });
            }
            return null;
          });
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    loadPlaces();
    loadPackages();
    return () => {};
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/inicio" component={Home} />
        <Route path="/rutas" component={TuristicRoute} />
        <Route path="/paquetes/:slug" component={Package} />
        <Route path="/paquetes" component={Packages} />
        <Route path="/crearPerfil" component={Register} />
        <Route path="/ingresarPerfil" component={Login} />
        <Route path="/carrito" component={ShoppingCart} />
        <Route path="/contactanos" component={ContactUs} />
        <Route path="/usuario" component={User} />
        <Route path="/admin" component={Admin} />
        <Route component={Page404} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
