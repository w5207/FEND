# Project 

This project will build a web tool to run Natural Language Processing (NLP) on articles or blogs.

The goal of this project is to give you practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

# API
You can find the API [here](https://www.meaningcloud.com/developer/sentiment-analysis). 
Once you create an account with MeaningCloud, you will be given a license key to start using the API.
## Set up the API
1. Use npm to install the dotenv package
```
npm install dotenv
```
2. Create a new .env file in the root of your project.
3. Fill the .env file with your API keys like this:
```
API_KEY=**************************
```

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
npm run build-dev
```
## Run in production mode
Generate the dist files and then start server at port 3000
```
npm run build-prod
npm run start
```



