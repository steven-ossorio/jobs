const { signup } = require("./user.resolver");

const resolvers = {
  Query: {
    books: signup,
  },
  Mutation: {
    books: signup,
    register: signup,
  },
};

module.exports = resolvers;
