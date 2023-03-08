import { useEffect, useState } from 'react';
import Board from './components/Board'
import './App.css';

const BB=1;
const BF=2;
const WB=3;
const WF=4;

function App() {
  const N = 5;
  
  const [board, setBoard] = useState(Array.from({length: N},()=> Array.from({length: N}, () => 0)));
  const [fromPos, setFromPos] = useState(null);
  const [toPos, setToPos] = useState(null);
  const [legalMove, setLegalMove] = useState(false);
  const [player, setPlayer] = useState(0);
  
  function getAllMovesPiece(board, from_x, from_y){
    let possiblePos = Array.from({length: 8},()=> Array.from({length: 2}, () => null))
    //TODO: refector into loose methods
     //diagonal down right
     let obstacle = false;
     for (let x = from_x, y = from_y; x >=0 && y < N; x--, y++){
        if (from_x!==x && from_y!==y && board[y][x]!==0){
          possiblePos[0][0]=x+1;
          possiblePos[0][1]=y-1;
          obstacle = true;
          break;
        }
        if (!obstacle && from_x!==x && from_y!==y){
          possiblePos[0][0]=x;
          possiblePos[0][1]=y;
        }
     }

    //diagonal up right
    obstacle = false;
    for (let x = from_x, y = from_y; x < N && y >= 0; x++, y--){
      if (from_x!==x && from_y!==y && board[y][x]!==0){
        possiblePos[1][0]=x-1;
        possiblePos[1][1]=y+1;
        obstacle = true;
        break;
      }
      if (!obstacle && from_x!==x && from_y!==y){
        possiblePos[1][0]=x;
        possiblePos[1][1]=y;
      }
    }

    //diagonal down left
    obstacle = false;
    for (let x = from_x, y = from_y; x < N && y < N; x++, y++){
      if (from_x!==x && from_y!==y && board[y][x]!==0){
        possiblePos[2][0]=x-1;
        possiblePos[2][1]=y-1;
        obstacle = true;
        break;
      }
      if (!obstacle && from_x!==x && from_y!==y){
        possiblePos[2][0]=x;
        possiblePos[2][1]=y;
      }
    }

    //diagonal down right
    obstacle = false;
    for (let x = from_x, y = from_y; x >=0 && y >= 0; x--, y--){
      if (from_x!==x && from_y!==y && board[y][x]!==0){
        possiblePos[3][0]=x+1;
        possiblePos[3][1]=y+1;
        obstacle = true;
        break;
      }
      if (!obstacle && from_x!==x && from_y!==y){
        possiblePos[3][0]=x;
        possiblePos[3][1]=y;
      }
    }

    //check horizontal right
    obstacle = false
    for(let x = from_x, y = from_y; x<N; x++){
      if (from_x!==x && board[y][x]!==0){
        console.log(x, y, board[y][x]);
        possiblePos[4][0]=x-1;
        possiblePos[4][1]=y;
        obstacle = true;
        break;
      }
      if (!obstacle && from_x!==x){
        possiblePos[4][0]=x;
        possiblePos[4][1]=y;
      }
    }

    //check horizontal left
    obstacle = false;
    for(let x = from_x, y = from_y; x>=0; x--){
      if (from_x!==x && board[y][x]!==0){
        possiblePos[5][0]=x+1;
        possiblePos[5][1]=y;
        obstacle = true;
        break;
      }
      if (!obstacle && from_x!==x){
        possiblePos[5][0]=x;
        possiblePos[5][1]=y;
      }
    }

    //check vertical up
    obstacle = false;
    for(let x = from_x, y = from_y; y>=0; y--){
      if (from_y!==y && board[y][x]!==0){
        possiblePos[6][0]=x;
        possiblePos[6][1]=y+1;
        obstacle = true;
        break;
      }
      if (!obstacle && from_y!==y){
        possiblePos[6][0]=x;
        possiblePos[6][1]=y;
      }
    }

    //check vertical down
    obstacle = false;
    for(let x = from_x, y = from_y; y<N; y++){
      if (from_y!==y && board[y][x]!==0){
        possiblePos[7][0]=x;
        possiblePos[7][1]=y-1;
        obstacle = true;
        break;
      }
      if (!obstacle && from_y!==y){
        possiblePos[7][0]=x;
        possiblePos[7][1]=y;
      }
    }
  
    return possiblePos;
  }

  function pruneOwnLocation(possiblePos, from_x, from_y){
    for(let i=0; i<=possiblePos.length-1; i++){
      if ( possiblePos[i][0] === from_x &&  possiblePos[i][1] === from_y ){
        possiblePos[i][0] = null;
        possiblePos[i][1] = null;
      }
    }
    return possiblePos;
  }

  function pruneCenterSquareAsLegalMove(possiblePos){
    for(let i=0; i<=possiblePos.length-1; i++){
      if ( possiblePos[i][0] === Math.floor(N/2) &&  (possiblePos[i][1] === Math.floor(N/2)) ){
        possiblePos[i][0] = null;
        possiblePos[i][1] = null;
      }
    }
    return possiblePos;
  }

  function getAllValidMovesForSelectedPiece(board, from_x, from_y){
    const piece = board[from_y][from_x];
    
    let moves = getAllMovesPiece(board, from_x, from_y);
    moves = pruneOwnLocation(moves,from_x, from_y);

    if (piece===WB || piece===BB)
      return pruneCenterSquareAsLegalMove(moves);

    return moves;
  }

  function didPlayerMakeLegalMove(player, board, from_x, from_y, to_x, to_y){
    const piece = board[from_y][from_x];

    if (player === 0 && !(piece===WB || piece===WF))
      return false;

    if (player === 1 && !(piece===BB || piece===BF))
      return false;

    let possiblePos = getAllValidMovesForSelectedPiece(board, from_x, from_y);
    console.log(possiblePos);

    for(let i=0; i < possiblePos.length; i++)
      if (possiblePos[i][0] === to_x && possiblePos[i][1] === to_y) {
        setPlayer(player^1);
        return true;
      }

    return false;
  }

  function initBoard(size) {
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
    setPlayer(0);
  }

  function dragStart(e){   
    setFromPos(e.target);        
  }

  function dragDrop(e){
      const from_x = parseInt(fromPos.getAttribute("pos_j"));
      const from_y = parseInt(fromPos.getAttribute("pos_i"));
      const to_x = parseInt(e.target.getAttribute("pos_j"));
      const to_y =  parseInt(e.target.getAttribute("pos_i"));

      if (!didPlayerMakeLegalMove(player, board, from_x, from_y, to_x, to_y)){ 
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

  function restartGame(){
    initBoard(N);
  }

  function playerColor(player){
    return player===0?"WHITE":"BLACK";
  }

  useEffect(() => {
    initBoard(N);
  }, []);

  return (
      <div className='center'>
        <div className='title'>KING'S VALLEY PLAYER: {playerColor(player)}
        <Board board={board} size={N} dragStart={dragStart} dragDrop={dragDrop} dragEnd={dragEnd} />
        <button onClick={restartGame}>RESTART</button>
      </div>
    </div>
  );
}

export default App;
