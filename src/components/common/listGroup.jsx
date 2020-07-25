import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;
  return (
    <div className="list-group">
      {/* <a
        href="#"
        className="list-group-item"
      >
        All Genres
      </a> */}
      {items.map(item => (
        <a
          key={item[valueProperty]}
          href="#"
          onClick={() => onItemSelect(item) }
          className={ item === selectedItem ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
        >
          {item[textProperty]}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}

export default ListGroup;
