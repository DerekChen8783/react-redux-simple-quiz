import { actionType } from '../constant/actionType';
import { API_URL } from '../config/ApiServerUrl';

export const restartQuiz = () => {
    return {
        type: actionType.restartQuiz
    }
}

const loadQuizSuccess = quizData => {
    return {
        type: actionType.loadQuiz,
        payload: quizData
    };
};

const loadingQuiz = () => {
    return {
        type: actionType.loadingQuiz,
    };
};

const loadQuizFail = errMsg => {
    return {
        type: actionType.loadQuizFail,
        payload: errMsg
    };
};

export const loadQuiz = (quizNum) => {
    const requestBody = { quizNum: quizNum };
    return dispatch => {
        dispatch(loadingQuiz());
        fetch(API_URL + "quiz", {
            method: "post",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-type": "application/json",
            }
        })
            .then(respone => {
                if (respone.ok) {
                    return respone.json();
                } else {
                    return respone.json()
                        .then((err) => {
                            return Promise.reject(err);
                        })
                }
            })
            .then(quizData => {
                dispatch(loadQuizSuccess(quizData));
            })
            .catch(err => {
                if (err.errMsg !== undefined) {
                    dispatch(loadQuizFail(err.errMsg));
                } else {
                    dispatch(loadQuizFail("Networking Fail"));
                }
            });
    };
};

const getResult = (quizResult) => {
    return {
        type: actionType.getResult,
        payload: quizResult
    }
}

const gettingResult = (quizId) => {
    return {
        type: actionType.gettingResult,
        payload: quizId
    }
}

const getResultFail = (errMsg) => {
    return {
        type: actionType.getResultFail,
        payload: errMsg
    }
}

export const checkResult = (quizId) => {
    return dispatch => {
        dispatch(gettingResult(quizId));
        fetch(API_URL + `solution/${quizId}`, {
            method: "get",
            headers: {
                "Content-type": "application/json",
            }
        })
            .then(respone => {
                if (respone.ok) {
                    return respone.json();
                } else {
                    return respone.json()
                        .then((err) => {
                            return Promise.reject(err);
                        })
                }
            })
            .then(quizData => {
                dispatch(getResult(quizData));
            })
            .catch(err => {
                let errObj = {
                    id: quizId
                }
                if (err.errMsg !== undefined) {
                    errObj.errMsg = err.errMsg;
                } else {
                    errObj.errMsg = "Networking Fail";
                }
                dispatch(getResultFail(errObj));
            });
    };
}
