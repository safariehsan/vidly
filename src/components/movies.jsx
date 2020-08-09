import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import paginate from "./utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
import Modal from "./modal";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const deletedMovieTitle = this.state.movies.find((m) => m._id === movie._id)
      .title;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      toast.error(`«${deletedMovieTitle}» Deleted`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
        this.setState({ movies: originalMovies });
      }
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.findIndex((c) => c._id === movie._id);
    movies[index].liked = !movies[index].liked;
    const likedMovieTitle = movies[index].title;
    this.setState({ movies });
    if(movies[index].liked) {
      toast.success(`«${likedMovieTitle}» Liked`);
    }
    else toast.error(`«${likedMovieTitle}» UnLiked`);
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
    });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((f) =>
        f.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((f) => f.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    
    const {
      length: movies_number,
      genres,
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;

    const { user } = this.props;

    if (movies_number === 0)
      return (
        <div className="container text-center">
          <span className="alert alert-danger">No Movie Found!</span>
        </div>
      );
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <React.Fragment>
        <h1>Movies</h1>
        <div className="row">
          <div className="col-sm-12 text-center"></div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <ListGroup
              movies={movies}
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
            {user && (
              <Link to="/movies/new" className="btn btn-success mt-2">
                New Movie
              </Link>
            )}
          </div>
          <div className="col-sm-9">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <div className="d-flex">
              <div className="">
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={this.handlePageChange}
                  currentPage={currentPage}
                />
              </div>
              <div className="ml-auto">
                <span className="alert alert-info py-2">
                  <b>{totalCount}</b> movie(s) in the list
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
