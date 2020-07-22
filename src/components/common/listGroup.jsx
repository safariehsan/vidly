import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty } = props;
  return (
    <div className="list-group">
      <a
        href="#"
        class="list-group-item list-group-item-action list-group-item-secondary"
      >
        All Genres
      </a>
      {items.map(item => (
        <a
          key={item[valueProperty]}
          href="#"
          className="list-group-item list-group-item-action list-group-item-secondary"
        >
          {item[textProperty]}
        </a>
      ))}
    </div>
  );
};

export default ListGroup;
