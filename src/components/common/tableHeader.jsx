import React, { Component } from "react";
import { isArguments } from "lodash";
// columns: array
// sortColumn: object
// onSort: function
class TableHeader extends Component {
  state = {
    classes: "fa fa-sort",
  };
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    let {classes} = this.state;
    classes = "fa fa-sort-";
    if (sortColumn.order === "asc") {
      classes = "fa fa-sort-asc";
      this.setState({
        classes,
      });
    } else {
      classes = "fa fa-sort-desc";
      this.setState({
        classes,
      });
    }
    //console.log(classes);
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = column => {
    const {sortColumn} = this.props;
    if(column.path !== sortColumn.path) return <i className="fa fa-sort"></i>
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
    if(sortColumn.order === 'desc') return <i className="fa fa-sort-desc"></i>
  }
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              style={{ cursor: "pointer" }}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
