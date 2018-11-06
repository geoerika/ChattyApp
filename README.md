Chatty App
=====================

A minimal and light dev environment for ReactJS based on a boilerplate project. ChattyApp is a multi-user chat application.

## Final Product

!["Screenshot of ChattyApp main page"](https://raw.githubusercontent.com/geoerika/ChattyApp/master/client/Docs/ChattyApp_main_page.png)

## Dependencies

Client
* Babel
* CSS-loader
* Node
* Node-sass
* React
* ReactDOM
* Sass-loader
* Socksjs-client
* Style-loader
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

Chatty_Server
* Express
* Uuid
* WS

## Getting Started

    Install all dependencies for both client and server. Start the server and connect a client with `npm start` for both client and server. The page application can be accesed in the browser at `http://localhost:3000`.
    
    `npm install`
    `npm start`
    `open http://localhost:300`
    
## Usage

    Upon connection, a user will be assigned a colour. There can be multiple users connected from different browser windows, chatting with each other. They can type messages and change names.

    Work in progress: a user can copy in the message box an url image (jpeg, png, gif) from the image folder on the client side. The image will be sent and displayed to all other connected users. At this point, a user cannot send a message and an image at the same time.
