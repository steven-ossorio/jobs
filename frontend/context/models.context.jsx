import { createContext, useState } from "react";

export const ModelsContext = createContext();

export const ModelsProvider = ({ children }) => {
  const [navbarModal, setNavbarModal] = useState(false);
  const [searchCriteriaModal, setSearchCriteriaModal] = useState(false);

  const updateNavbarModal = () => {
    console.log("updating modal ", navbarModal);
    setSearchCriteriaModal(false);
    setNavbarModal((prev) => !prev);
  };

  const updateSearchCriteriaModal = () => {
    setNavbarModal(false);
    setSearchCriteriaModal((prev) => !prev);
  };

  return (
    <ModelsContext.Provider
      value={{
        navbarModal,
        searchCriteriaModal,
        updateNavbarModal: () => updateNavbarModal(),
        updateSearchCriteriaModal,
      }}
    >
      {children}
    </ModelsContext.Provider>
  );
};
