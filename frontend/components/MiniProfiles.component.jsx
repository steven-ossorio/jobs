import { useState } from "react";
import MiniProfile from "./MiniProfile.component";

const user = {
  id: 1,
  firstName: "Bonnie",
  lastName: "Green",
  initials: "BG",
  imageUrl:
    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  title: "Visual Designer",
  company: "Google",
  openForWork: false,
  socials: [
    { facebook: "" },
    { linkedIn: "" },
    { gitHub: "" },
    { website: "" },
  ],
};

const MiniProfiles = ({ miniProfiles }) => {
  const { id, firstName, lastName, initials, imageUrl, title, company } = user;
  const userInfo = true;
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => {
    setIsFlipped((prev) => !prev);
  };
  return (
    <div className=" mx-auto grid grid-cols-1 md:max-w-2xl md:grid-cols-2 gap-3 xl:gap-32 xl:grid-cols-3 xl:max-w-4xl justify-items-center mt-5">
      {miniProfiles &&
        miniProfiles.map((miniProfile) => {
          return <MiniProfile key={miniProfile.id} {...miniProfile} />;
        })}
      {/* <div className="group h-96 w-4/5">
        <div
          class={`relative h-full w-full rounded-xl shadow-xl transition-all duration-1000 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div class="absolute inset-0 w-4/5">
            <div className="w-4/5">
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-1">
                <div className="flex flex-col items-center pb-10">
                  {imageUrl ? (
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg object-center object-cover mt-3"
                      src={imageUrl}
                      alt={firstName}
                    />
                  ) : (
                    <div className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mt-3  mb-3">
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {initials}
                      </span>
                    </div>
                  )}
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {firstName} {lastName}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {title}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {company}
                  </span>
                  <div className="relative">
                    <div className={`flex mt-4 space-x-3 md:mt-6 `}>
                      <div className="flex justify-center self-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-center align-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-6 h-6"
                        >
                          <path
                            fill="currentColor"
                            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-6 h-6"
                        >
                          <path
                            fill="currentColor"
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mr-5 mb-3" onClick={flipCard}>
                  <span className="mr-1">View more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-0 h-full w-full rounded-xl bg-black px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]"
            style={{
              backgroundColor: "#1F2937",
            }}
          >
            <div class="flex min-h-full flex-col items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold">Jane Doe</h1>
                <p class="text-lg">Photographer & Art</p>
                <p class="text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
                <button class="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm">
                  Read More
                </button>
              </div>
              <div className="flex justify-start mr-5 mb-3" onClick={flipCard}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-1">Back</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MiniProfiles;
