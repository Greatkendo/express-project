// importing express as a module
import express from 'express'
const app = express();
const port = 4000;

// importing fs file from node fs
import fs from 'node:fs'

// importing nodemon as a module for easy update
import nodemon from 'nodemon'

// a line of code(middleware) that shows that the website is only open from 9am - 5pm
const timeRestrictionMiddleware = (req, res, next) => {
 const currentHour = new Date().getHours(); //get the current hour
 const openDays = new Date().getDay(); //days of operation
 const openHour = 9; //open hour is 9am mon - fri
 const closeHour = 17; //closing hour is 5pm mon - fri
 const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; //these are the workdays in an array

 //checking if the current time and days is within the allowed range
 if (workDays.includes(workDays[openDays]) && currentHour >= openHour && currentHour < closeHour) {
  return next(); //continue to the next middleware
 }else{
  res.status(403).send("The website is only accessible for 9am to 5pm Monday to Friday")
 };
};

// applying the middleware to all routes
app.use(timeRestrictionMiddleware);

// using third party middleware to make your css file effective
app.use(express.static('public'));

// writing a middleware route for about
app.get("/", (req, res) => {
 // creating an fs file to be read
 const homePageContent = fs.readFileSync("public/home.html", "utf-8");
 res.status(200).send(homePageContent);
});

// writing a middleware route for about
app.get("/about", (req, res) => {
 // creating an fs file to be read
 const aboutPageContent = fs.readFileSync("public/about.html", "utf-8");
 res.status(200).send(aboutPageContent);
});

// writing a middleware route for contact
app.get("/contact", (req, res) => {
 // creating an fs file to be read
 const contactPageContent = fs.readFileSync("public/contact.html", "utf-8");
 res.status(200).send(contactPageContent);
});

// writing a middleware route for services
app.get("/services", (req, res) => {
 // creating an fs file to be read
 const servicePageContact = fs.readFileSync("public/services.html", "utf-8")
 res.status(200).send(servicePageContact);
});

// this enable the server to run
app.listen(port, () => {
 console.log("Server running successfully");
})