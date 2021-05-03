import React from "react";

function Recipe(props) {
  const ingredients = props.ingredients.map((ingredient, index) =>
    <li
      key={ingredient.name}
      className="recipe-info-item">
      {`${ingredient.name} (${ingredient.quantity})${index === props.ingredients.length-1 ? '' : ','}`}
    </li>
  );
  const sources = props.sources.map((source, index) =>
    <li
      key={source[0]}
      className="recipe-info-item">
      {source + (index === props.sources.length-1 ? '' : ',')}
    </li>
  );
  function handleClick() {
    props.toggleDisplayRecipeInfo(props.id);
  }
  function handleChange() {
    props.toggleRecipeCompleted(props.id);
  }

  return (
    <li className="recipe">
      <label
        htmlFor={props.id}
        className="checkbox-container">
        <input
          type="checkbox"
          defaultChecked={props.isCompleted}
          onChange={handleChange}
          id={props.id} />
        <div className="custom-checkbox custom-input"></div>
      </label>
      <div
        className="recipe-no-checkbox"
        onClick={handleClick}>
        <div className="recipe-img-and-label">
          <img
            src={props.img}
            alt={props.name}
            className="recipe-img"/>
          <label className="recipe-label">{props.name}</label>
        </div>
        {props.isDisplayingInfo && 
        <ul className="recipe-info-container">
          <li>
            <ul className="recipe-info-list">
              <label className="recipe-info-label">Ingredient(s):</label>
              {ingredients}
            </ul>
          </li>
          <li>
            <ul className="recipe-info-list">
              <label className="recipe-info-label">Source(s):</label>
              {sources}
            </ul>
          </li>
        </ul>
        } 
      </div>
    </li>
  );
}

export default Recipe;