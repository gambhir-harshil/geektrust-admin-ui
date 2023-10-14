import "./DeleteRowsButton.css";
export default function DeleteRowsButton({ dispatch }) {
  function handleDeleteRows() {
    dispatch({ type: "DELETE_SELECTED_ROWS" });
  }
  return (
    <button className="delete_btn" onClick={handleDeleteRows}>
      Delete Selected
    </button>
  );
}
