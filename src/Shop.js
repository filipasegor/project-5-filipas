import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import ItemsList from "./ItemsList.js";
import Item from "./Item.js";
import AddItem from "./AddItem.js";

export default function Shop() {

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    if(saved){
      return JSON.parse(saved)
    } else{
      return [];
    }
  });

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [validation, setValidation] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items]);


  useEffect(() => {
    if(items.lenght === 0){
      document.getElementById("items-lenght").innerHTML = "Товары не добавлены"
    }else {
      document.getElementById("items-lenght").innerHTML = `Добавлено ${items.lenght}`
    }
  });

  console.log(items)

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
      setTotal(total + 1)
    }

  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescChange(e) {
    setDesc(e.target.value);
  }


  function handleDeleteClick() {
    setItems(items.splice(1));
    setTotal(total - 1)
  }

  const uiTitle = (
    <div>
      <h1 className="ui-title">Добавьте первый товар</h1>
    </div>
  );

  const uiTotal = (
    <div>
      <h2 className="ui-title">Всего добавлено:</h2>
    </div>
  )

  return (
    <>
      {items.length > 0 ? !uiTitle : uiTitle}
      <AddItem onFormSubmit={handleFormSubmit} name={name} onNameChange={handleNameChange} onDescChange={handleDescChange} desc={desc} onButtonClick={handleFormSubmit} validation={validation}/>

      <ItemsList onDeleteClick={handleDeleteClick} items={items} />
      <h3 id="items-lenght"></h3>
    </>
  );

}
