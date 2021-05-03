import React from "react";

function FilterBtn(props) {
  function handleClick() {
    props.onFilterBtnChange(props.name);
  }
  return (
    <button
      aria-pressed={props.isPressed}
      className={"filter-btn" + (props.name === 'All' ? " first" : "")}
      onClick={handleClick}>
      {`${props.name} (${props.total})`}
    </button>
  );
}

export default FilterBtn;