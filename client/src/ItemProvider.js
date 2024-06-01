import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ItemContext } from "./ItemContext.js";

function ItemProvider({ children }) {
  const [itemLoadObject, setItemLoadObject] = useState({
    state: "pending",
    error: null,
    data: null,
  });
  const location = useLocation();

  /* eslint-disable */
  useEffect(() => {
    handleLoad();
  }, []);
  /* eslint-enable */

  async function handleLoad() {
    setItemLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/item/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();

    if (response.status < 400) {
      setItemLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setItemLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
    }
  }

  const value = {
    state: itemLoadObject.state,
    item: itemLoadObject.data,
  };

  return (
    <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
  );
}

export default ItemProvider;
