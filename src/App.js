import { useEffect, useState } from 'react';
import Board from './components/Board'
import GameLogic from "./GameLogic.js"
import './App.css';

function App() {
  const [gameLogic] = useState(new GameLogic());
  const [board, setBoard] = useState(Array.from({ length: gameLogic.N }, () => Array.from({ length: gameLogic.N }, () => 0)));
  const [fromPos, setFromPos] = useState(null);
  const [player, setPlayer] = useState(0);
  const [disable, setDisable] = useState(false);
  const [legalMove, setLegalmove] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [level, setLevel] = useState(4);
  const loseAudio = new Audio("./sounds/laugh.mp3");
  const moveAudio = new Audio("./sounds/move.mp3");
  const winAudio = new Audio("./sounds/win.mp3");


  useEffect(() => {
    const interval = setInterval(() => {
      if (player===gameLogic.WHITE) 
        document.body.style.cursor = ""; 
    }, 250);
    return () => clearInterval(interval);
  }, [player, gameLogic.WHITE]);

  function dragStart(e) {
    setLegalmove(false);
    setFromPos(e.target);
  }

  function dragDrop(e) {
    const from_x = parseInt(fromPos.getAttribute("pos_j"));
    const from_y = parseInt(fromPos.getAttribute("pos_i"));
    const to_x = parseInt(e.target.getAttribute("pos_j"));
    const to_y = parseInt(e.target.getAttribute("pos_i"));

    if (gameLogic.didPlayerMakeLegalMove(player, board, from_x, from_y, to_x, to_y)) {
      gameLogic.movePiece(board, from_x, from_y, to_x, to_y);
      moveAudio.play();
      checkForWinner(board);
      setBoard([...board]);
      setLegalmove(true);
      document.body.style.cursor = "wait"; 
      return;
    }
  }

  function checkForWinner(board) {
    document.body.style.cursor = "";
    const winner = gameLogic.checkForWinner(board);
    if (winner !== -1) {
      setPlayer(winner);
      setWinnerMessage(" WINS!")
      if (winner===gameLogic.BLACK) 
        loseAudio.play();
      else
        winAudio.play();
      setDisable(true);
      return true;
    }
    setPlayer(player ^ 1);
    return false;
  }

  function dragEnd(e) {
    if (!legalMove) return;
    if (checkForWinner(board)) return true;

    if (player === gameLogic.BLACK) {
      gameLogic.ai(board, level).then(() => {
        setBoard([...board]);
        if (checkForWinner(board)) return true;
        moveAudio.play();
      });
    }
    document.body.style.cursor = "";
  }

  function startGamePharaohLocalSide(){
    restartGame(1);
  }

  function startGamePharaohEnemySide(){
    restartGame(0);
  }

  function restartGame(gameNr) {
    setWinnerMessage('');
    setDisable(false);
    setBoard(gameLogic.initBoard(gameNr));
    setPlayer(0);
    document.body.style.cursor = "";
  }

  function playerColor(player) {
    return player === gameLogic.WHITE ? "WHITE" : "BLACK";
  }

  function changeLevelUp(e) {
    let t_level = level;
    setLevel(t_level++>=5?5:t_level++);
  }

  function changeLevelDown(e) {
    let t_level =level;
    setLevel(t_level--<=2?2:t_level--);
  }

  useEffect(() => {
    setBoard(gameLogic.initBoard(1));
    setPlayer(0);
  }, [gameLogic]);

  return (
      <div className='center'>
        <div className='title'>KING'S VALLEY PLAYER: {playerColor(player)} {winnerMessage}<div />
          <Board board={board} size={gameLogic.N} dragStart={dragStart} dragDrop={dragDrop} dragEnd={dragEnd} disable={disable} />
          <div className='level_txt'>level: {level}
            <button className='level_btn' onClick={changeLevelUp} alt="^">▲</button>
            <button className='level_btn' onClick={changeLevelDown} alt="^">▼</button>
            <button className='level_btn' alt="restart" onClick={startGamePharaohLocalSide}>↺</button>
            <button className='level_btn' alt="restart" onClick={startGamePharaohEnemySide}>↻</button>
            <a className='level_txt_small' href='https://github.com/rdoetjes/kingsvalley#readme'>rules and explanation</a>
          </div>
        </div>
      </div>
  );
}

export default App;
