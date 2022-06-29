import React, { useState } from "react";
import uuid from "react-uuid";
import ItemsList from "./ItemsList.js";
import Item from "./Item.js";
import AddItem from "./AddItem.js";

export default function Shop() {
  // const items = [];

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [validation, setValidation] = useState("");
  const [total, setTotal] = useState("");

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
      setTotal(items.length + 1)
    }

    console.log(items);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescChange(e) {
    setDesc(e.target.value);
  }


  function handleDeleteClick() {
    setItems(items.splice(1));
    setTotal(items.length - 1)
  }

  const uiTitle = (
    <div>
      <h1 className="ui-title">Добавьте первый товар</h1>
    </div>
  );

  return (
    <>
      {items.length > 0 ? !uiTitle : uiTitle}
      <AddItem onFormSubmit={handleFormSubmit} name={name} onNameChange={handleNameChange} onDescChange={handleDescChange} desc={desc} onButtonClick={handleFormSubmit} validation={validation}/>

      <ItemsList onDeleteClick={handleDeleteClick} items={items} />
      <h2>Всего добавлено:{total}</h2>
    </>
  );

}
