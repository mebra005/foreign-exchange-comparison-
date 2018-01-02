# Foreign Exchange Comparison



## Prerequisites

You must have [**node**](http://nodejs.org/) installed. 

Install [**MongoDb**](http://www.mongodb.org/) in order to run the app with the MongoDb database.

Install [**Nodemon**](https://github.com/remy/nodemon) to run node.

# Run it

This app requires *three* servers

* MongoDb database server
* backend data server 
* frontend server for the client-side app and its assets

Start them separately.

## Start the MongoDb server

Assuming that the `MongoDb` is installed on your machine.
* open a terminal/command window
* run `c:\Program Files\MongoDB\Server\3.4\bin\mongod.exe` (This might be different on your machine)

## Start the backend data server

* open a terminal or command window
* go to the `backend` directory
* run `npm install` (Only the first time)
* run `nodemon`   OR   run `node app.js`


The terminal window tells you that the server is running

Now you can access the backend at `http://localhost:3000`

[Postman chrome plugin](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en) is a great API exploration tool. 


## Start the frontend server

* open a terminal or command window
* go to the `client` directory
* run `npm install` (Only the first time)
* run `ng serve`


Now you can access the demo at `http://localhost:4200`


## Directory Structure

The following is a quick orientation to the salient structural features of this application

    /server                  - the node-express-mongo data server
       /bin/www               - the launch point for the server
       /controller
       /models
       /node_module
       /public                - static client assets ... there are none as this is a data server
       /routes                - the router for the data api
       /services              - All the logics to CRUD
            /statistics       - All the formulas to calculate fees for each company
       /view
       app.js                 - the express server

    
    /client                        - the client application written with angular 
        /e2e
        /node_modules
        /src
            /app
                /admin             - Admin Panel - Add, Edit, Remove data
                /home              - Home Panel - Calculates FX
                /shared
                    /models        - Models (interfaces)
                    /services      - access the data service
                        /fees      - seperate services for each company
