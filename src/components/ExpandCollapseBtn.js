import React from "react";

function ExpandCollapseBtn(props) {
  function handleToggleClick() {
    props.onExpandCollapseToggle();
  }
  return (
    <button
      className="expand-collapse-btn"
      onClick={handleToggleClick}>
      {props.name}
    </button>
  );
}

export default ExpandCollapseBtn;