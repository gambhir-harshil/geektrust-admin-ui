export function userReducer(state, action) {
  switch (action.type) {
    case "SET_USERS": {
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload,
      };
    }
    case "FILTER_USERS": {
      const searchQuery = action.payload;
      const filteredUsers = state.users.filter((user) => {
        return Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      return {
        ...state,
        searchQuery,
        filteredUsers,
      };
    }
    case "SET_TOTAL_ITEMS": {
      return {
        ...state,
        totalItems: action.payload,
      };
    }
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case "SELECT_ROW": {
      const { selectedRowId, isSelected } = action.payload;
      const selectedRows = state.selectedRows.includes(selectedRowId)
        ? state.selectedRows.filter((id) => id !== selectedRowId)
        : [...state.selectedRows, selectedRowId];
      return {
        ...state,
        selectedRows,
        isSelected,
      };
    }
    case "SELECT_ALL_ROWS": {
      const currentPageRows = state.filteredUsers.slice(
        (state.currentPage - 1) * 10,
        state.currentPage * 10
      );
      const selectedRows =
        state.selectedRows.length === currentPageRows.length
          ? []
          : currentPageRows.map((row) => row.id);
      return {
        ...state,
        selectedRows,
      };
    }
    case "DELETE_SELECTED_ROWS":
      const updatedUsers = state.users.filter(
        (user) => !state.selectedRows.includes(user.id)
      );
      return {
        ...state,
        users: updatedUsers,
        filteredUsers: updatedUsers,
        selectedRows: [],
      };
    case "DELETE_ROW": {
      const rowId = action.payload;
      const updatedUsers = state.users.filter((user) => user.id !== rowId);
      const updatedFilteredUsers = state.filteredUsers.filter(
        (user) => user.id !== rowId
      );

      return {
        ...state,
        users: updatedUsers,
        filteredUsers: updatedFilteredUsers,
      };
    }
    case "EDIT_ROW": {
      const { id } = action.payload;
      const editingState = {
        ...state.isEditing,
        [id]: true,
      };
      return {
        ...state,
        editRowData: action.payload,
        isEditing: editingState,
      };
    }
    case "SAVE_EDITED_ROW": {
      const editedUser = action.payload;
      const updatedUsers = state.users.map((user) =>
        user.id === editedUser.id ? editedUser : user
      );

      const editingState = {
        ...state.isEditing,
        [editedUser.id]: false,
      };
      return {
        ...state,
        users: updatedUsers,
        filteredUsers: updatedUsers,
        editRowData: null,
        isEditing: editingState,
      };
    }
    default:
      return "Select a valid action";
  }
}

export const initialState = {
  users: [],
  filteredUsers: [],
  currentPage: 1,
  totalItems: 0,
  searchQuery: "",
  selectedRows: [],
  editRowData: null,
  isEditing: {},
  isSelected: false,
};
