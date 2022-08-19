import AnswersItem from "./AnswersItem/AnswersItem";

import classes from "./AnswersList.module.scss";

const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswersItem
            answer={answer}
            key={index + ""}
            answerState={props.answerState && props.answerState[answer.id]}
            onAnswerClick={props.onAnswerClick}
          />
        );
      })}
    </ul>
  );
};
export default AnswersList;
