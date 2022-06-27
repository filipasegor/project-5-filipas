import React, { useState } from "react";
import uuid from "react-uuid";
import ItemsList from "./ItemsList.js";
import Item from "./Item.js";

export default function Shop() {
  // const items = [];

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [validation, setValidation] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!name && !desc) {
      setValidation("Введите название и описание");
    } else if (!name) {
      setValidation("Введите название");
    } else if (!desc) {
      setValidation("Введите описание");
    } else {
      setItems([...items, { name: name, desc: desc, id: uuid() }]);
      setName("");
      setDesc("");
      setValidation("");
    }

    console.log(items);
  }

  function handleDeleteClick() {
    setItems(items.splice(1));
  }

  const uiTitle = (
    <div>
      <h1 className="ui-title">Добавьте первый товар</h1>
    </div>
  );


  return (
    <>
      {items.length > 0 ? !uiTitle : uiTitle}

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name"></label>
          <input
            type="text"
            name="name"
            placeholder="Название товара"
            className="ui-textfield"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="desc"></label>
          <input
            type="text"
            name="desc"
            placeholder="Описание товара"
            className="ui-textfield"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="form-footer">
          <div className="validation">{validation}</div>
          <input
            type="submit"
            className="ui-button"
            value="Добавить"
            onClick={handleFormSubmit}
          />
        </div>
      </form>

      <ItemsList items={items} onDeleteClick={handleDeleteClick} />
    </>
  );
}
