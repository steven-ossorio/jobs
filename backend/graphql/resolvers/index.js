const {
  updateProfile,
  fetchProfile,
  fetchProfiles,
} = require("./profile.resolver");
const { signup, signin } = require("./user.resolver");

const resolvers = {
  Query: {
    fetchProfile: fetchProfile,
    fetchProfiles: fetchProfiles,
  },
  Mutation: {
    register: signup,
    login: signin,
    updateProfile: updateProfile,
  },
};

module.exports = resolvers;
