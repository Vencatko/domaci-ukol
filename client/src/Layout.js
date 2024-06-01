import { Outlet } from "react-router-dom";

import NavBar from "./NavBar.js";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={bodyStyle()}>
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle()}>
        © Václav Hána
      </div>
    </>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "#D6D632 4px solid",
    borderBottom: "#D6D632 4px solid",
    backgroundColor: "#3232D6",
  };
}

function footerStyle() {
  return { padding: "8px", textAlign: "center", backgroundColor: "#98C1EA" };
}

export default Layout;
