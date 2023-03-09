const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");
const { GraphQLError } = require("graphql");

const signToken = async (user) => {
  return await jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2d",
    }
  );
};

const checkPassword = (password, realPassword) =>
  compare(password, realPassword);

const signup = async (_, args, contextValue) => {
  const {
    email,
    password,
    firstName,
    lastName,
    country,
    state,
    company,
    title,
    isOpenForWork,
    recentlyLaidOff,
    yoe,
    skills,
    linkedin,
    website,
    aboutMe,
  } = args;
  const { client } = contextValue;
  const hashedPassword = await hash(password, Number(process.env.SALT_ROUNDS));

  try {
    await client.query("BEGIN");
    // Insert user data
    const userQuery =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email";
    const userData = [email, hashedPassword];
    const userResult = await client.query(userQuery, userData);

    const userId = userResult.rows[0].id;

    // Insert profile data
    const profileQuery =
      "INSERT INTO profiles (user_id, first_name, last_name, initials, country, state, company, title, is_open_for_work, recently_laid_off, years_of_experience, about_me) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";
    const profileData = [
      userId,
      firstName,
      lastName,
      firstName[0] + lastName[0],
      country,
      state,
      company,
      title,
      isOpenForWork,
      recentlyLaidOff,
      yoe,
      aboutMe,
    ];

    await client.query(profileQuery, profileData);
    await client.query("COMMIT");

    const user = userResult.rows[0];
    const token = signToken(user);

    return {
      token,
      user,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Transaction failed:", error);
    throw new GraphQLError({
      extensions: {
        code: "INTERNAL_ERROR",
      },
    });
  }
};

const signin = async (_, args, contextValue) => {
  const { email, password } = args;
  const { db, client } = contextValue;

  try {
    const userResult = await client.query(
      `
      SELECT id, email, password
      FROM users
      WHERE email=$1
    `,
      [email]
    );

    if (!userResult.rows) {
      throw new GraphQLError("Incorrect email and password", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    }

    const user = userResult.rows[0];

    const isValidPassword = await checkPassword(password, user.password);
    if (!isValidPassword) {
      throw new GraphQLError("Incorrect email and password", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    }

    const token = signToken(user);

    return {
      token,
      user,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Transaction failed:", error);
    throw new GraphQLError({
      extensions: {
        code: "INTERNAL_ERROR",
      },
    });
  }
};

module.exports = {
  signin,
  signup,
};
