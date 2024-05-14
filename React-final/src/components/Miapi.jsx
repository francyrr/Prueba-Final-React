import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Miapi = ({ setMovies, movies }) => {
  const [expandedTextIds, setExpandedTextIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week?language=en-US', {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjc3ODJjYzlmNTNlOGY5OWYwMjZkYzk4ZWUzNmE1ZSIsInN1YiI6IjY2M2ViYWExMTRiYjViZmM0YjExYTM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tkqOJKCbipx9ggJluKLh5xjo6u8Urw70WXt1JjdXtuA'
          }
        });
        setMovies(response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        })));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setMovies]);

  const toggleExpandText = (id) => {
    setExpandedTextIds(prevIds =>
      prevIds.includes(id) ? prevIds.filter(textId => textId !== id) : [...prevIds, id]
    );
  };

  return (
    <div>
      <Row>
        {movies.map(movie => (
          <Col key={movie.id} sm={6} md={4} lg={3}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={movie.poster_path} alt={movie.title} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  {expandedTextIds.includes(movie.id) ? movie.overview : `${movie.overview.substring(0, 100)}...`}
                  <Button variant="link" onClick={() => toggleExpandText(movie.id)}>
                    {expandedTextIds.includes(movie.id) ? 'Ver menos' : 'Ver más'}
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

Miapi.propTypes = {
  setMovies: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired
};