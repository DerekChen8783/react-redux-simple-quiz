import React, { Component } from 'react';
import QuizItem from './QuizItem';
import Store from '../config/Store';
import { restartQuiz } from '../action/QuizAction';
import '../css/Quiz.css';

class Quiz extends Component {
    renderQuizList() {
        return (
            this.props.quizData.index.map((quizIndex) =>
                <li key={quizIndex}>
                    <QuizItem {...this.props.quizData.quizHash[quizIndex]} />
                </li>
            )
        )
    }

    handleQuizRestart() {
        Store.dispatch(restartQuiz());
    }

    render() {
        return (
            <div className="quizContainer">
                <div>
                    <input
                        className="restartBtn"
                        type="button"
                        value="Restart"
                        onClick={() => this.handleQuizRestart()}
                    />
                </div>
                <ul className="quizContainer">
                    {this.renderQuizList()}
                </ul>
            </div>
        )
    }
}

export default Quiz;