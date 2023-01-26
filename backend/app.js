require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const knex = require("knex");
const typeDefs = require("./graphql/types");
const resolvers = require("./graphql/resolvers");

const db = knex({
  client: "postgres",
  connection: {
    host: "localhost",
    port: 5432,
    user: "",
    password: "",
    database: "jobs",
  },
});

// db.schema
//   .createTable("profiles", function (table) {
//     table.increments();
//     table.integer("user_id").unsigned();
//     table
//       .foreign("user_id")
//       .references("id")
//       .inTable("users")
//       .onDelete("CASCADE");
//     table.string("first_name");
//     table.string("last_name");
//     table.string("initials");
//     table.string("image_url");
//     table.string("title");
//     table.string("company");
//     table.boolean("is_open_for_work").defaultTo(false);
//     table.tinyint("years_of_experience");
//     table.timestamps(true, true);
//   })
//   .then();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const main = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async () => ({ db: db }),
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
