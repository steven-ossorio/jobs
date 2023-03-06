import { FETCH_PROFILES } from "@/graphql/queries/profile.query";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import MiniProfile from "./MiniProfile.component";

const MiniProfiles = () => {
  const { loading, data, error } = useQuery(FETCH_PROFILES);
  console.log(loading, data, error);
  const miniProfiles = data?.fetchProfiles;
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex flex-col mx-auto md:max-w-2xl xl:max-w-4xl justify-items-center mt-5">
      <div class="flex justify-center">
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
      </div>
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
