import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import {Link} from 'react-router-dom';

class MoviesTable extends Component {
  columns = [
  { path: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "Like",
      path: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      label: "Actions",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-sm btn-danger"
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        movies={movies}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
