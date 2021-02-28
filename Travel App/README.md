# Project 

This project built out a travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

Walkthrough of this project:
1. Got my basic project setup and functioning in Visual Studio Code (HTML, installed SASS, wrote styles and set up a local server)
2. Installed and configured Webpack (+ essential loaders and plugins)
3. Set up async requests to fetch destination image and weather, based on user input, obtained from when the form is submitted by the user
4. Refactored code, installed plugins to minify CSS and ran testing with JEST 
5. Designed responsive web layout

# Features:
- Include a simple form where you enter the location you are traveling to and the date you are leaving. 
- Display the weather forecast of your destination.
- Display the photo of your destination.

## Extended features:
- Add end date and display length of trip.

# Instructions

Fork this repo and begin your project setup.

Once you clone, you need to install everything:
`cd` into your new folder and run:
```
npm install
```
## Run in development mode
To start the webpack dev server at port 8080
```
npm run dev
```
## Run in production mode
Generate the dist files and then start server at port 3000
```
npm run prod && npm start
```

The app should be running on localhost:3000 now.