const buildDB = async (db) => {
  db.schema.hasTable("users").then((exists) => {
    if (!exists) {
      return db.schema.createTable("users", (table) => {
        table.increments();
        table.string("email").unique();
        table.string("password");
        table.timestamps(true, true);
      });
    }
  });

  db.schema.hasTable("profiles").then((exists) => {
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

  db.schema.hasTable("socials_table").then((exists) => {
    if (!exists) {
      return db.schema.createTable("socials_table", (table) => {
        table.increments();
        table.string("name");
        table.timestamps(true, true);
      });
    }
  });

  db.schema.hasTable("socials").then((exists) => {
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

  db.schema.hasTable("jobs").then((exists) => {
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
};

module.exports = buildDB;
