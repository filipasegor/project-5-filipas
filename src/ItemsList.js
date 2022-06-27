import React from "react";
import uuid from "react-uuid";
import Item from "./Item.js";

export default function ItemsList(props){

return <>
    <ul className="ui-list">
      {props.items.map((item) => (
        <li>
        <Item key={uuid()} id={uuid()} info={item} />
        <button className="item-button" onClick={props.onDeleteClick}>
          Удалить
        </button>
         </li>
      ))}
    </ul>
    </>
};
