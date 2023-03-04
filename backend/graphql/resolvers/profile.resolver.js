const updateProfile = async (parent, args, contextValue, info) => {
  const {
    id,
    firstName,
    lastName,
    aboutMe,
    company,
    title,
    yoe,
    isOpenForWork,
    recentlyLaidOff,
    imageUrl,
    resume,
  } = args;
  const { db } = contextValue;
  const initials = firstName[0] + lastName[0];
  const result = await db
    .from("profiles")
    .where("user_id", id)
    .update({
      first_name: firstName,
      last_name: lastName,
      initials: initials,
      about_me: aboutMe,
      company: company,
      title: title,
      years_of_experience: yoe,
      is_open_for_work: isOpenForWork,
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
  const { db } = contextValue;
  const { userId } = args;

  // TODO: Make sure the user id and the token matches
  // Make sure the ID exists in the database
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

const fetchProfiles = async (_, args, { db }) => {
  console.log("getting profiles");
  const {
    isOpenForWork,
    recentlyLaidOff,
    company,
    country,
    state,
    yoe,
    limit,
  } = args;

  const query = db("profiles");
  query.select(
    "profiles.id as id",
    "profiles.first_name as firstName",
    "profiles.last_name as lastName",
    "profiles.initials",
    "profiles.about_me as aboutMe",
    "profiles.company",
    "profiles.title",
    "profiles.years_of_experience as yoe",
    "profiles.is_open_for_work as isOpenForWork",
    "profiles.recently_laid_off as recentlyLaidOff",
    db.raw(
      "json_agg(json_build_object('id', socials.id, 'name', socials.social_id, 'url', socials.url)) as socials"
    )
  );
  query.leftJoin("socials", "socials.profile_id", "profiles.id");
  query.groupBy("profiles.id");
  query.orderBy("profiles.created_at", "desc");
  if (isOpenForWork) query.where({ is_open_for_work: isOpenForWork });
  if (recentlyLaidOff) query.where({ recently_laid_off: recentlyLaidOff });
  if (company) query.where({ company: company });
  if (country) query.where({ country: country });
  if (state) query.where({ state: state });
  if (yoe) query.where({ years_of_experience: yoe });

  if (limit) query.limit(limit);

  const profiles = await query
    .then((rows) => {
      return rows;
    })
    .catch((error) => {
      console.error(err);
    });
  profiles.forEach((profile) => {
    console.log(profile.socials);
  });
  return profiles;
};

module.exports = {
  updateProfile,
  fetchProfile,
  fetchProfiles,
};
