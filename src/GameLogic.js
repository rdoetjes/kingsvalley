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

    checkForWinner(board) {
        if (board[Math.floor(this.N / 2)][Math.floor(this.N / 2)] === this.WF)
            return this.WHITE;

        if (board[Math.floor(this.N / 2)][Math.floor(this.N / 2)] === this.BF)
            return this.BLACK

        return -1;
    }

    initBoard(kingOnWhichSide) {
        let board = Array.from({ length: this.N }, () => Array.from({ length: this.N }, () => 0));
        let blackPieces = [];
        let whitePieces = [];
       
        if (kingOnWhichSide === 1){
            blackPieces = [this.BB, this.BB, this.BF, this.BB, this.BB];
            whitePieces = [this.WB, this.WB, this.WF, this.WB, this.WB];
        } else {
            blackPieces = [this.BB, this.BB, this.WF, this.BB, this.BB];
            whitePieces = [this.WB, this.WB, this.BF, this.WB, this.WB];
        }

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

        let possiblePos = this.#getAllValidMovesForSelectedPiece(board, from_x, from_y);

        for (let i = 0; i < possiblePos.length; i++)
            if (possiblePos[i][0] === to_x && possiblePos[i][1] === to_y) {
                return true;
            }

        return false;
    }

    #movePiece(ai_board, from_x, from_y, to_x, to_y) {
        ai_board[to_y][to_x] = ai_board[from_y][from_x];
        ai_board[from_y][from_x] = 0;
    }

    #minimax(ai_board, maximizingplayer, depth) {
        let score = this.checkForWinner(ai_board);
        if (depth <= 0 || score === 1) {
            if (score === 1) return Infinity;
            return score;
        }

        if (maximizingplayer === 1) {
            let bestScore = -Infinity;
            let moves = this.getAllValidMovesPlayerPieces(ai_board, this.BLACK);
            for (let i = 0; i < moves.length - 1; i++) {
                const from_x = moves[i][0];
                const from_y = moves[i][1];
                const to_x = moves[i][2];
                const to_y = moves[i][3];

                this.#movePiece(ai_board, from_x, from_y, to_x, to_y);
                score = this.#minimax(ai_board, 0, depth - 1);
                if (score === 1) { return Infinity; }
                this.#movePiece(ai_board, to_x, to_y, from_x, from_y);
                bestScore = Math.max(score, bestScore);
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            let moves = this.getAllValidMovesPlayerPieces(ai_board, this.WHITE);
            for (let i = 0; i < moves.length - 1; i++) {
                const from_x = moves[i][0];
                const from_y = moves[i][1];
                const to_x = moves[i][2];
                const to_y = moves[i][3];

                this.#movePiece(ai_board, from_x, from_y, to_x, to_y);
                score = this.#minimax(ai_board, 1, depth - 1);
                if (score === 0) { score = -1 * (Math.random() * 10000); }
                this.#movePiece(ai_board, to_x, to_y, from_x, from_y);
                bestScore = Math.min(score, bestScore);
            }
            return bestScore;
        }
    }

    #copyBoard(sBoard) {
        let dBoard = Array.from({ length: this.N }, () => Array.from({ length: this.N }, () => 0));
        //make deep copy for each new move (nice and clean)
        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.N; j++) {
                dBoard[i][j] = sBoard[i][j];
            }
        }
        return sBoard;
    }
    
    #shortCutWinner(moves){
        for(let i=0; i<moves.length-1; i++){
            if (moves[i][3] === 2 && moves[i][2] === 2) return moves[i];
        }
        return null;
    }

    async ai(board, depth) {
        let bestScore = -Infinity;
        let bestMove;

        let moves = this.getAllValidMovesPlayerPieces(board, this.BLACK);
        for (let i = 0; i < moves.length - 1; i++) {
            const from_x = moves[i][0];
            const from_y = moves[i][1];
            const to_x = moves[i][2];
            const to_y = moves[i][3];

            //make deep copy for each new move (nice and clean).
            let ai_board = this.#copyBoard(board);

            //check for black farao victory (speeds up game)
            const game_over = this.#shortCutWinner(moves);
            if (game_over){
                bestMove = {from_x: game_over[0], from_y: game_over[1], to_x: game_over[2], to_y: game_over[3]};
                break;
            }

            this.#movePiece(ai_board, from_x, from_y, to_x, to_y);
            let score = this.#minimax(ai_board, 0, depth);
            this.#movePiece(ai_board, to_x, to_y, from_x, from_y);

            if (score > bestScore) {
                bestMove = { from_x, from_y, to_x, to_y };
                bestScore = score;
            }
        }
        this.#movePiece(board, bestMove.from_x, bestMove.from_y, bestMove.to_x, bestMove.to_y);
    }

    #createArrayOfAllPlayerMovesWithFromToVector(board, allMoves, from_x, from_y) {
        let record = [4];
        this.#getAllValidMovesForSelectedPiece(board, from_x, from_y).forEach(element => {
            if (element[0] !== null) {
                record[0] = from_x;
                record[1] = from_y;
                record[2] = element[0];
                record[3] = element[1];
                allMoves.push([...record]);
            }
        });
    }

    getAllValidMovesPlayerPieces(board, player) {
        let allMoves = [];
        for (let from_y = 0; from_y < this.N; from_y++) {
            for (let from_x = 0; from_x < this.N; from_x++) {
                if (player === this.BLACK) {
                    if (board[from_y][from_x] === 1 || board[from_y][from_x] === 2) {
                        this.#createArrayOfAllPlayerMovesWithFromToVector(board, allMoves, from_x, from_y);
                    }
                }
                if (player === this.WHITE) {
                    if (board[from_y][from_x] === 3 || board[from_y][from_x] === 4) {
                        this.#createArrayOfAllPlayerMovesWithFromToVector(board, allMoves, from_x, from_y);
                    }
                }
            }
        }
        return allMoves;
    }

    #getAllMovesPiece(board, from_x, from_y) {
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

    #pruneOwnLocation(possiblePos, from_x, from_y) {
        for (let i = 0; i <= possiblePos.length - 1; i++) {
            if (possiblePos[i][0] === from_x && possiblePos[i][1] === from_y) {
                possiblePos[i][0] = null;
                possiblePos[i][1] = null;
            }
        }
        return possiblePos;
    }

    #pruneCenterSquareAsLegalMove(possiblePos) {
        for (let i = 0; i <= possiblePos.length - 1; i++) {
            if (possiblePos[i][0] === Math.floor(this.N / 2) && (possiblePos[i][1] === Math.floor(this.N / 2))) {
                possiblePos[i][0] = null;
                possiblePos[i][1] = null;
            }
        }
        return possiblePos;
    }

    #getAllValidMovesForSelectedPiece(board, from_x, from_y) {
        const piece = board[from_y][from_x];

        let moves = this.#getAllMovesPiece(board, from_x, from_y);
        moves = this.#pruneOwnLocation(moves, from_x, from_y);

        if (piece === this.WB || piece === this.BB)
            return this.#pruneCenterSquareAsLegalMove(moves);

        return moves;
    }

}