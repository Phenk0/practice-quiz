import { Link } from "react-router-dom";

import Button from "../UI/Button/Button";

import classes from "./FinishedQuiz.module.scss";
const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((acc, key) => {
    if (props.results[key] === "success") acc++;
    return acc;
  }, 0);
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map(({ question, id }, index) => {
          const cls = [
            "fa",
            props.results[id] === "error" ? "fa-times" : "fa-check",
            classes[props.results[id]],
          ];
          return (
            <li key={index + ""}>
              <strong>{`${index + 1}. `}</strong>
              {question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Correct {successCount} of {props.quizLength}
      </p>
      <div className="">
        <Button onClick={props.onRetry} type="primary">
          Try again!
        </Button>
        <Link to="/">
          <Button type="success">Go to tests list</Button>
        </Link>
      </div>
    </div>
  );
};
export default FinishedQuiz;
