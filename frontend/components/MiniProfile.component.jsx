import { UserContext } from "@/context/user.context";
import { useContext, useState } from "react";
import Socials from "./Socials.component";

const MiniProfile = ({
  id,
  firstName,
  lastName,
  initials,
  aboutMe,
  company,
  title,
  yoe,
  isOpenForWork,
  recentlyLaidOff,
  imageUrl,
  socials,
}) => {
  const { userInfo } = useContext(UserContext);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="group h-50 w-80">
      <div
        className={`relative h-80 w-full rounded-xl shadow-xl transition-all duration-1000 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 mx-auto -mt-1 rounded-lg rounded-t-non">
          <div className="relative h-80 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col absolute inset-0 justify-between">
              <div className="flex justify-end mt-2">
                {isOpenForWork && (
                  <div class="bg-blue-100 cursor-default text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    Open for work
                  </div>
                )}
                {recentlyLaidOff && (
                  <div class="bg-blue-100 cursor-default text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-white border border-white">
                    Recently laid off
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center self-center">
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
              </div>
              <div>
                <div className="relative">
                  {userInfo === null && (
                    <div className="absolute z-30 text-sm flex inset-0 justify-center">
                      MUST SIGN IN TO SEE MORE
                    </div>
                  )}
                  <div className={`${userInfo !== null ? "" : "blur-md"}`}>
                    <div
                      className={`flex justify-center mt-4 space-x-3 md:mt-6`}
                    >
                      <Socials socials={socials} />
                    </div>
                  </div>
                  <div
                    className={`flex justify-end mr-5 ${
                      aboutMe ? "mb-3" : "mb-8"
                    } ${
                      userInfo !== null ? "" : "blur-md"
                    } mt-5 cursor-pointer`}
                    onClick={aboutMe ? flipCard : () => null}
                  >
                    {aboutMe && (
                      <div className="flex">
                        <span className="mr-1">View more</span>
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
                            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 h-full w-full rounded-xl bg-black px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]"
          style={{
            backgroundColor: "#1F2937",
          }}
        >
          <div className="flex flex-col justify-between absolute inset-0 ">
            <div>
              <h1 className="text-3xl font-bold">BIO</h1>
              <p className="text-sm p-6">{aboutMe}</p>
            </div>
            <div
              className="flex justify-start mr-5 mb-3 ml-6"
              onClick={flipCard}
            >
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
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-1">Back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
