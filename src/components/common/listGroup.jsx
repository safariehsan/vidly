import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;
  //const total = props.movies.filter((f) => f.genre._id === props.item._id);
  return (
    <div className="list-group">
      {items.map((item) => (
        <a
          key={item[valueProperty]}
          href="#"
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action "
          }
        >
          {item[textProperty]}
          {/* <span class="badge">{total.length}</span> */}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
