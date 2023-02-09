const updateProfile = async (parent, args, contextValue, info) => {
  console.log("hitting update profile");
  const {
    id,
    firstName,
    lastName,
    company,
    title,
    aboutMe,
    yoe,
    openForWork,
    recentlyLaidOff,
    imageUrl,
    resume,
  } = args;
  console.log(args);
  const { db } = contextValue;
  const initials = firstName[0] + lastName[0];
  const result = await db
    .from("profiles")
    .where("user_id", id)
    .update({
      first_name: firstName,
      last_name: lastName,
      initials: initials,
      company: company,
      title: title,
      years_of_experience: yoe,
      is_open_for_work: openForWork,
      image_url: imageUrl,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return {};
};

const updateObjectProperties = (obj) => {
  const {
    id,
    first_name,
    last_name,
    initials,
    about_me,
    company,
    title,
    years_of_experience,
    is_open_for_work,
    recently_laid_off,
  } = obj;

  return {
    id,
    firstName: first_name,
    lastName: last_name,
    initials,
    aboutMe: about_me,
    company,
    title,
    yoe: years_of_experience,
    isOpenForWork: is_open_for_work,
    recentlyLaidOff: recently_laid_off,
  };
};

const fetchProfile = async (_, args, contextValue) => {
  console.log("fetching profile ", args);
  const { db } = contextValue;
  const { userId } = args;

  // TODO: Make sure the user id and the token matches
  // Make sure the ID exists in the database
  console.log(typeof userId, userId);
  const userProfile = await db
    .select(
      "id",
      "first_name",
      "last_name",
      "initials",
      "about_me",
      "company",
      "title",
      "years_of_experience",
      "is_open_for_work",
      "recently_laid_off"
    )
    .from("profiles")
    .where("user_id", userId)
    .then((res) => {
      console.log("res is ", res);
      return res[0];
    })
    .catch((err) => console.log(err));

  return updateObjectProperties(userProfile);
};

// userProfile will be undefined if profile doesn't exist
// If it exists res[0] is where we get the user

module.exports = {
  updateProfile,
  fetchProfile,
};
