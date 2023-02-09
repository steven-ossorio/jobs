import client from "@/apollo";
import ProfileFormModal from "@/components/ProfileFormModal";
import { UserContext } from "@/context/user.context";
import { FETCH_PROFILE } from "@/graphql/queries/profile.query";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const { userInfo, isLoading } = useContext(UserContext);
  const route = useRouter();
  const { data, error, loading } = useQuery(FETCH_PROFILE, {
    variables: {
      userId: userInfo && Number(userInfo.id),
    },
    skip: userInfo == null,
  });

  // useEffect(() => {
  //   console.log("fetching user");
  //   fetchUser();
  // }, [userInfo]);

  if ((isLoading && !data) || loading) {
    console.log("loading data");
    return <div>LOADING</div>;
  }

  if (!isLoading && !userInfo) {
    route.push("/");
    return;
  }

  console.log(data?.fetchProfile);
  const {
    firstName,
    lastName,
    aboutMe,
    company,
    title,
    yoe,
    openForWork,
    recentlyLaidOff,
  } = data?.fetchProfile;

  return (
    data?.fetchProfile && (
      <div className="overflow-hidden bg-white dark:bg-gray-900 shadow sm:rounded-lg container max-w-md md:max-w-2xl xl:max-w-4xl mx-auto mt-10">
        <div className=" relative px-4 py-5 sm:px-6">
          <h3 className="relative flex text-lg font-medium leading-6 text-white ">
            Personal details and application
            <ProfileFormModal />
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">Full name</div>
              <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {firstName} {lastName}
              </div>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {aboutMe}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {company}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {title}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Years of experience
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Junior (0-3)
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Open for work
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {openForWork ? "Yes" : "No"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Recently laid off
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {recentlyLaidOff ? "Yes" : "No"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Profile Image
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="flex flex-wrap justify-center">
                  <img
                    src="https://mdbootstrap.com/img/new/slides/041.jpg"
                    className="max-w-full h-auto"
                    alt="..."
                  />
                </div>
                <div className="flex items-center justify-center w-full bg-gray-50">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-8 mb-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop new profile image
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Resume</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 border border-gray-200"
                >
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 w-0 flex-1 truncate">
                        resume_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View resume
                      </a>
                    </div>
                  </li>
                </ul>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    )
  );
};

export default Dashboard;
