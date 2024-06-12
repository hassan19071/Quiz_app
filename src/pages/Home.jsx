import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.scss";
import img from "../imgs/hero-img.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAmount,
  getQuizUrl,
  changeCategory,
  changeDiff,
  changeType,
} from "../redux/getData";

const Home = () => {
  const amountOfQtns = useSelector((state) => state.data.amountOfQuestions);
  const activeCategory = useSelector((state) => state.data.activeCategory);
  const activeDifficulty = useSelector((state) => state.data.activeDifficulty);
  const activeType = useSelector((state) => state.data.activeType);
  const loading = useSelector((state) => state.data.loading);
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.data.allCategories);
  const history = useNavigate();
  const [enterAmount, setEnterAmount] = useState(true);

  let handleSubmit = (e) => {
    e.preventDefault();

    if (amountOfQtns === "") {
      setEnterAmount(false);
    } else {
      dispatch(
        getQuizUrl(
          `https://opentdb.com/api.php?amount=${amountOfQtns}&category=${activeCategory}&difficulty=${activeDifficulty}&type=${activeType}`
        )
      );
      history("/quiz");
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 order-lg-2 order-1">
            <div className="hero">
              <div className="logo">
                <h1>Quiz!</h1>
              </div>
              <h3>test your knowledge</h3>
              {loading ? (
                <div
                  className="spinner-border text-center circle"
                  role="status"
                >
                  <span className="visually-hidden text-center">
                    Loading...
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label>Select Category</label>
                  <select
                    className="mb-3"
                    value={activeCategory}
                    onChange={(e) => dispatch(changeCategory(e.target.value))}
                  >
                    <option value="0">Any Category</option>
                    {allCategories.map((category) => {
                      return (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <label>Select Difficulty</label>
                  <select
                    className="mb-3"
                    value={activeDifficulty}
                    onChange={(e) => dispatch(changeDiff(e.target.value))}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <label>Select Questions Type</label>
                  <select
                    className="mb-3"
                    value={activeType}
                    onChange={(e) => dispatch(changeType(e.target.value))}
                  >
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">Truth / False</option>
                  </select>
                  <label>Amount Of Questions</label>
                  <input
                    className="mb-3"
                    type="number"
                    value={amountOfQtns}
                    onChange={(e) => dispatch(changeAmount(e.target.value))}
                    min={1}
                    max="50"
                    placeholder="Amount of questions"
                  />
                  <span
                    className={
                      enterAmount ? "d-none my-2 warn" : "my-2 warn d-block"
                    }
                  >
                    Please enter amount of questions!
                  </span>
                  <button className="btn btn-primary">Get Started</button>
                </form>
              )}
            </div>
          </div>
          <div className="col-lg order-lg-1 order-2 mt-lg-0 mt-5">
            <div className="img">
              <img src={img} alt="hero-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
