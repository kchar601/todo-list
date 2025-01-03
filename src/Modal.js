import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";

export default function Modal({
  open,
  onSubmitEdit,
  onCancelEdit,
  dialogValue,
  setDialogValue,
}) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="modal-content" role="dialog" aria-labelledby="edit-input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitEdit();
          }}
        >
          <label htmlFor="edit-input">Edit Task:</label>
          <input
            id="edit-input"
            type="text"
            value={dialogValue}
            onChange={(e) => setDialogValue(e.target.value)}
          />
          <button className="cancel-btn" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
          <button
            className="submit-btn"
            type="submit"
            disabled={!dialogValue.trim()}
          >
            Save
          </button>
        </form>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
