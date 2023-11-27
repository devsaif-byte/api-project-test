import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Spinner } from "reactstrap";

const KEY = "8db69869";
const MovieDetails = ({ selectedId }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const resp = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await resp.json();
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  return (
    <>
      {isLoading && !movie ? (
        <Spinner />
      ) : (
        <Card className="my-2 text-left shadow-none">
          <img
            alt="Card cap"
            src={poster}
            style={{
              height: 300,
            }}
            top
          />
          <CardBody>
            <CardTitle tag="h5">
              {title} ({year})
            </CardTitle>
            <CardText>
              <ul className="list-group">
                <li className="list-group-item">{released}</li>
                <li className="list-group-item">{runtime}</li>
                <li className="list-group-item">{genre}</li>
                <li className="list-group-item">{imdbRating}</li>
              </ul>
              <section className="p-2">
                <p>{plot}</p>
                <p>{actors}</p>
                <p>{director}</p>
              </section>
            </CardText>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default MovieDetails;
