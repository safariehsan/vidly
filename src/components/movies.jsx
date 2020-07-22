import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import paginate from "./utils/paginate";
import ListGroup from "./common/listGroup";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
  };
  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }
  handleDelete = (movie) => {
    const result_movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: result_movies });
  };
  handleLike = (movie) => {
    console.log("you like this movie: ", movie);
    const movies = [...this.state.movies];
    const index = movies.findIndex((c) => c._id == movie._id);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    console.log(genre);
  };
  render() {
    const { length: movies_number } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies, genres } = this.state;
    if (movies_number === 0)
      return (
        <div className="container mt-5 text-center">
          <span className="alert alert-danger">No Movie Found!</span>
        </div>
      );
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <main className="container mt-5">
        <div className="row">
          <div className="col-sm-3">
            <div className="text-center">
              <span className="alert alert-info">
                <b>{movies_number}</b> movie(s) in the list
              </span>
            </div>
            <br />
            <ListGroup
              items={genres}
              textProperty="name"
              valueProperty="_id"
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-sm-9">
            <table className="table table-dark mt-5 table-striped table-bordered table-hover table-sm">
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((m) => (
                  <tr key={m._id}>
                    <td>{m.title}</td>
                    <td>{m.genre.name}</td>
                    <td>{m.numberInStock}</td>
                    <td>{m.dailyRentalRate}</td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(m)}
                        className="btn btn-sm btn-danger m-2"
                      >
                        Delete
                      </button>
                      <Like
                        liked={m.liked}
                        onClick={() => this.handleLike(m)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <Pagination
            itemsCount={this.state.movies.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </main>
    );
  }
}
