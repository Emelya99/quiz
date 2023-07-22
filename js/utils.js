export const requestLayoutToBase = (path) => {
  const response = firebase.database().ref(path).once("value");
  const data = response.val();
  return data;
};

export const renderHeaderLayout = (user) => {
  const renderHeaderLayoutContent = `
  <div class="container">
    <div class="inner">
      <a href="#" class="logo">
        <img src="images/logo.svg" alt="logo">
      </a>
      <div class="user-profile">
        <p class="name" title="${user.uid}">Hello,
          <span>${user.displayName ? user.displayName : user.email} #${user.uid.substring(0, 4)}</span>👋
        </p>
      </div>
      <ul class="auth-btns">
      <li>
        <button class="auth-btn" id="signout-btn">Signout</button>
      </li>
      </ul>
    </div>
  </div>
  `
  return renderHeaderLayoutContent;
}

export const renderSidebarElements = (obj) => {
  let arrLayouts = '';
  obj.data.map(item => {
    let firstTitleLetter = item.name.slice(0,1);
    let content = `
      <li>
        <div class="user-box">
          <div class="user-img">
              <span>${firstTitleLetter}</span>
          </div>
          <div class="user-info">
            <p class="user-name" title="${item.name} #7854">${item.name} #7854</p>
            <p class="user-result" title="${item.points} points"><span>${item.points}</span> points</p>
          </div>
        </div>
      </li>`;
    arrLayouts += content;
  })
  let sidebarElementHtmlLayout = `
  <div class="item">
    <div class="sidebar-box ${obj.info.class} box-shadow">
      <h3 class="title">${obj.info.title}</h3>
      <ul class="user-list">
        ${arrLayouts}
      </ul>
    </div>
  </div>
  `;
  return sidebarElementHtmlLayout;
};

export const renredQuestion = (obj, step, points) => {
  let questionsHtmlLayout = `
    <div class="quiz-question">
      <h2 class="title">${obj.question}</h2>
      <ul class="answears-box">
        <li><p class="item" answear="0">A: ${obj.options[0]}</p></li>
        <li><p class="item" answear="1">B: ${obj.options[1]}</p></li>
        <li><p class="item" answear="2">C: ${obj.options[2]}</p></li>
        <li><p class="item" answear="3">D: ${obj.options[3]}</p></li>
      </ul>
      <div class="bottom-part">
        <div class="points">
          Points: ${points}
        </div>
        <button class="main-btn disabled" id="next-question-btn">
          Next <img src="images/arrow-right.svg" alt="icon">
        </button>
      </div>
      <div class="count-question">
        <p><span>${step + 1}</span>/10</p>
      </div>
    </div>
  `;
  return questionsHtmlLayout;
};

export const renderResultQuiz = (points, score) => {
  let successMessage = "";

  if (score === 10) {
    successMessage = "Congratulations! You answered all questions correctly!";
  } else if (score === 9) {
    successMessage = "Excellent! You almost aced the quiz!";
  } else if (score === 8) {
    successMessage = "Great job! You scored an impressive result!";
  } else if (score === 7) {
    successMessage = "Well done! You performed above average in the quiz!";
  } else if (score === 6) {
    successMessage = "Good effort! You passed the quiz!";
  } else if (score === 5) {
    successMessage = "Not bad! You have an average score in the quiz.";
  } else if (score >= 3 && score <= 4) {
    successMessage = "Keep practicing! You can improve in the next quiz!";
  } else {
    successMessage = "Don't give up! With more practice, you can do better!";
  }

  let resultHtmlLayout = `
    <div class="quiz-result">
        <h2 class="title">${successMessage} <span>${score}</span>/10</h2>
        <ul class="quiz-result_list">
            <li>
                Your result: <span>${points}</span> points
            </li>
            <li>
                Your global ranking: <span>22</span>
            </li>
            <li>
                Your rank for a single game: <span>45</span>
            </li>
        </ul>
        <div class="btn-container center">
            <button class="main-btn" id="start-quiz-again">Start new Game</button>
        </div>
    </div>
    `;
  return resultHtmlLayout;
};
