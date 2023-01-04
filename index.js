
window.addEventListener("DOMContentLoaded", function() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
     ];

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
    
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const announce = (type) => {
        switch(type){
           case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
           case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
           case TIE:
                announcer.innerText = 'Tie';
            }
        announcer.classList.remove('hide');
    };

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
          const winCondition = winningConditions[i];
          const a = board[winCondition[0]];
          const b = board[winCondition[1]];
          const c = board[winCondition[2]];
          if (a === "" || b === "" || c === "") {
            continue;
          }
          if (a === b && b === c) {
            roundWon = true;
            break;
          }
        }
      
        if (roundWon) {
          announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
          isGameActive = false;
          return;
        } else if (!board.includes("")){ 
             announce(TIE)
        }
      }

      const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
          tile.innerText = currentPlayer;
          tile.classList.add(`player${currentPlayer}`);
          updateBoard(index);
          handleResultValidation();
          changePlayer();
        }
      };

      tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer();
        }
    
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    resetButton.addEventListener('click', resetBoard);

    ////////////////////////////////////////////////////////////////////////////////////////
    const item = document.querySelector('#itemOne');
    item.addEventListener('dragstart', dragStart);

    const item2 = document.querySelector('#itemTwo');
    item2.addEventListener('dragstart', dragStart);

    const item3 = document.querySelector('#itemThree');
    item3.addEventListener('dragstart', dragStart);

    const item4 = document.querySelector('#itemFour');
    item4.addEventListener('dragstart', dragStart);

    let counter = 0;

    function dragStart(e){
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    const container = document.querySelectorAll('.avatar-container');
    container.forEach(container => {
        container.addEventListener('dragenter', dragEnter)
        container.addEventListener('dragover', dragOver);
        container.addEventListener('drop', drop);
    });

    function dragEnter(e) {
        e.preventDefault();
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    
    function drop(e) {
       counter += 1;
        if(counter > 2 ){
            return 
        } else {    
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        e.target.appendChild(draggable);
        }
    }
});

