import { layoutLoginPopup, layoutSignupPopup } from "./storage.js";
import { renredQuestion, renderResultQuiz, renderSidebarElements, requestLayoutToBase } from "./utils.js";
import { database } from "./firebase.js";

/* Header */
const header = document.querySelector("#header");
const loginBtn = header.querySelector("#login-btn");
const signupBtn = header.querySelector("#signup-btn");
// const signoutBtn = header.querySelector('#signout-btn');

/* Sidebar */
const sidebar = document.querySelector('#sidebar');

/* Popups */
const popupsPoint = document.querySelector(".popups");

/* Render Sidebar Content Logic */
const requestToSidebarContent = async () => {
  try {
    const response = await firebase.database().ref('/sidebar-info').once('value');
    const data = response.val();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
requestToSidebarContent()
  .then(data => {
    const bestPlayers = data.bestPlayers;
    const bestResult = data.bestResult;
    const latestResults = data.latestResults;
    const bestPlayersLayout = renderSidebarElements(bestPlayers);
    const bestResultsLayout = renderSidebarElements(bestResult);
    const latestResultsLayout = renderSidebarElements(latestResults);
    sidebar.insertAdjacentHTML("beforeend", bestPlayersLayout);
    sidebar.insertAdjacentHTML("beforeend", bestResultsLayout);
    sidebar.insertAdjacentHTML("beforeend", latestResultsLayout);
  })
  .catch(error => console.log(error));


const renderPopupProperties = () => {
  const popupContainer = document.querySelector(".popup");
  const closePopupBtn = popupContainer.querySelector(".close-btn");
  const closeOverlay = popupContainer.querySelector(".overlay");
  const passwordInput = popupContainer.querySelector(".password-input");
  const passwordVisibleBtn = popupContainer.querySelector(".views-password");

  passwordVisibleBtn.addEventListener("click", () => {
    passwordInput.type === "text"
      ? (passwordInput.type = "password")
      : (passwordInput.type = "text");
    passwordInput.focus();
  });

  closePopupBtn.addEventListener("click", () => {
    popupsPoint.replaceChildren();
  });
  closeOverlay.addEventListener("click", () => {
    popupsPoint.replaceChildren();
  });
};

loginBtn.addEventListener("click", () => {
  popupsPoint.insertAdjacentHTML("beforeend", layoutLoginPopup);
  renderPopupProperties();
});
signupBtn.addEventListener("click", () => {
  popupsPoint.insertAdjacentHTML("beforeend", layoutSignupPopup);
  renderPopupProperties();
});

/* Game Variables */
const gameContainer = document.querySelector("#quiz-box_container");
const startQuizBtn = gameContainer.querySelector("#start-quiz-btn");
let step = 0;
let points = 0;
let score = 0;
let currentAnswearsInRow = 0;
let questions = [];

const nextQuestion = () => {
  startQuiz();
};

const plusPointsVisible = (changePoints) => {
  const countPointsBox = gameContainer.querySelector(".quiz-question .points");
  points += changePoints;
  let plusPointsHtmlLayout;

  if (changePoints > 0) {
    plusPointsHtmlLayout = `<span class="points-added plus">+${changePoints}</span>`;
  } else {
    plusPointsHtmlLayout = `<span class="points-added minus">${changePoints}</span>`;
  }

  countPointsBox.insertAdjacentHTML("beforeend", plusPointsHtmlLayout);

  const addedPoints = gameContainer.querySelector(".points-added");

  setTimeout(() => {
    countPointsBox.innerHTML = `Points: ${points}`;
    addedPoints.remove();
  }, 1000);
};

const answearHandler = (e, trueAnswear, answearsList) => {
  const nextQuestionBtn = gameContainer.querySelector("#next-question-btn");
  let changePoints = 0;
  let item = e.target;
  let userAnswear = item.attributes.answear.value;
  
  if (userAnswear == trueAnswear) {
    currentAnswearsInRow += 1;
    let threeAnswearsInRow = currentAnswearsInRow >= 3 ? currentAnswearsInRow * 2 : 0;
    let fiveAnswearsInRow = currentAnswearsInRow >= 5 ? currentAnswearsInRow * 4 : 0;
    let sevenAnswearsInRow = currentAnswearsInRow >= 7 ? currentAnswearsInRow * 6 : 0;
    let tenAnswearsInRow = currentAnswearsInRow >= 10 ? currentAnswearsInRow * 10 : 0;
    score += 1;
    changePoints += 5 + (currentAnswearsInRow * 5) + threeAnswearsInRow + fiveAnswearsInRow + sevenAnswearsInRow + tenAnswearsInRow;
    item.classList.add("true");
  } else {
    let trueAnswearItem = gameContainer.querySelector(
      `[answear="${trueAnswear}"]`
    );
    currentAnswearsInRow = 0;
    changePoints += -10;
    trueAnswearItem.classList.add("true");
    item.classList.add("false");
  }

  plusPointsVisible(changePoints);
  nextQuestionBtn.classList.remove("disabled");
  nextQuestionBtn.addEventListener("click", nextQuestion);

  answearsList.forEach((item) => {
    item.style.pointerEvents = "none";
  });
};

const startQuizAgain = () => {
  const startAgainBtn = gameContainer.querySelector("#start-quiz-again");
  step = 0;
  points = 0;
  score = 0;
  currentAnswearsInRow = 0;
  questions = [];
  startAgainBtn.addEventListener("click", startQuiz);
};

const getQuestions = async () => {
  gameContainer.replaceChildren();
  gameContainer.insertAdjacentHTML("beforeend", `<div class="loader"><div></div><div></div><div></div></div>`);
  try {
    const response = await firebase.database().ref("/quiz").once("value");
    const data = response.val();
    const sortedArr = data.sort(() => Math.random() - 0.5).splice(0, 10);
    return sortedArr;
  } catch (error) {
    console.error(error);
  }
};

const startQuiz = async () => {
  if (step === 0) {
    questions = await getQuestions();
  }
  let question = questions[step];

  if (step === 10) {
    gameContainer.replaceChildren();
    let resultHtmlLayout = renderResultQuiz(points, score);
    gameContainer.insertAdjacentHTML("beforeend", resultHtmlLayout);
    startQuizAgain();
    return;
  }

  gameContainer.replaceChildren();
  let questionsHtmlLayout = renredQuestion(question, step, points);
  gameContainer.insertAdjacentHTML("beforeend", questionsHtmlLayout);

  step += 1;

  const answearsList = gameContainer.querySelectorAll(".answears-box .item");

  answearsList.forEach((item) => {
    item.addEventListener("click", function (e) {
      answearHandler(e, question.answer, answearsList);
    });
  });
};

startQuizBtn.addEventListener("click", startQuiz);
