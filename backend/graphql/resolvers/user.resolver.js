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

const signup = async (parent, args, contextValue, info) => {
  const { email, password, firstName, lastName, title } = args;
  const { db } = contextValue;

  const user = await db
    .transaction(function (trx) {
      trx
        .insert({ email: email, password: password })
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
            })
            .into("profiles")
            .then(() => {
              return trx("users").where("users.id", id).select("id");
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(function (resp) {
      console.log(resp);
      return resp[0];
    })
    .catch(function (err) {
      console.error("err is ", err);
    });

  // Create User
  // Create Profile
  // If both successful, tokenize data (ID)
  // Return ID + Token
  // Used to login user -> look into server auth vs client
  console.log("user is ", user);
  return user;
};

module.exports = {
  signup,
};
