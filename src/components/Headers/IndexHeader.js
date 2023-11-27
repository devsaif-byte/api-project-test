/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../../views/index-sections/MovieCard";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import MovieDetails from "views/index-sections/MovieDetails";
// core components

const KEY = "8db69869";
function IndexHeader() {
  // let pageHeader = React.createRef();

  // React.useEffect(() => {
  //   if (window.innerWidth > 991) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.scrollY / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //     window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  console.log(movies);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        const data = await resp.json();
        console.log(data.Search);

        if (data.response === "False") throw new Error("Movies not found");
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          // setError(err.message);
        }
      } finally {
      }

      if (query.length < 2) {
        setMovies([]);
        return;
      }
    }
    fetchMovies();
    return () => controller.abort();
  }, [query]);

  const inputEl = useRef(null);
  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        // inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    // Cleanup function for previous search event
    return () => document.addEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <Container>
          <FormGroup color="white">
            <Input
              className="form-control-plaintext bg-light mb-5"
              placeholder="Search movie"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></Input>
          </FormGroup>

          <Row className="" style={{ height: "100%" }} movies={movies}>
            <Col className="h-100">
              <div
                className="shadow-sm"
                style={{
                  overflow: "auto",
                  position: "relative",
                  minHeight: "90%",
                  maxHeight: "90%",
                  color: "black",
                  opacity: "80%",
                }}
              >
                <h3 className="text-danger bold bg-white">
                  Select and view more..
                </h3>

                {isLoading ? (
                  <Spinner color="info" size="md" />
                ) : (
                  movies.map((movie) => (
                    <MovieCard
                      movie={movie}
                      onSelectMovie={handleSelectMovie}
                      key={movie.imdbID}
                    ></MovieCard>
                  ))
                )}
              </div>
            </Col>
            <Col className="h-100">
              <div
                // onCloseMovie={handleCloseMovie}
                className="shadow-sm "
                style={{
                  overflow: "auto",
                  position: "relative",
                  minHeight: "90%",
                  maxHeight: "90%",
                  color: "black",
                  opacity: "80%",
                }}
              >
                <Button
                  className="position-absolute"
                  style={{ top: 0, left: 0 }}
                  color="danger"
                  onClick={handleCloseMovie}
                >
                  &larr;
                </Button>
                <h3 className="text-danger bold bg-white">Details.</h3>
                {selectedId ? <MovieDetails selectedId={selectedId} /> : ""}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
