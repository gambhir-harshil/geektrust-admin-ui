import { useState } from "react";
import { Create, Delete, Done } from "@mui/icons-material";
import "./UserRow.css";

export default function UserRow({ user, state, dispatch }) {
  const { selectedRows, editRowData, isEditing } = state;

  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedRole, setEditedRole] = useState(user.role);

  function handleSelectRow(rowId) {
    dispatch({ type: "SELECT_ROW", payload: { selectedRowId: rowId } });
  }

  function handleEditRow(rowData) {
    const isRowEditing = Object.values(isEditing).includes(true);

    if (isRowEditing) {
      alert("Finish editing the current row before starting a new edit.");
    } else {
      dispatch({ type: "EDIT_ROW", payload: rowData });
    }
  }

  function handleSaveRow() {
    if (editedName.trim() === "" || editedEmail.trim() === "") {
      alert("Name and email can't be empty.");
      return;
    }

    const editedUserData = {
      id: editRowData.id,
      name: editedName,
      email: editedEmail,
      role: editedRole,
    };
    dispatch({ type: "SAVE_EDITED_ROW", payload: editedUserData });
  }

  function handleDeleteRow(rowId) {
    dispatch({ type: "DELETE_ROW", payload: rowId });
  }

  const isSelected = selectedRows.includes(user.id);

  return (
    <tr className={isSelected ? "selected_row" : ""}>
      <td>
        <input
          type="checkbox"
          onChange={() => handleSelectRow(user.id)}
          checked={selectedRows.includes(user.id)}
        />
      </td>
      <td>
        {isEditing[user.id] ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="action_input"
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditing[user.id] ? (
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="action_input"
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditing[user.id] ? (
          <select
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
            className="action_select"
          >
            {editedRole === "Member" ? (
              <>
                <option value="Admin">admin</option>
                <option value="Member">member</option>
              </>
            ) : (
              <>
                <option value="Member">member</option>
                <option value="Admin">admin</option>
              </>
            )}
          </select>
        ) : (
          user.role
        )}
      </td>
      <td>
        <div className="btn_container">
          {isEditing[user.id] ? (
            <button className="action_btn save" onClick={handleSaveRow}>
              <Done />
            </button>
          ) : (
            <button
              className="action_btn create"
              onClick={() => handleEditRow(user)}
            >
              <Create />
            </button>
          )}

          <button
            className="action_btn delete"
            onClick={() => handleDeleteRow(user.id)}
          >
            <Delete />
          </button>
        </div>
      </td>
    </tr>
  );
}
