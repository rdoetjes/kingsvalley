import { React } from 'react';

function renderImages(board, size, dragStart, dragDrop, dragEnd, disable) {
    const game = []
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!disable) {
                game.push(<img
                    pos_i={i}
                    pos_j={j}
                    name={i + "," + j}
                    key={i + "," + j}
                    src={"images/" + board[i][j] + ".png"}
                    alt={board[i][j]}
                    draggable={board[i][j] <= 0 ? false : true}
                    onDragStart={dragStart}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                ></img>);
            } else {
                game.push(<img
                    pos_i={i}
                    pos_j={j}
                    name={i + "," + j}
                    key={i + "," + j}
                    src={"images/" + board[i][j] + ".png"}
                    alt={board[i][j]}
                ></img>);
            }
        }
    }
    return game;
}

function Board({ board, size, dragStart, dragDrop, dragEnd, disable}) {
    return (
        <div className='board_enclosure'>
            <div className="board">
                {renderImages(board, size, dragStart, dragDrop, dragEnd, disable)}
            </div>
        </div>
    );
}

export default Board;
