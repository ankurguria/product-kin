const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
      console.log(email, password);
      pool.query(
        `SELECT * FROM users
            WHERE email = $1`,
        [email],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log("ivide",results.rows);
  
          if (results.rows.length > 0) {
            const user = results.rows[0];
  
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                throw err;
              }
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password is incorrect" });
              }
            });
          } else {
            return done(null, false, {
              message: "No user with that email address",
            });
          }
        }
      );
    };
  
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        authenticateUser
      )
    );
    passport.serializeUser((user, done) => done(null, user.user_id));
  
    passport.deserializeUser((user_id, done) => {
        console.log("hello");
      pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id], (err, results) => {
        if (err) {
          return done(err);
        }
        console.log(`ID is ${results.rows[0].user_id}`);
        return done(null, results.rows[0]);
      });
    });
  }
  
  module.exports = initialize;