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

const fetchProfile = async (_, args, contextValue) => {
  const { client } = contextValue;
  const { userId } = args;

  // TODO: Make sure the user id and the token matches
  // Make sure the ID exists in the database
  const getProfileQuery = `
    SELECT id, first_name AS "firstName", last_name AS "lastName", initials, about_me AS "aboutMe", company, title, years_of_experience AS "yoe", is_open_for_work AS "isOpenForWork", recently_laid_off AS "recentlyLaidOff", image_url AS "imageUrl"
    FROM profiles
    WHERE user_id=$1
  `;

  const getProfileData = [userId];
  const profileResult = await client.query(getProfileQuery, getProfileData);
  return profileResult.rows[0];
};

const fetchProfiles = async (_, args, { db, client }) => {
  const {
    isOpenForWork,
    recentlyLaidOff,
    company,
    country,
    state,
    yoe,
    limit,
  } = args;

  const queryParams = [];
  let queryString = `
    SELECT 
    profiles.id AS "id",
    profiles.first_name AS "firstName",
    profiles.last_name AS "lastName",
    profiles.initials,
    profiles.about_me AS "aboutMe",
    profiles.company,
    profiles.title,
    profiles.years_of_experience AS "yoe",
    profiles.is_open_for_work AS "isOpenForWork",
    profiles.recently_laid_off AS "recentlyLaidOff",
    profiles.image_url AS "imageUrl",
    COALESCE(
      json_agg(
        CASE 
          WHEN socials.id IS NULL THEN NULL 
          ELSE json_build_object('id', socials.id, 'name', socials.social_id, 'url', socials.url)
        END
      )
      FILTER (WHERE socials.id IS NOT NULL), '[]'
    ) AS socials
  FROM 
    profiles
  LEFT JOIN
    socials
  ON
    profiles.user_id = socials.user_id`;

  if (isOpenForWork) {
    queryParams.push(isOpenForWork);
    queryString += ` WHERE profiles.is_open_for_work = $${queryParams.length}`;
  }

  if (recentlyLaidOff) {
    queryParams.push(recentlyLaidOff);
    queryString += ` WHERE profiles.recently_laid_off = $${queryParams.length}`;
  }

  if (company) {
    queryParams.push(company);
    queryString += ` WHERE profiles.company = $${queryParams.length}`;
  }

  if (yoe) {
    queryParams.push(yoe);
    queryString += ` WHERE profiles.years_of_experience = $${queryParams.length}`;
  }

  queryString += `
  GROUP BY
    profiles.id
  ORDER BY 
    profiles.created_at DESC
`;

  if (limit) {
    queryParams.push(limit);
    queryString += `LIMIT $${queryParams.length}`;
  }

  const profiles = await client.query(queryString, queryParams);
  return profiles.rows;

  // console.log("result was ", profilesTwo);
  // const query = db("profiles");
  // query.select(
  //   "profiles.id as id",
  //   "profiles.first_name as firstName",
  //   "profiles.last_name as lastName",
  //   "profiles.initials",
  //   "profiles.about_me as aboutMe",
  //   "profiles.company",
  //   "profiles.title",
  //   "profiles.years_of_experience as yoe",
  //   "profiles.is_open_for_work as isOpenForWork",
  //   "profiles.recently_laid_off as recentlyLaidOff",
  //   db.raw(
  //     "json_agg(json_build_object('id', socials.id, 'name', socials.social_id, 'url', socials.url)) as socials"
  //   )
  // );
  // query.leftJoin("socials", "socials.profile_id", "profiles.id");
  // query.groupBy("profiles.id");
  // query.orderBy("profiles.created_at", "desc");
  // if (isOpenForWork) query.where({ is_open_for_work: isOpenForWork });
  // if (recentlyLaidOff) query.where({ recently_laid_off: recentlyLaidOff });
  // if (company) query.where({ company: company });
  // if (country) query.where({ country: country });
  // if (state) query.where({ state: state });
  // if (yoe) query.where({ years_of_experience: yoe });

  // if (limit) query.limit(limit);

  // const profiles = await query
  //   .then((rows) => {
  //     return rows;
  //   })
  //   .catch((error) => {
  //     console.error(err);
  //   });
  // profiles.forEach((profile) => {
  //   console.log(profile.socials);
  // });
  // return profiles;
};

module.exports = {
  updateProfile,
  fetchProfile,
  fetchProfiles,
};
