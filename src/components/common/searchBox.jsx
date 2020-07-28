import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="form-group has-search">
      <span className="fa fa-search form-control-feedback"></span>
      <input
        type="text"
        name="query"
        className="form-control"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;
