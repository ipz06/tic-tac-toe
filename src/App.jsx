import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import Player from "./components/Player"

import { useState } from "react";

const deriveActivePlayer = (gameTurn) => {
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  };

  return currentPlayer;
};

const App = () => {
  const [gameTurn , setGameTurn] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurn);
 
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
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          turns={gameTurn}
        />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
