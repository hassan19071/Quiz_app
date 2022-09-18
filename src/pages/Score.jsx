import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { defaultValues } from "../redux/getData";
import "../style/home.css";
import { decode } from "html-entities";

const Score = () => {
  const amountOfQtns = useSelector((state) => state.data.amountOfQuestions);
  const score = useSelector((state) => state.data.score);
  const history = useNavigate();
  const dispatch = useDispatch();
  const percentage = (score * 100) / amountOfQtns;
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  let changePage = () => {
    dispatch(defaultValues());
    history("/");
  };

  useEffect(() => {
    let content = "";
    if (percentage < 50) {
      content = decode("Your score is bad &#128542;");
      setColor("bad");
    } else if (percentage >= 50 && percentage < 60) {
      content = decode("Your score is not bad &#128578;");
      setColor("not-bad");
    } else if (percentage >= 60 && percentage < 70) {
      content = decode("Your score is good &#128522;");
      setColor("good");
    } else if (percentage >= 70 && percentage < 85) {
      content = decode("Your score is very good &#128525;");
      setColor("very-good");
    } else if (percentage >= 85 && percentage < 95) {
      content = decode("Your score is exellent &#128526;");
      setColor("exellent");
    } else if (percentage >= 95 && percentage == 100) {
      content = decode("WOW, You are genius &#129327;");
      setColor("genuis");
    }

    return setMsg(content);
  }, []);

  return (
    <div className="score-page text-center">
      <h1>Final Score</h1>
      <p>
        Your Score is {score} Up to {amountOfQtns}
      </p>
      <div className="msg">
        <h5 className={color}>{msg}</h5>
      </div>
      <button onClick={changePage} className="btn btn-primary back-to-settings">
        Back to settings
      </button>
    </div>
  );
};

export default Score;
