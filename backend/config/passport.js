const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

// === GOOGLE STRATEGY ===
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists using Google ID or Email
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
        }
        if (!user) {
          user = new User({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: "donor",
            isEmailConfirmed: true,

            // Extract additional profile info
            gender: profile.gender || "Not specified",
            dob: profile._json.birthday || null,
            phone: profile._json.phoneNumber || "",
            address: profile._json.address || "",
            isOAuthUser: true,
          });

          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// === GITHUB STRATEGY ===
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const rawEmail = profile.emails?.[0]?.value;
        const fallbackEmail = `${profile.username}@github-oauth.local`;
        const email = rawEmail || fallbackEmail;
        const isEmailReal = !!rawEmail;

        // Try to find by GitHub ID first
        let user = await User.findOne({ githubId: profile.id });

        // If not found by githubId, try by email (to avoid duplicate accounts)
        if (!user) {
          user = await User.findOne({ email });
        }

        if (!user) {
          // Create new user
          user = new User({
            githubId: profile.id,
            username: profile.username,
            email,
            isEmailReal,
            role: "donor",
            isEmailConfirmed: isEmailReal, // Only confirm if email is real
            isOAuthUser: true,
          });

          await user.save();
        } else if (!user.githubId) {
          // Link GitHub ID if user exists with same email but no GitHub ID
          user.githubId = profile.id;
          if (!user.isEmailReal && isEmailReal) {
            user.email = rawEmail;
            user.isEmailReal = true;
            user.isEmailConfirmed = true;
          }
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);



// === SERIALIZATION (common) ===

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
