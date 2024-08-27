const passport = require("passport");
const db = require("../db/queries");
const LocalStrategy = require("passport-local").Strategy;
const hash = require("./hash")

passport.use(
  new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
    try {
      const user = await db.getUser(email);

      if (!user) {
        return done(null, false, { message: "Email does not exist." });
      }

      // comparing hashes
      const match = await hash.compareHashes(password, user.password);
      if (!match) {
        return done(null, false, { message: "Invalid password." });
      }

      // successful login
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// when login successful, give user object
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// to keep user logged in, make sure the id
// that we serialized is still valid
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserFromID(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
