const MiniProfile = ({
  imageUrl,
  firstName,
  lastName,
  initials,
  title,
  company,
}) => {
  // const initials = firstName[0] + lastName[0];
  return (
    <div className="w-4/5 md:w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-1">
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
          <div className="absolute top-6 left-10 z-30 text-sm">
            MUST SIGN IN TO SEE SOCIALS
          </div>
          <div className="flex mt-4 space-x-3 md:mt-6 blur-md">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add friend
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
