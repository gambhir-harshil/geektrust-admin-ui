import "./Search.css";
export default function Search({ dispatch }) {
  function handleInputChange(e) {
    const searchQuery = e.target.value;
    dispatch({ type: "FILTER_USERS", payload: searchQuery });
  }
  return (
    <div className="header">
      <input
        className="search_input"
        type="text"
        placeholder="Search for users"
        onChange={handleInputChange}
      />
    </div>
  );
}
