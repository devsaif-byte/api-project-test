import React from "react";
// reactstrap components
import { Card, CardImg, CardBody, CardText, Row, Col } from "reactstrap";
// core components
function MovieCard({ movie, onSelectMovie }) {
  const { Poster, Title, Year } = movie;
  console.log(movie);
  return (
    <>
      <Card
        color="dark"
        className="shadow-none text-light"
        onClick={() => {
          onSelectMovie(movie.imdbID);
          console.log(movie.imdbID);
        }}
      >
        <Row>
          <Col style={{ maxHeight: "10%", maxWidth: "200px" }}>
            <CardImg
              alt=""
              src={Poster}
              // data-src="holder.js/100px180/?text=Image cap"
              left
              className="h-100"
            ></CardImg>
          </Col>
          <Col>
            <CardBody>
              <CardText className="text-left bold">
                <p>Title: {Title}</p>
                <p>Release Year: {Year}</p>
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default MovieCard;
