import { useEffect, useState } from "react";
import { ItemListContext } from "./ItemListContext.js";

function ItemListProvider({ children }) {
  const [itemLoadObject, setItemLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setItemLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/item/list`, {
      method: "GET",
    });
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
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setItemLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/item/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setItemLoadObject((current) => {
        current.data.push(responseJson);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setItemLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setItemLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/item/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setItemLoadObject((current) => {
        const itemIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[itemIndex] = responseJson;
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setItemLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setItemLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/item/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setItemLoadObject((current) => {
        const itemIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(itemIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setItemLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  async function handleOrder(dtoIn) {
    setItemLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/order/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setItemLoadObject((current) => {
        const itemIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(itemIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setItemLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: itemLoadObject.state,
    itemList: itemLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete , handleOrder},
  };

  return (
    <ItemListContext.Provider value={value}>
      {children}
    </ItemListContext.Provider>
  );
}

export default ItemListProvider;
