import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import paginate from "./utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }
  handleDelete = (movie) => {
    const result_movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: result_movies });
  };
  handleLike = (movie) => {
    //console.log("you like this movie: ", movie);
    const movies = [...this.state.movies];
    const index = movies.findIndex((c) => c._id === movie._id);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
    });
  };
  handleSort = (sortColumn) => {
    
    this.setState({ sortColumn });
  };
  render() {
    const { length: movies_number } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genres,
      sortColumn,
      selectedGenre,
    } = this.state;
    if (movies_number === 0)
      return (
        <div className="container mt-5 text-center">
          <span className="alert alert-danger">No Movie Found!</span>
        </div>
      );
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((f) => f.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <main className="container mt-5">
        <div className="row">
          <div className="col-sm-3">
            <div className="text-center">
              <span className="alert alert-info">
                <b>{filtered.length}</b> movie(s) in the list
              </span>
            </div>
            <br />
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-sm-9">
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
          </div>
        </div>
        <hr />
        <div className="text-center">
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </main>
    );
  }
}
