const { hash } = require("bcrypt");

const socialTableData = [
  { name: "facebook" },
  { name: "linkedin" },
  { name: "website" },
  { name: "instagram" },
  { name: "github" },
];

const users = [
  {
    firstName: "Steven",
    lastName: "Mclaren",
    email: "s@m.com",
    password: "123456",
    title: "Software Engineer",
    yoe: 2,
    aboutMe:
      "Your typical software engineer who is seeking a challenging career in development ",
    company: "Google",
    isOpenForWork: true,
    recentlyLaidOff: true,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/02/24/86/95/1000_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
  },
  {
    firstName: "Jennifer",
    lastName: "Klaren",
    email: "j@k.com",
    password: "123456",
    title: "Recruiter",
    yoe: 1,
    aboutMe: "Saerching for the best and finest for my employer",
    company: null,
    isOpenForWork: true,
    recentlyLaidOff: false,
    imageUrl: null,
  },
  {
    firstName: "Alyson",
    lastName: "Fimber",
    email: "A@F.com",
    password: "123456",
    title: "",
    yoe: null,
    aboutMe: "",
    company: null,
    isOpenForWork: true,
    recentlyLaidOff: false,
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    firstName: "Mick",
    lastName: "Schumacher",
    email: "m@s.com",
    password: "123456",
    title: "Driver",
    yoe: 2,
    aboutMe: "",
    company: "Adver Space",
    isOpenForWork: true,
    recentlyLaidOff: true,
    imageUrl: null,
  },
  {
    firstName: "Johnson",
    lastName: "Femner",
    email: "J@F.com",
    password: "123456",
    title: "Product Manager",
    yoe: 3,
    aboutMe: "",
    company: "Microsoft",
    isOpenForWork: true,
    recentlyLaidOff: false,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/02/24/86/95/1000_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
  },
  {
    firstName: "Clare",
    lastName: "Foxster",
    email: "c@f.com",
    password: "123456",
    title: "Founder",
    yoe: null,
    aboutMe:
      "CEO and Founder of Space Tech Recruiting. Aiming to revolutonize the industry and provide a better job search",
    company: "Space Tech Recruiting",
    isOpenForWork: false,
    recentlyLaidOff: false,
    imageUrl: null,
  },
];

const buildDB = async (client, dropTables = true) => {
  if (!dropTables) return;
  await client.query("DROP TABLE IF EXISTS jobs");
  await client.query("DROP TABLE IF EXISTS socials");
  await client.query("DROP TABLE IF EXISTS socials_table");
  await client.query("DROP TABLE IF EXISTS profiles");
  await client.query("DROP TABLE IF EXISTS users");

  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
    `;

  const createProfileTableQuery = `
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      initials CHAR(2) NOT NULL,
      about_me TEXT,
      company VARCHAR(255),
      title VARCHAR(255),
      years_of_experience INTEGER,
      is_open_for_work BOOLEAN DEFAULT true,
      recently_laid_off BOOLEAN DEFAULT false,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const createAllSocialsTable = `
    CREATE TABLE IF NOT EXISTS socials_table (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const createSocialsTableQuery = `
    CREATE TABLE socials (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      social_id INTEGER REFERENCES socials_table(id),
      url TEXT NOT NULL
    );
  `;

  await client.query(createUserTableQuery);
  await client.query(createProfileTableQuery);
  await client.query(createAllSocialsTable);
  await client.query(createSocialsTableQuery);

  if (dropTables) {
    socialTableData.forEach(async ({ name }) => {
      const userQuery =
        "INSERT INTO socials_table (name) VALUES ($1) RETURNING id";
      const userData = [name];
      await client.query(userQuery, userData);
    });

    users.forEach(
      async ({
        firstName,
        lastName,
        title,
        email,
        password,
        yoe,
        company,
        aboutMe,
        isOpenForWork,
        recentlyLaidOff,
        imageUrl,
      }) => {
        const hashedPassword = await hash(
          password,
          Number(process.env.SALT_ROUNDS)
        );

        try {
          await client.query("BEGIN");

          // Insert user data
          const userQuery =
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
          const userData = [email, hashedPassword];
          const userResult = await client.query(userQuery, userData);

          const userId = userResult.rows[0].id;

          // Insert profile data
          const profileQuery =
            "INSERT INTO profiles (user_id, first_name, last_name, initials, about_me, company, title, years_of_experience, is_open_for_work, recently_laid_off, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
          const profileData = [
            userId,
            firstName,
            lastName,
            firstName[0] + lastName[0],
            aboutMe,
            company,
            title,
            yoe,
            isOpenForWork,
            recentlyLaidOff,
            imageUrl,
          ];

          await client.query(profileQuery, profileData);

          await client.query("COMMIT");

          console.log("Transaction completed successfully!");
        } catch (error) {
          await client.query("ROLLBACK");
          console.error("Transaction failed:", error);
        }
      }
    );
  }
};

module.exports = buildDB;
