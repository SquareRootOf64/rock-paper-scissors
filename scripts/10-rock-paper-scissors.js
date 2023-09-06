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