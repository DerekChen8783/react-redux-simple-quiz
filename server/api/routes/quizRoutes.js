module.exports = function(app) {
    const handler = require('../controllers/quizController');
  
    app.route('/api/v1/quiz')
      .post(handler.generateQuiz);
    
    app.route('/api/v1/solution/:quizId')
      .get(handler.getSolution);
  };