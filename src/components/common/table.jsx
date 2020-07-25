import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, movies, sortColumn, onSort }) => {
  //const  = props;
  return (
    <table className="table mt-5 table-striped table-bordered table-hover table-sm">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody data={movies} columns={columns} />
    </table>
  );
};

export default Table;
