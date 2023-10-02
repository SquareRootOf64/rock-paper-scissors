let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  draws: 0
};

/* if (score === null) { //проверяет, если localStorage пуст (при нажатии кнопки // <Reset score> хранилище обнуляется, в нем null), то сохраняем дефолтное значение объекта score ниже:
  score = {
    wins: 0,
    losses: 0,
    draws: 0
  };
}  

if (score === null) аналогично if (!score)
*/

updateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
  intervalID = setInterval(() => { //arrow function
    // setInterval() has a different IDs each iteration
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1000) //autoplays the game every 1000ms (1  second)
  isAutoPlaying = true;
  } else {
    clearInterval(intervalID); //to stop running the setInterval()
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  }) //when rock-button clicked calls playGame('rock')

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
})

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
})

document.body.addEventListener('keydown', (event) => { //listens to an event from the keyboard
  if (event.key === 'r') { //if 'r' pressed
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Draw.'
    }

  } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Draw.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.'
      }
      
  } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Draw.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.'
      }
  }

  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === "Draw.") {
    score.draws++;
  }

  localStorage.setItem('score', JSON.stringify(score)); /* 
  localStorage - это хранилище string, чтобы они сохранялись, когда страница обновлена и код запущен заново. Хранит score при обновлении веб-страницы. 
  JSON нужен для превращения JS кода в JSON, чтобы между различными компьютерами читался код.
  stringify(score) превращает объект score в формат string, потому что localStorage понимает только strings 
  */

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src= "images/${playerMove}-emoji.png" class="move-icon">
VS
<img src= "images/${computerMove}-emoji.png" class="move-icon">
Computer`;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
    }
  
  return computerMove;
}