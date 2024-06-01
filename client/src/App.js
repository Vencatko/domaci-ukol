import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout.js";
import ItemList from "./ItemList.js";
import CompanyProvider from "./CompanyProvider.js";
import ItemListProvider from "./ItemListProvider.js";
import ItemProvider from "./ItemProvider.js";
import Chart from "./Chart.js";

function App() {
  return (
    <div style={componentStyle()}>
      <CompanyProvider>
        <ItemListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<ItemList />} />
                <Route
                  path="itemDetail"
                  element={
                    <ItemProvider />
                  }
                />
                <Route path="chart" element={<Chart />} />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ItemListProvider>
      </CompanyProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#187bcd",
  };
}

export default App;
