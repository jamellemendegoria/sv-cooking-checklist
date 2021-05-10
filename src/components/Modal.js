import React from 'react';

function Modal(props) {
  function handleLocalStorageClick() {
    localStorage.clear();
    props.uncheckAllRecipes();
  }
  function handleCloseClick() {
    props.onShowModalToggle();
  }
  if (!props.isShowing) {
    return null;
  }
  return (
    <div>
      <div className="modal">
        <div className="modal-heading-container">
          <h2 className="modal-heading">Settings</h2>
          <h2
            onClick={handleCloseClick}
            className="close-btn">
            X
          </h2>
        </div>
        <div className="settings-container">
          <button onClick={handleLocalStorageClick}>Clear local storage</button>
        </div>
      </div>
      <div className="modal-overlay" onClick={handleCloseClick}></div>
    </div>
  );
}

export default Modal;