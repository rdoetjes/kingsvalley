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
  const [fromPos, setFromPos] = useState(null);
  const [toPos, setToPos] = useState(null);
  const [legalMove, setLegalMove] = useState(false);
  
  function getAllMovesBeetle(board, from_x, from_y){
    let possiblePos = Array.from({length: 8},()=> Array.from({length: 2}, () => null))

    console.log("coming from: ", board[from_y][from_x], from_x, from_y);
     //diagonal down right
     for (let x = from_x, y = from_y; x >=0 && y < n; x--, y++){
        if (from_x!==x && from_y!==y && board[y][x]===0){
          possiblePos[0][0]=x;
          possiblePos[0][1]=y;
        }
     }

     //diagonal up right
     for (let x = from_x, y = from_y; x < n && y >= 0; x++, y--){
      if (from_x!==x && from_y!==y && board[y][x]===0){
        possiblePos[1][0]=x;
        possiblePos[1][1]=y;
      }
   }

     //diagonal down left
     for (let x = from_x, y = from_y; x < n && y < n; x++, y++){
      if (from_x!==x && from_y!==y && board[y][x]===0){
        possiblePos[2][0]=x;
        possiblePos[2][1]=y;
      }
   }

    //diagonal down right
    for (let x = from_x, y = from_y; x >=0 && y >= 0; x--, y--){
      if (from_x!==x && from_y!==y && board[y][x]===0){
        possiblePos[3][0]=x;
        possiblePos[3][1]=y;
      }
    }

    //check horizontal right
    for(let x = from_x, y = from_y; x<n; x++){
      console.log(x);
      if (from_x!==x && board[y][x]===0){
        possiblePos[4][0]=x;
        possiblePos[4][1]=y;
      }
    }

    //check horizontal left
    for(let x = from_x, y = from_y; x>=0; x--){
      console.log(x);
      if (from_x!==x && board[y][x]===0){
        possiblePos[5][0]=x;
        possiblePos[5][1]=y;
      }
    }

    //check vertical up
    for(let x = from_x, y = from_y; y>=0; y--){
      if (from_y!==y && board[y][x]===0){
        possiblePos[6][0]=x;
        possiblePos[6][1]=y;
      }
    }

    //check vertical down
    for(let x = from_x, y = from_y; y<n; y++){
      if (from_y!==y && board[y][x]===0){
        possiblePos[7][0]=x;
        possiblePos[7][1]=y;
      }
    }

    console.log(possiblePos);
    return possiblePos;
  }

  function getAllMovesFarao(board, from_x, from_y){
    let possiblePos = Array.from({length: 4},()=> Array.from({length: 2}, () => null))
    return possiblePos;
  }

  function getAllMovesForSelectedPiece(board, from_x, from_y){
    const piece = board[from_y][from_x];

    if (piece===WB || piece===BB) 
      return getAllMovesBeetle(board, from_x, from_y);

    if (piece===WF || piece===BF) 
      return getAllMovesFarao(board, from_x, from_y);
  }

  function isLegalMove(board, from_x, from_y, to_x, to_y){
    let possiblePos = getAllMovesForSelectedPiece(board, from_x, from_y);
    
    for(let i=0; i < possiblePos.length; i++)
      if (possiblePos[i][0] === to_x && possiblePos[i][1] === to_y) return true;

    return false;
  }

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
    board[Math.floor(n/2)][Math.floor(n/2)] = -1;
    setBoard(board);
  }

  function dragStart(e){    
    setFromPos(e.target);
  }

  function dragDrop(e){
      const from_x = parseInt(fromPos.getAttribute("pos_j"));
      const from_y = parseInt(fromPos.getAttribute("pos_i"));
      const to_x = parseInt(e.target.getAttribute("pos_j"));
      const to_y =  parseInt(e.target.getAttribute("pos_i"));

      if (!isLegalMove(board, from_x, from_y, to_x, to_y)){ 
        setLegalMove(false); 
        return;
      }
      setToPos(e.target);
      
      setLegalMove(true);
  }

  function dragEnd(e){
    if (!legalMove) return;
      const is = fromPos.getAttribute("pos_i");
      const js = fromPos.getAttribute("pos_j");
      const it = toPos.getAttribute("pos_i");
      const jt = toPos.getAttribute("pos_j");

      const t = board[is][js];
      board[is][js]=0;
      board[it][jt]=t;

      setBoard([...board]);
  }

  useEffect(() => {
    init_board(n);
  }, []);

  return (
      <div className='center'>
        <div className='title'>KING'S VALLEY
        <Board board={board} size={n} dragStart={dragStart} dragDrop={dragDrop} dragEnd={dragEnd} />
      </div>
    </div>
  );
}

export default App;
