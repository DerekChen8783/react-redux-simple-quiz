import React, { Component } from 'react';
import { checkResult } from '../action/QuizAction';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import '../css/QuizItem.css';

const mapDispatchToProps = dispatch => {
    return {
        checkResult: bindActionCreators(checkResult, dispatch)
    };
};

class QuizItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userResult: "",
        }
    }

    handleUserInput(event) {
        this.setState({
            userResult: event.target.value.trim()
        })
    }

    renderCheckInfo() {
        const checkBtn = this.props.isChecking ?
            <div className="loader"></div> :
            <input
                className="checkButton"
                type="button"
                value="Show Solution"
                onClick={() => this.props.checkResult(this.props.id)}
            />

        let checkResult = (this.props.result === this.state.userResult);

        const checkArea = this.props.isMarked ?
            <div className="markContainer">
                <p>Solution:{this.props.result}</p>
                <p>{checkResult ? "Right" : "Wrong"}</p>
            </div> : checkBtn
        return checkArea;
    }

    render() {
        return (
            <div>
                <div className="quizItemContainer">
                    <p>{this.props.quizContent}</p>
                    <input
                        className="userInput"
                        type="text"
                        value={this.state.userResult}
                        onChange={(e) => this.handleUserInput(e)}
                        disabled={this.props.isMarked || this.props.isChecking}
                    />
                    {this.renderCheckInfo()}
                </div>
                {this.props.checkErr ? <p className="err">{this.props.checkErrMsg}</p> : null}
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(QuizItem);

