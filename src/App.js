import { useEffect, useState } from 'react';
import Board from './components/Board'
import GameLogic from "./GameLogic.js"
import './App.css';

function App() {
  const N = 5;
  const [gameLogic] = useState(new GameLogic());
  const [board, setBoard] = useState(Array.from({ length: N }, () => Array.from({ length: N }, () => 0)));
  const [fromPos, setFromPos] = useState(null);
  const [toPos, setToPos] = useState(null);
  const [legalMove, setLegalMove] = useState(false);
  const [player, setPlayer] = useState(0);



  function dragStart(e) {
    setFromPos(e.target);
  }

  function dragDrop(e) {
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
  }

  function restartGame() {
    setBoard(gameLogic.initBoard(N));
  }

  function playerColor(player) {
    return player === 0 ? "WHITE" : "BLACK";
  }

  useEffect(() => {
    setBoard(gameLogic.initBoard(N));
    setPlayer(0);
  }, [gameLogic]);

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
