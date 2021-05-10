import React from "react";

function SettingsBtn(props) {
  function handleClick() {
    props.onShowModalToggle();
  }
  return (
    <button
      onClick={handleClick}
      className="settings-btn">
      Settings
    </button>
  );
}

export default SettingsBtn;