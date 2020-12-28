import React from "react";
import "./ContactUs.css";

function ContactUS() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contacto</h2>
          <p>Contactanos, sera un placer atenderte!</p>
        </div>
      </div>

      <div className="map">
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.762462553496!2d-89.26276848465332!3d13.672202802815429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f632e30d0c0b573%3A0x4cc1f44b289801e9!2sBulevar%20Vijosa!5e0!3m2!1sen!2ssv!4v1599594103278!5m2!1sen!2ssv"
          width="1100"
          height="400"
          style={{ frameBorder: 0, tabIndex: 0 }}
          aria-hidden="false"
        ></iframe>
      </div>

      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <h4>Dirección</h4>
                <p>Boulevar Vijosa, Ciudad Merliot, La Libertad</p>
              </div>

              <div className="open-hours">
                <h4>Horarios:</h4>
                <p>
                  Lunes a Domingo:
                  <br />
                  10:00 AM - 4:00 PM
                </p>
              </div>

              <div className="email">
                <h4>Email:</h4>
                <p>elsalvadortours@gmail.com</p>
              </div>

              <div className="phone">
                <h4>Telefono:</h4>
                <p>7898 5855</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">
            <form>
              <div className="form-row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Nombre"
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-md-6 form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                  <div className="validate"></div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Asunto"
                />
                <div className="validate"></div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="Mesage"
                  rows="8"
                  placeholder="Mensaje"
                ></textarea>
                <div className="validate"></div>
              </div>
              <div className="btn btn-login btn-dark mb-3">Mandar mensaje</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUS;
