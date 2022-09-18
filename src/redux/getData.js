import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const appData = createSlice({
  name: "counter",
  initialState: {
    amountOfQuestions: 20,
    allCategories: [],
    loading: true,
    quizUrl: "",
    activeCategory: 0,
    activeDifficulty: "medium",
    activeType: "multiple",
    score: 0,
    i: 0,
  },
  reducers: {
    changeAmount: (state, action) => {
      state.amountOfQuestions = action.payload;
    },
    getAllCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    loadingProcess: (state) => {
      state.loading = false;
    },
    getQuizUrl: (state, action) => {
      state.quizUrl = action.payload;
    },
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    changeDiff: (state, action) => {
      state.activeDifficulty = action.payload;
    },
    changeType: (state, action) => {
      state.activeType = action.payload;
    },
    changeScore: (state) => {
      state.score = state.score + 1;
    },
    changeI: (state) => {
      state.i = state.i + 1;
    },
    defaultValues: (state) => {
      state.amountOfQuestions = 20;
      state.activeCategory = 0;
      state.activeDifficulty = "medium";
      state.activeType = "multiple";
      state.score = 0;
      state.i = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeAmount,
  getAllCategories,
  loadingProcess,
  getQuizUrl,
  changeCategory,
  changeDiff,
  changeType,
  changeScore,
  changeI,
  defaultValues,
} = appData.actions;

export default appData.reducer;
