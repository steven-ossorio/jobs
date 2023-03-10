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

const fetchProfiles = async (_, args, { client }) => {
  const {
    limit,
    company,
    country,
    state,
    yoe,
    isOpenForWork,
    recentlyLaidOff,
  } = args;

  console.log(args);

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
    if (!queryParams.length) {
      queryString += ` WHERE profiles.is_open_for_work = $${
        queryParams.length + 1
      }`;
    } else {
      queryString += ` AND profiles.is_open_for_work = $${
        queryParams.length + 1
      }`;
    }
    queryParams.push(isOpenForWork);
  }

  if (recentlyLaidOff) {
    if (!queryParams.length) {
      queryString += ` WHERE profiles.recently_laid_off = $${
        queryParams.length + 1
      }`;
    } else {
      queryString += ` AND profiles.recently_laid_off = $${
        queryParams.length + 1
      }`;
    }
    queryParams.push(recentlyLaidOff);
  }

  if (company) {
    if (!queryParams.length) {
      queryString += ` WHERE profiles.company = $${queryParams.length + 1}`;
    } else {
      queryString += ` AND profiles.company = $${queryParams.length + 1}`;
    }
    queryParams.push(company);
  }

  if (country) {
    if (!queryParams.length) {
      queryString += ` WHERE profiles.country = $${queryParams.length + 1}`;
    } else {
      queryString += ` AND profiles.country = $${queryParams.length + 1}`;
    }
    queryParams.push(country);
  }

  if (state) {
    if (!queryParams.length) {
      queryString += ` WHERE profiles.state = $${queryParams.length + 1}`;
    } else {
      queryString += ` AND profiles.state = $${queryParams.length + 1}`;
    }
    queryParams.push(state);
  }

  if (yoe) {
    if (!queryParams.length) {
      queryString += ` WHERE profiles.years_of_experience = $${
        queryParams.length + 1
      }`;
    } else {
      queryString += ` AND profiles.years_of_experience = $${
        queryParams.length + 1
      }`;
    }
    queryParams.push(yoe);
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

  console.log(queryString);
  const profiles = await client.query(queryString, queryParams);
  console.log("the profiles are ", profiles);
  return profiles.rows;
};

module.exports = {
  updateProfile,
  fetchProfile,
  fetchProfiles,
};
