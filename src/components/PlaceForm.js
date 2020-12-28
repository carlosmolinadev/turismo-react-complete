import React from 'react'

function PlaceForm() {
    return (
        <>
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
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      id="Departamento"
                      label="Departamento"
                      name="departamento"
                      onChange={handleChange}
                      value={place.departamento}
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      id="Categoria"
                      label="Categoria"
                      name="categoria"
                      onChange={handleChange}
                      value={place.categoria}
                    />
                  </Col>
                </Row>

        </>
    )
}

export default PlaceForm
