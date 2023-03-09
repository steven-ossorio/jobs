import { ModelsContext } from "@/context/models.context";
import { SearchUserContext } from "@/context/searchUser.context";
import { FETCH_PROFILES } from "@/graphql/queries/profile.query";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import MiniProfile from "./MiniProfile.component";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const MiniProfiles = () => {
  const { searchCriteria } = useContext(SearchUserContext);
  const { searchCriteriaModal, updateSearchCriteriaModal } =
    useContext(ModelsContext);

  const { loading, data, error } = useQuery(FETCH_PROFILES);
  console.log(loading, data, error);
  const miniProfiles = data?.fetchProfiles;

  console.log("running miniprofiles");
  return (
    <div className="flex flex-col mx-auto md:max-w-2xl xl:max-w-4xl justify-items-center mt-5">
      <div onClick={updateSearchCriteriaModal}>FILTER BUTTON</div>
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-80 h-screen p-4 overflow-y-auto transition-transform ease-in-out ${
          searchCriteriaModal
            ? "duration-500 translate-x-0"
            : "duration-500 -translate-x-full"
        } bg-white dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Job Seeker Filter
        </h5>
        <button
          type="button"
          onClick={updateSearchCriteriaModal}
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <div>
            <label
              htmlFor="company"
              className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
            >
              Company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Company"
              value={searchCriteria.company}
              // onChange={onInputChange}
              required=""
            />
          </div>
          <div className="space-y-2 mt-3">
            <label
              htmlFor="yor"
              className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white"
            >
              Years of experience
            </label>
            <select
              id="yoe"
              name="yoe"
              defaultValue="Choose a level"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // onChange={onInputChange}
            >
              <option>Choose a level</option>
              <option value={1}>Junior (0-2)</option>
              <option value={2}>Mid (3-5)</option>
              <option value={3}>Senior (6+)</option>
            </select>
            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <CountryDropdown
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="country"
                value={searchCriteria.country}
                // onChange={onCountryChange}
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white"
              >
                State
              </label>
              <RegionDropdown
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="state"
                country={searchCriteria.country}
                value={searchCriteria.state}
                // onChange={onStateChange}
              />
            </div>

            <div className="flex pt-3">
              <div className="flex items-center h-5">
                <input
                  id="helper-checkbox"
                  aria-describedby="helper-checkbox-text"
                  type="checkbox"
                  name="isOpenForWork"
                  defaultChecked={searchCriteria.isOpenForWork}
                  // onChange={onCheckBoxChange}
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="helper-checkbox"
                  className="font-medium text-md text-gray-900 dark:text-gray-300"
                >
                  Open for work?
                </label>
              </div>
            </div>
            <div className="flex py-3">
              <div className="flex items-center h-5">
                <input
                  id="recently-laid-off-checkbox"
                  aria-describedby="recently-laid-off-checkbox-text"
                  type="checkbox"
                  name="recentlyLaidOff"
                  defaultChecked={searchCriteria.recentlyLaidOff}
                  // onChange={onCheckBoxChange}
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="recently-laid-off-checkbox"
                  className="font-medium text-md text-gray-900 dark:text-gray-300"
                >
                  Who has been recently laid off?
                </label>
              </div>
            </div>
            <button
              // onClick={onSubmit}
              type="button"
              className="group mx-3 relative flex w-60 justify-center rounded-md border border-transparent bg-blue-700  py-2 px-4 text-sm md:text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              search
            </button>
          </div>
        </div>
      </div>
      {/* <div class="flex justify-center">
        <div className="w-80">
          <div class="relative" data-te-dropdown-ref>
            <button
              class="flex my-0 mx-auto items-center whitespace-nowrap rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 motion-reduce:transition-none"
              type="button"
              id="dropdownMenuButton1"
              data-te-dropdown-toggle-ref
              aria-expanded="false"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleButtonClick}
            >
              Filter options
              <span class="ml-2 w-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`absolute z-[1000] float-left m-0 ${
                showDropdown ? "block" : "hidden"
              } w-full list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700`}
              aria-labelledby="dropdownMenuButton1"
              data-te-dropdown-menu-ref
              data-te-dropdown-show={showDropdown}
            >
              <div className="flex justify-between mt-2">
                <div className="ml-3">Filters</div>
                <div className="flex">
                  <div className="mr-3 cursor-pointer">save view</div>
                  <div className="mr-3 cursor-pointer">clear all</div>
                </div>
              </div>
              <div>
                <div>
                  <a
                    class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underdivne disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                    href="#"
                    data-te-dropdown-item-ref
                  >
                    years of expereince: Junior(0-2) Mid(3-5) Senior(6+)
                  </a>
                </div>
              </div>
              <div>
                <div>
                  <a
                    class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underdivne disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                    href="#"
                    data-te-dropdown-item-ref
                  >
                    Action
                  </a>
                </div>
              </div>
              <div>
                <a
                  class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underdivne disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  href="#"
                  data-te-dropdown-item-ref
                >
                  Another action
                </a>
              </div>
              <div>
                <a
                  class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underdivne disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  href="#"
                  data-te-dropdown-item-ref
                >
                  Something else here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className=" mx-auto grid grid-cols-1 md:max-w-2xl md:grid-cols-2 gap-3 xl:gap-y-6 xl:gap-x-32 xl:grid-cols-3 xl:max-w-4xl justify-items-center mt-5">
        {miniProfiles &&
          miniProfiles.map((miniProfile) => {
            return <MiniProfile key={miniProfile.id} {...miniProfile} />;
          })}
      </div>
    </div>
  );
};

export default MiniProfiles;
