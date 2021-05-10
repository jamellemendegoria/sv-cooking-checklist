import React, { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar';
import FilterBtn from './components/FilterBtn';
import ExpandCollapseBtn from './components/ExpandCollapseBtn';
import Recipe from './components/Recipe';
import SettingsBtn from './components/SettingsBtn';
import Modal from './components/Modal';

import RecipeData from './assets/recipes.json';

const FILTER_MAP = {
  All: () => true,
  Incomplete: recipe => !recipe.isCompleted,
  Completed: recipe => recipe.isCompleted
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

// Adds isCompleted and isDisplayingInfo properties to recipe data
let recipeDataWProps = RecipeData;
recipeDataWProps.forEach(recipe => {
  recipe["isCompleted"] = false;
  recipe["isDisplayingInfo"] = false;
});

function App() {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem('recipes')) || recipeDataWProps
  );
  const [filterText, setFilterText] = useState('');
  const [filterBtn, setFilterBtn] = useState('All');
  const [isExpanded, setExpanded] = useState(false);
  const [isShowingModal, setShowingModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const filterBtnCounts = {
    All: recipes.length,
    Incomplete: recipes.filter(FILTER_MAP['Incomplete']).length,
    Completed: recipes.filter(FILTER_MAP['Completed']).length
  };
  const filterBtns = FILTER_NAMES.map(btn =>
    <FilterBtn
      key={btn}
      name={btn}
      total={filterBtnCounts[btn]}
      isPressed={btn === filterBtn}
      onFilterBtnChange={handleFilterBtnChange} />
  );
  const recipeList = recipes
  .filter(FILTER_MAP[filterBtn])
  .filter(filterTextFunc)
  .map(recipe =>
    <Recipe
      key={recipe.id}
      id={recipe.id}
      name={recipe.name}
      img={recipe.img}
      ingredients={recipe.ingredients}
      sources={recipe.sources}
      isCompleted={recipe.isCompleted}
      isDisplayingInfo={recipe.isDisplayingInfo}
      toggleRecipeCompleted={toggleRecipeCompleted}
      toggleDisplayRecipeInfo={toggleDisplayRecipeInfo} />
  );
  // Filters recipe list for recipes, ingredients, and sources matching filterText
  function filterTextFunc(recipe) {
    if (recipe.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
      return true;
    } else {
      let containsFilterText = false;
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
          containsFilterText = true;
          return;
        }
      });
      recipe.sources.forEach(source => {
        if (source.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
          containsFilterText = true;
          return;
        }
      });
      return containsFilterText;
    }
  }
  function handleFilterTextChange(filterText) {
    setFilterText(filterText);
  }
  function handleExpandCollapseToggle() {
    setExpanded(!isExpanded);
    let expandedRecipes;
    if (isExpanded) {
      expandedRecipes = recipes.map(recipe => {
        return {...recipe, isDisplayingInfo: false}
      });
    } else {
      expandedRecipes = recipes.map(recipe => {
        return {...recipe, isDisplayingInfo: true}
      });
    }
    setRecipes(expandedRecipes);
  }
  function handleFilterBtnChange(filterBtn) {
    setFilterBtn(filterBtn);
  }
  function toggleRecipeCompleted(id) {
    const editedRecipes = recipes.map(recipe => {
      if (recipe.id === id) {
        return {...recipe, isCompleted: !recipe.isCompleted}
      }
      return recipe;
    });
    setRecipes(editedRecipes);
  }
  function toggleDisplayRecipeInfo(id) {
    const editedRecipes = recipes.map(recipe => {
      if (recipe.id === id) {
        return {...recipe, isDisplayingInfo: !recipe.isDisplayingInfo}
      }
      return recipe;
    });
    setRecipes(editedRecipes);
  }
  function handleShowModalToggle() {
    setShowingModal(!isShowingModal);
  }
  function uncheckAllRecipes() {
    const editedRecipes = recipes.map(recipe => {
        return {...recipe, isCompleted: false}
    });
    setRecipes(editedRecipes);
  }

  return (
    <div>
      <div className="settings-btn-container">
        <SettingsBtn onShowModalToggle={handleShowModalToggle} />
      </div>
      <Modal
        isShowing={isShowingModal}
        onShowModalToggle={handleShowModalToggle} 
        uncheckAllRecipes={uncheckAllRecipes} />
      <h1>Stardew Valley Cooking Checklist</h1>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={handleFilterTextChange} />
      <div className="filter-btn-container">
        {filterBtns}
      </div>
      <ExpandCollapseBtn
        name={isExpanded ? "Collapse All" : "Expand All"}
        onExpandCollapseToggle={handleExpandCollapseToggle} />
      <ul className="recipe-list">
        {recipeList}
      </ul>
    </div>
  );
};

export default App;