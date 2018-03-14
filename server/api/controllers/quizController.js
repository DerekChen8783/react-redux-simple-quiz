let localQuizStorage = null;
const randomNum = () => Math.floor(Math.random() * 10);
const quizGenerator = (quizNum) => {
    let resultArray = [];
    for (let i = 0; i < quizNum; i++) {
        const num1 = randomNum();
        const num2 = randomNum();
        const obj = {
            id: i.toString(),
            quizContent: `${num1} + ${num2} =`,
            result: (num1+num2).toString()
        }
        resultArray.push(obj);
    }
    localQuizStorage = resultArray;

    return resultArray.map((element) => {
        return {
            id: element.id,
            quizContent: element.quizContent
        }
    });
}

exports.generateQuiz = function (req, res) {
    const quizNum = +req.body.quizNum;//parse the request quizNum from string to num
    if (Number.isInteger(quizNum) && quizNum > 0) {
        res.json(quizGenerator(req.body.quizNum));
    } else {
        res.status(400);
        res.json({errMsg:'invalid quiz number'});
    }
};

exports.getSolution = function (req, res) {
    const quizId = req.params.quizId;
    const quizResultData = localQuizStorage && localQuizStorage.find((element) => element.id === quizId);
    if (quizResultData == undefined) {
        res.status(400);
        res.json({errMsg:'quiz not found'});
    } else {
        res.json(quizResultData);
    }

};





