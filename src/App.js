import { useEffect, useState } from 'react';
import Board from './components/Board'
import './App.css';

const BB=1;
const BF=2;
const WB=3;
const WF=4;

function App() {
  const n = 5;
  
  const [board, setBoard] = useState(Array.from({length: n},()=> Array.from({length: n}, () => 0)));

  function init_board(size) {
    let board = Array.from({length: size},()=> Array.from({length: size}, () => 0));
    const blackPieces=[BB, BB, BF, BB, BB];
    const whitePieces=[WB, WB, WF, WB, WB];

    for(let i=0; i<size; i++){
      for(let j=0; j<size; j++){
        if (i===0){
          board[i][j] = blackPieces[j];
          continue;
        }
        
        if (i===4){
          board[i][j] = whitePieces[j];
          continue;
        }
      }
    }
    setBoard(board);
  }

  useEffect(() => {
    init_board(n);
  }, []);

  return (
      <div className='center'>
        <div className='title'>KING'S VALLEY
        <Board board={board} size={n}/>
      </div>
    </div>
  );
}

export default App;
