import { UserContext } from "@/context/user.context";
import { SIGN_UP_USER } from "@/graphql/mutations/auth.mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const SignUp = () => {
  const { loginUser } = useContext(UserContext);
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    company: "",
    title: "",
    isOpenForWork: true,
    recentlyLaidOff: false,
    yoe: null,
    skills: "",
    linkedin: "",
    website: "",
    aboutMe: "",
  });

  const [userDataError, setUserDataError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    countryError: "",
    stateError: "",
    companyError: "",
    titleError: "",
    yoeError: "",
  });

  const [signup] = useMutation(SIGN_UP_USER, {
    variables: {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      country: userData.country,
      state: userData.state,
      company: userData.company,
      title: userData.title,
      isOpenForWork: userData.isOpenForWork,
      recentlyLaidOff: userData.recentlyLaidOff,
      yoe: userData.yoe,
      skills: userData.skills,
      linkedin: userData.linkedin,
      website: userData.website,
      aboutMe: userData.aboutMe,
    },
  });

  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onCountryChange = (country) => {
    setUserData({ ...userData, country: country });
  };

  const onStateChange = (state) => {
    setUserData({ ...userData, state: state });
  };

  const onCheckBoxChange = (e) => {
    setUserData({ ...userData, [e.target.name]: !userData.name });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      return;
    }

    signup()
      .then((res) => {
        loginUser(res.data.register);
        router.push("/");
      })
      .catch((eerr) => console.log(eerr));
  };

  return (
    <div className="flex min-h-full items-center justify-center align-middle py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight bg-white:text-gray-900">
              Create an account
            </h2>
          </div>
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className={`
                    ${step == 1 ? "w-40" : step == 2 ? "w-80" : "w-full"}
                    p-1
                    text-xs
                    font-medium
                    leading-none
                    text-center text-blue-100
                    bg-blue-600
                    rounded-full
                  `}
            >
              Step {step}
            </div>
          </div>
          <form>
            <div className="grid gap-4 mb-4">
              {step == 1 && (
                <>
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
                      {userDataError.firstNameError && (
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                          <span class="font-medium">
                            {userDataError.firstNameError}
                          </span>
                        </p>
                      )}
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
                      {userDataError.lastNameError && (
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                          <span class="font-medium">
                            {userDataError.lastNameError}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="email@gmail.com"
                      value={userData.email}
                      onChange={onInputChange}
                      required="*"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="•••••••••"
                      value={userData.password}
                      onChange={onInputChange}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="•••••••••"
                      value={userData.confirmPassword}
                      onChange={onInputChange}
                      required=""
                    />
                  </div>
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
                      value={userData.country}
                      onChange={onCountryChange}
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
                      country={userData.country}
                      value={userData.state}
                      onChange={onStateChange}
                    />
                  </div>
                </>
              )}
              {step == 2 && (
                <>
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
                      placeholder="Software Engineer"
                      value={userData.title}
                      onChange={onInputChange}
                      required=""
                    />
                  </div>
                  <div className="flex">
                    <div className="flex items-center h-5">
                      <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        name="isOpenForWork"
                        defaultChecked={userData.isOpenForWork}
                        onChange={onCheckBoxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label
                        htmlFor="helper-checkbox"
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        Open for work?
                      </label>
                      <p
                        id="helper-checkbox-text"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        Can be updated later but helps recruiters know you are
                        actively searching
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex items-center h-5">
                      <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        name="recentlyLaidOff"
                        defaultChecked={userData.recentlyLaidOff}
                        onChange={onCheckBoxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label
                        htmlFor="helper-checkbox"
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        Recently laid off?
                      </label>
                      <p
                        id="helper-checkbox-text"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        If you have been laid off under a year
                      </p>
                    </div>
                  </div>
                  <label
                    htmlFor="yoe"
                    className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select current career stage (years of experience)
                  </label>
                  <select
                    id="yoe"
                    name="yoe"
                    defaultValue="Choose a level"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onInputChange}
                  >
                    <option>Choose a level</option>
                    <option value={1}>Junior (0-2)</option>
                    <option value={2}>Mid (3-5)</option>
                    <option value={3}>Senior (6+)</option>
                  </select>
                  <div>
                    <label
                      htmlFor="skills"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Skills
                    </label>
                    <input
                      type="text"
                      name="skills"
                      id="skills"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="JavaScript, Math, Python, SQL, Jira"
                      value={userData.skills}
                      onChange={onInputChange}
                      required=""
                    />
                    <p
                      id="helper-checkbox-text"
                      className="text-xs mt-2 font-normal text-gray-500 dark:text-gray-300"
                    >
                      Type up to five skills seperating by a coma. Example seen
                      above.
                    </p>
                  </div>
                </>
              )}
              {step == 3 && (
                <>
                  <div>
                    <label
                      htmlFor="linkedin"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="LinkedIn"
                      value={userData.linkedin}
                      onChange={onInputChange}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="linkedin"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Personal Website"
                      value={userData.website}
                      onChange={onInputChange}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="aboutMe"
                      className="block mb-2 text-sm sm:text-lg font-medium text-gray-900 dark:text-white"
                    >
                      About Me
                    </label>

                    <textarea
                      type="text"
                      name="aboutMe"
                      id="aboutMe"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Short description about yourself"
                      value={userData.aboutMe}
                      onChange={onInputChange}
                      required=""
                    />
                  </div>
                </>
              )}
            </div>
            <div className="w-full flex justify-between">
              <button
                type="button"
                disabled={step == 1}
                onClick={prevStep}
                className="group mx-3 relative flex w-60 justify-center rounded-md border border-transparent bg-blue-700  py-2 px-4 text-sm md:text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                prev
              </button>
              {step == 3 ? (
                <button
                  onClick={onSubmit}
                  type="button"
                  className="group mx-3 relative flex w-60 justify-center rounded-md border border-transparent bg-blue-700  py-2 px-4 text-sm md:text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>
                  submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="group mx-3 relative flex w-60 justify-center rounded-md border border-transparent bg-blue-700  py-2 px-4 text-sm md:text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
