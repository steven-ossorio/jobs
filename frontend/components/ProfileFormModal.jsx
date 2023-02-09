import { UPDATE_PROFILE } from "@/graphql/mutations/profile.mutation";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const ProfileFormModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Steven",
    lastName: "Yellow",
    aboutMe: "Just a typical Software Engineer",
    company: "Google",
    title: "Software Engineer",
    yoe: "",
    openForWork: false,
    recentlyLaidOff: false,
    imageUrl: "https://mdbootstrap.com/img/new/slides/041.jpg",
    resume: "resume_back_end_developer.pdf",
  });
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      id: 74,
      firstName: userData.firstName,
      lastName: userData.lastName,
      aboutMe: userData.aboutMe,
      company: userData.company,
      title: userData.title,
      yoe: userData.yoe,
      openForWork: userData.openForWork,
      recentlyLaidOff: userData.recentlyLaidOff,
      imageUrl: userData.imageUrl,
      resume: userData.resume,
    },
  });

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitUpdate = () => {
    updateProfile();
  };

  const onCloseModal = () => {
    setShowModal((prev) => !prev);
  };

  const onCancelUpdate = () => {
    onCloseModal();
  };

  return (
    <>
      <div
        className="ml-2 cursor-pointer"
        onClick={() => setShowModal((prev) => !prev)}
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
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </div>

      {showModal && (
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          className="absolute inset-0 h-100"
        >
          <div className="relative w-full h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-14">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update Profile
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                  onClick={onCloseModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form action="#" className="mt-8">
                <div className="grid gap-4 mb-4">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        value={userData.firstName}
                        onChange={onInputChange}
                        required={true}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Miller"
                        value={userData.lastName}
                        onChange={onInputChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="aboutMe"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      About me
                    </label>
                    <textarea
                      id="aboutMe"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write a small description about yourself..."
                      value={userData.aboutMe}
                      onChange={onInputChange}
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Software Engineer - Not required"
                      value={userData.company}
                      onChange={onInputChange}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Software Engineer - Not required"
                      value={userData.title}
                      onChange={onInputChange}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="yoe"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Years of experience
                    </label>
                    <select
                      id="yoe"
                      name="yoe"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={userData.yoe}
                      onChange={onInputChange}
                    >
                      <option selected>Choose experience range</option>
                      <option value="junior">Junior (0 - 3)</option>
                      <option value="mid">Mid (3 - 6)</option>
                      <option value="senior">Senior (6+)</option>
                    </select>
                  </div>
                  <label className="relative text-zinc-200 inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Open for work
                    </span>
                  </label>
                  <label className="relative text-zinc-200 inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Recently laidoff (under a year)
                    </span>
                  </label>
                </div>
                <div className="">
                  <label
                    htmlFor="resume"
                    className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Resume
                  </label>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                    />
                  </dd>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onSubmitUpdate}
                  >
                    Update
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={onCancelUpdate}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFormModal;
