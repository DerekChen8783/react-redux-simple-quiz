import { actionType } from '../constant/actionType';

const initState = {
    quizData: null,
    isLoading: false,
    loadFail: false,
    loadErrMsg: null,
    quizStart: false
};

export const quizReducer = (state = initState, action) => {
    const nextState = { ...state };
    switch (action.type) {
        case actionType.loadingQuiz:
            return Object.assign({}, state, {
                isLoading: true
            });

        case actionType.loadQuiz:
            let quizData = {};
            let quizIndex = [];
            action.payload.forEach((element) => {
                const quizItemObj = Object.assign({}, element, {
                    isMarked: false,
                    result: null,
                    isChecking: false,
                    checkErr: false,
                    checkErrMsg: null
                });
                quizData = { ...quizData, [element.id]: quizItemObj };
                quizIndex.push(element.id);
            });

            nextState.quizData = {
                index: quizIndex,
                quizHash: quizData
            };
            nextState.isLoading = false;
            nextState.quizStart = true;
            nextState.loadFail = false;
            return nextState;

        case actionType.loadQuizFail:
            return Object.assign({}, state, {
                isLoading: false,
                quizStart: false,
                loadFail: true,
                loadErrMsg: action.payload
            });

        case actionType.restartQuiz:
            return Object.assign({}, state, {
                quizStart: false,
                quizData: null
            });

        case actionType.getResult:
            nextState.quizData.quizHash[action.payload.id] = {
                ...nextState.quizData.quizHash[action.payload.id],
                isMarked: true,
                isChecking: false,
                result: action.payload.result,
                checkErr: false,
            }
            return nextState;

        case actionType.gettingResult:
            nextState.quizData.quizHash[action.payload] = {
                ...nextState.quizData.quizHash[action.payload],
                isChecking: true,
                checkErr: false,
            }
            return nextState;

        case actionType.getResultFail:
            nextState.quizData.quizHash[action.payload.id] = {
                ...nextState.quizData.quizHash[action.payload.id],
                isChecking: false,
                checkErr: true,
                checkErrMsg : action.payload.errMsg
            }
            return nextState;

        default:
            return state;
    }
};