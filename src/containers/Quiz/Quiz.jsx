import { Component } from "react";
import { useParams } from "react-router-dom";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

import classes from "./Quiz.module.scss";

class Quiz extends Component {
  state = {
    results: {}, // { [id]: 'success' || 'error' }
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' || 'error' }
    quiz: [
      {
        question: "What is the real color of sky?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Red", id: 1 },
          { text: "Violet", id: 2 },
          { text: "Yellow", id: 3 },
          { text: "Blue", id: 4 },
        ],
      },
      {
        question: "What is the year of JavaScript was created?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: "1989", id: 1 },
          { text: "1999", id: 2 },
          { text: "1995", id: 3 },
          { text: "1992", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") return;
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results,
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    });
  };

  componentDidMount() {
    console.log("Quiz ID= ", this.props.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer now!</h1>
          {this.state.isFinished ? (
            <FinishedQuiz
              quizLength={this.state.quiz.length}
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              answerState={this.state.answerState}
              onAnswerClick={this.onAnswerClickHandler}
            />
          )}
        </div>
      </div>
    );
  }
}

const withRouter = (Component) => (props) => {
  const params = useParams();
  return <Component params={params} {...props} />;
};

export default withRouter(Quiz);
