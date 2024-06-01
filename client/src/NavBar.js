import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { CompanyContext } from "./CompanyContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiWarehouse, mdiLogout } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const { companyList, loggedInCompany, handlerMap } = useContext(CompanyContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button style={brandStyle()} onClick={() => navigate("/")}>
            <Icon path={mdiWarehouse} size={2} color={"white"} />
            CAR SHOP
          </Button>
        </Navbar.Brand>
        <Nav>
          <NavDropdown
            title={loggedInCompany ? loggedInCompany.name : "Přihlaš se"}
          >
            {getCompanyMenuList({ companyList, loggedInCompany, handlerMap })}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#98C1EA" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
    backgroundColor: "blue"
  };
}

function getCompanyMenuList({ companyList, loggedInCompany, handlerMap }) {
    // temporary solution to enable login/logout
    const companyMenuItemList = companyList.map((company) => (
      <NavDropdown.Item key={"company.id"} onClick={() => handlerMap.login(company.id)}>
        {company.name}
      </NavDropdown.Item>
    ));
  
    if (loggedInCompany) {
      companyMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
      companyMenuItemList.push(
        <NavDropdown.Item
          key={"logout"}
          onClick={() => handlerMap.logout()}
          style={{ color: "red" }}
        >
          <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Odhlas se"}
        </NavDropdown.Item>
      );
    }
  
    return companyMenuItemList;
  }

export default NavBar;
