import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/home.css";
import { changeScore, changeI, defaultValues } from "../redux/getData";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";

const Quiz = () => {
  const quizUrl = useSelector((state) => state.data.quizUrl);
  const amountOfQtns = useSelector((state) => state.data.amountOfQuestions);
  const score = useSelector((state) => state.data.score);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const i = useSelector((state) => state.data.i);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [random1, setRandom1] = useState(Math.floor(Math.random() * 2));
  const [random2, setRandom2] = useState([Math.floor(Math.random() * 4),Math.floor(Math.random() * 4),Math.floor(Math.random() * 4)]);
  let x = 0;

  useEffect(() => {
    let getQuestions = async () => {
      let results = await fetch(quizUrl)
        .then((json) => json.json())
        .then((data) => setQuestions(data.results))
        .catch((err)=> console.log(err))
        .finally(() => setLoading(false));
      return results;
    };
    return getQuestions;
  },[history]);

  useEffect(() => {
    setRandom1(Math.floor(Math.random() * 4));
    setRandom2([Math.floor(Math.random() * 4),Math.floor(Math.random() * 4),Math.floor(Math.random() * 4)]);
  }, [i]);

  let getCorrectAnswer = () => {
    dispatch(changeScore());
    dispatch(changeI());
    if (i + 1 === questions.length) {
      history("/score");
    }
  };

  let getInCorrectAnswer = () => {
    dispatch(changeI());
    if (i + 1 === questions.length) {
      history("/score");
    }
  };

  let changePage = () => {
    dispatch(defaultValues());
    history("/");
  };

  return (
    <div className="quiz-app">
      {loading ? (
        <div className="spinner-border text-primary circle" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : questions.length ? (
        questions.map((que) => {
          return questions.indexOf(que) === i ? (
            <div className="quiz" key={que.question}>
              <div className="container">
                <div className="question">
                  <h4>{decode(que.question)}</h4>
                </div>
                <div className="choices">
                  <div className="answers">
                    <div className={`answer order-${random1}`}>
                      <button onClick={getCorrectAnswer}>
                        {decode(que.correct_answer)}
                      </button>
                    </div>
                    {que.incorrect_answers.map((ans, ind) => {
                      return (
                        <div className={`answer order-${random2[x++]}`} key={ind}>
                          <button onClick={getInCorrectAnswer}>
                            {decode(ans)}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="details d-flex justify-content-between">
                  <div className="qtn-num">
                    <p>
                      Question Number: {i + 1} / {amountOfQtns}
                    </p>
                  </div>
                  <div className="score">
                    <p>Score: {score}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          );
        })
      ) : (
        <div className="text-center">
          <h1 className="no-questions">no questions</h1>
          <button
            onClick={changePage}
            className="btn btn-primary back-to-settings mt-4"
          >
            Back to settings
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
