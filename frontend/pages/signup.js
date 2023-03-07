import { UserContext } from "@/context/user.context";
import { SIGN_UP_USER } from "@/graphql/mutations/auth.mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const SignUp = () => {
  const { loginUser } = useContext(UserContext);
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    title: "",
    country: "",
    state: "",
  });

  const [signup] = useMutation(SIGN_UP_USER, {
    variables: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      title: userData.title,
      email: userData.email,
      password: userData.password,
    },
  });
  console.log(userData);
  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onCountryChange = (country) => {
    setUserData({ ...userData, country: country });
  };

  const onStateChange = (state) => {
    setUserData({ ...userData, state: state });
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
          <form action="#">
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
              </div>{" "}
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
            <div className="my-5">
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
            <button
              onClick={onSubmit}
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-700  py-2 px-4 text-sm md:text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
