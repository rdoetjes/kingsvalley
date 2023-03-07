import { React } from 'react';


function renderImages(board, size){
    const game = []
    console.log(board)
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            console.log(board[i][j]);
            game.push(<img data-id={i+","+j} key={i+","+j} src={"images/"+board[i][j]+".png"} alt={board[i][j]}></img>);
        }
    }
    return game;
}

function Board({board, size}) {
    return(
    <div className='board_enclosure'>
        <div className="board">
            {renderImages(board, size)}
        </div>
    </div>
    );
}

export default Board;
