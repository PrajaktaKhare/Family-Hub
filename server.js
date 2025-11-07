//run server
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { connectToDB, feedAppsInDatabase, feedUsers } from './database/dbInit.js'
import userRouter from './backend/routes/userRoutes.js';
import deviceRouter from './backend/routes/deviceRouter.js'
import appRouter from './backend/routes/appRoutes.js'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './backend/graphql/schema.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initLocalStrategies from './passportjs-strategies/local-strategies.js'
import { create } from 'express-handlebars'



// setup handlebars view engine
const app = express();

const hbs = create({
  helpers: {
    eq: (a, b) => a === b,
  },
  defaultLayout: 'home',

});

//setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

const PORT = process.env.PORT || 5000;

async function startServer() {

  //connect to db
  connectToDB();
  feedAppsInDatabase();
  feedUsers();

  //middleware -->express.json
  //app.use(express.json());

  // For URL-encoded form submissions (like from HTML forms)
  app.use(express.urlencoded({ extended: true }));

  // cookie-parser first
  app.use(cookieParser());


  app.use(session({
    secret: process.env.SESSION_SECRET || 'FAMILYHUB007',                                  //should be more complex 
    saveUninitialized: false,                                 //will not save random useless sessions
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      dbName: 'familyhub',
      ttl: 24 * 60 * 60
    }),
    cookie: {
      maxAge: 1000 * 24 * 60 * 60,                                     //cookie is valid only for 1 DAY
    },
  })
  );


  //passport init
  app.use(passport.initialize());
  app.use(passport.session());


  app.use((req, res, next) => {
    console.log("Current logged-in user:", req.user);
    if (req.user) {
      res.locals.user = req.user.toObject ? req.user.toObject() : req.user;
    } else {
      res.locals.user = null; // Passport sets req.user if logged in
    }
    next();
  });

  initLocalStrategies(passport);

  // Routing REST endpoints
  app.use('/api/users', userRouter);
  app.use('/api/devices', deviceRouter);
  app.use('/api/apps', appRouter);

  app.get('/', (req, res) => {
    res.render('login');
  });


  //graphQl ENdpoints
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();


  // Add CORS, body-parser, and Apollo middleware for GraphQL
  app.use(
    '/graphql',
    cors(),
    express.json(), // JSON body parsing for Apollo
    bodyParser.json(),
    expressMiddleware(apolloServer)
  );


  //start server
  app.listen(PORT, () => {
    console.log("Server connected.. " + PORT);

  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
