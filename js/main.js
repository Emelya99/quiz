import { layoutLoginPopup, layoutSignupPopup, headerGuestLayout, quizForGuest, quizForUser, loader, pageLoader } from "./storage.js";
import { renredQuestion, renderResultQuiz, renderSidebarElements, renderHeaderLayout, renderProfilePopup } from "./utils.js";
import { database } from "./firebase.js";

/* Header */
const header = document.querySelector("#header");

/* Sidebar */
const sidebar = document.querySelector('#sidebar');

/* Quiz Container */
const gameContainer = document.querySelector("#quiz-box_container");

/* Popups */
const popupsPoint = document.querySelector(".popups");

/* LoaderBox */
const loaderBox = document.querySelector('#page-loader');

/* LocalStorage */
const localStorageUser = JSON.parse(localStorage.getItem('user')) || null;

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
const sidebarRender = () => {
  requestToSidebarContent()
  .then(data => {
    const latestResults = data.latestResults;
    const latestResultsLayout = renderSidebarElements(latestResults);
    sidebar.insertAdjacentHTML("beforeend", latestResultsLayout);
  })
  .catch(error => console.log(error))
  .finally(() => loaderBox.replaceChildren());
}

const quizFirstScreenRender = (user) => {
  gameContainer.replaceChildren();
  if (user) {
    gameContainer.insertAdjacentHTML("beforeend", quizForUser);

    const startQuizBtn = gameContainer.querySelector("#start-quiz-btn");

    startQuizBtn.addEventListener("click", startQuiz);
    startQuizBtn.addEventListener("touchstart", startQuiz);
  } else {
    gameContainer.insertAdjacentHTML("beforeend", quizForGuest);
  }
}

/* Game Variables */
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
  nextQuestionBtn.addEventListener("touchstart", nextQuestion);

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
  startAgainBtn.addEventListener("touchstart", startQuiz);
};

const getQuestions = async () => {
  gameContainer.replaceChildren();
  gameContainer.insertAdjacentHTML("beforeend", loader);
  try {
    const response = await firebase.database().ref("/quiz").once("value");
    const data = response.val();
    const sortedArr = data.sort(() => Math.random() - 0.5).splice(0, 10);
    return sortedArr;
  } catch (error) {
    console.error(error);
  }
};

const updateSidebarAfterGame = (points, score) => {
  const latestResultsRef = firebase.database().ref('sidebar-info/latestResults/data');
  const user = JSON.parse(localStorage.getItem('user'));

  const obj = {
    name: user.displayName, 
    id: user.uid,
    points: points,
    score: score,
  }

  latestResultsRef.push(obj)
  .then(() => {
    sidebarRender();
  })
  .catch((error) => {
    console.error('Ошибка при обновлении данных пользователя:', error.message);
  });

  latestResultsRef.once('value')
  .then((snapshot) => {
    const items = snapshot.val();
    const itemKeys = Object.keys(items);

    if (itemKeys.length > 6) {
    const itemsToRemove = itemKeys.slice(0, 1);

    itemsToRemove.forEach((key) => {
      latestResultsRef.child(key).remove()
        .then(() => {
          console.log('Элемент успешно удален:', key);
        })
        .catch((error) => {
          console.error('Ошибка при удалении элемента:', key, error.message);
        });
    });
    }
  })
  .catch((error) => {
    console.error('Ошибка при получении данных:', error.message);
  });
}

const startQuiz = async () => {
  if (step === 0) {
    questions = await getQuestions();
  }
  let question = questions[step];

  if (step === 10) {
    sidebar.replaceChildren();
    updateSidebarAfterGame(points, score);
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
    item.addEventListener("touchstart", function (e) {
      answearHandler(e, question.answer, answearsList);
    });
  });
};

const authLoginLogic = (event) => {
  event.preventDefault();

  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  const errorBox = event.target.querySelector('#error');

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      localStorage.setItem('user', JSON.stringify(user));

      headerRender(user);
      popupsPoint.replaceChildren();

      quizFirstScreenRender(user);
      loaderBox.insertAdjacentHTML("beforeend", pageLoader);
      setTimeout(() => {
        loaderBox.replaceChildren();
      },500)
    })
    .catch((error) => {
      errorBox.innerHTML = error.message;
    });
}

const authSignupLogic = (event) => {
  event.preventDefault();

  const name = event.target.querySelector('#firstName').value;
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  const errorBox = event.target.querySelector('#error');

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    user.updateProfile({
      displayName: name,
      photoURL: 0,
    })
    .then(() => {
      localStorage.setItem('user', JSON.stringify(user));
      quizFirstScreenRender(user);
      popupsPoint.replaceChildren();
      headerRender(user);
      loaderBox.insertAdjacentHTML("beforeend", pageLoader);
      setTimeout(() => {
        loaderBox.replaceChildren();
      },500)
    })
    .catch((error) => {
      console.error(error.message);
    });
  })
  .catch((error) => {
    errorBox.innerHTML = error.message;
  });
}

const authSignoutLogic = () => {
  loaderBox.insertAdjacentHTML("beforeend", pageLoader);
  firebase.auth().signOut()
  .then(() => {
    headerRender();
    localStorage.removeItem('user');
    quizFirstScreenRender();
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    setTimeout(() => {
      loaderBox.replaceChildren();
    },500)
  });
}

const renderProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const profileRender = renderProfilePopup(user);
  popupsPoint.insertAdjacentHTML("beforeend", profileRender);

  const popupContainer = document.querySelector(".popup_profile");
  const closePopupBtn = popupContainer.querySelector(".close-btn");
  const closeOverlay = popupContainer.querySelector(".overlay");

  closePopupBtn.addEventListener("click", () => {
    popupsPoint.replaceChildren();
  });
  closeOverlay.addEventListener("click", () => {
    popupsPoint.replaceChildren();
  });
}

/* Header Render */
const headerRender = (user) => {
  header.replaceChildren();

  if(user) {
    const headerLayout = renderHeaderLayout(user);
    header.insertAdjacentHTML("beforeend", headerLayout);

    const profilePopup = header.querySelector('#user-profile');
    const signoutBtn = header.querySelector('#signout-btn');

    profilePopup.addEventListener('click', renderProfile)
    signoutBtn.addEventListener('click', authSignoutLogic)
  } else {
    const headerLayout = headerGuestLayout;
    header.insertAdjacentHTML("beforeend", headerLayout);

    const loginBtn = document.querySelector("#login-btn");
    const signupBtn = document.querySelector("#signup-btn");
    
    loginBtn.addEventListener("click", () => {
      popupsPoint.insertAdjacentHTML("beforeend", layoutLoginPopup);
      renderPopupProperties();
    });
    signupBtn.addEventListener("click", () => {
      popupsPoint.insertAdjacentHTML("beforeend", layoutSignupPopup);
      renderPopupProperties();
    });
  }
}

// First Render Logic
const renderPage = () => {
  if (localStorageUser) {
    headerRender(localStorageUser);
  } else {
    headerRender();
  }
  quizFirstScreenRender(localStorageUser);
  sidebarRender();
}
renderPage();

const renderPopupProperties = (event) => {
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

  if(popupContainer.classList.contains('popup_login')) {
    const loginForm = popupContainer.querySelector('#login-form');
    loginForm.addEventListener('submit', authLoginLogic);
  } else {
    const signupForm = popupContainer.querySelector('#signup-form');
    signupForm.addEventListener('submit', authSignupLogic);
  }

  closePopupBtn.addEventListener("click", () => {
    popupsPoint.replaceChildren();
  });
  closeOverlay.addEventListener("click", () => {
    popupsPoint.replaceChildren();
  });
};