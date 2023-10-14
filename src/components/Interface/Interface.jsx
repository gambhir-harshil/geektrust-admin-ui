import { useEffect, useReducer } from "react";
import axios from "axios";

import "./interface.css";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Table from "../Table/Table";
import DeleteRowsButton from "../DeleteRowsButton/DeleteRowsButton";
import { userReducer, initialState } from "../../reducers/userReducer";

const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export default function Interface() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await axios.get(URL);
      dispatch({ type: "SET_USERS", payload: res.data });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  useEffect(() => {
    const totalItems = state.filteredUsers.length;
    dispatch({ type: "SET_TOTAL_ITEMS", payload: totalItems });
  }, [state.filteredUsers]);

  return (
    <main>
      <Search dispatch={dispatch} />
      <Table itemsPerPage={10} state={state} dispatch={dispatch} />
      <div className="footer">
        <DeleteRowsButton dispatch={dispatch} />
        <Pagination itemsPerPage={10} state={state} dispatch={dispatch} />
      </div>
    </main>
  );
}
