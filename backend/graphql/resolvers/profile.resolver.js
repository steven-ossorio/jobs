const updateProfile = async (parent, args, contextValue, info) => {
  console.log("hitting update profile");
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
  console.log("fetching profile ", args);
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

const fetchProfiles = async (_, __, { db }) => {
  let userId = 14;
  const profiles = db
    .select(
      "users.email as userEmail",
      db.raw("json_agg(profiles.id) as messages")
    )
    .join("users", "users.id", "profiles.user_id")
    .groupBy("users.id")
    .then((rows) => {
      console.log("the res is ", rows);
    })
    .catch((err) => {
      console.error(err);
    });

  // SELECT users.id, users.email, json_agg(json_build_object('firstName', profiles.first_name, 'lastName', profiles.last_name)) as profiles
  // FROM users
  // JOIN profiles
  // ON users.id = profiles.user_id
  // GROUP BY users.id;

  //   const result = await knex('users')
  // .join('messages', 'users.id', 'messages.user_id')
  // .select(knex.raw("json_agg(json_build_object('message', messages.message, 'created_at', messages.created_at)) as messages"))
  // .groupBy('users.id')
  // .where('users.id', userId);

  // knex
  //   .select("messages.*", "users.name", "users.email")
  //   .from("messages")
  //   .join("users", "messages.user_id", "users.id")
  //   .groupBy("messages.id", "users.id")
  //   .then((rows) => {
  //     console.log(rows);
  //   });
  // users.name, array_agg(orders.order_number) as orders
  // profiles = await db
  //   .select([
  //     "id",
  //     "first_name as firstName",
  //     "last_name as lastName",
  //     "initials",
  //     "about_me as aboutMe",
  //     "company",
  //     "title",
  //     "years_of_experience as yoe",
  //     "is_open_for_work as isOpenForWork",
  //     "recently_laid_off as recentlyLaidOff",
  //     db.raw("ARRAY_AGG(socials.id) as socials"),
  //   ])
  //   .from("profiles")
  //   .join("socials", "socials.user_id", "=", "profiles.user_id")
  //   .groupBy("socials.user_id")
  //   .then((res) => res);
  return [];
  return profiles;

  // knex('users')
  //   .innerJoin('user_emails','users.id','user_emails.user_id')
  //   .select([
  //     'users.id as userID',
  //     'users.name as userName',
  //     knex.raw('ARRAY_AGG(user_emails.adress) as email')
  //   ])
  //   .groupBy('users.id','users.name')

  // knex.raw('select * from users where id = ?', [1])
};

module.exports = {
  updateProfile,
  fetchProfile,
  fetchProfiles,
};
