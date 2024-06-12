import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import { getAllCategories, loadingProcess } from "./redux/getData";
import { useDispatch } from "react-redux";
import Score from "./pages/Score";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let getCategories = async () => {
      let results = await fetch("https://opentdb.com/api_category.php")
        .then((json) => json.json())
        .then((data) => dispatch(getAllCategories(data.trivia_categories)))
        .finally(() => dispatch(loadingProcess()));
      return results;
    };

    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
