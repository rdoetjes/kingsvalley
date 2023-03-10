import { useEffect, useState } from 'react';
import Board from './components/Board'
import GameLogic from "./GameLogic.js"
import './App.css';

function App() {
  const [gameLogic] = useState(new GameLogic());
  const [board, setBoard] = useState(Array.from({ length: gameLogic.N }, () => Array.from({ length: gameLogic.N }, () => 0)));
  const [fromPos, setFromPos] = useState(null);
  const [toPos, setToPos] = useState(null);
  const [legalMove, setLegalMove] = useState(false);
  const [player, setPlayer] = useState(0);
  const [disable, setDisable] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');

  function dragStart(e) {
    setFromPos(e.target);
  }

  function dragDrop(e) {
    console.log("drop end");
    const from_x = parseInt(fromPos.getAttribute("pos_j"));
    const from_y = parseInt(fromPos.getAttribute("pos_i"));
    const to_x = parseInt(e.target.getAttribute("pos_j"));
    const to_y = parseInt(e.target.getAttribute("pos_i"));

    if (!gameLogic.didPlayerMakeLegalMove(player, board, from_x, from_y, to_x, to_y)) {
      setLegalMove(false);
      return;
    }
    setPlayer(player ^ 1);
    setToPos(e.target);
    setLegalMove(true);
  }

  function dragEnd(e) {
    if (!legalMove) return;
    const is = fromPos.getAttribute("pos_i");
    const js = fromPos.getAttribute("pos_j");
    const it = toPos.getAttribute("pos_i");
    const jt = toPos.getAttribute("pos_j");

    const t = board[is][js];
    board[is][js] = 0;
    board[it][jt] = t;

    setBoard([...board]);

    const winner = gameLogic.checkForWinner(board);
    if (winner !== -1) {
      setWinnerMessage(" WINS!")
      setPlayer(winner);
      setDisable(true);
      return;
    }
    
    if (player===gameLogic.BLACK){
      let move = gameLogic.ai(board, player, 3);
      console.log(move);
      const piece = board[move[1]][move[0]];
      board[move[3]][move[2]] = piece;  
      board[move[1]][move[0]] = 0;
      setPlayer(player^1);  
    }
  }

  function restartGame() {
    setWinnerMessage('');
    setDisable(false);
    setBoard(gameLogic.initBoard(gameLogic.N));
    setPlayer(0);
  }

  function playerColor(player) {
    return player === gameLogic.WHITE ? "WHITE" : "BLACK";
  }

  useEffect(() => {
    setBoard(gameLogic.initBoard(gameLogic.N));
    setPlayer(0);
  }, [gameLogic]);

  return (
    <div className='center'>
      <div className='title'>KING'S VALLEY PLAYER: {playerColor(player)} {winnerMessage} <div />
        <Board board={board} size={gameLogic.N} dragStart={dragStart} dragDrop={dragDrop} dragEnd={dragEnd} disable={disable} />
        <button onClick={restartGame}>RESTART</button>
      </div>
    </div>
  );
}

export default App;
