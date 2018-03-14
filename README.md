# Quiz Sample Application

This project is a quiz sample to demonstrate a single page application. "client" folder is the app using React and Redux. "server" folder is the API server for the app which is coding with Express.js.

## Getting Started

### Prerequisites

This project needs to install node.js first.
Then run npm install to install the dependencies library before starting the app and server.

```
npm install
```

### Running Server and App

The server is running on http://localhost:3001/, to start the API server, go to the "server" folder, run the following command

```
node server.js
```

The client is running on http://localhost:3000/, to start the app, go to the "client" folder, run the following command

```
npm start
```


## Front-End Overview

### View Component
The app mainly has two view which is in the "src/component" folder. Home.js showing the start page of the app. Quiz.js is a page to show a list of quizzes and each quiz is defined in QuizItem.js.

The connect function from React-Redux had been used on the react component. It maps part of state tree and action to the component's property. The component can access the state data and dispatch actions using this.props

### Redux Store
This app using the Redux to manage the state. The redux store is created under the "src/config" folder. Redux-thunk and Redux-logger had added as middleware here for asynchronous action and debug.

### Redux Reducer
The app has only one reducer in "src/reducer" to update the state tree, the state tree structure:

quiz {
    isLoading  : boolen,
    quizStart  : boolen,
    loadFail   : boolen,
    loadErrMsg : string,
    quizData {
        index    : [array of quiz id],
        quizHash : { index:{quiz object} }
    }
}

The quizHash will store key-value object, key as indxe, value as quiz objects, the quiz object as:
 {
     id,
     quizContent,
     isMarked, 
     result,
     isChecking,
     checkErr,
     checkErrMsg
 }

### Redux Action
Action is under "src/action" folder. Dispatch different action will trigger the reducer to update the state tree accordingly. 


## API server

The api server will handle the API request form app.

POST /quiz will return Json format data which is an array of objects { id, quizContent }

GET /solution/id will return Json format data of object { id, quizContent, result }
