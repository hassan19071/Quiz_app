/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/home.scss";
import { changeScore, defaultValues } from "../redux/getData";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import img from "../imgs/side.png";

const Quiz = () => {
  const quizUrl = useSelector((state) => state.data.quizUrl);
  const amountOfQtns = useSelector((state) => state.data.amountOfQuestions);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useNavigate();
  let [activeDot, setActiveDot] = useState(0);
  let [randomOrder, setRandomOrder] = useState(0);
  let [haveChosen, setHaveChosen] = useState(false);
  let [isCorrect, setIsCorrect] = useState(false);
  let [active, setActive] = useState(0);
  let [hideMsg, setHideMsg] = useState(false);

  useEffect(() => {
    setRandomOrder(Math.ceil(Math.random() * 4));
  }, [activeDot]);

  useEffect(() => {
    let getQuestions = async () => {
      let results = await fetch(quizUrl)
        .then((json) => json.json())
        .then((data) => setQuestions([...data.results]))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
      return results;
    };
    getQuestions();
  }, []);

  let getCorrectAnswer = () => {
    setIsCorrect(true);
    setActive(1);
    setHaveChosen(true);
  };

  let changePage = () => {
    dispatch(defaultValues());
    history("/");
  };

  function nextQuestion() {
    if (haveChosen) {
      setHideMsg(false);
      if (activeDot < questions.length - 1) {
        setActiveDot(activeDot + 1);
        if (isCorrect) {
          dispatch(changeScore());
        }
      }
      setIsCorrect(false);
      setHaveChosen(false);
      setActive(0);
    } else {
      setHideMsg(true);
    }
  }

  function submited() {
    if (haveChosen) {
      setHideMsg(false);
      if (isCorrect) {
        dispatch(changeScore());
      }
      history("/score");
    } else {
      setHideMsg(true);
    }
  }

  function wrongChoose(num) {
    setActive(num);
    setIsCorrect(false);
    setHaveChosen(true);
  }

  console.log(quizUrl);

  return (
    <div className="quiz-app">
      {hideMsg ? (
        <div className="msg text-center">Please Choose Your Answer</div>
      ) : (
        <></>
      )}
      {loading ? (
        <div className="circle">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : questions.length ? (
        <div className="quiz">
          <div className="questions-number">
            Question {activeDot + 1}/{amountOfQtns}
          </div>
          <div className="container">
            <div className="infos mt-5">
              <div className="row align-items-center">
                <div className="col-lg-6 order-lg-1 order-2 mt-lg-0 mt-5">
                  <div className="img">
                    <img src={img} alt="side" width="100%" />
                  </div>
                  <div className="dots">
                    {questions.map((el, iin) => {
                      return (
                        <div
                          key={iin}
                          className={iin <= activeDot ? "active dot" : "dot"}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-lg-6 order-lg-2 order-1">
                  <div className="question-data">
                    <div className="question">
                      <h1>{decode(questions[activeDot].question)}</h1>
                    </div>
                    <div className="choices d-flex flex-column mt-5">
                      {questions[activeDot].type === "multiple" ? (
                        <>
                          <div
                            className={
                              active === 1
                                ? `active order-${randomOrder}`
                                : `order-${randomOrder}`
                            }
                            onClick={getCorrectAnswer}
                          >
                            {decode(questions[activeDot].correct_answer)}
                          </div>
                          <div
                            className={
                              active === 2 ? `active order-1` : `order-1`
                            }
                            onClick={() => wrongChoose(2)}
                          >
                            {decode(questions[activeDot].incorrect_answers[0])}
                          </div>
                          <div
                            className={
                              active === 3 ? `active order-2` : `order-2`
                            }
                            onClick={() => wrongChoose(3)}
                          >
                            {decode(questions[activeDot].incorrect_answers[1])}
                          </div>
                          <div
                            className={
                              active === 4 ? `active order-3` : `order-3`
                            }
                            onClick={() => wrongChoose(4)}
                          >
                            {decode(questions[activeDot].incorrect_answers[2])}
                          </div>
                        </>
                      ) : (
                        <>
                          {questions[activeDot].correct_answer === "True" ? (
                            <>
                              <div
                                className={active === 1 ? `active` : ``}
                                onClick={getCorrectAnswer}
                              >
                                {decode(questions[activeDot].correct_answer)}
                              </div>
                              <div
                                className={active === 2 ? `active` : ``}
                                onClick={() => wrongChoose(2)}
                              >
                                {decode(
                                  questions[activeDot].incorrect_answers[0]
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className={active === 2 ? `active` : ``}
                                onClick={() => wrongChoose(2)}
                              >
                                {decode(
                                  questions[activeDot].incorrect_answers[0]
                                )}
                              </div>
                              <div
                                className={active === 1 ? `active` : ``}
                                onClick={getCorrectAnswer}
                              >
                                {decode(questions[activeDot].correct_answer)}
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div className="btns mt-5 d-flex justify-content-lg-end justify-content-center">
                      {activeDot === questions.length - 1 ? (
                        <div className="next ms-4" onClick={submited}>
                          submit
                        </div>
                      ) : (
                        <div className="next ms-4" onClick={nextQuestion}>
                          next question
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center no">
          <h1 className="no-questions">no questions</h1>
          <button onClick={changePage} className="back-to-settings mt-4">
            Back to settings
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
