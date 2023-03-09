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

  const updateSearch = (elements) => {
    setSearchCriteria(elements);
  };

  return (
    <SearchUserContext.Provider value={{ updateSearch, searchCriteria }}>
      {children}
    </SearchUserContext.Provider>
  );
};
