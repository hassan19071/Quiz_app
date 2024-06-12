import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { defaultValues } from "../redux/getData";
import "../style/home.scss";

const Score = () => {
  const amountOfQtns = useSelector((state) => state.data.amountOfQuestions);
  const score = useSelector((state) => state.data.score);
  const history = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [percentage, setPercentage] = useState((score * 100) / amountOfQtns);
  const pass = 50;

  let changePage = () => {
    dispatch(defaultValues());
    history("/");
  };

  useEffect(() => {}, []);

  return (
    <div className="score-page text-center">
      <div className="score">
        <h1>Final Score</h1>
        <h3>Your Score: {percentage}%</h3>
        <h3>Passing Score: {pass}%</h3>
        <div className="msg mt-5 text-center">
          <h5>Result</h5>
          {percentage >= pass ? (
            <>
              <p>You Passed</p>
              <p>Congratulations!</p>
            </>
          ) : (
            <>
              <p>You did not Pass</p>
              <p>Better Luck Next Time!</p>
            </>
          )}
        </div>
        <button
          onClick={changePage}
          className="btn btn-primary back-to-settings"
        >
          Back to settings
        </button>
      </div>
    </div>
  );
};

export default Score;
