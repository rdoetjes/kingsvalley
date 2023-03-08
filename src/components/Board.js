import { React } from 'react';

function renderImages(board, size, dragStart, dragDrop, dragEnd){
    const game = []
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            game.push(<img 
                pos_i={i}
                pos_j={j} 
                key={i+","+j} 
                src={"images/"+board[i][j]+".png"} 
                alt={board[i][j]}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
                ></img>);
        }
    }
    return game;
}

function Board({board, size, dragStart, dragDrop, dragEnd}) {
    return(
    <div className='board_enclosure'>
        <div className="board">
            {renderImages(board, size, dragStart, dragDrop, dragEnd)}
        </div>
    </div>
    );
}

export default Board;
