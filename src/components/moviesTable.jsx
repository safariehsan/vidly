import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "Like",
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />,
    },
    {
      key: "delete",
      label: "Actions",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-sm btn-danger m-2"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
     <Table sortColumn={sortColumn} movies={movies} onSort={onSort} columns={this.columns} />
    );
  }
}

export default MoviesTable;
