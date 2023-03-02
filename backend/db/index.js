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

const buildDB = async (db, dropTables = false) => {
  if (dropTables) {
    await db.schema.dropTableIfExists("jobs");
    await db.schema.dropTableIfExists("socials");
    await db.schema.dropTableIfExists("socials_table");
    await db.schema.dropTableIfExists("profiles");
    await db.schema.dropTableIfExists("users");
  }

  await db.schema.hasTable("users").then((exists) => {
    if (!exists) {
      return db.schema.createTable("users", (table) => {
        table.increments();
        table.string("email").unique();
        table.string("password");
        table.timestamps(true, true);
      });
    }
  });

  await db.schema.hasTable("profiles").then((exists) => {
    if (!exists) {
      return db.schema.createTable("profiles", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.string("first_name");
        table.string("last_name");
        table.string("initials");
        table.string("about_me");
        table.string("company");
        table.string("title");
        table.tinyint("years_of_experience");
        table.boolean("is_open_for_work").defaultTo(false);
        table.boolean("recently_laid_off").defaultTo(false);
        table.string("image_url");
        table.string("resume_url");
        table.timestamps(true, true);
      });
    }
  });

  await db.schema.hasTable("socials_table").then((exists) => {
    if (!exists) {
      return db.schema.createTable("socials_table", (table) => {
        table.increments();
        table.string("name");
        table.timestamps(true, true);
      });
    }
  });

  await db.schema.hasTable("socials").then((exists) => {
    if (!exists) {
      return db.schema.createTable("socials", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.integer("profile_id").unsigned();
        table.foreign("profile_id").references("id").inTable("profiles");
        table.integer("social_id").unsigned();
        table.foreign("social_id").references("id").inTable("socials_table");
        table.string("url");
        table.timestamps(true, true);
      });
    }
  });

  await db.schema.hasTable("jobs").then((exists) => {
    if (!exists) {
      return db.schema.createTable("jobs", (table) => {
        table.increments();
        table.integer("user_id").unsigned();
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.string("title");
        table.string("company");
        table.string("description");
        table.string("url");
        table.timestamps(true, true);
      });
    }
  });

  if (dropTables) {
    socialTableData.forEach(async ({ name }) => {
      await db("socials_table")
        .insert({
          name: name,
        })
        .then();
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
        await db
          .transaction(function (trx) {
            trx
              .insert({ email: email, password: hashedPassword })
              .into("users")
              .returning("id")
              .then((res) => {
                const { id } = res[0];
                return trx
                  .insert({
                    first_name: firstName,
                    last_name: lastName,
                    initials: firstName[0] + lastName[0],
                    title: title,
                    user_id: id,
                    years_of_experience: yoe,
                    company: company,
                    about_me: aboutMe,
                    recently_laid_off: recentlyLaidOff,
                    is_open_for_work: isOpenForWork,
                    image_url: imageUrl,
                  })
                  .into("profiles")
                  .then();
              })
              .then(trx.commit)
              .catch(trx.rollback);
          })
          .then(function (resp) {
            return resp[0];
          })
          .catch((err) => {
            console.log("there was an err of ", err);
          });
      }
    );
  }
};

module.exports = buildDB;
