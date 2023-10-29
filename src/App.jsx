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

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App = () => {
  const [gameTurn , setGameTurn] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurn) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

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
      winner = firstSquareSymbol;
    };
  };

  const hasDraw = gameTurn.length === 9 && !winner;
 
  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActivePlayer(currentActivePlayer => currentActivePlayer === 'X' ? 'O' : 'X');
    
    setGameTurn(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer } , 
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'> 
          <Player 
            initialName='Player 1' 
            symbol='X' 
            isActive={activePlayer === 'X'}
          />
          <Player 
            initialName='Player 2' 
            symbol='O' 
            isActive={activePlayer === 'O'}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner}/>}
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
