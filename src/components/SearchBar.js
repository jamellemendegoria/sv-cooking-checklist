import React from "react";

function SearchBar(props) {
  function handleFilterTextChange(e) {
    props.onFilterTextChange(e.target.value);
  }

  return (
    <input
      type="text"
      value={props.filterText}
      placeholder="Search recipe, ingredient, or source..."
      onChange={handleFilterTextChange}
      className="search-bar custom-input" />
  );
}

export default SearchBar;