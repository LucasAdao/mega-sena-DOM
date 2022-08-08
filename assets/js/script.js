var state = { board: [], currentGame: [], savedGames: [] };

function start() {
  createBoard();
  newGame();
}

//função para o usuário começar um novo jogo
function newGame() {
  resetGame();
  render();

  console.log(state.currentGame);
}

//loop que determina os números que aparecem na tela
function createBoard() {
  state.board = [];
  //loop para fazer o computador montar todos os números da megasena disponiveis.
  for (var i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}
//o conjunto de todas as peças do layout
function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

//função responsável por criar o board/layout
function renderBoard() {
  var divBoard = document.querySelector('#megasena-board');
  divBoard.innerHTML = '';

  var ulNumbers = document.createElement('ul');
  ulNumbers.classList.add('numbers');

  for (var i = 0; i < state.board.length; i++) {
    var currentNumber = state.board[i];

    var liNumber = document.createElement('li');
    liNumber.textContent = currentNumber;
    liNumber.classList.add('number');

    liNumber.addEventListener('click', handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      liNumber.classList.add('selected-number');
    }

    ulNumbers.appendChild(liNumber);
  }
  divBoard.appendChild(ulNumbers);
}

//função reponsável pela interação dos números escolhidos(clique)
function handleNumberClick(event) {
  var value = Number(event.currentTarget.textContent);

  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }
  console.log(state.currentGame);
  render();
}

//cria os butões e interliga suas funções
function renderButtons() {
  var divButtons = document.querySelector('#megasena-buttons');
  divButtons.innerHTML = ',';

  var buttonNewGame = createNewGameButton();
  var buttonRandomGame = createRandomGameButton();
  var buttonSaveGame = createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

function createRandomGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Jogo da Sorte';

  button.addEventListener('click', randomGame);

  return button;
}
//botão de novo jogo
function createNewGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Novo Jogo';

  button.addEventListener('click', newGame);

  return button;
}

//botão de salvar o jogo!
function createSaveGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Salvar Jogo';
  button.disabled = !isGameComplete();

  button.addEventListener('click', saveGame);

  return button;
}

function renderSavedGames() {
  var divSavedGames = document.querySelector('#megasena-saved-games');
  divSavedGames.innerHTML = '';
  divSavedGames.classList.add('saved-games');

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML = '<p>Nenhum jogo Salvo</p>';
  } else {
    var ulSavedGames = document.createElement('ul');

    for (var i = 0; i < state.savedGames.length; i++) {
      var currentGame = state.savedGames[i];

      var liGame = document.createElement('li');
      liGame.textContent = currentGame.join(' - ');

      ulSavedGames.appendChild(liGame);
    }
  }

  divSavedGames.appendChild(ulSavedGames);
}

//função para adicionar números ao jogo
function addNumberToGame(numberToAdd) {
  //serve para definir quais números podem entrar no software
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error('você só pode escolher números de 1 a 60!', numberToAdd);
    return;
  }
  //serve para definir a quantitade de números inserida
  if (state.currentGame.length >= 6) {
    console.error('o jogo já está completo');
    return;
  }

  if (isNumberInGame(numberToAdd)) {
    console.error('o número já está no jogo!', numberToAdd);
    return;
  }

  state.currentGame.push(numberToAdd);
}

//função responsável por remover números escolhidos
function removeNumberFromGame(numberToRemove) {
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error('você só pode escolher números de 1 a 60!', numberToRemove);
    return;
  }
  var newGame = [];

  for (var i = 0; i < state.currentGame.length; i++) {
    var currentNumber = state.currentGame[i];

    if (currentNumber === numberToRemove) {
      continue;
    }

    newGame.push(currentNumber);
  }

  state.currentGame = newGame;
}

//função que diz ao softaware se o número foi escolhido ou não
function isNumberInGame(numberToCheck) {
  /*  if (state.currentGame.includes(numberToCheck)) {
    return true;
  }
  return false;*/
  return state.currentGame.includes(numberToCheck);
}

//função para salvar o conjunto de números escolhidos
function saveGame() {
  if (!isGameComplete()) {
    console.error('O jogo nao está completo!');
    return;
  }

  state.savedGames.push(state.currentGame);
  newGame();

  console.log(state.savedGames);
}

//função para avisar o software se foi atingido o limite de números que podem ser escolhidos
function isGameComplete() {
  return state.currentGame.length === 6;
}

//função para apagar todos os dados do game
function resetGame() {
  state.currentGame = [];
}

//função que entra no botão randomgame, responsável por criar números aleatórios
function randomGame() {
  resetGame();

  while (!isGameComplete()) {
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }
  console.log(state.currentGame);
  render();
}

start();
