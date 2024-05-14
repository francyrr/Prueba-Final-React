import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Buscador = ({ setSearchTerm, setSortOrder, searchTerm, displayedMovies }) => {
  return (
    <>
      <div className="row">
        <div className="col-8">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
            <Form.Control
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="search"
              placeholder="Search movie title here ..."
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <div className="col-4">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort Movies</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </Form.Select>
        </div>
      </div>
      {displayedMovies.length === 0 && searchTerm && <p className='not-found'>No Results</p>}
    </>
  );
};

Buscador.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  displayedMovies: PropTypes.array.isRequired,
};

export default Buscador;