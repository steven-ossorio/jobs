const { updateProfile, fetchProfile } = require("./profile.resolver");
const { signup, signin } = require("./user.resolver");

const resolvers = {
  Query: {
    fetchProfile: fetchProfile,
  },
  Mutation: {
    register: signup,
    login: signin,
    updateProfile: updateProfile,
  },
};

module.exports = resolvers;
