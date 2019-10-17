import React from "react";
import axios from "axios";
import { useAsync } from "react-use";

import { API } from "./constants";

import "./App.css";

const fetchFn = async () => {
  const response = await axios(API);
  return response.data;
};

function App() {
  const { loading, error, value: data } = useAsync(fetchFn, []);
  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>error...</div>
  ) : (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}

export default App;
