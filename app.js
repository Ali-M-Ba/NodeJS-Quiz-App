import express from "express";
import router from './routes/routes.js';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'very_strong_key', // replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 20 * 60 * 1000 // 20 minutes in milliseconds
  }
}));

// This middleware resets the session timeout on each request,
// so the user remains logged in as long as they are active.
app.use((req, res, next) => {
  if (req.session) {
    req.session.cookie.maxAge = 20 * 60 * 1000; // Reset the session expiration time
  }
  next();
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.use('/', router)