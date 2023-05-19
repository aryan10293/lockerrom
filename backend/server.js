const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const cors = require('cors')
const cookieParser = require('cookie-parser')
//const tweetRoutes = require("./routes/tweet");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config

//Connect To Database
connectDB();



//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
  app.use(cookieParser("keyboard cat"))
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  require("./config/passport")(passport);
  //Use flash messages for errors, info, ect...
  app.use(flash());


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
  
  //Setup Routes For Which The Server Is Listening
   app.use("/", mainRoutes);
   //app.use("/tweet", tweetRoutes);
// app.post('/login', passport.authenticate('local'), (req, res) => {
//   res.send(req.user);
// });
  //Server Running
  app.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
  });