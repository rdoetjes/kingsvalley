// eslint-disable-next-line no-unused-vars
export default class GameLogic {
    BB = 1;
    BF = 2;
    WB = 3;
    WF = 4;
    N = 5;
    WHITE = 0;
    BLACK = 1;

    GameLogic() {

    }

    checkForWinner(board){
        if (board[Math.floor(this.N/2)][Math.floor(this.N/2)] === this.WF) 
            return this.WHITE;

        if (board[Math.floor(this.N/2)][Math.floor(this.N/2)] === this.BF)
            return this.BLACK
        
        return -1;
    }

    getAllMovesPiece(board, from_x, from_y) {
        let possiblePos = Array.from({ length: 8 }, () => Array.from({ length: 2 }, () => null))
        //TODO: refector into loose methods
        //diagonal down right
        let obstacle = false;
        for (let x = from_x, y = from_y; x >= 0 && y < this.N; x--, y++) {
            if (from_x !== x && from_y !== y && board[y][x] !== 0) {
                possiblePos[0][0] = x + 1;
                possiblePos[0][1] = y - 1;
                obstacle = true;
                break;
            }
            if (!obstacle && from_x !== x && from_y !== y) {
                possiblePos[0][0] = x;
                possiblePos[0][1] = y;
            }
        }

        //diagonal up right
        obstacle = false;
        for (let x = from_x, y = from_y; x < this.N && y >= 0; x++, y--) {
            if (from_x !== x && from_y !== y && board[y][x] !== 0) {
                possiblePos[1][0] = x - 1;
                possiblePos[1][1] = y + 1;
                obstacle = true;
                break;
            }
            if (!obstacle && from_x !== x && from_y !== y) {
                possiblePos[1][0] = x;
                possiblePos[1][1] = y;
            }
        }

        //diagonal down left
        obstacle = false;
        for (let x = from_x, y = from_y; x < this.N && y < this.N; x++, y++) {
            if (from_x !== x && from_y !== y && board[y][x] !== 0) {
                possiblePos[2][0] = x - 1;
                possiblePos[2][1] = y - 1;
                obstacle = true;
                break;
            }
            if (!obstacle && from_x !== x && from_y !== y) {
                possiblePos[2][0] = x;
                possiblePos[2][1] = y;
            }
        }

        //diagonal down right
        obstacle = false;
        for (let x = from_x, y = from_y; x >= 0 && y >= 0; x--, y--) {
            if (from_x !== x && from_y !== y && board[y][x] !== 0) {
                possiblePos[3][0] = x + 1;
                possiblePos[3][1] = y + 1;
                obstacle = true;
                break;
            }
            if (!obstacle && from_x !== x && from_y !== y) {
                possiblePos[3][0] = x;
                possiblePos[3][1] = y;
            }
        }

        //check horizontal right
        obstacle = false
        for (let x = from_x, y = from_y; x < this.N; x++) {
            if (from_x !== x && board[y][x] !== 0) {
                console.log(x, y, board[y][x]);
                possiblePos[4][0] = x - 1;
                possiblePos[4][1] = y;
                obstacle = true;
                break;
            }
            if (!obstacle && from_x !== x) {
                possiblePos[4][0] = x;
                possiblePos[4][1] = y;
            }
        }

        //check horizontal left
        obstacle = false;
        for (let x = from_x, y = from_y; x >= 0; x--) {
            if (from_x !== x && board[y][x] !== 0) {
                possiblePos[5][0] = x + 1;
                possiblePos[5][1] = y;
                obstacle = true;
                break;
            }
            if (!obstacle && from_x !== x) {
                possiblePos[5][0] = x;
                possiblePos[5][1] = y;
            }
        }

        //check vertical up
        obstacle = false;
        for (let x = from_x, y = from_y; y >= 0; y--) {
            if (from_y !== y && board[y][x] !== 0) {
                possiblePos[6][0] = x;
                possiblePos[6][1] = y + 1;
                obstacle = true;
                break;
            }
            if (!obstacle && from_y !== y) {
                possiblePos[6][0] = x;
                possiblePos[6][1] = y;
            }
        }

        //check vertical down
        obstacle = false;
        for (let x = from_x, y = from_y; y < this.N; y++) {
            if (from_y !== y && board[y][x] !== 0) {
                possiblePos[7][0] = x;
                possiblePos[7][1] = y - 1;
                obstacle = true;
                break;
            }
            if (!obstacle && from_y !== y) {
                possiblePos[7][0] = x;
                possiblePos[7][1] = y;
            }
        }

        return possiblePos;
    }

    pruneOwnLocation(possiblePos, from_x, from_y) {
        for (let i = 0; i <= possiblePos.length - 1; i++) {
            if (possiblePos[i][0] === from_x && possiblePos[i][1] === from_y) {
                possiblePos[i][0] = null;
                possiblePos[i][1] = null;
            }
        }
        return possiblePos;
    }

    pruneCenterSquareAsLegalMove(possiblePos) {
        for (let i = 0; i <= possiblePos.length - 1; i++) {
            if (possiblePos[i][0] === Math.floor(this.N / 2) && (possiblePos[i][1] === Math.floor(this.N / 2))) {
                possiblePos[i][0] = null;
                possiblePos[i][1] = null;
            }
        }
        return possiblePos;
    }

    getAllValidMovesForSelectedPiece(board, from_x, from_y) {
        const piece = board[from_y][from_x];

        let moves = this.getAllMovesPiece(board, from_x, from_y);
        moves = this.pruneOwnLocation(moves, from_x, from_y);

        if (piece === this.WB || piece === this.BB)
            return this.pruneCenterSquareAsLegalMove(moves);

        return moves;
    }

    initBoard() {
        let board = Array.from({ length: this.N }, () => Array.from({ length: this.N }, () => 0));
        const blackPieces = [this.BB, this.BB, this.BF, this.BB, this.BB];
        const whitePieces = [this.WB, this.WB, this.WF, this.WB, this.WB];

        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.N; j++) {
                if (i === 0) {
                    board[i][j] = blackPieces[j];
                    continue;
                }

                if (i === 4) {
                    board[i][j] = whitePieces[j];
                    continue;
                }
            }
        }
        return board;
    }

    didPlayerMakeLegalMove(player, board, from_x, from_y, to_x, to_y) {
        const piece = board[from_y][from_x];

        if (player === 0 && !(piece === this.WB || piece === this.WF))
            return false;

        if (player === 1 && !(piece === this.BB || piece === this.BF))
            return false;

        let possiblePos = this.getAllValidMovesForSelectedPiece(board, from_x, from_y);
        console.log(possiblePos);

        for (let i = 0; i < possiblePos.length; i++)
            if (possiblePos[i][0] === to_x && possiblePos[i][1] === to_y) {
                return true;
            }

        return false;
    }
}