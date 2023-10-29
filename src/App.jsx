import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import Player from "./components/Player"
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

import { useState } from "react";

const deriveActivePlayer = (gameTurn) => {
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  };

  return currentPlayer;
};

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveGameBoard = (gameTurn) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

  for (const turn of gameTurn) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  };

  return gameBoard;
};

const deriveWinner = (gameBoard, players) => {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol
      ) {
      winner = players[firstSquareSymbol];
    };
  };
  return winner;
};

const App = () => {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn , setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurn.length === 9 && !winner;
 
  const handleSelectSquare = (rowIndex, colIndex) => {    
    setGameTurn(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer } , 
        ...prevTurns
      ];

      return updatedTurns;
    })
  };

  const handleRestart = () => {
    setGameTurn([]);
  };

  const handlePlayerChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, 
        [symbol]: newName
      } 
    })
  };

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'> 
          <Player 
            initialName={PLAYERS.X} 
            symbol='X' 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerChange}
          />
          <Player 
            initialName={PLAYERS.O} 
            symbol='O' 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
