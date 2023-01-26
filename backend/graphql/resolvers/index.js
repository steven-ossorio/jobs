const { signup, signin } = require("./user.resolver");

const resolvers = {
  Query: {
    books: signup,
  },
  Mutation: {
    register: signup,
    login: signin,
  },
};

module.exports = resolvers;
