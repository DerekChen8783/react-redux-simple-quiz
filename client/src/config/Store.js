import { createStore, applyMiddleware,combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import {quizReducer} from "../reducer/QuizReducer";


const middleware = applyMiddleware(thunk,logger);

const store = createStore(

    combineReducers({
        quiz: quizReducer
    }),
    middleware
);

export default store;