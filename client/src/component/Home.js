import React, { Component } from 'react';
import Quiz from './Quiz';
import { loadQuiz } from '../action/QuizAction';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import '../css/Home.css';

function mapStateToProps(state) {
    return {
        quiz: state.quiz
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadQuiz: bindActionCreators(loadQuiz, dispatch)
    };
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizNmuber: "",
            disableStartBtn: true,
            showInputErr: false
        }
    }

    handleQuizNumChange(event) {
        const userInput = event.target.value.trim();
        //check user enter a positive integer
        if (Number.isInteger(Number(userInput)) && userInput > 0) {
            this.setState({
                quizNmuber: userInput,
                disableStartBtn: false,
                showInputErr: false
            });
        }
        else this.setState({
            quizNmuber: userInput,
            disableStartBtn: true,
            showInputErr: true
        })
    }

    renderStartPage() {
        return (
            <div>
                {this.props.quiz.isLoading ?
                    <p>LOADING...</p> :
                    <div>
                        <p>Enter the Number of Quizs:</p>
                        <input
                            type="text"
                            value={this.state.quizNmuber}
                            onChange={(e) => this.handleQuizNumChange(e)}
                        />
                        <input
                            type="button"
                            value="Start"
                            disabled={(this.state.disableStartBtn) ? "disabled" : ""}
                            onClick={() => this.props.loadQuiz(this.state.quizNmuber)}
                        />
                        {this.state.showInputErr ? <p className="err">please enter a postive integer</p> : null}
                        {this.props.quiz.loadFail?<p className="err">{this.props.quiz.loadErrMsg}</p>:null}
                    </div>
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.quiz.quizStart ?
                    <Quiz quizData={this.props.quiz.quizData} /> :
                    this.renderStartPage()
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);