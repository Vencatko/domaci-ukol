import { useEffect, useState } from "react";
import { CompanyContext } from "./CompanyContext.js";

function CompanyProvider({ children }) {
  const [companyListDto, setCompanyListDto] = useState({
    state: "ready",
    data: null,
  });
  const [loggedInCompany, setLoggedInCompany] = useState(null);

  useEffect(() => {
    setCompanyListDto((current) => ({ ...current, state: "loading" }));
    fetch(`http://localhost:8000/company/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCompanyListDto({ state: "error", error: responseJson.error });
      } else {
        setCompanyListDto({ state: "ready", data: responseJson });
      }
    });
  }, []);

  const value = {
    companyList: companyListDto.data || [],
    loggedInCompany: loggedInCompany
      ? (companyListDto.data || []).find((company) => company.id === loggedInCompany)
      : null,
    handlerMap: {
      login: setLoggedInCompany,
      logout: () => setLoggedInCompany(null),
    },
  };

  return (
    <>
      <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
    </>
  );
}

export default CompanyProvider;
