import { createContext, useState } from "react";

export const SearchUserContext = createContext();

export const SearchUserProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    company: "",
    country: "",
    state: "",
    yoe: null,
    isOpenForWork: true,
    recentlyLaidOff: null,
  });

  const onInputChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const onCountryChange = (country) => {
    setSearchCriteria({ ...searchCriteria, country: country });
  };

  const onStateChange = (state) => {
    setSearchCriteria({ ...searchCriteria, state: state });
  };

  const onCheckBoxChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: !searchCriteria[e.target.name],
    });
  };

  return (
    <SearchUserContext.Provider
      value={{
        onInputChange,
        onCountryChange,
        onStateChange,
        onCheckBoxChange,
        searchCriteria,
      }}
    >
      {children}
    </SearchUserContext.Provider>
  );
};
