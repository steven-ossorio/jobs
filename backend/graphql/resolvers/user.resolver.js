// {
//     id: 1,
//     firstName: "Bonnie",
//     lastName: "Green",
//     initials: "BG",
//     imageUrl:
//       "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     title: "Visual Designer",
//     company: "Google",
//     openForWork: false,
//     socials: [
//       { facebook: "" },
//       { linkedIn: "" },
//       { gitHub: "" },
//       { website: "" },
//     ],
//   },
//   {
//     id: 2,
//     firstName: "Steve",
//     lastName: "Oss",
//     initials: "SO",
//     imageUrl:
//       "https://as2.ftcdn.net/v2/jpg/02/24/86/95/1000_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
//     title: "Frontend Developer",
//     company: "",
//     openForWork: false,
//     socials: [
//       { facebook: "" },
//       { linkedIn: "" },
//       { gitHub: "" },
//       { website: "" },
//     ],
//   },
//   {
//     id: 3,
//     firstName: "Mike",
//     lastName: "Miller",
//     initials: "MM",
//     imageUrl:
//       "https://as2.ftcdn.net/v2/jpg/02/24/86/95/1000_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
//     title: "Frontend Developer",
//     company: "",
//     openForWork: false,
//     socials: [
//       { facebook: "" },
//       { linkedIn: "" },
//       { gitHub: "" },
//       { website: "" },
//     ],
//   },
//   {
//     id: 4,
//     firstName: "Jen",
//     lastName: "Lu",
//     initials: "JL",
//     imageUrl: "",
//     title: "Frontend Developer",
//     company: "",
//     openForWork: false,
//     socials: [
//       { facebook: "" },
//       { linkedIn: "" },
//       { gitHub: "" },
//       { website: "" },
//     ],
//   },

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
  console.log("starting register ", args);
  const { email, password, firstName, lastName, title } = args;
  const { db } = contextValue;
  const hashedPassword = await hash(password, Number(process.env.SALT_ROUNDS));
  const user = await db
    .transaction(function (trx) {
      trx
        .insert({ email: email, password: hashedPassword })
        .into("users")
        .returning("id")
        .then((res) => {
          const { id } = res[0];
          console.log("id is ", id);
          return trx
            .insert({
              first_name: firstName,
              last_name: lastName,
              initials: firstName[0] + lastName[0],
              title: title,
              user_id: id,
            })
            .into("profiles")
            .then(() => {
              return trx("users")
                .where("users.id", id)
                .select("*")
                .returning(["id, email"]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(function (resp) {
      return resp[0];
    })
    .catch((err) => {
      console.log("err is ", err);
      throw new GraphQLError({
        extensions: {
          code: "INTERNAL_ERROR",
        },
      });
    });

  const token = signToken(user);

  return {
    token,
    user,
  };
};

const signin = async (_, args, contextValue) => {
  const { email, password } = args;
  const { db } = contextValue;

  const user = await db
    .select("id", "email", "password")
    .from("users")
    .where("email", email)
    .returning(["id", "email", "password"])
    .then((res) => res[0])
    .catch(() => {
      throw new GraphQLError({
        extensions: {
          code: "INTERNAL_ERROR",
        },
      });
    });

  if (!user) {
    throw new GraphQLError("Incorrect email and password", {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }

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
};

module.exports = {
  signin,
  signup,
};
